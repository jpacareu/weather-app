const API_KEY = "abbe97c03f6cfe79a85381e47a17a6fd";

export const FetchWeather = {
    FETCH_WEATHER_FINISHED: 'FETCH_WEATHER_FINISHED',
    FETCH_WEATHER_PENDING: 'FETCH_WEATHER_PENDING',
    FETCH_WEATHER_START: 'FETCH_WEATHER_START'
};

export const SearchCriteria = {
    BY_CITY_NAME: 'BY_CITY_NAME',
    BY_CITY_ID: 'BY_CITY_ID'
};

export const fetchWeatherCity = (city_id) => dispatch => { 
    dispatch({
        type: FetchWeather.FETCH_WEATHER_START
    });
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${city_id}&APPID=${API_KEY}`)
    .then(resp => resp.json())
    .then(weather => dispatch({
        type: FetchWeather.FETCH_WEATHER_FINISHED,
        payload: weather
    }));
    dispatch({
        type: FetchWeather.FETCH_WEATHER_PENDING
    });
}
