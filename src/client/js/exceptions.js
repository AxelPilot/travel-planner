/**
 * Location Not Found Exception.
 * @param {string} message Exception message.
 */
 export class LocationNotFoundException {
    constructor(message) {
        this.message = message;
        this.name = 'LocationNotFoundException';
    }
}

/**
 * Location Validation Exception.
 * @param {string} message Exception message.
 */
 export class LocationValidationException {
    constructor(message) {
        this.message = message;
        this.name = 'LocationValidationException';
    }
}

/**
 * Country Validation Exception.
 * @param {string} message Exception message.
 */
export class CountryValidationException {
    constructor(message) {
        this.message = message;
        this.name = 'CountryValidationException';
    }
}

/**
 * Date Format Exception.
 * @param {string} message Exception message.
 */
export class DateFormatException {
    constructor(message) {
        this.message = message;
        this.name = 'DateFormatException';
    }
}

/**
 * Date Exception.
 * @param {string} message Exception message.
 */
export class DateException {
    constructor(message) {
        this.message = message;
        this.name = 'DateException';
    }
}
