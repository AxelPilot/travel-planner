'use strict';

// SCSS Imports
import './styles/resets.scss';
import './styles/base.scss';
import './styles/header.scss';
import './styles/load.scss';
import './styles/form.scss';
import './styles/savedTripsForm.scss';
import './styles/results.scss';
import './styles/slideShow.scss'
import './styles/footer.scss';

// PNG Imports
import a01d from './images/a01d.png';
import a01n from './images/a01n.png';
import a02d from './images/a02d.png';
import a02n from './images/a02n.png';
import a03d from './images/a03d.png';
import a03n from './images/a03n.png';
import a04d from './images/a04d.png';
import a04n from './images/a04n.png';
import a05d from './images/a05d.png';
import a05n from './images/a05n.png';
import a06d from './images/a06d.png';
import a06n from './images/a06n.png';
import c01d from './images/c01d.png';
import c01n from './images/c01n.png';
import c02d from './images/c02d.png';
import c02n from './images/c02n.png';
import c03d from './images/c03d.png';
import c03n from './images/c03n.png';
import c04d from './images/c04d.png';
import c04n from './images/c04n.png';
import d01d from './images/d01d.png';
import d01n from './images/d01n.png';
import d02d from './images/d02d.png';
import d02n from './images/d02n.png';
import d03d from './images/d03d.png';
import d03n from './images/d03n.png';
import f01d from './images/f01d.png';
import f01n from './images/f01n.png';
import r01d from './images/r01d.png';
import r01n from './images/r01n.png';
import r02d from './images/r02d.png';
import r02n from './images/r02n.png';
import r03d from './images/r03d.png';
import r03n from './images/r03n.png';
import r04d from './images/r04d.png';
import r04n from './images/r04n.png';
import r05d from './images/r05d.png';
import r05n from './images/r05n.png';
import r06d from './images/r06d.png';
import r06n from './images/r06n.png';
import s01d from './images/s01d.png';
import s01n from './images/s01n.png';
import s02d from './images/s02d.png';
import s02n from './images/s02n.png';
import s03d from './images/s03d.png';
import s03n from './images/s03n.png';
import s04d from './images/s04d.png';
import s04n from './images/s04n.png';
import s05d from './images/s05d.png';
import s05n from './images/s05n.png';
import s06d from './images/s06d.png';
import s06n from './images/s06n.png';
import t01d from './images/t01d.png';
import t01n from './images/t01n.png';
import t02d from './images/t02d.png';
import t02n from './images/t02n.png';
import t03d from './images/t03d.png';
import t03n from './images/t03n.png';
import t04d from './images/t04d.png';
import t04n from './images/t04n.png';
import t05d from './images/t05d.png';
import t05n from './images/t05n.png';
import u00d from './images/u00d.png';
import u00n from './images/u00n.png';

// JS Imports
import { retrieveData } from './js/retrieveData';
import { postData } from './js/postData';
import { validateDate, validateCountry, validateLocation } from './js/validation';
import { populateCountryList, countries } from './js/Countries';
import { handleSubmit } from './js/formHandler';
import { Weather } from './js/Weather';
import { trips, initTrips } from './js/Trips';
import { dotenv, initDotenv } from './js/Dotenv';
import { API } from './js/API';
import { LoadingCircle } from './js/LoadingCircle';
import {
    initSlideshow,
    navSlides,
    removeImages,
    fitImagesInsideWindow,
    addResizeListener
} from './js/slideshow';

export {
    retrieveData,
    postData,
    validateDate,
    validateCountry,
    validateLocation,
    countries,
    populateCountryList,
    handleSubmit,
    Weather,
    initSlideshow,
    navSlides,
    removeImages,
    fitImagesInsideWindow,
    addResizeListener,
    trips,
    LoadingCircle,
    initTrips,
    dotenv,
    initDotenv,
    API,
    a01d,
    a01n,
    a02d,
    a02n,
    a03d,
    a03n,
    a04d,
    a04n,
    a05d,
    a05n,
    a06d,
    a06n,
    c01d,
    c01n,
    c02d,
    c02n,
    c03d,
    c03n,
    c04d,
    c04n,
    d01d,
    d01n,
    d02d,
    d02n,
    d03d,
    d03n,
    f01d,
    f01n,
    r01d,
    r01n,
    r02d,
    r02n,
    r03d,
    r03n,
    r04d,
    r04n,
    r05d,
    r05n,
    r06d,
    r06n,
    s01d,
    s01n,
    s02d,
    s02n,
    s03d,
    s03n,
    s04d,
    s04n,
    s05d,
    s05n,
    s06d,
    s06n,
    t01d,
    t01n,
    t02d,
    t02n,
    t03d,
    t03n,
    t04d,
    t04n,
    t05d,
    t05n,   
    u00d,
    u00n
}