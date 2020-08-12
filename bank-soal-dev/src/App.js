import React from 'react';
import './App.css';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterUserPage from './pages/RegisterUserPage';
import ViewQuestionPage from './pages/ViewQuestionPage';
import CreateQuestionPage from './pages/CreateQuestionPage';
import NavigationBar from './components/NavigationBar';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
  
  render(){

    return (
      <BrowserRouter>
        <div className="App">
          {this.props.authenticationState.get('isLoggedIn') ? <NavigationBar/> : ''}
          <Switch>
            <Route exact path="/">
              {this.props.authenticationState.get('isLoggedIn') ? <HomePage/> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {this.props.authenticationState.get('isLoggedIn') ? <Redirect to="/" /> : <LoginPage />}
            </Route>
            <Route path="/register">
              {this.props.authenticationState.get('isLoggedIn') ? <RegisterUserPage/> : <Redirect to="/login" />}
            </Route>
            <Route path="/about">
              {this.props.authenticationState.get('isLoggedIn') ? <AboutPage/> : <Redirect to="/login" />}
            </Route>
            <Route path="/contact">
              {this.props.authenticationState.get('isLoggedIn') ? <ContactPage/> : <Redirect to="/login" />}
            </Route>
            <Route path="/view_question">
              {this.props.authenticationState.get('isLoggedIn') ? <ViewQuestionPage/> : <Redirect to="/login" />}
            </Route>
            <Route path="/create_question">
              {this.props.authenticationState.get('isLoggedIn') ? <CreateQuestionPage/> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  
}

const mapStateToProps = state => ({
  authenticationState: state.get('authenticationReducer')
})

export default connect(mapStateToProps, null)(App);
