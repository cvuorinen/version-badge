import addMonths from "date-fns/addMonths";
import format from "date-fns/format";
import { getVersion, InvalidArgumentException } from "./get-version";
import { versions } from "./versions";

jest.mock("./versions", () => ({ versions: {} }));

const nextYear = format(addMonths(new Date(), 12), 'yyyy-MM-dd');
const nextMonth = format(addMonths(new Date(), 1), 'yyyy-MM-dd');

describe("getVersion", () => {
  beforeEach(() => {
    versions.foo = [
      { version: "3", eol: "current" },
      { version: "2.x", eol: nextYear },
      { version: "1.2.3", eol: nextMonth },
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
  });

  describe("version check", () => {
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
  });

  describe("version matching", () => {
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
  });

  describe("eol check", () => {
    it.each([
      ["v1.1", "2020-02-02", true],
      ["v1.2.3", nextMonth, false],
      ["v2", nextYear, false],
      ["v3", "current", false],
    ])('should return correct isEol for version "%s"', (version, expectedEol, expectedIsEol) => {
      const result = getVersion("foo", version);

      expect(result).not.toEqual(null);
      expect(result!.eol).toEqual(expectedEol);
      expect(result!.isEol).toEqual(expectedIsEol);
    });

    it.each([
      ["v1.1"],
      ["v2"],
      ["v3"],
    ])('should not be near eol when eol past or not within 6 months (version "%s")', version => {
      const result = getVersion("foo", version);

      expect(result).not.toEqual(null);
      expect(result!.isNearEol).toEqual(false);
    });


    it("should be near eol when eol within 6 months", () => {
      const result = getVersion("foo", "v1.2.3");

      expect(result).not.toEqual(null);
      expect(result!.isNearEol).toEqual(true);
    });
  });
});
