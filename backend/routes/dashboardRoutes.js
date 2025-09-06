const express = require('express');
const router = express.Router();
const dbPool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// Dashbord stats for System Administrator
router.get('/stats', authMiddleware, async (req, res) => {
  // Check for Admin role
  if (req.user.role !== 'System Administrator') {
    return res.status(403).json({ msg: 'Forbidden: Access is denied.' });
  }
  try {
    // queries
    const userCountPromise = dbPool.query("SELECT COUNT(*) FROM users");
    const storeCountPromise = dbPool.query("SELECT COUNT(*) FROM stores");
    const ratingCountPromise = dbPool.query("SELECT COUNT(*) FROM ratings");

    
    const [userCount, storeCount, ratingCount] = await Promise.all([
        userCountPromise,
        storeCountPromise,
        ratingCountPromise,
    ]);

    // sending final counts as a json object
    res.json({
      totalUsers: parseInt(userCount.rows[0].count),
      totalStores: parseInt(storeCount.rows[0].count),
      totalRatings: parseInt(ratingCount.rows[0].count)
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;