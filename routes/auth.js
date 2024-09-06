import express from 'express';
import { check, validationResult } from 'express-validator'; // valodationResult not used
import authController from '../controllers/authController.js';
const router = express.Router();

// Register route
router.post(
  '/register',
  [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  authController.register
);

// Login route
router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  authController.login
);

export default router;
