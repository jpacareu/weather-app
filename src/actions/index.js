const API_KEY = "abbe97c03f6cfe79a85381e47a17a6fd";

export const FetchWeather = {
    FETCH_WEATHER_FINISHED: 'FETCH_WEATHER_FINISHED',
    FETCH_WEATHER_PENDING: 'FETCH_WEATHER_PENDING',
    FETCH_WEATHER_START: 'FETCH_WEATHER_START'
};

export const SearchCriteria = {
    BY_CITY_NAME: 'BY_CITY_NAME',
    BY_CITY_ID: 'BY_CITY_ID',
    BY_CITY_COORDINATES: 'BY_CITY_COORDINATES',
};

function apiUrl(value, selector){
    const url = "http://api.openweathermap.org/data/2.5/";
    switch (selector) {
        case SearchCriteria.BY_CITY_ID:
            return `${url}weather?id=${value}&APPID=${API_KEY}`;
        case SearchCriteria.BY_CITY_NAME:
            return `${url}weather?q=${value}&APPID=${API_KEY}`;
        case SearchCriteria.BY_CITY_COORDINATE:
            const [lat, lon] = value.split(',');
            return `${url}weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`;
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
