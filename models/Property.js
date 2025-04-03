const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  society: {
    type: String,
    required: [true, 'Society is required'],
    trim: true
  },
  area: {
    type: Number,
    required: [true, 'Area is required'],
    min: 0
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 0,
    max: 5,
    default: 0
  },
  imageUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', PropertySchema); 