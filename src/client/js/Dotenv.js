'use strict'
export let dotenv;

/**
 * 
 */
class Dotenv {
    #dotenv;
    /**
     * 
     */
    constructor() {
        Client.retrieveData('/dotenv').then(dotenv => {
            this.#dotenv = dotenv;
        });
    }

    getDotenv() {
        return this.#dotenv;
    }
}

export const initDotenv = (() => {
    window.addEventListener('DOMContentLoaded', () => {
        dotenv = new Dotenv();
    });
})();