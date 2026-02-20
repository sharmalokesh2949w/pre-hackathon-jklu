require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('EduPath AI API is running...');
});

// Database connection
const connectDB = async () => {
  try {
    // Note: If URI is the placeholder, we warn but don't crash for demo
    if (process.env.MONGODB_URI.includes('example.mongodb.net')) {
      console.warn('WARNING: Using placeholder MongoDB URI. Please update .env file.');
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Database connection error:', err.message);
    // Exit if real connection fails in production
    // process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
