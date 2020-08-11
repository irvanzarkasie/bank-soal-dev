import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  isLoggedIn: false
});

// REDUCER
const authenticationReducer = (state = initialState, action) => {
    switch(action.type) {
      case "SIGN_IN":
        return state.set('isLoggedIn', !state.get('isLoggedIn'));
      default:
          return state
    }
};

export default authenticationReducer