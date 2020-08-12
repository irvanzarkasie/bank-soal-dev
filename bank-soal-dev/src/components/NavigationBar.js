import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {logout} from '../actions/authenticationAction';
import {NavLink as Link} from 'react-router-dom';

class NavigationBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isExpandToggled: false
    }
    
    this._onLogout = this._onLogout.bind(this)

    this._onExpand = this._onExpand.bind(this)
  }

  _onLogout(e){

    this.props.logout()

  }

  _onExpand(){
    this.setState({
      isExpandToggled: !this.state.isExpandToggled
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state !== nextState;
  }

  render(){
    return (
      <div className={this.state.isExpandToggled ? "topnav responsive" : "topnav"} id="myTopnav">
        <a className="icon" onClick={this._onExpand}><i className="fa fa-bars"></i></a>
        <a href="/"><i className="fa fa-home"></i></a>
        <Link to="/about">About</Link>
        {this.props.authenticationState.get('role') === 'admin' ? <Link to="/register">Register</Link> : ''}
        <Link to="/contact">Contact</Link>
        <a className="icon-logout" onClick={this._onLogout}>
          <i className="fa fa-sign-out"></i>
        </a>
        
      </div>
    );
  }
  
}

const mapStateToProps = state => ({
  authenticationState: state.get('authenticationReducer')
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    logout
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
