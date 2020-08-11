import React from 'react';
import './App.css';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterUserPage from './pages/RegisterUserPage';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

class App extends React.Component {
  //const state = useSelector(state => state)

  render(){
    //console.log(state)
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterUserPage} />
            <Route path="/about" exact component={AboutPage} />
            <Route path="/contact" exact component={ContactPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
