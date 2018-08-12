import React, { Component, Fragment } from 'react';
import store from './store';
import {Provider} from 'react-redux';

import './App.scss';
import {BrowserRouter as Router,Route} from 'react-router-dom'

import Container from './components/Container';
import WeatherComponentDetail from './components/WeatherComponentDetail';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
         <Router>
          <Fragment>
            <Route exact path="/" component={Container}/>
            <Route path="/detail/:id" component={WeatherComponentDetail}/>
          </Fragment>
         </Router>
      </Provider>
    );
  }
}

export default App;
