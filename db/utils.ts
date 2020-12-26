import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('db.test');

// query
const DROP_TABLE = 'drop table if exists boards';
const CREATE_TABLE_SQL =
  /**
   * 1. id
   2. title
   3. calorie
   4. created_date
   5. date
   6. type (morning, lunch, dinner )
   7. image
   */
  'CREATE TABLE IF NOT EXISTS boards (id integer primary key autoincrement, title varchar, calorie int, created_date timestamp, date int, type varchar, image varchar);';

// function
export const initDatabase = () => {
  db.transaction((tx) => {
    // tx.executeSql(DROP_TABLE);
    tx.executeSql(CREATE_TABLE_SQL);
  });
};
