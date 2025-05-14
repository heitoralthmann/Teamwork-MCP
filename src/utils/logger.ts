import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Ensure logs directory exists - TEST WITH ABSOLUTE PATH
const logsDir = '/tmp/teamwork-mcp-logs'; // Using a fixed absolute path
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Define file log format
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Create logger instance - only log to files, never to console
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: fileFormat,
  defaultMeta: { service: 'teamwork-mcp' },
  transports: [
    // Write all logs with level 'error' and below to error.log
    new winston.transports.File({ filename: path.join(logsDir, 'error.log'), level: 'error' }), // Adjusted path
    // Write all logs with level 'info' and below to combined.log
    new winston.transports.File({ filename: path.join(logsDir, 'combined.log') }) // Adjusted path
  ]
});

export default logger;
