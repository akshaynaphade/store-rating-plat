const express = require('express');
const router = express.Router();
const dbPool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

//serach option for checking stores speficc
router.get('/', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { search } = req.query; 

    try {
        let storesQuery = `
            SELECT s.id, s.name, s.address, COALESCE(AVG(r.rating), 0) as average_rating
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
        `;
        const queryParams = [];

        if (search) {
            storesQuery += " WHERE s.name ILIKE $1 OR s.address ILIKE $1";
            queryParams.push(`%${search}%`);
        }

        storesQuery += " GROUP BY s.id ORDER BY s.name ASC";
        
        const storesResult = await dbPool.query(storesQuery, queryParams);
        let stores = storesResult.rows;

        const userRatingsQuery = "SELECT store_id, rating FROM ratings WHERE user_id = $1";
        const userRatingsResult = await dbPool.query(userRatingsQuery, [userId]);
        const userRatingsMap = new Map(userRatingsResult.rows.map(r => [r.store_id, r.rating]));

        const responseData = stores.map(store => ({
            ...store,
            average_rating: parseFloat(store.average_rating).toFixed(1),
            user_rating: userRatingsMap.get(store.id) || null
        }));
        res.json(responseData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// store owner data dashbord
router.get('/my-store', authMiddleware, async (req, res) => {
    if (req.user.role !== 'Store Owner') return res.status(403).json({ msg: 'Forbidden' });
    
    try {
        const storeResult = await dbPool.query(`
            SELECT s.id, s.name, s.address, COALESCE(AVG(r.rating), 0) as average_rating
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            WHERE s.owner_id = $1
            GROUP BY s.id
        `, [req.user.id]);
        
        if (storeResult.rows.length === 0) return res.status(404).send("No store found for this owner.");
        
        const store = storeResult.rows[0];
        
        const ratersResult = await dbPool.query(`
            SELECT u.name, u.email, r.rating
            FROM ratings r
            JOIN users u ON r.user_id = u.id
            WHERE r.store_id = $1
        `, [store.id]);
        
        store.average_rating = parseFloat(store.average_rating).toFixed(1);
        res.json({ storeDetails: store, usersWhoRated: ratersResult.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get('/admin-all', authMiddleware, async (req, res) => {
    if (req.user.role !== 'System Administrator') return res.status(403).json({ msg: 'Forbidden' });
    try {
        const storesResult = await dbPool.query(`SELECT s.id, s.name, s.address, COALESCE(AVG(r.rating), 0) as average_rating FROM stores s LEFT JOIN ratings r ON s.id = r.store_id GROUP BY s.id ORDER BY s.name ASC`);
        const stores = storesResult.rows.map(store => ({ ...store, average_rating: parseFloat(store.average_rating).toFixed(1) }));
        res.json(stores);
    } catch (err) { console.error(err.message); res.status(500).send('Server Error'); }
});

router.post('/:id/rate', authMiddleware, async (req, res) => {
    const { rating } = req.body;
    const storeId = req.params.id;
    const userId = req.user.id;
    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) return res.status(400).json({ msg: 'Rating must be a number between 1 and 5.' });
    try {
        const newRating = await dbPool.query(`INSERT INTO ratings (user_id, store_id, rating) VALUES ($1, $2, $3) ON CONFLICT (user_id, store_id) DO UPDATE SET rating = EXCLUDED.rating RETURNING *`, [userId, storeId, rating]);
        res.status(201).json(newRating.rows[0]);
    } catch (err) { console.error(err.message); res.status(500).send('Server Error'); }
});

router.post('/', authMiddleware, async (req, res) => {
    if (req.user.role !== 'System Administrator') return res.status(403).json({ msg: 'Forbidden' });
    const { name, address } = req.body;
    if (!name || !address) return res.status(400).json({ msg: 'Please provide both a name and an address.' });
    try {
        const newStore = await dbPool.query("INSERT INTO stores (name, address) VALUES ($1, $2) RETURNING *", [name, address]);
        res.status(201).json(newStore.rows[0]);
    } catch (err) { console.error(err.message); res.status(500).send('Server Error'); }
});

module.exports = router;