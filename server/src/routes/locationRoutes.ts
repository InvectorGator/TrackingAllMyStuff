import express from 'express';
import { asyncWrapper } from '../utilities/expressUtilities.js';
import { getAllLocations } from '../controllers/locationController.js';

/**
 * Router for Location data api calls.
 */
const locationsRouter = express.Router();

locationsRouter.get('/locations', asyncWrapper(getAllLocations));

export default locationsRouter;