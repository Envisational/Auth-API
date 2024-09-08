import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to DB
await connectDB();

app.use(express.json()); // Parse incoming JSON requests

// Apply rate limiting globally
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,  // Limit each IP to 100 requests per window (15 minutes)
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(limiter);  // Apply the rate limiter to all requests

// Use the auth routes
app.use('/auth', authRoutes);

// Use the admin routes
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; // FOR TESTS