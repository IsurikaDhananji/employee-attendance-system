const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Global Middlewares
app.use(helmet()); // Security headers
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined')); // Logging only in development
}
app.use(express.json({ limit: '10kb' })); // Body parser
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // URL encoded parser

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Import and use routes only after middlewares are set up
try {
  const authRoutes = require('./routes/authRoutes');
  const attendanceRoutes = require('./routes/attendanceRoutes');
  
  // Routes
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/attendance', attendanceRoutes);
} catch (error) {
  console.error('Error loading routes:', error.message);
  // Continue without routes for debugging
}

// Handle undefined routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  const { statusCode = 500 } = err;
  
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;