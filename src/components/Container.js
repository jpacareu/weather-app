import React, { Component, Fragment } from 'react'
import {fetchWeatherCity} from '../actions';
import {connect} from 'react-redux'


function CityInputForm({value, onChange,name, labelTitle}){
    return (
        <Fragment>
            <input type="text" name={name} onChange={onChange} value={value}/>
        </Fragment>);
}
class Container extends Component {
    constructor(){
        super();
        this.state = {
            city_id: '',
            city_name: '',
            city_coordinates: '',
            search_selector: 'city_id'
        }
        this.onChangeField = this.onChangeField.bind(this);
    }
    componentWillMount(){
        this.props.dispatch(fetchWeatherCity("2172797"));
    }
    onChangeField(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {search_selector,city_id, city_name, city_coordinates } = this.state;
        return (
            <div className="container">
                <label>Select the filter to use: </label>
                <select name="search_selector" value={search_selector} onChange={this.onChangeField}>
                    <option value="city_id">City id</option>
                    <option value="city_name">City name</option>
                    <option value="city_coordinates">Coordinates</option>
                </select>
                <form>
                { search_selector==='city_id' && 
                <CityInputForm value={city_id} onChange={this.onChangeField} name="city_id" labelTitle="City Id"/> }
                { search_selector==='city_name' && 
                <CityInputForm value={city_name} onChange={this.onChangeField} name="city_name" labelTitle="City Name"/>}
                { search_selector==='city_coordinates' && 
                <CityInputForm value={city_coordinates} onChange={this.onChangeField} name="city_coordinates" labelTitle="City coordinates"/>}
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
   
};

export default connect(null)(Container);