import express from 'express';
import { asyncWrapper } from '../utilities/expressUtilities.js';
import { getAllLocations, createLocation } from '../controllers/locationController.js';

/**
 * Router for Location data api calls.
 */
const locationsRouter = express.Router();

locationsRouter.get('/locations', asyncWrapper(getAllLocations));
locationsRouter.post('/locations', asyncWrapper(createLocation));

export default locationsRouter;