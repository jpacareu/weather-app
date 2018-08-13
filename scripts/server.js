const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const request = require('superagent');
const app = express();
// app.use(express.static(path.join(__dirname, 'build')));

const url = "http://api.openweathermap.org/data/2.5/";

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
app.listen(process.env.PORT || 8081);