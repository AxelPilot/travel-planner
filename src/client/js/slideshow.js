/**
 * Makes a slideshow.
 * Attribution: Slideshow code is based on:
 * https://www.w3schools.com/howto/howto_js_slideshow.asp
 */

/**
 * Global variables.
 */
const imgWidth = 550;
const imgPadding = 15;

let slideIndex = 0;
let slideshowID;
let slideshowInterval;

/**
 * Inserts images into the parent element. If more than
 * one image is supplied, a slideshow is made.
 * @param {Element} parentElement The parent element.
 * @param {Array} images The images.
 * @param {number} interval Slideshow autoplay interval.
 */
export const initSlideshow = (parentElement, images, interval, maxSlides = 10) => {
    if (images.length == 1) { // If only one image is found, display the image.
        if (slideshowID) { // Stop any prevoiusly running slide shows.
            clearInterval(slideshowID);
        }
        parentElement.innerHTML = 
            `<div><div><img class="image" src="${images[0].largeImageURL}">` +
            `</div><div class="column-filler-div"></div></div>` +
            `<div class="row-filler-div"></div>`;
    } else if (images.length > 1) { // If more than one image is found, make a slideshow.
        removeImages(parentElement); // Remove any previously displayed images.

        const outerContainerDiv = document.createElement('div');
        outerContainerDiv.className = 'outer-slideshow-container';

        const innerContainerDiv = document.createElement('div');
        innerContainerDiv.className = 'inner-slideshow-container';

        // Max 'maxSlides' images in the slideshow.
        let length = images.length > maxSlides ? maxSlides : images.length;
        for (let i = 0; i < length; i++) { // Build the slideshow.
            const div = document.createElement('div');
            const img = document.createElement('img');
            div.classList.add('slides', 'fade');;
            div.style.display = 'none';
            img.src = `${images[i].largeImageURL}`;
            img.className = 'image'
            div.appendChild(img);
            innerContainerDiv.appendChild(div);
        }

        // Next and previous buttons.
        const prev = document.createElement('a');
        const next = document.createElement('a');
        prev.className = 'prev';
        next.className = 'next';
        prev.innerHTML = '&#10094;';
        next.innerHTML = '&#10095;';
        prev.setAttribute('onclick', 'Client.navSlides(-1)')
        next.setAttribute('onclick', 'Client.navSlides(1)')
        innerContainerDiv.appendChild(prev);
        innerContainerDiv.appendChild(next);
        outerContainerDiv.appendChild(innerContainerDiv);

        const columnFillerDiv = document.createElement('div');
        columnFillerDiv.className = 'column-filler-div';
        outerContainerDiv.appendChild(columnFillerDiv);
        parentElement.appendChild(outerContainerDiv);

        const rowFillerDiv = document.createElement('div');
        rowFillerDiv.className = 'row-filler-div';
        parentElement.appendChild(rowFillerDiv);

        slideIndex = 0;
        slideshowInterval = interval;
        slideShowAuto(); // Display the first image in the slideshow.
        if (slideshowID) { // Stop any prevoiusly running slide shows.
            clearInterval(slideshowID);
        }
        slideshowID = setInterval(slideShowAuto, interval); // Autoplay slideshow.

        // Make images fit on smaller screen sizes.
        const imageElements = document.getElementsByClassName('image');
        fitImagesInsideWindow(imageElements, imgWidth, imgPadding);
        addResizeListener(imageElements, imgPadding);
    } else { // If no photos were found, remove any previously displayed photos.
        removeImages(parentElement);
    }
}

/**
 * Next/previous controls
 * @param {number} n -1 = previous image / +1 = next image.
 */
export const navSlides = (n) => {
    if (slideshowID) { // Stop slide show autoplay.
        clearInterval(slideshowID);
    }
    slideShowManual(slideIndex += n);
    slideshowID = setInterval(slideShowAuto, slideshowInterval); // Resume slideshow autoplay.
}

/**
 * Displays the autoplaying slideshow.
 */
const slideShowAuto = () => {
    const slides = document.getElementsByClassName('slides');
    Array.from(slides).forEach(slide => {
        slide.style.display = 'none';
    });
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = 'block';
}

/**
 * Displays the current slide.
 * @param {number} n Current slide.
 */
const slideShowManual = (n) => {
    const slides = document.getElementsByClassName('slides');
    Array.from(slides).forEach(slide => {
        slide.style.display = 'none';
    });
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    slides[slideIndex - 1].style.display = 'block';
}

/**
 * Removes all elements, including images, from the parent element.
 * @param {Element} parentElement The parent element.
 */
export const removeImages = (parentElement) => {
    parentElement.innerHTML = '';
}

/**
 * If the width of the window is smaller than the width of
 * the image (+ padding), the image is resized to fit inside the window.
 * @param {Element} image The image element.
 * @param {number} imgWidth The width of the image in pixels.
 * @param {number} padding Padding around the image.
 */
export const fitImagesInsideWindow = (images, imgWidth, padding) => {
    Array.from(images).forEach(image => {
        if (window.innerWidth < imgWidth + (padding * 2)) {
            image.width = (window.innerWidth - (padding * 2));
        }
    });
}

/**
 * Adds an event listener to the window's resize event. If the width
 * of the window is resized to be smaller than the width of the image
 * (+ padding), the image is resized to fit inside the window.
 * @param {Element} image The image element.
 * @param {number} padding Padding around the image.
 */
export const addResizeListener = (images, padding) => {
    window.addEventListener('resize', () => {
        Array.from(images).forEach(image => {
            if (window.innerWidth < image.naturalWidth + (padding * 2)) {
                image.width = (window.innerWidth - (padding * 2));
            }
        });
    });
}
