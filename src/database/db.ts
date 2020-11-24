import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('trainingDiary.db', '1.0.0');

export const inintialDB = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'PRAGMA foreign_keys=true',
        [],
        () => {
          resolve();
        },
        (_, error) => {
         
          reject(error);
          return false;
        }
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS sheme (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL)',
        [],
        () => {
          resolve();
        },
        (_, error) => {
         
          reject(error);
          return false;
        }
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS trainingDay (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, parrentId INTEGER, FOREIGN KEY (parrentId) REFERENCES sheme(id) ON DELETE CASCADE );',
        [],
        () => {
          resolve();
        },
        (_, error) => {
         
          reject(error);
          return false;
        }
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS exercise (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, amount INTEGER NOT NULL, parrentId INTEGER, FOREIGN KEY (parrentId) REFERENCES trainingDay(id) ON DELETE CASCADE);',
        [],
        () => {
          resolve();
        },
        (_, error) => {
          
          reject(error);
          return false;
        }
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS approach (id INTEGER PRIMARY KEY NOT NULL, approach TEXT);', 
        [],
        () => {
          resolve();
        },
        (_, error) => {
         
          reject(error);
          return false;
        }
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS idCase (id INTEGER PRIMARY KEY NOT NULL, shemeId INTEGER,  trainingDayId INTEGER, exerciseId INTEGER, approachId INTEGER, FOREIGN KEY (shemeId) REFERENCES sheme(id) ON DELETE CASCADE, FOREIGN KEY (trainingDayId) REFERENCES trainingDay (id) ON DELETE CASCADE,  FOREIGN KEY (exerciseId) REFERENCES exercise (id) ON DELETE CASCADE,  FOREIGN KEY (approachId) REFERENCES approachId (id) ON DELETE CASCADE );',
        [],
        () => {
          resolve();
        },
        (_, error) => {
         
          reject(error);
          return false;
        }
      );
    });
  });
};

export const requestDB = (request: string, array?: any[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        request,
        array || [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
         
          reject(error);
          return false;
        }
      );
    });
  });
};
