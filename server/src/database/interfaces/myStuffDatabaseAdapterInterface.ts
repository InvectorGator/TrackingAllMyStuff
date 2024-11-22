/**
 * Interface defining the expected behaviors of a TrackingAllMyStuff database.
 */
interface MyStuffDatabaseAdapterInterface {
    /**
     * Establishes a connection to the database.
     */
    connect(): Promise<void>;

    /**
     * Closes an open connection to the database.
     */
    close(): Promise<void>;

    /**
     * Fetches rows for a given table and model type into an array of that type.
     * @param createDBModel Factory method for constructing an empty DBModel.
     * @param tableName Name of the table from which to fetch data.
     */
    getRows<DBModel>(createDBModel: () => DBModel, tableName: string): Promise<DBModel[]>;
    // TODO: Instead of tableName param, separate models/entities and consider duo type cast.


    // TODO: Generalized methods for upserts, deletions, getEach, etc.
}

/**
 * Defines expected constructor parameters for the MyStuffDatabaseAdapterInterface.
 */
interface MyStuffDatabaseAdapterConstructor {
    new (dbPath: string): MyStuffDatabaseAdapterInterface;
}

/**
 * Creates a new database adapter 
 * @param ctor Constructor for the specific implementation of the MyStuffDatabaseAdapterInterface.
 * @param dbPath Stringified path to the database.
 * @returns An implemented database adapter using the provided constructor and database path.
 */
function createMyStuffDatabaseAdapter(
    ctor: MyStuffDatabaseAdapterConstructor,
    dbPath: string
): MyStuffDatabaseAdapterInterface {
    return new ctor(dbPath);
}


export {MyStuffDatabaseAdapterInterface, createMyStuffDatabaseAdapter};