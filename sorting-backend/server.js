// Load environment variables first
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import sessionRoutes from './routes/sessions.js';

const app = express();

/* =====================
   MIDDLEWARE (ORDER MATTERS)
===================== */
app.use(cors({
  origin: 'https://dsa-visualizer-eta.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

/* =====================
   ENV CHECK
===================== */
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is missing');
  process.exit(1);
} else {
  console.log('✅ JWT_SECRET loaded successfully');
}

/* =====================
   ROUTES
===================== */
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

// Health check (VERY IMPORTANT for Render & debugging)
app.get('/', (req, res) => {
  res.send('Backend is running');
});

/* =====================
   DATABASE + SERVER
===================== */
const PORT = process.env.PORT; // 🔴 do NOT fallback to 5000 on Render

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
