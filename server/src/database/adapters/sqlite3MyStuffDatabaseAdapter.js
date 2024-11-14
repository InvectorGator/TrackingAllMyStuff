import sqlite3 from "sqlite3";
import MyStuffDatabase from "../interfaces/myStuffDatabaseInterface";

class SQLite3MyStuffDatabase extends MyStuffDatabase {
    constructor(databasePath) {
        super();
        this.dbPath = databasePath;
        this.db = null;
    }

    // TODO: JSDocs for this file.

    async connect() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    async close() {
        return new Promise((resolve, reject) => {
            this.db.close((error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    async getRows(query, params) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (error, rows) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // TODO: This is a proof-of-concept function and will be heavily modified.
    async insert(tableName, values) {
        // TODO: Modify this further. Move SQL elsewhere, iterate params to build query.
        return new Promise((resolve, reject) => {
            // TODO: HARDCODED PROOF OF CONCEPT FOR LOCATIONS! Remove, revise - iterate params.
            this.db.run(`INSERT INTO ${tableName} (name) VALUES (?)`, values, function(error) {
                if (error) {
                    reject(error);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    /* TODO: Modify and add back in the following...
// Promise wrapper for serializing database calls.
export function serializeOperations(database, operations) {
    return new Promise((resolve, reject) => {
        database.serialize(() => {
            try { 
                operations().then(resolve).catch(reject);
            } catch (error) {
                reject(error);
            }
        })
    })
}

// Promise wrapper for fetching a single record from the database.
export function get(database, query, params = []) {
    return new Promise((resolve, reject) => {
        database.get(query, params, (error, row) => {
            if (error) {
                reject(error);
            } else {
                resolve(row);
            }
        });
    });
}

// Promise wrapper for fetching one record at a time from the database.
export function getEeach(database, query, params = [], rowCallback) {
    return new Promise((resolve, reject) => {
        database.each(query, params, (error, row) => {
            if (error) {
                reject(error);
            } else {
                rowCallback(row);
            }
        }, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}
    */
}

export default SQLite3MyStuffDatabase;