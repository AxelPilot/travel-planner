/**
 * @jest-environment jsdom
 */
import {
    validateInputFields
} from "../src/client/js/formHandler";

describe("", () => {
    test("Testing the validateInputFields() function", () => {
        expect(validateInputFields).toBeDefined();
    });
});