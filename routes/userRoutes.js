const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// POST: Create a new user
router.post('/users', [
    check('username').isLength({ min: 4 }).withMessage('Username must be at least 4 characters'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('city').matches(/^[A-Za-z\s]+$/).withMessage('City can only contain letters and spaces'),
    check('website').isURL().withMessage('Invalid website URL'),
    check('zip_code').matches(/^\d{5}-\d{4}$/).withMessage('Zip code format must be 12345-1234'),
    check('phone').matches(/^1-\d{3}-\d{3}-\d{4}$/).withMessage('Phone number must be in the format 1-123-123-1234')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET: Retrieve all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE: Delete a user by ID
router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT: Update a user by ID
router.put('/users/:id', [
    check('username').optional().isLength({ min: 4 }).withMessage('Username must be at least 4 characters'),
    check('email').optional().isEmail().withMessage('Invalid email format'),
    check('city').optional().matches(/^[A-Za-z\s]+$/).withMessage('City can only contain letters and spaces'),
    check('website').optional().isURL().withMessage('Invalid website URL'),
    check('zip_code').optional().matches(/^\d{5}-\d{4}$/).withMessage('Zip code format must be 12345-1234'),
    check('phone').optional().matches(/^1-\d{3}-\d{3}-\d{4}$/).withMessage('Phone number must be in the format 1-123-123-1234')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.params.id;
        const updates = req.body;

        const user = await User.findByIdAndUpdate(userId, updates, {
            new: true, // Güncellenmiş kullanıcıyı döndürür
            runValidators: true // Doğrulamaları tekrar çalıştırır
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
