const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', userRoutes);

// Start Server
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
