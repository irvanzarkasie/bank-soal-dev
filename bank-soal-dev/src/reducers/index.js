import authenticationReducer from './authenticationReducer'
import userRegistrationReducer from './userRegistrationReducer'
import createQuestionReducer from './createQuestionReducer'

import * as storage from 'redux-storage';
import merger from 'redux-storage-merger-immutablejs';
import { combineReducers } from 'redux-immutable';

const allReducers = {
    authenticationReducer: authenticationReducer,
    userRegistrationReducer: userRegistrationReducer,
    createQuestionReducer: createQuestionReducer
}

const rootReducer = storage.reducer(combineReducers(allReducers), merger);

export default rootReducer