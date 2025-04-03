require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('./models/Property');

// Sample properties data
const sampleProperties = [
  {
    title: 'Luxury Villa in Green Park',
    location: 'Green Park',
    city: 'Delhi',
    society: 'Emerald Heights',
    area: 2500,
    price: 12000000,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Modern Apartment in Downtown',
    location: 'Connaught Place',
    city: 'Delhi',
    society: 'Metro Apartments',
    area: 1200,
    price: 8500000,
    rating: 4.2,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Spacious 3BHK with Garden',
    location: 'Electronic City',
    city: 'Bangalore',
    society: 'Green Valley',
    area: 1800,
    price: 9500000,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Beachside Villa',
    location: 'Juhu',
    city: 'Mumbai',
    society: 'Ocean View',
    area: 3000,
    price: 25000000,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Budget Apartment',
    location: 'Whitefield',
    city: 'Bangalore',
    society: 'Sai Residency',
    area: 900,
    price: 3500000,
    rating: 3.8,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  }
];

// Connect to MongoDB and seed data
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Delete existing properties
    await Property.deleteMany({});
    console.log('Cleared existing properties');

    // Insert sample properties
    await Property.insertMany(sampleProperties);
    console.log('✅ Sample properties added successfully');

    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
};

// Run the seed function
seedData(); 