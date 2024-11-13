/**
 * Model file for Locations.
 * TODO: This is a proof-of-concept file and will be moved / replaced.
 */


import myStuffDB from "../database/database.js";

// Creat a new table if one does not already exist.
export const createLocationsTable = () => {
    myStuffDB.run(`
        CREATE TABLE IF NOT EXISTS Locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
        );
        `, (error) => {
            if (error) {
                console.error('Error creating the Locations table: ', error);
            } else {
                console.log('Locations table created or already exists.');
            }
        });
};