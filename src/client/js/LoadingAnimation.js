'use strict';

/**
 * 
 */
export class LoadingAnimation {
    /**
     * 
     */
    static show() {
        document.querySelector('.overlay').style.display = 'block';
    }

    /**
     * 
     */
    static hide() {
        document.querySelector('.overlay').style.display = 'none';
    }
}

