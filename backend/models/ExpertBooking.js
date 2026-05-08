const mongoose = require('mongoose');

const expertBookingSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookingType: {
    type: String,
    enum: ['audio', 'video', 'chat'],
    required: true,
  },
  bookingDate: {
    type: Date,
    required: [true, 'Please add a booking date'],
  },
  bookingTime: {
    type: String,
    default: '',
  },
  duration: {
    type: Number, // in minutes
    default: 30,
  },
  topic: {
    type: String,
    default: '',
  },
  notes: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'free'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ExpertBooking', expertBookingSchema);
