const getCountryName = require('../src/server/getCountryName');

describe("Testing converting two-digit country code to country name functionality", () => {
    test("Testing the getCountryName() function", () => {
        expect(getCountryName).toBeDefined();
    });

    test("Testing the getCountryName() function", () => {
        expect(getCountryName('AS')).toBe('American Samoa');
    });
});