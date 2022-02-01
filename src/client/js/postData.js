'use strict';
/**
 * Post data to the server.
 * @param {string} url post route.
 * @param {Object} data to be posted to the server.
 * @returns server response.
 */
export const postData = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    } catch (e) {
        console.log('Error', e);
    }
}
