import coerce from "semver/functions/coerce";
import valid from "semver/functions/valid";
import satisfies from "semver/functions/satisfies";
import isPast from "date-fns/isPast";
import parseISO from "date-fns/parseISO";

type VersionDate = { version: string; eol: string };
type VersionDates = { [key: string]: VersionDate[] };

export type VersionResult = VersionDate & { lang: string; isEol: boolean };

const versionDates: VersionDates = {
  // https://nodejs.org/en/about/releases/
  // https://endoflife.date/nodejs
  nodejs: [
    { version: "16.x", eol: "2024-04-30" },
    { version: "15.x", eol: "2021-06-01" },
    { version: "14.x", eol: "2023-04-30" },
    { version: "13.x", eol: "2020-06-01" },
    { version: "12.x", eol: "2022-04-30" },
    { version: "10.x", eol: "2021-04-30" },
    { version: "8.x", eol: "2019-12-31" },
  ],
  // https://www.php.net/supported-versions.php
  // https://endoflife.date/php
  php: [
    { version: "7.4.x", eol: "2022-11-28" },
    { version: "7.3.x", eol: "2021-12-06" },
    { version: "7.2.x", eol: "2020-11-30" },
    { version: "7.1.x", eol: "2019-12-01" },
    { version: "7.0.x", eol: "2019-01-01" },
    { version: "5.6.x", eol: "2018-12-31" },
  ],
};

export function getVersion(
  lang?: string,
  version?: string
): VersionResult | null {
  if (!lang || !versionDates[lang]) {
    throw new InvalidArgumentException(`Invalid lang`);
  }

  const coercedVersion = coerce(version);
  if (!version || !coercedVersion || !valid(coercedVersion)) {
    throw new InvalidArgumentException(`Invalid version`);
  }

  const result = versionDates[lang].find((v) =>
    satisfies(coercedVersion, v.version)
  );

  if (!result) {
    return null;
  }

  return {
    ...result,
    lang,
    version,
    isEol: isPast(parseISO(result.eol)),
  };
}

export class InvalidArgumentException {
  constructor(public message: string) {}
  name = "InvalidArgumentException";
  toString = () => `${this.name}: "${this.message}"`;
}
