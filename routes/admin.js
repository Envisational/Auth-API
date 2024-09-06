import express from 'express';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';
import adminController from '../controllers/adminController.js';
const router = express.Router();

// Admin dashboard route
router.get('/dashboard', verifyToken, checkRole('admin'), adminController.getDashboard);

export default router;
