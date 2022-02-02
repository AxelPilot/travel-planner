'use strict';
export let countries;

/**
 * Retrieves a list of two-digit country codes and corresponding 
 * country names from the server, and stores the list inside the
 * class for use in the application.
 */
class Countries {
     #countries;
    /**
     * Build dropdown list with all the countries in the world.
     */
    constructor() {
        Client.retrieveData('/countryCodes').then(countries => {
            this.#countries = countries;

            // Build dropdown list with all the countries in the world.
            const fragment = document.createDocumentFragment();
            this.#countries.forEach(country => {
                const newElement = document.createElement('option');
                newElement.value = country.code;
                newElement.textContent = country.name;
                fragment.appendChild(newElement);
            });
            document.getElementById('country').appendChild(fragment);
        });
    }

    /**
     * Takes a two-digit country code and returns the
     * corresponding country name.
     * @param countryCode two-digit country code.
     * @returns the name of the country.
     */
    getCountryName(countryCode) {
        for (let i = 0; i < this.#countries.length; i++) {
            if (this.#countries[i].code == countryCode) {
                return this.#countries[i].name;
            }
        }
    }

    /**
     * 
     * @returns A list of all country codes with corresponding country names.
     */
    getCountries() {
        return this.#countries;
    }
}

/**
 * Build dropdown list with all the countries in the world.
 */
export const populateCountryList = (() => {
    window.addEventListener('DOMContentLoaded', () => {
        countries = new Countries();
    });
})();

