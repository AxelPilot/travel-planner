import {
    API
} from "../src/client/js/API";

describe("Testing converting two-digit country code to country name functionality", () => {
    test("Testing the getCoordinates() function", () => {
        expect(API.getCoordinates).toBeDefined();
    });

    test("Testing the getWxForecast() function", () => {
        expect(API.getWxForecast).toBeDefined();
    });

    test("Testing the getPhotoURL() function", () => {
        expect(API.getPhotoURL).toBeDefined();
    });

});