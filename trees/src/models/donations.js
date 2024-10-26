// models/Donation.js
import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please specify the donation amount'],
    min: [1, 'Donation amount must be at least 1'],
  },
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot be more than 500 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Donation || mongoose.model('Donation', DonationSchema);