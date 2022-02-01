/**
 * @jest-environment jsdom
 */
import { postData } from "../src/client/js/postData";

describe("Testing the post route functionality", () => {
    test("Testing the postData() function", () => {
        expect(postData).toBeDefined();
    });
});