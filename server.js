const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Ensure dotenv is configured at the top
require('dotenv').config();

// Improved error handling and logging
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));

// static files
app.use(express.static(path.join(__dirname, './client/build')));

// routes
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/doctor', require('./routes/doctorRoutes'));

// API health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running'
    });
});

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// React routing handler
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// port
const port = process.env.PORT || 8080;

// Start server with error handling
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(
                `Server Running in ${process.env.NODE_ENV} Mode on port ${port}`
                .bgCyan.white
            );
            console.log(
                `MongoDB Connected: ${process.env.MONGODB_URL}`
                .bgGreen.white
            );
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();