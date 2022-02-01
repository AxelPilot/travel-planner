'use strict';

/**
 * 
 */
export class API {
    /**
     * Retrieve the latitude and longitude coordinates for a given city.
     * @param {string} city 
     * @param {string} country 
     * @returns the latitude and longitude for a given city.
     */
    static async getCoordinates(country, location) {
        // If no location is given, search based on country only.
        // && country != 'AS' corrects for a bug in the geonames.org API.
        if (location == '' && country != 'AS') {
            try {
                return await Client.retrieveData(`https://secure.geonames.org/searchJSON` + 
                    `?formatted=true&country=${encodeURIComponent(country)}` +
                    `&maxRows=10&username=${Client.dotenv.getDotenv().geonames_username}&style=full`);
            } catch (e) {
                console.log('Error', e);
            }
        } else { // Search for location, based on country and location.
            
            // Correcting for a bug in the geonames.org API.
            if (location == '' && country == 'AS') {
                location = 'Pago Pago';
            }
            try { 
                return await Client.retrieveData(`https://secure.geonames.org/searchJSON` + 
                    `?formatted=true&name=${encodeURIComponent(location)}` + 
                    `&country=${encodeURIComponent(country)}&maxRows=10` + 
                    `&username=${Client.dotenv.getDotenv().geonames_username}&style=full`);
            } catch (e) {
                console.log('Error', e);
            }
        }
    }

    /**
     * Retrieve a 16-day weather forecast from the Weatherbit API.
     * @param {number} lat Latitude.
     * @param {number} lon Longitude.
     * @returns a 16-day weather forecast from the Weatherbit API.
     */
    static async getWxForecast(lat, lon) {
        try {
            return await Client.retrieveData('https://api.weatherbit.io/v2.0/forecast/daily/?' + 
                `key=${Client.dotenv.getDotenv().weatherbit_API_KEY}&lang=en&units=M&days=16&lat=${lat}&lon=${lon}`);
        } catch (e) {
            console.log('Error', e);
        }
    }

    /**
     * Search for an image from a specified location, using the Pixabay API.
     * @param {string} location 
     * @param {string} country 
     * @returns an image URL.
     */
    static async getPhotoURL(country, location) {
        let data;

        // Correcting for wrong search results from the Pixabay API.
        if (country == 'AS' && location.toLowerCase() == 'pago pago') {
            location = '';
        }

        const locationName = encodeURIComponent(location);
        const countryName = encodeURIComponent(Client.countries.getCountryName(country));

        try {
            // Search for images based on location and country.
            data = await Client.retrieveData(
                'https://pixabay.com/api/?' +
                `key=${Client.dotenv.getDotenv().pixabay_API_KEY}&q=${countryName}+${locationName}` +
                `&image_type=photo&orientation=horizontal&order=popular&category=places`
            );
            if (data.hits.length > 0) {
                return data;
            } else {
                // ...If no images were found, search again based on location and country,
                // but WITHOUT 'category=places'.
                data = await Client.retrieveData(
                    'https://pixabay.com/api/?' +
                    `key=${Client.dotenv.getDotenv().pixabay_API_KEY}&q=${countryName}+${locationName}` +
                    `&image_type=photo&orientation=horizontal&order=popular`
                );
                if (data.hits.length > 0) {
                    return data;
                } else {
                    if (locationName != '') {
                        // ...If no images were found, search again based on location only.
                        // (If no location is entered, this step is skipped).
                        data = await Client.retrieveData(
                            'https://pixabay.com/api/?' +
                            `key=${Client.dotenv.getDotenv().pixabay_API_KEY}&q=${locationName}` +
                            '&image_type=photo&orientation=horizontal&order=popular'
                        );
                    }
                    if (data.hits.length > 0) {
                        return data;
                    } else {
                        // ...If no images were found, search again based on country only.
                        return await Client.retrieveData(
                            'https://pixabay.com/api/?' +
                            `key=${Client.dotenv.getDotenv().pixabay_API_KEY}&q=${countryName}` +
                            '&image_type=photo&orientation=horizontal&order=popular'
                        );
                    }
                }
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
}