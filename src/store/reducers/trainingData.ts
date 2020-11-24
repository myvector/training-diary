import {
  LOAD_SHEME,
  DELETE_SHEME,
  SEND_EXERCISE_RESULT,
  LOAD_HISTORY,
  CLEAR_HISTORY,
  CHANGE_NAME_SHEME,
  DELETE_APPROACH,
  DELETE_TRAINING_DAY,
  CHANGE_TRAINING_DAY_NAME,
  SEND_DATA_CREATE_TRAINING_DAY,
  CHANGE_EXERCISE,
  DELETE_EXERCISE,
  ADD_APPROACH,
  CHANGE_APPROACH_AMOUNT_WEIGHT,
  ADD_EXERCISE,
} from '../types';
import { Iaction, IinitialState, Ilist } from '../../type/interfaceAndType';

const initialState: IinitialState = {
  date: ' ',
  approaches: [],
  sheme: [],
  trainingDay: {},
  exercise: {},
  history: [],
  historyId: '',
};

export const trainingData = (state = initialState, action: Iaction) => {
  switch (action.type) {
    case LOAD_SHEME:
      return {
        ...state,
        sheme: action.shemeLoad,
        trainingDay: action.trainingDayLoad,
        exercise: action.exerciseLoad,
      };
    case DELETE_SHEME: {
      return {
        ...state,
        sheme: state.sheme.filter((el) => el.id !== action.id),
      };
    }
    case SEND_EXERCISE_RESULT:
      return { ...state };
    case LOAD_HISTORY:
      return {
        ...state,
        history: action.history,
        historyId: action.historyId,
        approaches: action.approaches,
      };
    case CLEAR_HISTORY:
      return { ...state, history: [] };
    case CHANGE_NAME_SHEME:
      const i = state.sheme.findIndex((el) => el.id == action.id);

      const shemeTmp = [...state.sheme];
      const shemeItem = { ...shemeTmp[i] };
      shemeTmp[i] = { ...shemeItem, name: String(action.name) };

      return { ...state, sheme: shemeTmp };
    case DELETE_TRAINING_DAY:
      const trainingArrayDelete = [
        ...state.trainingDay[String(action.parrentId)].list,
      ];
      const trainingDeleteDay = {
        ...state.trainingDay[String(action.parrentId)],
        list: trainingArrayDelete.filter((el: Ilist) => el.id !== action.id),
      };

      return {
        ...state,
        trainingDay: {
          ...state.trainingDay,
          [String(action.parrentId)]: trainingDeleteDay,
        },
      };
    case CHANGE_TRAINING_DAY_NAME:
      const numberIndex = parseInt(String(action.index));

      let trainingArrayChange = [
        ...state.trainingDay[String(action.parrentId)].list,
      ];

      let trainingDayItem = {
        ...trainingArrayChange[parseInt(String(numberIndex))],
      };

      let changeNameItem = { ...trainingDayItem, name: String(action.name) };
      trainingArrayChange[numberIndex] = changeNameItem;

      const trainingChangeDay = {
        ...state.trainingDay[String(action.parrentId)],
        list: trainingArrayChange,
      };

      return {
        ...state,
        trainingDay: {
          ...state.trainingDay,
          [String(action.parrentId)]: trainingChangeDay,
        },
      };
    case SEND_DATA_CREATE_TRAINING_DAY:
      const trainingArrayUpDateList = [
        ...state.trainingDay[String(action.parrentId)].list,
        action.resultData,
      ];

      const trainingArrayUpDate = {
        ...state.trainingDay[String(action.parrentId)],
        list: trainingArrayUpDateList,
      };

      const exerciseArrayUpDate = {
        id: action.id,
        list: action.exercise,
      };

      return {
        ...state,
        trainingDay: {
          ...state.trainingDay,
          [String(action.parrentId)]: trainingArrayUpDate,
        },
        exercise: {
          ...state.exercise,
          [String(action.id)]: exerciseArrayUpDate,
        },
      };
    case CHANGE_EXERCISE: 
      let list = [...state.exercise[String(action.parrentId)].list];
     
      for (let i = 0; i < action.amount.length; i++) {
        if (list[i]) {
         
          list[i].name = action.name[i];
          list[i].amount = parseInt(action.amount[i]); 
        }
      }

      return {
        ...state,
        exercise: {
          ...state.exercise,
          [String(action.parrentId)]: {
            ...state.exercise[String(action.parrentId)],
            list: list,
          },
        },
      };
    case ADD_EXERCISE:
      return {
        ...state,
        exercise: {
          ...state.exercise,
          [String(action.trainingDayId)]: {
            ...state.exercise[String(action.trainingDayId)],
            list: [
              ...state.exercise[String(action.trainingDayId)].list,
              { amount: 0, id: action.id, name: '' },
            ],
          },
        },
      };
    case DELETE_EXERCISE:
      const exerciseArrayDelete = [
        ...state.exercise[String(action.parrentId)].list,
      ];
      const exerciseDeleteDay = {
        ...state.exercise[String(action.parrentId)],
        list: exerciseArrayDelete.filter((el) => el.id !== action.id),
      };
      return {
        ...state,
        exercise: {
          ...state.exercise,
          [String(action.parrentId)]: exerciseDeleteDay,
        },
      };
    case DELETE_APPROACH:
      return {
        ...state,
        history: action.history,
        approaches: action.approaches,
        exercise: {
          ...state.exercise,
          [String(action.trainingDayId)]: {
            ...state.exercise[String(action.trainingDayId)],
            list: state.exercise[String(action.trainingDayId)].list.map(
              (el) => {
                if (el.id == action.exerciseId) {
                  el = { ...el, amount: parseInt(String(action.amount)) }; // change number in exercise
                }
                return el;
              }
            ),
          },
        },
      };
    case ADD_APPROACH:
      return {
        ...state,
        history: action.history,
        approaches: action.approaches,
        exercise: {
          ...state.exercise,
          [String(action.trainingDayId)]: {
            ...state.exercise[String(action.trainingDayId)],
            list: state.exercise[String(action.trainingDayId)].list.map(
              (el) => {
                if (el.id == action.exerciseId) {
                  el = { ...el, amount: parseInt(String(action.amount)) };
                }
                return el;
              }
            ),
          },
        },
      };
    case CHANGE_APPROACH_AMOUNT_WEIGHT:
      return { ...state, approaches: action.approaches };
    default:
      return state;
  }
};
