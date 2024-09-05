const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();


// User registration route
router.post('/register', async (req, res) => {
    const { username, email, password} = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ Message: 'User already exists' });
        }

    // create new user
    user = new User ( {
        username,
        email,
        password
    });        
   await user.save();
   res.status(200).json({ message: 'User registered successfully' }); 

} catch(error) {
    res.status(500).json({ message: 'Server error' });
}
});


// User login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' })
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({  message: 'Invalid password' })
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id, role: user.role}, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token })
    } catch(error) {
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;