import React from 'react';
import {connect} from 'react-redux';
import {register_user} from '../actions/userRegistrationAction';
import { bindActionCreators } from 'redux';
import {Redirect} from 'react-router-dom';

class RegisterUserPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        username: '',
        password: '',
        password_confirmation: '',
        role: '',
        isLoading: false,
        isRegistered: false
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
    e.preventDefault();

    this.setState({
      isLoading: true
    })

    const CryptoJS = require("crypto-js");
    
    console.log("Register form submitted!")
    
    const username = this.state.username;
    const password = CryptoJS.SHA256(this.state.password, 'secret').toString();
    const password_confirmation = CryptoJS.SHA256(this.state.password_confirmation, 'secret').toString();
    const role = this.state.role;
    const registrationResponse = await this.props.register_user({
      username: username,
      password: password,
      password_confirmation: password_confirmation,
      role: role
    })
    
    console.log("Receive user registration response")
    console.log(registrationResponse)

    this.setState({
      isLoading: false
    })

  }

  render(){
    if(this.props.authenticationState.get('role') === 'admin'){
      return (
        <div>
            <h1>Daftar Pengguna Baru</h1>
            <br/>
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
    } else {
      return (<Redirect to="/"/>)
    }
    
  }
}

const mapStateToProps = state => ({
  userRegistrationState: state.get('userRegistrationReducer'),
  authenticationState: state.get('authenticationReducer')
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    register_user
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUserPage);
