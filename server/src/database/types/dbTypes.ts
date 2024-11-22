import SQLite3MyStuffDatabaseAdapter from "../adapters/sqlite3MyStuffDatabaseAdapter.js";

/**
 * Represents a supported database type.
 * Must have a corresponding database adapter.
 */
export enum DatabaseType {
    Sqlite3 = "SQLITE3"
}

/**
 * Represents an adapter for a supported database type.
 */
export type DatabaseAdapter = SQLite3MyStuffDatabaseAdapter;

/**
 * Record of supported database types and their corresponding adapters.
 */
export const DatabaseAdapterTypes: Record<DatabaseType, new (databasePath: string) => DatabaseAdapter> = {
    [DatabaseType.Sqlite3]: SQLite3MyStuffDatabaseAdapter
};
