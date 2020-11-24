import {
  LOAD_SHEME,
  SEND_EXERCISE_RESULT,
  DELETE_SHEME,
  LOAD_HISTORY,
  CLEAR_HISTORY,
  CHANGE_NAME_SHEME,
  CHANGE_TRAINING_DAY_NAME,
  DELETE_TRAINING_DAY,
  ADD_EXERCISE,
  CHANGE_EXERCISE,
  DELETE_EXERCISE,
  ADD_APPROACH,
  DELETE_APPROACH,
  CHANGE_APPROACH_AMOUNT_WEIGHT,
} from '../../types';
import {
  SELECT_ALL_SHEME,
  SELECT_ALL_TRAINING_DAY,
  SELECT_ALL_EXERCISE,
  SELECT_SHEME_ID_IN_IDCASE,
  DELETE_TRAINING_DAY_DEPENDENCIES,
  DELETE_APPROACH_DEPENDENCIES,
  DELETE_EXERCISE_DEPENDENCIES,
  DELETE_IDCASE_DEPENDENCIES,
  DELETE_SHEME_DATA,
  ADD_APPROACH_DATA,
  ADD_IDCASE,
  SELECT__ID_FOR_MAPID,
  SELECT__ID_APPROACH_HISTORY_LAST_EXERCISE,
  UPDATE_SHEME_NAME,
  SELECT_TRAINING_DAY_ID_IN_IDCASE,
  CHANGE_EXERCISE_NAME_DATA,
  CHANGE_EXERCISE_AMOUNT_DATA,
  ADD_EXERCISE_DATA,
  SELECT_EXERCISE_ID_IN_IDCASE,
  DELETE_APPROACH_ITEM_DATA,
  UPDATE_TRAINING_DAY_NAME,
} from '../../../database/requests';
import { requestDB } from '../../../database/db';

const takeObjData = (parrentArray: any, thisArray: any) => {
  let dataObj: any = {};

  for (let i = 0; i < parrentArray.length; i++) {
    dataObj[parrentArray[i].id] = {
      id: parrentArray[i].id,
      list: thisArray.filter((el: { parrentId: string }) => {
        return el.parrentId == parrentArray[i].id;
      }),
    };
  }
  return dataObj;
};

