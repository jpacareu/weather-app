import React from 'react'
import uuid from 'uuid/v4'

const apiUrlImg = "http://api.openweathermap.org/img/w/";

function WeatherItem({onClick,main,icon,description,weatherGroup}){
    return <div className="weather-item" onClick={onClick}>
                        <div className="weather-item__main-data">
                            <strong>{weatherGroup}</strong>
                            <img src={`${apiUrlImg}${icon}.png`} alt={description}/>
                        </div>
                        <WeatherData {...main} />
                </div>
}
export function WeatherItems({main,weather=[],list, onClick}) {
    if(list){
        return list.map(e => {
          const {wheader:[{description,icon,main:weatherGroup}]} = e;
          const {main} = e;
            return <WeatherItem key={uuid()} props={{description,icon,weatherGroup,main}}/>
        });
    }
    return weather.map(({icon, description, main: weatherGroup}) => 
    <WeatherItem key={uuid()} {...{description,icon,weatherGroup,main,onClick}} />)
}

export function SwitchApi({state:_state, onClick: _onClick}){
    let state = typeof _state !== 'undefined' ? _state : false;
    const onClick = (e) => {
        e.stopPropagation();
        const parent = e.target.parentElement;
        if(!state){
            e.target.style.left = "initial";
            e.target.style.right = "0";
            parent.style.backgroundColor = '#4CB963';
        }else {
            e.target.style.right = "initial";
            e.target.style.left = "0";
            parent.style.backgroundColor = '#1D263B';
        }
        _onClick(e);
    };
    return (<div className="switch">
        <div onClick={onClick}></div>
    </div>)
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