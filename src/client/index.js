'use strict';

// SCSS Imports
import './styles/resets.scss';
import './styles/base.scss';
import './styles/header.scss';
import './styles/form.scss';
import './styles/savedTripsForm.scss';
import './styles/results.scss';
import './styles/slideShow.scss'
import './styles/footer.scss';

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
    initTrips,
    dotenv,
    initDotenv,
    API,
}
