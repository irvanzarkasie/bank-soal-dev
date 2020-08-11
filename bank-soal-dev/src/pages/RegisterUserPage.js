import React from 'react';
import db from '../firebase';

class RegisterUserPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        username: '',
        password: '',
        password_confirmation: '',
        role: '',
        isLoading: false,
    }

    this._onChange = this._onChange.bind(this)

    this._onSubmit = this._onSubmit.bind(this)
  }

  _onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  async _onSubmit(e){
    e.preventDefault();

    const CryptoJS = require("crypto-js");
    
    this.setState({
      isLoading: true
    })
    
    console.log("Register form submitted!")
    
    const username = this.state.username;
    const password = CryptoJS.SHA256(this.state.password, 'secret').toString();
    const password_confirmation = CryptoJS.SHA256(this.state.password_confirmation, 'secret').toString();
    const role = this.state.role;
    
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
          this.setState({
            isLoading: false
          })
        } else {
          this.setState({
            isLoading: false
          })
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
        this.setState({
          isLoading: false
        })
      }

    }
  }

  render(){
    return (
        <div>
            <h1>User Registration Page</h1>
            <form onSubmit={this._onSubmit}>
              <div>
                <label>Username</label>
                <br/>
                <input type="text" name="username" value={this.state.username} onChange={this._onChange} />
              </div>
              <div>
                <label>Password</label>
                <br/>
                <input type="password" name="password" value={this.state.password} onChange={this._onChange} />
              </div>
              <div>
                <label>Confirm Password</label>
                <br/>
                <input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this._onChange} />
              </div>
              <div>
                <label>Role</label>
                <br/>
                <input type="text" name="role" value={this.state.role} onChange={this._onChange} />
              </div>
              <div>
                <br/>
                {this.state.isLoading ? <label>Registering....</label> : <button type="submit">Register</button> }
              </div>
            </form>
        </div>
    );
  }
}

export default RegisterUserPage;
