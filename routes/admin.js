const express = require('express');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');
const router = express.Router();

// Admin dashboard route
router.get('/dashboard', verifyToken, checkRole('admin'), adminController.getDashboard);

module.exports = router;
