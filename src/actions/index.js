const API_KEY = "abbe97c03f6cfe79a85381e47a17a6fd";

export const FetchWeather = {
    FETCH_WEATHER_FINISHED: 'FETCH_WEATHER_FINISHED',
    FETCH_WEATHER_PENDING: 'FETCH_WEATHER_PENDING',
    FETCH_WEATHER_START: 'FETCH_WEATHER_START',
    FETCH_FORECAST_FINISHED: 'FETCH_FORECAST_FINISHED',
    FETCH_FORECAST_PENDING: 'FETCH_FORECAST_PENDING',
    FETCH_FORECAST_START: 'FETCH_FORECAST_START',
};

export const SearchCriteria = {
    BY_CITY_NAME: 'BY_CITY_NAME',
    BY_CITY_ID: 'BY_CITY_ID',
    BY_CITY_COORDINATES: 'BY_CITY_COORDINATES',
};

function apiUrl(value, selector,apiEndPoint='weather'){
    const url = "http://api.openweathermap.org/data/2.5/";
    let lat, lon;
    switch (selector) {
        case SearchCriteria.BY_CITY_ID:
            return `${url}${apiEndPoint}?id=${value}&APPID=${API_KEY}`;
        case SearchCriteria.BY_CITY_NAME:
            return `${url}${apiEndPoint}?q=${value}&APPID=${API_KEY}`;
        case SearchCriteria.BY_CITY_COORDINATE:
            [lat, lon] = value.split(',');
            return `${url}${apiEndPoint}?lat=${lat}&lon=${lon}&APPID=${API_KEY}`;
        default:
            break;
    }

}
export const fetchWeather = (value, type) => dispatch => { 
    const url = apiUrl(value, type);
    if(url){
        dispatch({
            type: FetchWeather.FETCH_WEATHER_START
        });
        fetch(url)
        .then(resp => resp.json())
        .then(weather => dispatch({
            type: FetchWeather.FETCH_WEATHER_FINISHED,
            payload: weather
        }));
        dispatch({
            type: FetchWeather.FETCH_WEATHER_PENDING
        });
    }
}

export const fetchForecast = (value, type) => dispatch => { 
    const url = apiUrl(value, type,'forecast');
    if(url){
        dispatch({
            type: FetchWeather.FETCH_FORECAST_START
        });
        fetch(url)
        .then(resp => resp.json())
        .then(weather => dispatch({
            type: FetchWeather.FETCH_FORECAST_FINISHED,
            payload: weather
        }));
        dispatch({
            type: FetchWeather.FETCH_FORECAST_PENDING
        });
    }
}
