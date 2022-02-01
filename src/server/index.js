'use strict';
const express = require('express');
const countryCodes = require('./country-codes');
const dotenv = require('dotenv');
dotenv.config();

let trips = [];
let selectedTripIndex = 0;

const app = express();
app.use(express.static('dist'));

// Dependencies
const bodyParser = require('body-parser');
// Middleware
// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance.
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile('/dist/index.html', { root: __dirname + '/../..' });
});

// Initialize country code get route.
app.get('/countryCodes', (req, res) => {
    res.send(countryCodes);
});

// Initialize dotenv get route.
app.get('/dotenv', (req, res) => {
    res.send({
        geonames_username: process.env.geonames_username,
        weatherbit_API_KEY: process.env.weatherbit_API_KEY,
        pixabay_API_KEY: process.env.pixabay_API_KEY
    });
});

// Initialize saved trips get route.
app.get('/savedTrips', (req, res) => {
    res.send({
        trips: trips,
        selectedIndex: selectedTripIndex
    });
});

// Initialize saved trip get route.
app.get('/savedTrip', (req, res) => {
    const index = req.url.split('=');
    res.send(trips[index[index.length - 1]]);
});

// Initialize remove trip get route.
app.post('/removeTrip', (req, res) => {
    trips.splice(req.body.index, 1);
    selectedTripIndex = req.body.index > 0 ? req.body.index - 1 : 0;
    res.send({ index: selectedTripIndex });
});

// Initialize save trip post route.
app.post('/saveTrip', (req, res) => {
    trips.splice(req.body.index, 0, req.body.trip);
    selectedTripIndex = req.body.index;
    res.send({});
});

// Initialize save trip post route.
app.post('/setSelectedIndex', (req, res) => {
    selectedTripIndex = req.body.index;
    res.send({});
});

app.listen(process.env.PORT || 8081, () => {
    console.log('Listening on port 8081!');
});

