import {
  CHANGE_TRAINING_DAY,
  HIDE_BUTTON_FORM_CREATE,
  SHOW_BUTTON_FORM_CREATE,
  SAVE_TMP_DATA,
  SEND_DATA_CREATE_FORM,
  SEND_DATA_CREATE_TRAINING_DAY,
} from '../../types';
import { ItrainingInfor } from '../../../type/interfaceAndType';
import { requestDB } from '../../../database/db';
import {
  SELECT_ALL_SHEME,
  ADD_SHEME,
  ADD_TRAINING_DAY_DATA,
  ADD_IDCASE,
  ADD_EXERCISE_DATA,
  SELECT_ALL_TRAINING_DAY_ID,
  SELECT_ALL_EXERCISE_PARRENT_ID,
} from '../../../database/requests';

export const changeTrainingDay = (
  text: string,
  resultData: ItrainingInfor[][],
  buttonStatus: boolean,
  formValidResultStore: boolean[]
) => {
  let tmpDay: number = parseInt(text);
  let trainingDayNum = [];

  if (tmpDay !== NaN) {
    for (let i = 0; i < tmpDay; i++) {
      trainingDayNum.push(i);
    }
   
    let tmpDayArray = [...resultData];
    tmpDayArray.splice(trainingDayNum.length);

    const tmpResult = [...formValidResultStore];

    const valRes = tmpResult.splice(0, tmpDay);

    return {
      type: CHANGE_TRAINING_DAY,
      resultData: tmpDayArray, 
      day: trainingDayNum,
      buttonShow: !tmpDayArray.length
        ? false
        : valRes.every((el: boolean) => el == true),
      checkFormValid: valRes,
    };
  }
};

export const hideButton = () => ({ type: HIDE_BUTTON_FORM_CREATE });
export const showButton = () => ({ type: SHOW_BUTTON_FORM_CREATE });

export const saveTmpData = (
  validResult: boolean[],
  result: ItrainingInfor[][],
  buttonStatus?: boolean
) => ({
  type: SAVE_TMP_DATA,
  checkFormValid: validResult,
  result,
  buttonStatus,
});

export const sendDataResult = (
  resultData: ItrainingInfor[][],
  title: string
) => async (dispatch: ({}) => void) => {
  try {
    const addResult = await requestDB(ADD_SHEME, [title]);
    const res = await requestDB(SELECT_ALL_SHEME);
    const trainingDay = resultData.map(
      (arrayDay: ItrainingInfor[], i: number) => {
        const trainingDaySend = async () => {
          const trainingDayRes = await requestDB(ADD_TRAINING_DAY_DATA, [
            arrayDay[0].nameTrainingDay,
            addResult.insertId,
          ]);
          exerciseAdd(arrayDay, trainingDayRes, addResult.insertId);
        };
        trainingDaySend();
      }
    );
  } catch (error) {
    throw new Error(error);
  }
  dispatch({
    type: SEND_DATA_CREATE_FORM,
  });
};

const exerciseAdd = (
  arrayDay: ItrainingInfor[],
  trainingDayRes: any,
  parrentId: string
) => {
  arrayDay.forEach((exerciseObj, i: number) => {
    const resultSend = async (name: string, amount: number) => {
      const exercise = await requestDB(ADD_EXERCISE_DATA, [
        name,
        amount,
        trainingDayRes.insertId,
      ]);

      await requestDB(ADD_IDCASE, [
        parrentId,
        trainingDayRes.insertId,
        exercise.insertId,
        String(0),
      ]);
    };

    resultSend(exerciseObj.nameExercise, exerciseObj.amount);
  });
};

export const sendDataResultTrainingDay = (
  resultData: ItrainingInfor[][],
  parrentId: string
) => async (dispatch: ({}) => void) => {
  try {
    const arrayDay = resultData[0];

    const trainingDayRes = await requestDB(ADD_TRAINING_DAY_DATA, [
      arrayDay[0].nameTrainingDay,
      parrentId,
    ]);

    await exerciseAdd(arrayDay, trainingDayRes, parrentId);


    const dayRes = await requestDB(SELECT_ALL_TRAINING_DAY_ID, [
      trainingDayRes.insertId,
    ]);

    const exerciseRes = await requestDB(SELECT_ALL_EXERCISE_PARRENT_ID, [
      trainingDayRes.insertId,
    ]);

    await dispatch({
      type: SEND_DATA_CREATE_TRAINING_DAY,
      parrentId,
      resultData: dayRes.rows._array[0],
      id: dayRes.rows._array[0].id,
      exercise: exerciseRes.rows._array,
    });
  } catch (error) {
    throw new Error(error);
  }
};
