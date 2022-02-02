'use strict'
export let dotenv;

/**
 * Retrieves environment variables from the server and stores
 * them inside the class for use in the application.
 */
class Dotenv {
    #dotenv;
    /**
     * Retrieves environment variables from the server and stores
     * them inside the class.
     */
    constructor() {
        Client.retrieveData('/dotenv').then(dotenv => {
            this.#dotenv = dotenv;
        });
    }

    /**
     * Returns the environment variables.
     * @returns The environment variables.
     */
    getDotenv() {
        return this.#dotenv;
    }
}

/**
 * Instantiates the Dotenv class.
 */
export const initDotenv = (() => {
    window.addEventListener('DOMContentLoaded', () => {
        dotenv = new Dotenv();
    });
})();