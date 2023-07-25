describe("Clone", () => {
    const {
        util
    } = require('beeline');

    test("Compare cloned object with integer value",
        () => {
            const value = {
                a: 1
            };
            const result = util.clone(value);

            expect(result).toEqual(value);
            expect(result).not.toBe(value);
            expect(result.a).toBe(value.a);
        });

    test("Compare cloned object with string value",
        () => {
            const value = {
                a: "3"
            };
            const result = util.clone(value);

            expect(result).toEqual(value);
            expect(result).not.toBe(value);
            expect(result.a).toBe(value.a);
        });
});