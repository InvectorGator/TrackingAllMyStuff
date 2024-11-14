import SQLite3MyStuffDatabase from "../adapters/sqlite3MyStuffDatabaseAdapter.js";

/**
 * Factory for the MyStuffDatabase.
 */
class MyStuffDatabaseFactory {

    /** 
     * @typedef {('sqlite3')} DatabaseType 
     * */

    /**
     * @param {DatabaseType} databaseType - The type of the database.
     * @param {string} databasePath - The name or path of the database.
     * @returns {DatabaseTypeAdapter} A connected database adapter of the given type.
     */
    static async createDatabaseAdapter(databaseType, databasePath) {
        switch(databaseType) {
            case 'sqlite3': {
                    const dbAdapter = new SQLite3MyStuffDatabase(databasePath);
                    await dbAdapter.connect();
                    return dbAdapter;
                }
            default:
                throw new Error("Unsupported database type.");
        }
    }
}

export default MyStuffDatabaseFactory