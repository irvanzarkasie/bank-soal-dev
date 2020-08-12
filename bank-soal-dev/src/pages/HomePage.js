import React from 'react';
import {connect} from 'react-redux';

class HomePage extends React.Component {
  render(){
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticationState: state.get('authenticationReducer')
})

export default connect(mapStateToProps, null)(HomePage);
