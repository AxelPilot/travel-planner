'use strict';

import {
    CountryValidationException,
    LocationValidationException,
    DateFormatException,
    DateException
} from "./exceptions";

export class Validate {
    /**
     * Validates a two-digit country code with a regular expression.
     * @param {string} country Two-digit country code.
     */
    static country(country) {
        if (country == '') {
            throw new CountryValidationException('Please select a country.');
        }    

        if (country != '' && !/^[a-zA-Z]{2}$/.test(country)) {
            throw new CountryValidationException('You have entered an invalid country name.');
        }    
    }

    /**
     * Validates a location name with a regular expression.
     * @param {string} location Location name.
     */
    static location(location) {
        if (location != '' && !/^[a-zA-ZæøåÆØÅäÄâÂçÇéÉèÈêÊíÍìÌîÎïÏñÑöÖóÓòÒôÔûÛüÜùÙ´'` \-]*$/.test(location)) {
            throw new LocationValidationException('You have entered an invalid location name.');
        }    
    }

    /**
     * Validates a date with a regular expression, YYYY-MM-DD or YYYY-M-D.
     * @param {string} startDate Departure date to be validated.
     * @param {string} endDate Return date to be validated.
     * @returns true if validation succeeds, otherwise false.
     */
    static date(startDate, endDate) {
        if (!/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(startDate)) {
            throw new DateFormatException('You have entered an invalid departure date.');
        }

        if (!/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(endDate)) {
            throw new DateFormatException('You have entered an invalid return date.');
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const now = new Date();

        if (Math.floor(start / (1000 * 60 * 60 * 24)) < Math.floor(now / (1000 * 60 * 60 * 24))
            || Math.floor(end / (1000 * 60 * 60 * 24)) < Math.floor(now / (1000 * 60 * 60 * 24))) {
            throw new DateException('The date must be in the future.');
        }

        if (end <= start) {
            throw new DateException('The return date must be after the departure date.');
        }
    }
}
