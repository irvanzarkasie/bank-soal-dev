import Immutable from 'immutable';
import * as types from '../actions/actionTypes';

const initialState = Immutable.fromJS({
  username: '',
  role: '',
  isRegistered: false,
  isLoading: false
});

// REDUCER
const userRegistrationReducer = (state = initialState, action) => {
    switch(action.type) {
      case types.REGISTER_USER_START:
        return state.set('isLoading', true)
                    .set('isRegistered', false)
                    .set('username', action.payload.username)
                    .set('role', action.payload.role)
      
      case types.REGISTER_USER_SUCCESS:
        return state.set('isLoading', false)
                    .set('isRegistered', true)
                    .set('username', action.payload.username)
                    .set('role', action.payload.role)
      
      case types.REGISTER_USER_FAILED:
        return state.set('isLoading', false)
                    .set('isRegistered', false)
                    .set('username', action.payload.username)
                    .set('role', action.payload.role)

      default:
          return state
    }
};

export default userRegistrationReducer