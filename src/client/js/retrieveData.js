'use strict';
/**
 * Retrieve data from the server.
 * @param {string} url get route.
 * @returns data retrieved from the server.
 */
export const retrieveData = async (url = '') => {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (e) {
        console.log('error', e);
    }
};
