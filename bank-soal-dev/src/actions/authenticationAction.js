import * as types from './actionTypes';
import db from '../firebase';

// ACTION
export const login_start = (payload) => {
    return {
      type: types.LOGIN_START,
      payload: payload
    }
}

export const login_success = (payload) => {
    return {
      type: types.LOGIN_SUCCESS,
      payload: payload
    }
}

export const login_failed = (payload) => {
    return {
      type: types.LOGIN_FAILED,
      payload: payload
    }
}

export const logout_start = () => {
    return {
      type: types.LOGOUT_START
    }
}

export const logout_success = () => {
    return {
      type: types.LOGOUT_SUCCESS
    }
}

export const logout_failed = () => {
    return {
      type: types.LOGOUT_FAILED
    }
}

export const login = (payload) =>  {

    return async function(dispatch){
        dispatch(login_start(payload))
        
        const username = payload.username;
        const password = payload.password;
        let userData = {};

        const userDataQuery = db.collection("user-accounts").where("username", "==", username)
        try{
            const querySnapshot = await userDataQuery.get()
            userData = querySnapshot.docs[0].data()
            userData["response"] = "OK"
        } catch(e) {
            userData["response"] = "NOK"
        }

        if(userData.response === "OK"){
            if(userData.password === password){
              console.log("Login success")
              dispatch(login_success({
                  username: userData.username,
                  role: userData.role
              }))

              return {
                  'status': 'OK'
              }
              
            } else {
              console.log("Login failed")
              dispatch(login_failed(payload))

              return {
                  'status': 'NOK'
              }
            }
        } else {
            console.log("Login failed")
            dispatch(login_failed(payload))

            return {
                'status': 'NOK'
            }
        }
    }
}

export const logout = () => {
    return function(dispatch){
        dispatch(logout_start())
        dispatch(logout_success())
    }
}