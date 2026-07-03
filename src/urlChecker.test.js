import { describe, expect, test } from "vitest";
import { checkValidUrl, mockServerCheck } from "./urlChecker.js";

describe("checkValidUrl", () =>{
    test("accepts valid http and https URLs", () =>{
        expect(checkValidUrl("https://example.com")).toBe(true);
        expect(checkValidUrl("http://example.com")).toBe(true);
    });

    test("rejects invalid URLs and unsupported protocols", () => {
        expect(checkValidUrl("hello")).toBe(false);
        expect(checkValidUrl("")).toBe(false);
        expect(checkValidUrl("ftp://example.com")).toBe(false);
    });
});

describe("mockServerCheck", () =>{
    test("returns type file if file URL exists", async () =>{
        const result = await mockServerCheck("https://example.com/file.txt");
        expect(result).toEqual({
            exists: true,
            type: "file"
        });
    });

    test("returns type folder if folder URL exists", async () =>{
        const result = await mockServerCheck("https://example.com/docs/");

        expect(result).toEqual({
            exists: true,
            type: "folder"
        });
    });

    test("returns false for unknown URL", async () =>{
        const result = await mockServerCheck("https://unknown.com");

        expect(result).toEqual({
            exists: false,
            type: null
        });
    });

});

