const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const request = require('superagent');
const app = express();
const DEFAULT_PORT = '8080';
// app.use(express.static(path.join(__dirname, 'build')));

const url = "http://api.openweathermap.org/data/2.5/";

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/weather/id', function (req, res) {
    const {id, APPID} = req.query;
    request.get(`${url}/weather`)
    .query({id, APPID})
    .then(resp => res.send(resp.text))
    .catch(err => console.log(err.message)) 
});

app.get('/weather/q', function (req, res) {
    const {q, APPID} = req.query;
    request.get(`${url}/weather`)
    .query({q, APPID})
    .then(resp => res.send(resp.text))
    .catch(err => console.log(err.message))
});

app.get('/forecast/id', function (req, res) {
    const {id, APPID} = req.query;
    request.get(`${url}/forecast`)
    .query({id, APPID})
    .then(resp => res.send(resp.text))
    .catch(err => console.log(err.message))
});

app.get('/forecast/q', function (req, res) {
    const {q, APPID} = req.query;
    request.get(`${url}/forecast`)
    .query({q, APPID})
    .then(resp => forecastHandler(res, resp.text))
    .catch(err => console.log(err.message))
});

function forecastHandler(res,json){
    res.send(json);
}
app.listen(process.env.PORT || DEFAULT_PORT);