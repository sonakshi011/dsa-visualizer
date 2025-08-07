import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  algorithm: String,
  input: [Number],
  sorted: [Number],
  steps: Number,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Session', sessionSchema);
