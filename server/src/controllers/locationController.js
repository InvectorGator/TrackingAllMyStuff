/**
 * Controller for Location data.
 * TODO: This is a proof-of-concept controller and will be heavily modified.
 */

// TODO: JSDocs for this page.

import { _dbConnection, runQuery } from "../database/database.js";

async function getAllLocations(request, response) {
    // TODO: Revise this to further move SQL into the DB layer and out of the controller.
        const rows = await runQuery(async() => _dbConnection.getRows("SELECT * FROM Locations", []), "getAllLocations");
        response.status(200).json(rows);
};

async function createLocation(request, response) {
    // TODO: Revise this with shiny, shiny models and more factories!
    const { name } = request.body;
    const newRowId = await runQuery(async() => _dbConnection.insert("Locations", [name]), "createLocation", 0);
    response.status(200).json({ newLocationId: newRowId });
}

export { getAllLocations, createLocation }