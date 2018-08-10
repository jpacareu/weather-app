import { FetchWeather, SearchCriteria } from '../actions';
import { combineReducers } from 'redux';

const initialState = {
    searchCriteria: SearchCriteria.BY_CITY_NAME,
    weather: []
};

const fetchWeather = (state = initialState ,action) => {    
    switch (action.type) {
        case FetchWeather.FETCH_WEATHER_FINISHED:
            return {
                ...state,
                weather: action.payload
            };
        default: return state;
    }
};

const weatherApp = combineReducers({
    fetchWeather
});

export default weatherApp;

