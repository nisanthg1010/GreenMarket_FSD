const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); 
const path = require('path');
const connectDatabase = require('./config/connectDatabase'); // Load database connection

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const authRoutes = require('./routes/auth'); // Authentication routes
const productRoutes = require('./routes/product'); // Product routes
const orderRoutes = require('./routes/order'); // Order routes

const app = express();

// Connect to database
connectDatabase();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If you are using cookies or sessions
}));

// Middleware for parsing JSON
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes); // Auth-related routes
app.use('/api/v1', productRoutes); // Product-related routes
app.use('/api/v1', orderRoutes); // Order-related routes

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
