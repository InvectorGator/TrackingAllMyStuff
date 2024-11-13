/**
 * This script prepares a SQLite database for the WhereIsMyStuff server to use.
 */

import sqlite3 from "sqlite3";

const myStuffDB = new sqlite3.Database('MyStuffDatabase.db', (error) => {
    if (error) {
        console.error('Error occurred while connecting to the database: ', error);
    } else {
        console.log('Connected to the database.');
    }
});

export default myStuffDB;