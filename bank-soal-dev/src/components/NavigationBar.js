import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {logout} from '../actions/authenticationAction';
import {NavLink, Link} from 'react-router-dom';

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
        <a style={{float: 'left'}}  className="icon" onClick={this._onExpand}><i className="fa fa-bars"></i></a>
        <Link onClick={this._onExpand} style={{float: 'left'}} to="/"><i className="fa fa-home"></i></Link>
        {
          (this.props.authenticationState.get('role') === 'admin') ? 
            <NavLink onClick={this._onExpand} style={{float: 'left'}} to="/register">
              {(this.state.isExpandToggled) ? <i className="fas fa-user-plus" aria-hidden="true"></i> : "Daftarkan Pengguna"}
            </NavLink> : ''
        }
        <NavLink onClick={this._onExpand} style={{float: 'left'}} to="/about">
          {(this.state.isExpandToggled) ? <i className="fa fa-info" aria-hidden="true"></i> : "Tentang"}
        </NavLink>
        <NavLink onClick={this._onExpand} style={{float: 'left'}} to="/contact">
          {(this.state.isExpandToggled) ? <i className="fa fa-phone"></i> : "Hubungi Kami"}
        </NavLink>
        <Link style={{float: 'none'}} className="icon-logout" onClick={this._onLogout} to="" style={{color: 'red'}}><i className="fa fa-sign-out fa-1x"></i></Link>
        
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
