/**
 * This script prepares a database for use by the TrackingAllMyStuff application.
 */

import MyStuffDatabaseFactory from "./factories/myStuffDatabaseFactory.js";
import { MyStuffDatabaseAdapterInterface } from "./interfaces/myStuffDatabaseAdapterInterface.js";

// Fetch desired database settings from the environment variables, or use defaults if not set.
const DB_PATH = process.env.DB_PATH || "MyStuffDatabase.db";
const DB_TYPE =  process.env.DB_TYPE || "sqlite3";
const DEFAULT_RETRIES: number = Number(process.env.DEFAULT_RETRIES) || 3;

// Create a variable to hold the database adapter.
let databaseAdapter: MyStuffDatabaseAdapterInterface;


/**
 * Attempts to initialize a new database adapter for use by the TrackingAllMyStuff application.
 */
async function initializeDatabase() {
    try {
        databaseAdapter = await MyStuffDatabaseFactory.createDatabaseAdapter(DB_TYPE, DB_PATH);
        databaseAdapter.connect();
        // TODO: Database creation / schema checks should be called here from the respective DBAdapater.

    } catch (error) {
        // TODO: Improve error handling; add logs here, elsewhere.
        console.error("Failed to initialize the database: ", error);
       throw error;
    }
}

/**
 * Attempts to execute the given query against the application's current database adapter.
 * @param query Query to execute, in the form of a function in the MyDatabaseInterface.
 * @param queryName Name of the query - logging purposes only.
 * @param maxRetries Maximum number of times to retry a failed query.
 * @returns 
 */
async function runQuery(query: Function, queryName: string, maxRetries: number = DEFAULT_RETRIES) {
    // TODO: Examine stricter typing for query - subset of MyStuffDatabaseInterface functions.
    // TODO: Double check the error handling here; improve and implement logging.
    try {
        // If this is the first call to the database, we need to initialize it.
        if (databaseAdapter === undefined) { 
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

export { databaseAdapter, initializeDatabase, runQuery }