export const loadSheme = () => async (dispatch: ({}) => void) => {
  try {
    const shemeData = await requestDB(SELECT_ALL_SHEME);

    if (shemeData.rows._array.length) {
      const trainingDayTmp = await requestDB(SELECT_ALL_TRAINING_DAY);
      const exerciseTmp = await requestDB(SELECT_ALL_EXERCISE);
      const trainingDay: any = takeObjData(
        shemeData.rows._array,
        trainingDayTmp.rows._array
      );
      const exercise: any = takeObjData(
        trainingDayTmp.rows._array,
        exerciseTmp.rows._array
      );

      dispatch({
        type: LOAD_SHEME,
        shemeLoad: shemeData.rows._array,
        trainingDayLoad: trainingDay,
        exerciseLoad: exercise,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const uniqId = (array: any, keyObjTake: string) => {
  let j = 0;
  let memberObj: { [key: string]: string | number } = {};
  let finalArray = [];
  let playsHolder = '';

  for (let i = 0; i < array.length; i++) {
    let element = array[i][keyObjTake];
    if (memberObj[element] !== 1) {
      memberObj[element] = 1;
      finalArray[j++] = element;
      playsHolder = playsHolder.concat(',?');
    }
  }

  return [finalArray, playsHolder.slice(1)];
};

export const deleteSheme = (id: number) => async (dispatch: ({}) => void) => {
  try {
    const getIdCaseDeleteId = await requestDB(SELECT_SHEME_ID_IN_IDCASE, [id]);

    const [approachId, playsHolderApproach]: any = uniqId(
      getIdCaseDeleteId.rows._array,
      'approachId'
    );
    const [exerciseId, playsHolderExercise]: any = uniqId(
      getIdCaseDeleteId.rows._array,
      'exerciseId'
    );
    const [trainingDayId, playsHolderTrainingDay]: any = uniqId(
      getIdCaseDeleteId.rows._array,
      'trainingDayId'
    );
    const [caseId, playsHolderCase]: any = uniqId(
      getIdCaseDeleteId.rows._array,
      'id'
    );

    await requestDB(DELETE_SHEME_DATA, [id]);
    await requestDB(
      DELETE_APPROACH_DEPENDENCIES(String(playsHolderApproach)),
      approachId
    );
    await requestDB(
      DELETE_EXERCISE_DEPENDENCIES(String(playsHolderExercise)),
      exerciseId
    );
    await requestDB(
      DELETE_TRAINING_DAY_DEPENDENCIES(String(playsHolderTrainingDay)),
      trainingDayId
    );
    await requestDB(
      DELETE_IDCASE_DEPENDENCIES(String(playsHolderCase)),
      caseId
    );
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: DELETE_SHEME,
    id,
  });
};

export const changeNameSheme = (id: number, name: string) => async (
  dispatch: ({}) => void
) => {
  try {
    await requestDB(UPDATE_SHEME_NAME, [name, id]);
  } catch (error) {
    console.log(error);
  }

  return dispatch({
    type: CHANGE_NAME_SHEME,
    name,
    id,
  });
};

export const changeTrainingDayName = (
  id: number,
  name: string,
  parrentId?: number,
  index?: number
) => async (dispatch: ({}) => void) => {
  if (parrentId) {
    try {
      await requestDB(UPDATE_TRAINING_DAY_NAME, [name, id]);
    } catch (error) {
      console.log(error);
    }

    return dispatch({
      type: CHANGE_TRAINING_DAY_NAME,
      parrentId: parrentId,
      name,
      id,
      index,
    });
  }
};

export const deleteTrainingDay = (
  id: number,
  parrentId?: number,
  index?: number
) => async (dispatch: ({}) => void) => {
  if (parrentId) {
    try {
      const getIdCaseDeleteId = await requestDB(
        SELECT_TRAINING_DAY_ID_IN_IDCASE,
        [id]
      );

      const [approachId, playsHolderApproach]: any = uniqId(
        getIdCaseDeleteId.rows._array,
        'approachId'
      );
      const [exerciseId, playsHolderExercise]: any = uniqId(
        getIdCaseDeleteId.rows._array,
        'exerciseId'
      );
      const [caseId, playsHolderCase]: any = uniqId(
        getIdCaseDeleteId.rows._array,
        'id'
      );

      await requestDB(DELETE_TRAINING_DAY_DEPENDENCIES('?'), [id]); //DELETE_TRAINING_DAY_DATA
      await requestDB(
        DELETE_APPROACH_DEPENDENCIES(String(playsHolderApproach)),
        approachId
      );
      await requestDB(
        DELETE_EXERCISE_DEPENDENCIES(String(playsHolderExercise)),
        exerciseId
      );
      await requestDB(
        DELETE_IDCASE_DEPENDENCIES(String(playsHolderCase)),
        caseId
      );
    } catch (error) {
      console.log(error);
    }

    dispatch({
      type: DELETE_TRAINING_DAY,
      id,
      index,
      parrentId,
    });
  }
};

export const sendExerciseResult = (
  cardListUseEffectChildrenUpdate: any, // переименовать
  shemeId: string,
  trainingDayId: string,
  exerciseId: string
) => async (dispatch: ({}) => void) => {
  try {
    const takeApproachSend = await requestDB(ADD_APPROACH_DATA, [
      JSON.stringify(cardListUseEffectChildrenUpdate),
    ]);

    await requestDB(ADD_IDCASE, [
      shemeId,
      trainingDayId,
      exerciseId,
      String(takeApproachSend.insertId),
    ]);
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: SEND_EXERCISE_RESULT,
  });
};

const loadTemplateApproach = (amount: number, history: any) => {
  if (history.length !== amount) {
    if (history.length > amount) {
      history.splice(amount);
    } else if (history.length < amount) {
      let cardListItem: any = [];

      if (!history.length) {
        cardListItem = takeCardItemList(history, amount);
      } else if (history.length) {
        const arrayNewId = takeIdFillingInTheGaps(history, amount);
        cardListItem = takeCardItemList(history, amount, arrayNewId);
      }

      return [...history, ...cardListItem];
    }
  }
  return history;
};

const takeIdFillingInTheGaps = (history: any, amount: number) => {
  const sortArray: any = takeSortIdArrayAproaches(history, 'array');
  const newId = [];
  let j = 0;
  let s = 0;

  for (; j < amount; j++) {
    if (sortArray[s] !== j) {
      newId.push(j);
    } else {
      s++;
    }
  }
  return newId;
};

const takeCardItemList = (history: any, amount: number, id?: number[]) => {
  const arrayCardList = [];
  const item = { amount: '0', weight: '0', date: new Date().toUTCString() };

  if (id && id.length) {
    let a = 0;
    for (let i = history.length; i < amount; i++) {
      arrayCardList.push({ ...item, id: id[a], i: i + 1 });
      a++;
    }
  } else {
    for (let i = history.length; i < amount; i++) {
      arrayCardList.push({ ...item, id: i, i: i + 1 });
    }
  }
  return arrayCardList;
};

export const loadHistory = (
  shemeId: string,
  trainingDayId: string,
  exerciseId: string,
  amount: number
) => async (dispatch: ({}) => void) => {
  try {
    const getCase = await requestDB(SELECT__ID_FOR_MAPID, [
      shemeId,
      trainingDayId,
      exerciseId,
    ]);

    const idLastExercise = getCase.rows._array[0].approachId;
    let approach: any = [];

    if (idLastExercise) {
      const appRes = await requestDB(
        SELECT__ID_APPROACH_HISTORY_LAST_EXERCISE,
        [idLastExercise]
      );
      approach = JSON.parse(appRes.rows._array[0].approach);
    }

    const history = loadTemplateApproach(amount, approach);

    const approaches = history.map(
      (el: { amount: string; weight: string; i: string; id: string }) => {
        return { ...el, amount: '', weight: '' };
      }
    );

    return dispatch({
      type: LOAD_HISTORY,
      history: history,
      approaches,
      historyId: idLastExercise,
    });
  } catch (error) {
    console.log(error);
  }
};

export const clearHistory = () => (dispatch: ({}) => void) => {
  dispatch({ type: CLEAR_HISTORY });
};

export const addNewExercise = (
  shemeId: string,
  trainingDayId: string
) => async (dispatch: ({}) => void) => {
  try {
    const result = await requestDB(ADD_EXERCISE_DATA, ['', 0, trainingDayId]);
    await requestDB(ADD_IDCASE, [
      shemeId,
      trainingDayId,
      result.insertId,
      String(0),
    ]);

    dispatch({ type: ADD_EXERCISE, trainingDayId, id: result.insertId });
  } catch (error) {
    console.log(error);
  }
};

export const changeExercise = (
  parrentId: string,
  name: string[],
  amount: string[],
  id: number[]
) => async (dispatch: ({}) => void) => {
  try {
    for (let i = 0; i < id.length; i++) {
      if (!amount[i]) {
        amount[i] = '0';
      }
      if (!name[i]) {
        name[i] = '';
      }
      await requestDB(CHANGE_EXERCISE_NAME_DATA, [name[i], id[i]]);
      await requestDB(CHANGE_EXERCISE_AMOUNT_DATA, [amount[i], id[i]]);
    }
  } catch (error) {
    console.log(error);
  }
  return dispatch({ type: CHANGE_EXERCISE, parrentId, amount, name });
};

export const deleteExercise = (id: number, trainingDayId: string) => async (
  dispatch: ({}) => void
) => {
  const getIdCaseDeleteId = await requestDB(SELECT_EXERCISE_ID_IN_IDCASE, [id]);

  const [approachId, playsHolderApproach]: any = uniqId(
    getIdCaseDeleteId.rows._array,
    'approachId'
  );
  const [caseId, playsHolderCase]: any = uniqId(
    getIdCaseDeleteId.rows._array,
    'id'
  );
  try {
    await requestDB(DELETE_EXERCISE_DEPENDENCIES('?'), [id]);
    await requestDB(
      DELETE_APPROACH_DEPENDENCIES(String(playsHolderApproach)),
      approachId
    );
    await requestDB(
      DELETE_IDCASE_DEPENDENCIES(String(playsHolderCase)),
      caseId
    );
  } catch (error) {
    console.log(error, 'удаление sheme');
  }

  dispatch({
    type: DELETE_EXERCISE,
    parrentId: trainingDayId,
    id: id,
  });
};

export const addApproach = (
  trainingDayId: string,
  exerciseId: string,

  history: any,
  approaches: any
) => async (dispatch: ({}) => {}) => {
  await requestDB(`SELECT * FROM 'approach' `);
  const amountItem = history.length + 1;

  try {
    await requestDB(CHANGE_EXERCISE_AMOUNT_DATA, [amountItem, exerciseId]);
  } catch (error) {
    console.log(error);
  }

  let cardListItem = {
    id: takeSortIdArrayAproaches(history, 'id'),
    i: amountItem,
    amount: '',
    weight: '',
    date: new Date().toUTCString(),
  };

  dispatch({
    type: ADD_APPROACH,
    trainingDayId,
    exerciseId,
    amount: amountItem,
    history: [...history, { ...cardListItem, amount: '0', weight: '0' }],
    approaches: [...approaches, cardListItem],
  });
};

const takeSortIdArrayAproaches = (
  array: { id: number }[],
  typeTake: string
) => {
  let idArray = array.map((el: { id: number }) => {
    return el.id;
  });

  idArray = idArray.sort((a: number, b: number) => {
    return a - b;
  });

  return typeTake == 'id' ? takeId(idArray) : idArray;
};

const takeId = (idArray: number[]) => {
  let i = 0;
  for (; i < idArray.length; i++) {
    if (idArray[i] !== i) {
      return i;
    }
  }

  return i;
};

export const deleteApproach = (
  id: number,
  historyId: string,
  exerciseId: string,
  trainingDayId: string,
  history: any,
  approaches: any
) => async (dispatch: ({}) => void) => {
  const amountItem = history.length;
  try {
    const approachItem = await requestDB(
      SELECT__ID_APPROACH_HISTORY_LAST_EXERCISE,
      [historyId]
    );
    const parseItem = approachItem.rows._array[0]
      ? JSON.parse(approachItem.rows._array[0].approach)
      : approachItem.rows._array;

    if (parseItem) {
      await requestDB(DELETE_APPROACH_ITEM_DATA, [
        JSON.stringify(
          parseItem.filter((el: { id: string }) => {
            if (el == null) {
              return {};
            }
            return String(el.id) !== String(id);
          })
        ),
        historyId,
      ]);
    }
    await requestDB(CHANGE_EXERCISE_AMOUNT_DATA, [amountItem, exerciseId]);
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: DELETE_APPROACH,
    id,
    trainingDayId,
    exerciseId,
    history,
    amount: amountItem,
    approaches,
  });
};

export const changeApproachWeightAmount = (approaches: any) => (
  dispatch: ({}) => void
) => {
  return dispatch({
    type: CHANGE_APPROACH_AMOUNT_WEIGHT,
    approaches,
  });
};
