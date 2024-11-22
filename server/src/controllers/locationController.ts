

import { databaseAdapter, runQuery } from "../database/database.js";
import { createEmptyLocationModel, LocationModel } from "../models/locationModel.js";
import { Request, Response } from 'express';

// TODO: This is a test controller and will be heavily modified.

/**
 * Fetches a list of all locations from the database.
 * @param request Express Request details, if any.
 * @param response Express Response containing the fetched locations, if successful.
 */
async function getAllLocations(request: Request, response: Response) {
    const rows = await runQuery(async() => databaseAdapter.getRows<LocationModel>(createEmptyLocationModel, "Locations"), "getAllLocations");
    response.status(200).json(rows);
};

export { getAllLocations }