'use strict';

/**
 * Administers weather data from the Weatherbit.io API.
 */
export class Weather {
    #wxRawData;
    /**
     * Stores the weather data.
     * @param {*} wxRawData Weather data from the Weatherbit.io API.
     */
    constructor(wxRawData) {
        this.#wxRawData = wxRawData;
    }

    /**
     * Displays a 16-day weather forecast.
     * @param parentElement The parent element.
     */
    displayForecast(parentElement) {
        const fragment = document.createDocumentFragment();
        const offset = 8;
        const today = new Date();

        // Remove any previously displayed weather forecasts.
        parentElement.innerHTML = '';

        for (let i = 0; i < 2; i++) {
            const weekDiv = document.createElement('div');
            weekDiv.className = 'tripWxWeek';

            for (let j = 0 + (offset * i); j < 8 + (offset * i); j++) {
                if (j >= 16) {
                    break;
                }

                const date = new Date();
                date.setDate(today.getDate() + j);

                const dayDiv = document.createElement('div');
                const dateDiv = document.createElement('div');
                const iconDiv = document.createElement('div');
                const highTempDiv = document.createElement('div');
                const lowTempDiv = document.createElement('div');
                dayDiv.className = 'tripWxDay';
                dateDiv.textContent = `${date.getDate()}/${date.getMonth() + 1}`;
                iconDiv.innerHTML = this.#interpretWeather(j);
                highTempDiv.textContent = `${Math.round(this.#wxRawData.data[j].high_temp)}°`;
                lowTempDiv.textContent = `${Math.round(this.#wxRawData.data[j].low_temp)}°`;
                dayDiv.appendChild(dateDiv);
                dayDiv.appendChild(iconDiv);
                dayDiv.appendChild(highTempDiv);
                dayDiv.appendChild(lowTempDiv);
                weekDiv.appendChild(dayDiv); 
            }
            fragment.appendChild(weekDiv);
        }
        parentElement.appendChild(fragment);
    }

    /**
     * Interprets weather raw data from the Weatherbit API.
     * @returns Interpreted weather forecast.
     * @returns The url to the appropriate weather icon.
     */
    #interpretWeather(day) {
        return `<img src="${this.#wxRawData.data[day].weather.icon}.png" class="wxIcon" ` +
            `title="${this.#wxRawData.data[day].weather.description}">`;
    }
}
