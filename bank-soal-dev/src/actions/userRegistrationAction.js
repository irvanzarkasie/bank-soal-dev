import * as types from './actionTypes';
import db from '../firebase';

// ACTION
export const user_registration_start = (payload) => {
    return {
      type: types.REGISTER_USER_START,
      payload: payload
    }
}

export const user_registration_success = (payload) => {
    return {
      type: types.REGISTER_USER_SUCCESS,
      payload: payload
    }
}

export const user_registration_failed = (payload) => {
    return {
      type: types.REGISTER_USER_FAILED,
      payload: payload
    }
}

export const register_user = (payload) => {
    return async function(dispatch){
        
      dispatch(user_registration_start(payload))

      const username = payload.username;
      const password = payload.password;
      const password_confirmation = payload.password_confirmation;
      const role = payload.role;

      if(password === password_confirmation){
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
          if(userData.username === username){
            console.log("User already exists")
            console.log("User registration failed")
            dispatch(user_registration_failed({
              username: username,
              role: role
            }))
            return {
              'status': 'NOK'
            }
          } else {
            console.log("User registration failed")
            dispatch(user_registration_failed({
              username: username,
              role: role
            }))
            return {
              'status': 'NOK'
            }
          }
        } else {
          console.log("User not exists. Registering user.")
          const writeData = {
            username: username,
            password: password,
            role: role
          };
          const userRegQuery = db.collection("user-accounts").doc()
          await userRegQuery.set(writeData)
  
          console.log("User registration succeeded")
          dispatch(user_registration_success({
            username: username,
            role: role
          }))

          return {
            'status': 'OK'
          }
        }
  
      }
    }
}