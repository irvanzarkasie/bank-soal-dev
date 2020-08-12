import Immutable from 'immutable';
import * as types from '../actions/actionTypes';

const initialState = Immutable.fromJS({
  questionList: '',
  class: '',
  subject: '',
  difficulty: '',
  isFetched: false,
  isLoading: false
});

// REDUCER
const createQuestionReducer = (state = initialState, action) => {
    switch(action.type) {
      case types.FETCH_QUESTION_START:
        return state.set('isLoading', true)
                    .set('isFetched', false)
                    .set('class', action.payload.class)
                    .set('subject', action.payload.subject)
                    .set('difficulty', action.payload.difficulty)
      
      case types.FETCH_QUESTION_SUCCESS:
        return state.set('isLoading', false)
                    .set('isFetched', true)
                    .set('questionList', action.payload.questionList)
                    .set('class', action.payload.class)
                    .set('subject', action.payload.subject)
                    .set('difficulty', action.payload.difficulty)
      
      case types.FETCH_QUESTION_FAILED:
        return state.set('isLoading', false)
                    .set('isFetched', false)
                    .set('questionList', '')
                    .set('answerList', '')
                    .set('class', action.payload.class)
                    .set('subject', action.payload.subject)
                    .set('difficulty', action.payload.difficulty)

      default:
        return state
    }
};

export default createQuestionReducer