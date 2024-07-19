const express = require('express');
const router = express.Router();
const db = require('../db');


// POST route to capture donation data
router.post('/donate', (req, res) => {

    const { anonymouslyCaptureValue, donateUserName, donationType, paymentMethod } = req.body;
    
    const query = 'INSERT INTO donate (anonymously_capture_value, donate_user_name, donation_type, payment_method) VALUES (?, ?, ?, ?)';
    db.query(query, [anonymouslyCaptureValue, donateUserName, donationType, paymentMethod], (err, result) => {
        if (err) return res.status(500).send('Internal Server Error');       
        res.status(201).json({message:'Donation captured successfully'});
    });
});

// GET route to retrieve all donation data
router.get('/donate', (req, res) => {
    const query = 'SELECT * FROM donate';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).json(results);
    });
});

// Login
// POST route to login a user
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query the database to find the user by email
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: `Internal Server Error ${err}` });

        // If user not found
        if (results.length === 0)  return res.status(401).json({ error: 'User does not exist' });

        const user = results;

        // Compare the provided password with the hashed password stored in the database
        if(password === user.password)  return res.status(401).json({ error: 'Invalid  password' });

        // If the password is valid
        res.status(200).json({ message: 'Login successful' });
    });
});

module.exports = router
