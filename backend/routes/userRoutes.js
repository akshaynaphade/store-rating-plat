const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbPool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // form Validations
    if (name.length < 20 || name.length > 60) return res.status(400).send('Name must be between 20 and 60 characters.');
    if (address && address.length > 400) return res.status(400).send('Address must be a maximum of 400 characters.');
    if (password.length < 8 || password.length > 16) return res.status(400).send('Password must be between 8 and 16 characters.');
    if (!/^(?=.*[A-Z])(?=.*[!@#$&*])/.test(password)) return res.status(400).send('Password must contain at least one uppercase letter and one special character.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).send('Invalid email format.');

    const userExists = await dbPool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) return res.status(400).send("A user with this email already exists.");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await dbPool.query(
      "INSERT INTO users (name, email, password, address) VALUES ($1, $2, $3, $4) RETURNING id, email, role",
      [name, email, hashedPassword, address]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).send("Server Error");
  }
});

// user Login
router.post('/login', async (req, res) => {
   
    try {
        const { email, password } = req.body;
        const userResult = await dbPool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userResult.rows.length === 0) return res.status(400).send("Invalid credentials.");
        const user = userResult.rows[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).send("Invalid credentials.");
        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).send("Server Error");
    }
});

// for updateing password
router.put('/update-password', authMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (newPassword.length < 8 || newPassword.length > 16) return res.status(400).send('New password must be between 8 and 16 characters.');
    if (!/^(?=.*[A-Z])(?=.*[!@#$&*])/.test(newPassword)) return res.status(400).send('New password must contain at least one uppercase letter and one special character.');

    try {
        const userResult = await dbPool.query("SELECT password FROM users WHERE id = $1", [userId]);
        if (userResult.rows.length === 0) return res.status(404).send("User not found.");
        
        const isMatch = await bcrypt.compare(oldPassword, userResult.rows[0].password);
        if (!isMatch) return res.status(400).send("Incorrect old password.");
        
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
        
        await dbPool.query("UPDATE users SET password = $1 WHERE id = $2", [hashedNewPassword, userId]);
        res.send("Password updated successfully.");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// get all user data only for system administrator or admin
router.get('/', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'System Administrator') return res.status(403).json({ msg: 'Forbidden' });
        
        const { filter } = req.query; 
        let query = "SELECT id, name, email, address, role FROM users";
        const queryParams = [];
        
        if (filter) {
            query += " WHERE name ILIKE $1 OR email ILIKE $1";
            queryParams.push(`%${filter}%`);
        }
        
        query += " ORDER BY name ASC";
        
        const allUsers = await dbPool.query(query, queryParams);
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// creating new user form admin dash only
router.post('/create', authMiddleware, async (req, res) => {
    
    try {
        if (req.user.role !== 'System Administrator') return res.status(403).json({ msg: 'Forbidden' });
        const { name, email, password, address, role } = req.body;
        if (!name || !email || !password || !role) return res.status(400).json({ msg: 'Please provide all required fields.' });
        const userExists = await dbPool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) return res.status(400).send("A user with this email already exists.");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await dbPool.query(
            "INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role",
            [name, email, hashedPassword, address, role]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;