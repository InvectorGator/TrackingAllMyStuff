import sqlite3 from "sqlite3";
import { MyStuffDatabaseAdapterInterface } from "../interfaces/myStuffDatabaseAdapterInterface.js";
import { codeToQueryParams } from "../dbUtilities.js";

/**
 * Database adapter for an embedded Sqlite3 database.
 */
class SQLite3MyStuffDatabaseAdapter implements MyStuffDatabaseAdapterInterface {
    private _db: sqlite3.Database | null = null;
    private _dbPath: string;

    /**
     * Constructs the Sqlite3 database using the provided databasePath.
     * @param databasePath Path of the embedded Sqlite3 database, including the database name. Example: 'MySqliteDatabase.db'
     */
    constructor(databasePath: string) {
        this._dbPath = databasePath;
    }

    /**
     * Attempts to connect to the embedded Sqlite3 database.
     * @returns 
     */
    async connect(): Promise<void> {
        // TODO: Consider implementing and calling a DB connection check here / as a separate function.
        return new Promise((resolve, reject) => {
            this._db = new sqlite3.Database(this._dbPath, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Closes an open Sqlite3 database connection.
     * @returns 
     */
    async close(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (this._db == null) {
                // TODO: Replace this check with type guarded isDBConnected check.
                reject("Not connected to the database; no connection close.");
            } else {
                this._db.close((error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            }
        });
    }
    
    /**
     * Fetches all database rows matching the provided criteria.
     * TODO: Query parameters to be implemented
     * @param createDBModel Factory method to implement a new DBModel.
     * @param tableName Name of the database table corresponding to the DBModel.
     * @returns A collection of database rows as an array of DBModel type.
     */
    async getRows<DBModel>(createDBModel: () => DBModel, tableName: string): Promise<DBModel[]> {
        // TODO: Add a query clause list parameter for refining search criteria.
        return new Promise((resolve, reject) => {
            // TODO: Replace this check with a proper database connection check.
            if (this._db !== null) {
                // Fetch parameters for the given model.
                let paramList = codeToQueryParams<DBModel>(createDBModel);

                // Build a SQLite3-specific selection statement from the parameters.
                let selectStatement = "SELECT " + paramList.join(", ");

                let queryParams: string[] = []; // TODO: Query params to be added.
                selectStatement = selectStatement + " FROM " + tableName;

                this._db.all(selectStatement, queryParams, (error, rows) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(<DBModel[]>rows);
                    }
                });
            }
        });
    }
}

export default SQLite3MyStuffDatabaseAdapter;