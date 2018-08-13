import React from 'react'
import {fetchWeather,fetchForecast} from '../actions';
import {SearchCriteria} from '../actions';
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {WeatherItems,SwitchApi} from './WeatherComponents'

const {BY_CITY_NAME, BY_CITY_ID, BY_CITY_COORDINATES} = SearchCriteria;

class CurrentWeather extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            [BY_CITY_ID]: '',
            [BY_CITY_NAME]: '',
            [BY_CITY_COORDINATES]: '',
            search_selector: BY_CITY_ID,
            switchApi: false
        }
        this.onChangeField = this.onChangeField.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onSubmit = (props.onSubmit && props.onSubmit.bind(this)) || this.onSubmit.bind(this);
        this.openWeatherDetail = this.openWeatherDetail.bind(this);
        this.onChangeSwitch = this.onChangeSwitch.bind(this);
    }
    onChangeField(e){
        const {search_selector} = this.state;
        this.setState({[search_selector]: e.target.value});
    }
    openWeatherDetail(e){ 
        e.stopPropagation();
        this.props.history.push('/detail/1')
    }
    onChangeSelect(e){ this.setState({search_selector: e.target.value});}
    onSubmit(e){
        e.preventDefault();
        const {search_selector: type,switchApi} = this.state;
        const {[type]: value} = this.state;
        if(switchApi){
            this.props.dispatch(fetchForecast(value,type));
        }else {
            this.props.dispatch(fetchWeather(value,type));
        }
    }
    onChangeSwitch(e){
        this.setState((prevState) => ({switchApi: !prevState.switchApi}));
    }
    render() {
        const {search_selector,switchApi} = this.state;
        const {weather,fetching} = this.props;
        const {cod, message, name, sys} = weather || {};
        const {country} = sys || {};
        const {[search_selector]: inputValue} = this.state;

        return (
                <div className="container">
                    <section className="search">
                        <label>Select filter: </label>
                        <select name="search_selector" value={search_selector} onChange={this.onChangeSelect}>
                            <option value={BY_CITY_ID}>City id</option>
                            <option value={BY_CITY_NAME}>City name</option>
                            <option value={BY_CITY_COORDINATES}>Coordinates</option>
                        </select>
                        <form onSubmit={this.onSubmit}>
                        <input type="text" name={search_selector} onChange={this.onChangeField} value={inputValue}/>
                        <button className="button__current-weather" type="submit">Buscar</button>
                        </form>
                        <SwitchApi state={switchApi} onClick={this.onChangeSwitch}/>
                        <strong style={{marginLeft: "1em"}}>{switchApi? 'Forecast': 'Current weather'}</strong>
                    </section>
                    { !fetching && 
                    <section>
                        { cod !== 200 && <h3>{message}</h3> }
                        { cod === 200 && 
                            <article className="weather-items">
                                <h3>Weather in {name}{country?` (${country})`:null}</h3>
                                <div className="weather-content" >
                                    <WeatherItems onClick={this.openWeatherDetail} {...weather} />
                                </div>
                            </article>}
                    </section>}
                    { fetching  && <h3>Fetching data...</h3>}
                </div>
        )
    }
}

const mapStateToProps = (state) => {
   return {
       weather: state.fetchWeather.weather,
       fetching: state.fetchWeather.fetching
   };
};

const wRContainer = withRouter(CurrentWeather);
export default connect(mapStateToProps)(wRContainer);