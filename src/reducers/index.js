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
        default: return state;
    }
};

const weatherApp = combineReducers({
    fetchWeather
});

export default weatherApp;

