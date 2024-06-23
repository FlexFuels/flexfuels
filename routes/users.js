const express = require('express');
const router = express.Router();
const db = require('../db'); // Ensure the path is correct

// Get all users
router.get('/users', (req, res) => {
    const sql = 'SELECT * FROM Users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Get user by ID
router.get('/users/:id', (req, res) => {
    const sql = `SELECT * FROM Users WHERE UserID = ?`;
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Add user
router.post('/users', (req, res) => {
    const user = req.body;
    const sql = 'INSERT INTO Users SET ?';
    db.query(sql, user, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Other CRUD operations

module.exports = router;
