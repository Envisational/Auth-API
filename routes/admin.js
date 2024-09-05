const express = require('express');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const router = express.Router();


router.get('/dashboard', verifyToken, checkRole('admin'), async (req, res) => {
    res.json({ message: 'Welcome to the dashboard' });
});

module.exports = router;