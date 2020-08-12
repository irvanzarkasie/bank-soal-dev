import counterReducer from './counterReducer';
import authenticationReducer from './authenticationReducer'
import userRegistrationReducer from './userRegistrationReducer'

import * as storage from 'redux-storage';
import merger from 'redux-storage-merger-immutablejs';
import { combineReducers } from 'redux-immutable';

const allReducers = {
    counterReducer: counterReducer,
    authenticationReducer: authenticationReducer,
    userRegistrationReducer: userRegistrationReducer
}

const rootReducer = storage.reducer(combineReducers(allReducers), merger);

export default rootReducer