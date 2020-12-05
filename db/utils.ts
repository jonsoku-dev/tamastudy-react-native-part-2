import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('db.testDb');

// query
const CREATE_TABLE_SQL =
  'CREATE TABLE IF NOT EXISTS boards (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, image TEXT, title TEXT, calorie INT, createdAt INT, date INT);';

// function
export const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(CREATE_TABLE_SQL);
  });
};
