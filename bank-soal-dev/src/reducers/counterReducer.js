import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  counter: 0
});

// REDUCER
const counterReducer = (state = initialState, action) => {
    switch(action.type) {
      case "INCREMENT":
        return state.set('counter', state.get('counter') + 1);
      case "DECREMENT":
        return state.set('counter', state.get('counter') - 1);
      default:
          return state;
    }
};

export default counterReducer