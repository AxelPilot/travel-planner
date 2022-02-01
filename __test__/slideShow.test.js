/**
 * @jest-environment jsdom
 */
import {
    initSlideshow,
    navSlides,
    removeImages,
    fitImagesInsideWindow,
    addResizeListener
} from "../src/client/js/slideShow";

describe("Testing slide show functionality", () => {
    test("Testing the initSlideshow() function", () => {
        expect(initSlideshow).toBeDefined();
    });

    test("Testing the navSlides() function", () => {
        expect(navSlides).toBeDefined();
    });

    test("Testing the removeImages() function", () => {
        expect(removeImages).toBeDefined();
    });

    test("Testing the fitImageInsideWindow() function", () => {
        expect(fitImagesInsideWindow).toBeDefined();
    });

    test("Testing the addResizeListener() function", () => {
        expect(addResizeListener).toBeDefined();
    });
});