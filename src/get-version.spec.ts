import { getVersion, InvalidArgumentException } from "./get-version";
import { versions } from "./versions";

jest.mock("./versions", () => ({ versions: {} }));

describe("getVersion", () => {
  beforeEach(() => {
    versions.foo = [
      { version: "3", eol: "current" },
      { version: "2.x", eol: "2030-03-03" },
      { version: "1.1.x", eol: "2020-02-02" },
    ];
  });

  describe("lang check", () => {
    it("should throw when lang missing", () => {
      expect(() => getVersion()).toThrowWithMessage(
        InvalidArgumentException,
        "Invalid lang"
      );
    });

    it("should throw when lang is invalid", () => {
      expect(() => getVersion("x")).toThrowWithMessage(
        InvalidArgumentException,
        "Invalid lang"
      );
    });

    it("should throw when version is missing", () => {
      expect(() => getVersion("foo")).toThrowWithMessage(
        InvalidArgumentException,
        "Invalid version"
      );
    });

    it("should throw when version is invalid", () => {
      expect(() => getVersion("foo", "foo")).toThrowWithMessage(
        InvalidArgumentException,
        "Invalid version"
      );
    });

    it.each([
      "0",
      "0.1",
      "1.0",
      "1.0.1",
      "1",
      "1.2",
      "4",
      "4.3.2",
      "<1.0 || >=4.0",
    ])('should return null when version not matched "%s"', (version) => {
      const result = getVersion("foo", version);

      expect(result).toEqual(null);
    });

    it.each([
      ["1.1", "1.1.x"],
      ["v1.1", "1.1.x"],
      ["1.1.10", "1.1.x"],
      ["1.1.1.1", "1.1.x"],
      ["~1.1", "1.1.x"],
      ["^1.1.1", "1.1.x"],
      ["v2", "2.x"],
      ["2", "2.x"],
      ["2.x", "2.x"],
      [">=2.0", "2.x"],
      [">2.2 <3", "2.x"],
      [">=3.9", "3"],
    ])('should match version "%s" to "%s"', (inputVersion, resultVersion) => {
      const result = getVersion("foo", inputVersion);

      expect(result).not.toEqual(null);
      expect(result!.version).toEqual(resultVersion);
    });

    it.each([
      ["v1.1", "2020-02-02", true],
      ["v2", "2030-03-03", false],
      ["v3", "current", false],
    ])('should return isEol for version "%s"', (version, expectedEol, expectedIsEol) => {
      const result = getVersion("foo", version);

      expect(result).not.toEqual(null);
      expect(result!.eol).toEqual(expectedEol);
      expect(result!.isEol).toEqual(expectedIsEol);
    });
  });
});
