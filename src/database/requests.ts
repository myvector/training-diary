/// Select
export const SELECT_ALL_SHEME = 'SELECT * FROM sheme';
export const SELECT_ALL_TRAINING_DAY = 'SELECT * FROM trainingDay';
export const SELECT_ALL_EXERCISE = 'SELECT * FROM exercise';
export const SELECT_SHEME_ID_IN_IDCASE = `SELECT * FROM 'idCase' WHERE "shemeId" = ?`;
export const SELECT_TRAINING_DAY_ID_IN_IDCASE = `SELECT * FROM 'idCase' WHERE "trainingDayId" = ?`;
export const SELECT_EXERCISE_ID_IN_IDCASE = `SELECT * FROM 'idCase' WHERE "exerciseId" = ?`; // похожие запросы
export const SELECT__ID_APPROACH_HISTORY_LAST_EXERCISE = `SELECT * FROM  'approach' WHERE "id" = ?`;
export const SELECT__ID_FOR_MAPID = `SELECT * FROM  'idCase' WHERE "shemeId" = ? AND 
  "trainingDayId" = ? AND 
  "exerciseId" = ?  ORDER BY "approachId" DESC LIMIT 1`;
export const SELECT_ALL_TRAINING_DAY_ID = `SELECT * FROM 'trainingDay' WHERE "id" = ?`;
export const SELECT_ALL_EXERCISE_PARRENT_ID = `SELECT * FROM 'exercise' WHERE "parrentId" = ?`;

/// Insert
export const ADD_SHEME = `INSERT INTO sheme (name) VALUES (?)`;
export const ADD_TRAINING_DAY_DATA = `INSERT INTO trainingDay (name, parrentId) VALUES (?, ?)`;
export const ADD_EXERCISE_DATA = `INSERT INTO exercise (name, amount, parrentId) VALUES (?, ?, ?)`;
export const ADD_IDCASE = `INSERT INTO idCase (shemeId, trainingDayId, exerciseId,  approachId) VALUES (?, ?, ?, ?)`;
export const ADD_APPROACH_DATA = `INSERT INTO approach (approach) VALUES (?)`;

// Delete
export const DELETE_SHEME_DATA = `DELETE FROM sheme WHERE id = ?`;

export const DELETE_TRAINING_DAY_DEPENDENCIES = (playsholder: string) =>
  `DELETE FROM trainingDay WHERE  "id" IN (${playsholder})`;

export const DELETE_EXERCISE_DEPENDENCIES = (playsholder: string) =>
  `DELETE FROM exercise WHERE  "id" IN (${playsholder})`;

export const DELETE_IDCASE_DEPENDENCIES = (playsholder: string) =>
  `DELETE FROM idCase WHERE  "id" IN (${playsholder})`;

export const DELETE_APPROACH_DEPENDENCIES = (playsholder: string) =>
  `DELETE FROM approach WHERE  "id" IN (${playsholder})`;

export const DELETE_APPROACH_ITEM_DATA = `UPDATE approach SET approach = ? WHERE "id" IN (?)`;

// Update
export const UPDATE_SHEME_NAME = `UPDATE sheme SET name = ? WHERE id = ?`;
export const UPDATE_TRAINING_DAY_NAME = `UPDATE trainingDay SET name = ? WHERE id = ?`;
export const CHANGE_EXERCISE_NAME_DATA = `UPDATE exercise SET name = ? WHERE "id" IN (?)`;
export const CHANGE_EXERCISE_AMOUNT_DATA = `UPDATE exercise SET amount = ? WHERE "id" IN (?)`;
