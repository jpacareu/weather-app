import React, { Component } from 'react';
import store from './store';
import {Provider} from 'react-redux';

import './App.scss';
import Container from './components/Container';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

export default App;
