import express from 'express';
import dotenv from 'dotenv';
import locationRoutes from './routes/locationRoutes.js';

dotenv.config();

// Create and configure an Express object.
/**
 * ExpressJS object to handle API calls.
 */
const expressApp = express();
expressApp.use(express.json());

// TODO: TESTING - log all requests to the console; debugging purposes only.
expressApp.use((request, response, next) => {
    console.log(`Request: ${request.method} ${request.url}`);
    next();
});

// TODO: TESTING - Log all responses; debugging purposes only.
expressApp.use((request, response, next) => {
    response.on('finish', () => {
        console.log(`Response: ${response.statusCode} ${response.statusMessage}`);
    });
    next();
});

expressApp.use('/api', locationRoutes);

export default expressApp;