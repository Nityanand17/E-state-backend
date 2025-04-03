const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  userEmail: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  userPhone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  propertyId: {
    type: String,
    required: [true, 'Property ID is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema); 