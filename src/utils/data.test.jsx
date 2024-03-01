import { assert, describe } from "vitest";
import { checkEmptyObject } from "./data";

describe("Unit Test - checkEmptyObject", () => {
    it("Empty object", () => {
        assert.equal(checkEmptyObject({}), true)
    })

    it("Not empty object", () => {
        assert.equal(checkEmptyObject({id:1}), false)
    })
})