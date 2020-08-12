import React from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/authenticationAction';
import { bindActionCreators } from 'redux';
import {Redirect} from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';

class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        username: '',
        password: '',
        role: '',
        isLoggedIn: false,
        isLoading: false,
        showFailedToast: false 
    }

    this._onChange = this._onChange.bind(this)

    this._onSubmit = this._onSubmit.bind(this)
  }

  _onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.props !== nextProps || this.state !== nextState;
  }

  async _onSubmit(e){

    this.setState({
      isLoading: true
    })

    e.preventDefault();

    console.log("Login form submitted!")
    
    const CryptoJS = require("crypto-js");
    const username = this.state.username;
    const password = CryptoJS.SHA256(this.state.password, 'secret').toString();
    const loginResponse = await this.props.login({
      username: username,
      password: password
    })

    if(loginResponse.status === "NOK"){
      this.setState({
        isLoading: false,
        showFailedToast: true
      })
    }
  }

  _showFailedToast(){
    return (
      <Toast onClose={() => this.setState({showFailedToast: false})} show={this.state.showFailedToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="mr-auto">Login Failed</strong>
          </Toast.Header>
          <Toast.Body>Failed to login to your account.</Toast.Body>
      </Toast>
    )
  }

  render(){
    if(this.props.authenticationState.get('isLoggedIn')){
      return (
        <Redirect to="/" />
      );
    } else {
      return (
        <div>
            {this.state.showFailedToast ? this._showFailedToast() : ''}
            <br/>
            <h1>Bank Soal</h1>
            <br/>
            <form onSubmit={this._onSubmit}>
              <div>
                <label>Username</label>
                <br/>
                <input type="text" name="username" value={this.state.username} onChange={this._onChange} />
              </div>
              <br/>
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
}

const mapStateToProps = state => ({
  authenticationState: state.get('authenticationReducer')
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    login
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
