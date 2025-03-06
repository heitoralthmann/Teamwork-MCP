require('dotenv').config();
const express = require('express');
const logger = require('./utils/logger');
const teamworkRoutes = require('./routes/teamwork');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/teamwork', teamworkRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app; // For testing purposes