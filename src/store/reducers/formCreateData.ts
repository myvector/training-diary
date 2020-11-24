import {
  CHANGE_TRAINING_DAY,
  HIDE_BUTTON_FORM_CREATE,
  SHOW_BUTTON_FORM_CREATE,
  SAVE_TMP_DATA,
  SEND_DATA_CREATE_FORM,
} from '../types';
import { Iaction } from '../../type/interfaceAndType';

const inintialState = {
  day: '',
  resultData: [],
  buttonShow: false,
  checkFormValid: [],
};

export const formCreateData = (state = inintialState, action: Iaction) => {
  switch (action.type) {
    case CHANGE_TRAINING_DAY:
      return {
        ...state,
        day: action.day,
        resultData: action.resultData,
        buttonShow: action.buttonShow,
        checkFormValid: action.checkFormValid,
      };
    case HIDE_BUTTON_FORM_CREATE:
      return {
        ...state,
        buttonShow: false,
      };
    case SHOW_BUTTON_FORM_CREATE:
      return {
        ...state,
        buttonShow: true,
      };
    case SAVE_TMP_DATA:
      return {
        ...state,
        checkFormValid: action.checkFormValid,
        resultData: action.result,
        buttonShow:
          action.buttonStatus == undefined
            ? state.buttonShow
            : action.buttonStatus,
      };
    case SEND_DATA_CREATE_FORM:
      return { ...state };
    default:
      return state;
  }
};
