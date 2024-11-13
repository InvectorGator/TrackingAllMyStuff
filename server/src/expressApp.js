import express from 'express';
import dotenv from 'dotenv';
import locationRoutes from './routes/locationRoutes.js';
import { createLocationsTable } from './models/locationModel.js';

dotenv.config();

// Create and configure an Express object.
const expressApp = express();
expressApp.use(express.json());

// Create any tables needed.
// TODO: Table creation to be moved.
createLocationsTable();

expressApp.use('/api', locationRoutes);

export default expressApp;