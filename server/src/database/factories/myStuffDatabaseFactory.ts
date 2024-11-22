import { createMyStuffDatabaseAdapter } from "../interfaces/myStuffDatabaseAdapterInterface.js";
import { DatabaseAdapterTypes, DatabaseType } from "../types/dbTypes.js";


/**
 * Factory to create or connect to a MyStuffDatabase.
 */
class MyStuffDatabaseFactory {
    /**
     * @param {string} databaseType - The type of the database.
     * @param {string} databasePath - The name or path of the database.
     * @returns {DatabaseAdapter} A new database adapter of the given type.
     */
    static async createDatabaseAdapter(databaseType: string, databasePath: string) {
        switch(databaseType.toUpperCase()) {
            case DatabaseType.Sqlite3: {
                    const dbAdapter = createMyStuffDatabaseAdapter(DatabaseAdapterTypes[DatabaseType.Sqlite3], databasePath);
                    return dbAdapter;
                }
            default:
                throw new Error("Unsupported database type.");
        }
    } 
}

export default MyStuffDatabaseFactory