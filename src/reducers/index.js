import { FetchWeather, SearchCriteria } from '../actions';
import { combineReducers } from 'redux';

const initialState = {
    searchCriteria: SearchCriteria.BY_CITY_NAME,
    weather: [],
    fetching: false
};

const fetchWeather = (state = initialState ,action) => {    
    switch (action.type) {
        case FetchWeather.FETCH_WEATHER_FINISHED:
            return {...state,fetching: false,weather: action.payload};
        case FetchWeather.FETCH_WEATHER_PENDING:
            return {...state, fetching: true };
        case FetchWeather.FETCH_FORECAST_FINISHED:
            return {...state,fetching: false,weather: action.payload};
        case FetchWeather.FETCH_FORECAST_PENDING:
            return {...state, fetching: true };
        default: return state;
    }
};

const testReducer = (state = initialState ,action) => {    
    switch (action.type) {
        case FetchWeather.FETCH_WEATHER_FINISHED:
            return {...state,fetching: false};
        default: return state;
    }
};
const weatherApp = combineReducers({
    fetchWeather,
    testReducer
});

export default weatherApp;

