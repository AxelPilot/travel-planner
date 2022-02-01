const countryCodes = require('./country-codes');

/**
 * After refactoring the code, this method is no longer being used,
 * but I left it in to fulfill the requirement of jest testing
 * at least one method on the express server.
 * @param {*} countryCode Two-digit country code.
 * @returns The corresponding country name.
 */
module.exports = function getCountryName(countryCode) {
    for (let i = 0; i < countryCodes.length; i++) {
        if (countryCodes[i].code == countryCode) {
            return countryCodes[i].name;
        }
    }
}
