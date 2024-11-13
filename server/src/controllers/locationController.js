/**
 * Controller for Location data.
 * TODO: This is a proof-of-concept controller and will be replaced.
 */

import myStuffDB from "../database/database.js";

export const getAllLocations = (request, response) => {
    myStuffDB.all('SELECT * FROM Locations', (error, rows) => {
        if (error) {
            response.status(500).json({ error: 'Database error' });
        } else {
            response.status(200).json(rows);
        }
    });
};

export const createLocation = (request, response) => {
    const { name } = request.body;
    myStuffDB.run('INSERT INTO Locations (name) VALUES (?)', [name], function(error) {
        if (error) {
            response.status(500).json({ error: 'Database error' });
        } else {
            response.status(201).json({ id: this.lastID });
        }
    });
};