/**
 * @jest-environment jsdom
 */
import {
    validateCountry,
    validateLocation,
    validateDate
} from "../src/client/js/validation";

describe("Testing input validation functionality", () => {
    test("Testing the validateCountry() function", () => {
        expect(validateCountry).toBeDefined();
    });

    test("Testing the validateLocation() function", () => {
        expect(validateLocation).toBeDefined();
    });

    test("Testing the validateDate() function", () => {
        expect(validateDate).toBeDefined();
    });
});