import * as types from './actionTypes';
import db from '../firebase';

// ACTION
export const submit_question_start = (payload) => {
    return {
      type: types.SUBMIT_QUESTION_START,
      payload: payload
    }
}

export const submit_question_success = (payload) => {
    return {
      type: types.SUBMIT_QUESTION_SUCCESS,
      payload: payload
    }
}

export const submit_question_failed = (payload) => {
    return {
      type: types.SUBMIT_QUESTION_FAILED,
      payload: payload
    }
}

export const submit_question = (payload) =>  {

    return async function(dispatch){
        dispatch(submit_question_start(payload))
        
        const questionSubmitQuery = db.collection("questions").doc()
        await questionSubmitQuery.set(payload)

        console.log("Submit question succeeded")
        dispatch(submit_question_success(payload))

        return {
            'status': 'OK'
        }
    }
}