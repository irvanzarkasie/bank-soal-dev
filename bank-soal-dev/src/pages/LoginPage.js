import React from 'react';
import db from '../firebase';

class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        username: '',
        password: '',
        role: '',
        isLoggedIn: false,
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
    
    console.log("Login form submitted!")
    
    const username = this.state.username;
    const password = CryptoJS.SHA256(this.state.password, 'secret').toString();
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
        this.setState({
          username: userData.username,
          role: userData.role,
          isLoggedIn: true,
          isLoading: false
        })
      } else {
        console.log("Login failed")
        this.setState({
          isLoading: false
        })
      }
    } else {
      console.log("Login failed")
      this.setState({
        isLoading: false
      })
    }

  }

  render(){
    return (
        <div>
            <h1>Login Page</h1>
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
                <br/>
                {this.state.isLoading ? <label>Logging in....</label> : <button type="submit">Login</button> }
              </div>
            </form>
        </div>
    );
  }
}

export default LoginPage;
