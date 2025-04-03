const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Booking = require('./models/Booking');
const Feedback = require('./models/Feedback');
const Property = require('./models/Property');

// Import middleware
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: ['https://e-state-app-two.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Register route
app.post('/register', async (req, res) => {
  try {
    const { EmailID, Password } = req.body;

    if (!EmailID || !Password) {
      return res.status(400).json({ message: 'Missing Email or Password' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: EmailID });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Create new user
    const user = new User({
      email: EmailID,
      password: Password,
      role: 'user'
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({ 
      message: 'User registered successfully',
      token 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ Login route
app.post('/login', async (req, res) => {
  try {
    const { EmailID, Password } = req.body;

    if (!EmailID || !Password) {
      return res.status(400).json({ message: 'Missing Email or Password' });
    }

    // Find user by email
    const user = await User.findOne({ email: EmailID });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(Password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({ 
      success: true, 
      user: {
        _id: user._id,
        email: user.email,
        role: user.role
      },
      token 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ Property Booking route (Protected)
app.post('/api/book', auth, async (req, res) => {
  try {
    const { name, phone, email, propertyId } = req.body;

    if (!name || !phone || !email || !propertyId) {
      return res.status(400).json({ message: 'Missing fields in booking request' });
    }

    const booking = new Booking({
      userName: name,
      userEmail: email,
      userPhone: phone,
      propertyId
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful' });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
});

// ✅ API Route: Submit feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const { feedback_message, rating } = req.body;
    
    if (!feedback_message || !rating) {
      return res.status(400).json({ message: '⚠️ Feedback and rating are required' });
    }

    const feedback = new Feedback({
      feedbackMessage: feedback_message,
      rating
    });

    await feedback.save();
    res.status(201).json({ message: '✅ Feedback submitted successfully!' });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ message: '⚠️ Server error', error: error.message });
  }
});

// ✅ Get all feedbacks
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Fetch feedback error:', error);
    res.status(500).json({ message: 'Failed to fetch feedbacks' });
  }
});

// ✅ Get all properties
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
});

// ✅ Get property by ID
app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ message: 'Failed to fetch property' });
  }
});

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Server is running with MongoDB Atlas...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
