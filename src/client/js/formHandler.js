'use strict';

import {
    LocationNotFoundException,
    CountryValidationException,
    LocationValidationException,
    DateFormatException,
    DateException
} from "./exceptions";

/**
 * Handles the form submit event.
 * Upon form submission, the names of a country and location
 * is sent via the post route '/api' to the server for
 * processing. Weather data and an image url for the
 * specified location is returned from the server.
 */
export const handleSubmit = (() => {
    window.addEventListener('DOMContentLoaded', () => {
        try {
            document.querySelector('.travelForm').addEventListener('submit', event => {
                event.preventDefault();
                try {
                    const locationField = document.querySelector('.location');
                    const countryField = document.querySelector('.country');
                    const startDateField = document.querySelector('.startDate');
                    const endDateField = document.querySelector('.endDate');

                    validateInputFields(
                        locationField.value,
                        countryField.value,
                        startDateField.value,
                        endDateField.value
                    );
                    
                    Client.LoadingAnimation.show();
                    Client.trips.generateTrip(
                        locationField.value,
                        countryField.value,
                        startDateField.value,
                        endDateField.value
                    ).then(() => {
                        // If the location was found, empty the form.
                        locationField.value = '';
                        countryField.value = '';
                        startDateField.value = '';
                        endDateField.value = '';
                    }).catch (e => {
                        // If no locations were found, catch the error.
                        if (e instanceof LocationNotFoundException) {
                            alert(e.message);
                        } else {
                            console.log('Error', e);
                        }
                    }).finally(() => {
                        Client.LoadingAnimation.hide();
                    });
                } catch (e) {
                    if (e instanceof CountryValidationException
                        || e instanceof LocationValidationException
                        || e instanceof DateFormatException
                        || e instanceof DateException) {
                        alert(e.message);
                    } else {
                        console.log('Error', e);
                    }
                }
            });
        } catch (e) {
            console.log('Error', e);
        }
    });
})();

/**
 * Validates the input fields location, country, startDate and endDate.
 * @param {string} location The destination location. 
 * @param {string} country The destination country.
 * @param {string} startDate The trip's start date.
 * @param {string} endDate The trip's end date.
 * @returns true if the validation succeeds. Otherwise, returns false.
 */
export const validateInputFields = (location, country, startDate, endDate) => {
    try {
        Client.Validate.country(country);
        Client.Validate.location(location);
        Client.Validate.date(startDate, endDate);
    } catch (e) {
        throw e;
    }
}
