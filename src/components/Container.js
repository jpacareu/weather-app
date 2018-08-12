import React from 'react'
import {fetchWeather} from '../actions';
import {SearchCriteria} from '../actions';
import {connect} from 'react-redux'
import uuid from 'uuid/v4'
import { withRouter } from 'react-router'
import {WeatherItem} from './WeatherComponents'

const {BY_CITY_NAME, BY_CITY_ID, BY_CITY_COORDINATES} = SearchCriteria;

class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            [BY_CITY_ID]: '',
            [BY_CITY_NAME]: '',
            [BY_CITY_COORDINATES]: '',
            search_selector: BY_CITY_ID
        }
        this.onChangeField = this.onChangeField.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.openWeatherDetail = this.openWeatherDetail.bind(this);
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
        const {search_selector: type} = this.state;
        const {[type]: value} = this.state;
        this.props.dispatch(fetchWeather(value,type))
    }
    render() {
        const {search_selector} = this.state;
        const {weather,fetching} = this.props;
        const {cod, message, name, sys} = weather || {};
        const {country} = sys || {};
        const {[search_selector]: inputValue} = this.state;

        return (
                <div className="container">
                    <label>Select the filter to use: </label>
                    <select name="search_selector" value={search_selector} onChange={this.onChangeSelect}>
                        <option value={BY_CITY_ID}>City id</option>
                        <option value={BY_CITY_NAME}>City name</option>
                        <option value={BY_CITY_COORDINATES}>Coordinates</option>
                    </select>
                    <form onSubmit={this.onSubmit}>
                    <input type="text" name={search_selector} onChange={this.onChangeField} value={inputValue}/>
                    <button type="submit">Buscar</button>
                    </form>
                    { !fetching && <section>
                        { cod !== 200 && <h3>{message}</h3> }
                        { cod === 200 && 
                            <article>
                                <h3>Weather in {name}{country?` (${country})`:null}</h3>
                                <div className="weather-content" onClick={this.openWeatherDetail}>
                                    { Array(20).fill(null).map(el => <WeatherItem key={uuid()} {...weather} />) }
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

const wRContainer = withRouter(Container);
export default connect(mapStateToProps)(wRContainer);