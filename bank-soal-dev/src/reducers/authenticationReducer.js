import Immutable from 'immutable';
import * as types from '../actions/actionTypes';

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? Immutable.fromJS(user) : Immutable.fromJS({
  username: '',
  role: '',
  isLoggedIn: false,
  isLoading: false
});

// REDUCER
const authenticationReducer = (state = initialState, action) => {
    switch(action.type) {
      case types.LOGIN_START:
        return state.set('isLoading', true)
                    .set('isLoggedIn', false)
                    .set('username', action.payload.username)
                    .set('role', action.payload.role)
      
      case types.LOGIN_SUCCESS:
        localStorage.setItem('user', JSON.stringify({
          username: action.payload.username,
          role: action.payload.role,
          isLoggedIn: true,
          isLoading: false
        }))
        return state.set('isLoading', false)
                    .set('isLoggedIn', true)
                    .set('username', action.payload.username)
                    .set('role', action.payload.role)
      
      case types.LOGIN_FAILED:
        return state.set('isLoading', false)
                    .set('isLoggedIn', false)
                    .set('username', action.payload.username)
                    .set('role', action.payload.role)

      case types.LOGOUT_START:
        return state.set('isLoading', true)

      case types.LOGOUT_SUCCESS:
        localStorage.removeItem('user')
        return state.set('isLoading', false)
                      .set('isLoggedIn', false)
                      .set('username', '')
                      .set('role', '')
      
      case types.LOGOUT_FAILED:
        return state.set('isLoading', false)

      default:
        return state
    }
};

export default authenticationReducer