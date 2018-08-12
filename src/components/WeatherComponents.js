import React from 'react';

const apiUrlImg = "http://api.openweathermap.org/img/w/";

export function WeatherItem({main,weather}) {
    const [{icon, description, main: weatherGroup}] = weather || [{}];
    return <div className="weather-item">
            <div className="weather-item__main-data">
                <strong>{weatherGroup}</strong>
                <img src={`${apiUrlImg}${icon}.png`} alt={description}/>
            </div>
            <WeatherData {...main} />
        </div>
}

export function WeatherData(props){
    const {humidity, pressure, temp, temp_max, temp_min} = props || {};
    return <div className="weather-item__secondary-data">
        <strong>Hum:</strong><span> {humidity}%</span><br/>
        <strong>Pres:</strong><span> {pressure}hPa</span><br/>
        <strong>Temp:</strong><span> {temp}K</span><br/>
        <strong>Temp min:</strong><span> {temp_min}K</span><br/>
        <strong>Temp max:</strong><span> {temp_max}K</span><br/>
    </div>
}