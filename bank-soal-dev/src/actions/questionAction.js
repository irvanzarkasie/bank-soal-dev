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

export const fetch_question_start = (payload) => {
    return {
      type: types.FETCH_QUESTION_START,
      payload: payload
    }
}

export const fetch_question_success = (payload) => {
    return {
      type: types.FETCH_QUESTION_SUCCESS,
      payload: payload
    }
}

export const fetch_question_failed = (payload) => {
    return {
      type: types.FETCH_QUESTION_FAILED,
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

export const fetch_question = (payload) =>  {

    return async function(dispatch){
        dispatch(fetch_question_start(payload))

        let queryResponse = {}
        let responseList = []
        let fetchQuestionQuery = db.collection("questions")
        if(payload.class !== ''){
            fetchQuestionQuery = fetchQuestionQuery.where("class", "==", payload.class)
        }
        if(payload.subject !== ''){
            fetchQuestionQuery = fetchQuestionQuery.where("subject", "==", payload.subject)
        }
        if(payload.difficulty !== ''){
            fetchQuestionQuery = fetchQuestionQuery.where("difficulty", "==", payload.difficulty)
        }
        try{
            const querySnapshot = await fetchQuestionQuery.get()
            querySnapshot.forEach(doc => {
                responseList.push({
                    'id': doc.id,
                    'data': doc.data()
                })
            });
            queryResponse["payload"] = responseList
            queryResponse["response"] = "OK"
            dispatch(fetch_question_success({
                ...payload,
                'questionList': responseList
            }))
        } catch(e){
            queryResponse["response"] = "NOK"
            dispatch(fetch_question_failed(payload))
        }

        return queryResponse
    }
}