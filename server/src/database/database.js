/**
 * This script prepares a SQLite database for the WhereIsMyStuff server to use.
 */

// TODO: JSDocs for this page.

import MyStuffDatabaseFactory from "./factories/myStuffDatabaseFactory.js";

// TODO: Grab these from environment variables if set.
const DB_PATH = "MyStuffDatabase.db";
const DB_TYPE =  "sqlite3";
const DEFAULT_RETRIES = 3;

let _dbConnection;

async function initializeDatabase() {
    try {
        _dbConnection = await MyStuffDatabaseFactory.createDatabaseAdapter(DB_TYPE, DB_PATH);
        _dbConnection.connect();
        // TODO: Database creation / schema checks should go here.

    } catch (error) {
        // TODO: Improve error handling; add logs here, elsewhere.
        console.error("Failed to initialize the database: ", error);
       throw error;
    }
}


async function runQuery(query, queryName, maxRetries = DEFAULT_RETRIES) {
    // TODO: Double check the error handling here; it can definitely be improved.
    // TODO: Actually, the whole project could probably use a better logging system for all console.errors().
    try {
        // If this is the first call to the database, we need to initialize it.
        if (_dbConnection === undefined) { 
            console.log('The database is not initialized. Initializing now...');
            await initializeDatabase();
        }
    } catch (error) {
        console.error("Query execution failed with database error: ", error);
        return;
    }

    // Attempt to execute the database operation up to the maximum specified retries.
    let attempts = 0;
    while (attempts <= maxRetries) {
        try {
            // Run the provided database query.
            return await query();
        } catch (error) {
            console.error("Database error: ", error);
            if (attempts < maxRetries - 1) {
                // Attempt to re-establish the database connection and try the operation again.
                console.log(`Retrying database operation ${ queryName }- ${ attempts + 1 } of ${ maxRetries }`);
                await initializeDatabase();
            } else {
                throw error;
            }
            attempts++;
        }
    }
}

export { _dbConnection, initializeDatabase, runQuery }


// TODO: Make sure the DB connection is closed on process end!