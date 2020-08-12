import authenticationReducer from './authenticationReducer'
import userRegistrationReducer from './userRegistrationReducer'
import createQuestionReducer from './createQuestionReducer'
import viewQuestionReducer from './viewQuestionReducer'

import * as storage from 'redux-storage';
import merger from 'redux-storage-merger-immutablejs';
import { combineReducers } from 'redux-immutable';

const allReducers = {
    authenticationReducer: authenticationReducer,
    userRegistrationReducer: userRegistrationReducer,
    createQuestionReducer: createQuestionReducer,
    viewQuestionReducer: viewQuestionReducer
}

const rootReducer = storage.reducer(combineReducers(allReducers), merger);

export default rootReducer