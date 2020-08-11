import React from 'react';

class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        username: '',
        password: ''
    }

    this._onChange = this._onChange.bind(this)

    this._onSubmit = this._onSubmit.bind(this)
  }

  _onChange(e){
    this.setState({[e.target.name]: e.target.value})
    console.log(this.state)
  }

  _onSubmit(e){
    e.preventDefault();
    console.log("Login form submitted!")
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
                <button type="submit">Login</button>
              </div>
            </form>
        </div>
    );
  }
}

export default LoginPage;
