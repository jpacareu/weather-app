import React, { Component } from 'react'
import store from './store'
import {Provider} from 'react-redux'
import './App.scss'
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import {Login, Error404} from './components/Layout'
import MainContainer from './components/MainContainer'
import CurrentWeather from './components/CurrentWeather'
// import WeatherComponentDetail from './components/WeatherComponentDetail'
const isLoggedIn = true;


const RouteWrapper = ({ component: Component, ...rest }) => (
  isLoggedIn ? <Route {...rest} render={props => (<MainContainer><Component {...props} /></MainContainer>)}/> :
  <Redirect to='/login'  />)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
         <Router>
            <Switch>
              <RouteWrapper exact path="/"  component={CurrentWeather}/>
              <Route path="/login" component={Login}/>
              <Route component={Error404}/>
            </Switch>
         </Router>
      </Provider>
    );
  }
}

export default App;
