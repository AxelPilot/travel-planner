/**
 * @jest-environment jsdom
 */
import { retrieveData } from "../src/client/js/retrieveData";

describe("Testing the get route functionality", () => {
    test("Testing the retrieveData() function", () => {
        expect(retrieveData).toBeDefined();
    });
});