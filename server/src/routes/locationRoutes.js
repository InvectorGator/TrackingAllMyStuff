/**
 * Routing file for Locations.
 * TODO: This is a proof-of-concept file and will be moved/replaced.
 */

import express from 'express';
import { getAllLocations, createLocation } from '../controllers/locationController.js';

const locationsRouter = express.Router();

locationsRouter.get('/locations', getAllLocations);
locationsRouter.post('/locations', createLocation);

export default locationsRouter;