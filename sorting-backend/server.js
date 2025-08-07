// Load environment variables first!
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import sessionRoutes from './routes/sessions.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Check for JWT_SECRET
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing in your environment variables");
  process.exit(1); // stop the server if critical env variable is missing
} else {
  console.log("✅ JWT_SECRET loaded successfully");
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
