import { combineReducers, createStore, applyMiddleware } from 'redux';
import { trainingData } from './reducers/trainingData';
import { formCreateData } from './reducers/formCreateData';
import thunk from 'redux-thunk';

const reducer = combineReducers({ trainingData, formCreateData });
export const store = createStore(reducer, applyMiddleware(thunk));
