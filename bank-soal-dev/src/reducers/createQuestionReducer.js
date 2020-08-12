import Immutable from 'immutable';
import * as types from '../actions/actionTypes';

const initialState = Immutable.fromJS({
  question: '',
  answer: '',
  class: '',
  subject: '',
  difficulty: '',
  isSubmitted: false,
  isLoading: false
});

// REDUCER
const createQuestionReducer = (state = initialState, action) => {
    switch(action.type) {
      case types.SUBMIT_QUESTION_START:
        return state.set('isLoading', true)
                    .set('isSubmitted', false)
                    .set('question', action.payload.question)
                    .set('answer', action.payload.answer)
                    .set('class', action.payload.class)
                    .set('subject', action.payload.subject)
                    .set('difficulty', action.payload.difficulty)
      
      case types.SUBMIT_QUESTION_SUCCESS:
        return state.set('isLoading', false)
                    .set('isSubmitted', true)
                    .set('question', action.payload.question)
                    .set('answer', action.payload.answer)
                    .set('class', action.payload.class)
                    .set('subject', action.payload.subject)
                    .set('difficulty', action.payload.difficulty)
      
      case types.SUBMIT_QUESTION_FAILED:
        return state.set('isLoading', false)
                    .set('isSubmitted', false)
                    .set('question', action.payload.question)
                    .set('answer', action.payload.answer)
                    .set('class', action.payload.class)
                    .set('subject', action.payload.subject)
                    .set('difficulty', action.payload.difficulty)

      default:
        return state
    }
};

export default createQuestionReducer