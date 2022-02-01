'use strict'

import {
    LocationNotFoundException,
} from "./exceptions";

export let trips;

/**
 * 
 */
class Trips {
    #trips = [];
    #selectedTripIndex = 0;
    /**
     * 
     */
    constructor() {
        Client.retrieveData('/savedTrips').then(data => {
            // If one or more trips are saved, store the trips on the client,
            // display the selected trip in the result section view, and
            // populate the saved trips dropdown list.
            if (data.trips.length > 0) {
                this.#trips = data.trips;
                this.#selectedTripIndex = data.selectedIndex;
                this.#displayTrip();
                this.#populateSavedTripsList();
            } else { // If no trips are saved, hide the result and savedTrips sections.
                document.querySelector('.savedTripsSection').style.display = 'none';
                document.querySelector('.resultSection').style.display = 'none';
            }
        });

        // Adds an event listener to update the result section view
        // whenever a new saved trip is selected.
        const savedTripsElement = document.getElementById('savedTrips');
        savedTripsElement.addEventListener('change', () => {
            this.#setSelectedTripIndex(savedTripsElement.value);
        });

        // Adds an event listener to remove the currently selected 
        // trip when the 'Remove Trip' button is clicked.
        document.getElementById('removeTrip').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete the trip?')) {
                // Delete the currently selected trip.
                this.#removeSelectedTrip();
                // Update the result and savedTrip section views.
            }
        });
    }

    /**
     * Generates a new trip based on the supplied data,
     * displays the trip data in the result section view,
     * and updates the saved trips dropdown list.
     * @param {*} location Trip location.
     * @param {*} country Trip country.
     * @param {*} startDate Departure date.
     * @param {*} endDate Return date.
     * @returns An empty object on success.
     */
    async generateTrip(location, country, startDate, endDate) {
        const data = await Client.API.getCoordinates(country, location);
        if (data.geonames.length === 0) {
            // If no locations were found, throw an error.
            throw new LocationNotFoundException('Location not found.');
        } else {
            const wxData = await Client.API.getWxForecast(
                data.geonames[0].lat,
                data.geonames[0].lng
            );
            const photoData = await Client.API.getPhotoURL(country, location);
            this.#insertTrip({
                startDate: startDate,
                endDate: endDate,
                location: location,
                country: country,
                photo: photoData,
                wx: wxData
            });
            this.#displayTrip();
            this.#populateSavedTripsList();
            return {};
        }
    }

    /**
     * Inserts trip into the trips array in sorted order,
     * both on client and server.
     * @param {*} trip 
     * @param {*} compare 
     */
    #insertTrip(trip, compare = this.#compare) {
        let i = 0;
        while (i < this.#trips.length && compare(this.#trips[i], trip) < 0) {
            i++;
        }

        // Inserts trip on client.
        this.#trips.splice(i, 0, trip);

        //Sends trip to server for insertion.
        Client.postData('/saveTrip', { trip: trip, index: i });
        this.#selectedTripIndex = i;
    }

    /**
     * Defines the sort order (for the method 'insertTrip').
     * @param {*} a The first element for comparison.
     * @param {*} b The second element for comparison.
     * @returns -1 if a < b, 0 if a == b or 1 if a > b.
     */
    #compare(a, b) {
        const a_countryName = Client.countries.getCountryName(a.country);
        const b_countryName = Client.countries.getCountryName(b.country);

        if (a.startDate < b.startDate) {
            return -1;
        }
        if (a.startDate > b.startDate) {
            return 1;
        }
        if (a.location == '' && b.location == '') {
            if (a_countryName < b_countryName) {
                return -1;
            }
            if (a_countryName > b_countryName) {
                return 1;
            }
        } else if (a.location == '') {
            if (a_countryName < b.location) {
                return -1;
            }
            if (a_countryName > b.location) {
                return 1;
            }
        } else if (b.location == '') {
            if (a.location < b_countryName) {
                return -1;
            }
            if (a.location > b_countryName) {
                return 1;
            }
        }
        if (a.location < b.location) {
            return -1;
        }
        if (a.location > b.location) {
            return 1;
        }
        if (a_countryName < b_countryName) {
            return -1;
        }
        if (a_countryName > b_countryName) {
            return 1;
        }
        return 0;
    }

    /**
     * Removes the currently selected trip,
     * both on client and server.
     */
    #removeSelectedTrip() {
        if (this.#trips.length > 0) {
            this.#trips.splice(this.#selectedTripIndex, 1); // Remove trip from client.
            Client.postData('/removeTrip', { // Remove trip from server.
                index: this.#selectedTripIndex
            }).then(data => {
                this.#selectedTripIndex = data.index;

                if (this.#trips.length > 0) {
                    this.#displayTrip();
                    this.#populateSavedTripsList();
                } else { // If no trips are saved, hide result and savedTrip sections.
                    document.querySelector('.savedTripsSection').style.display = 'none';
                    document.querySelector('.resultSection').style.display = 'none';
                }
            }).catch(e => {
                console.log('Error', e);
            })
        }
    }

    /**
     * Displays the trip information in the result section view.
     */
    #displayTrip() {
        document.querySelector('.resultSection').style.display = 'block';

        const locationName = this.#trips[this.#selectedTripIndex].location;
        const countryName = Client.countries.getCountryName(this.#trips[this.#selectedTripIndex].country);
        const startDate = new Date(this.#trips[this.#selectedTripIndex].startDate);
        const endDate = new Date(this.#trips[this.#selectedTripIndex].endDate);
        const wx = this.#trips[this.#selectedTripIndex].wx;

        // Start slideshow (if at least one photo is found). 
        Client.initSlideshow(
            document.querySelector('.imageContainer'),
            this.#trips[this.#selectedTripIndex].photo.hits, 10000
        );

        const duration = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
        const daysFromNow = Math.ceil((startDate - Date.now()) / (1000 * 60 * 60 * 24));

        let comma = locationName != '' ? ', ' : '';
        document.querySelector('.tripTitleHdg').textContent =
            `${locationName}${comma}${countryName}`;

        let nights = duration == 1 ? 'night' : 'nights';
        document.querySelector('.tripSubTitle').innerHTML =
            `Departing: ${startDate.toLocaleDateString()}<br>` +
            `Duration: ${duration} ${nights}`;

        let days = daysFromNow == 0 ? 'today' : daysFromNow == 1 ? 'tomorrow' : 'days away';
        document.querySelector('.tripBody').innerHTML =
            `Your trip to ${locationName}${comma}${countryName} is ` +
            `${daysFromNow != 0 && daysFromNow != 1 ? daysFromNow : ''} ${days}`;

        document.querySelector('.tripWxTitle').textContent = 'Weather forecast for the next 16 days';

        const weather = new Client.Weather(wx);
        weather.displayForecast(document.querySelector('.tripWxBody'));
    }

    /**
     * Populate dropdown list with all saved trips.
     */
    #populateSavedTripsList() {
        if (this.#trips.length > 0) {
            const fragment = document.createDocumentFragment();
            this.#trips.forEach((trip, index) => {
                const newElement = document.createElement('option');
                newElement.value = index;
                const comma = trip.location != '' ? ', ' : '';
                newElement.textContent = `${trip.startDate} - ${trip.location}${comma}` +
                    `${Client.countries.getCountryName(trip.country)}`;
                if (index == this.#selectedTripIndex) {
                    newElement.selected = true;
                }
                fragment.appendChild(newElement);
            });
            document.getElementById('savedTrips').innerHTML = '';
            document.getElementById('savedTrips').appendChild(fragment);
            document.querySelector('.savedTripsSection').style.display = 'block';
        }
    }

    /**
     * 
     * @param {*} index 
     */
    #setSelectedTripIndex(index) {
        this.#selectedTripIndex = index;
        Client.postData('/setSelectedIndex', { index: this.#selectedTripIndex });
        this.#displayTrip();
    }
}

/**
 * Initializes the trips object.
 */
export const initTrips = (() => {
    window.addEventListener('DOMContentLoaded', () => {
        trips = new Trips();
    });
})();
