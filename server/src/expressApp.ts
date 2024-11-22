import express from 'express';
import locationRoutes from './routes/locationRoutes.js';

/**
 * ExpressJS object to handle API calls.
 */
const expressApp = express();

// Configure Express to automatically parse JSON.
expressApp.use(express.json());

// TODO: TESTING - log all requests to the console; debugging purposes only.
expressApp.use((request, response, next) => {
    console.log(`Request: ${request.method} ${request.url}`);
    next();
});

// TODO: TESTING - Log all responses to the console; debugging purposes only.
expressApp.use((request, response, next) => {
    response.on('finish', () => {
        console.log(`Response: ${response.statusCode} ${response.statusMessage}`);
    });
    next();
});

// Configure Express API routing for the WhereIsMyStuff application.
expressApp.use('/api', locationRoutes);

export default expressApp;