const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  feedbackMessage: {
    type: String,
    required: [true, 'Feedback message is required'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', FeedbackSchema); 