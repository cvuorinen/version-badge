import coerce from "semver/functions/coerce";
import valid from "semver/functions/valid";
import satisfies from "semver/functions/satisfies";
import isPast from "date-fns/isPast";
import parseISO from "date-fns/parseISO";
import subMonths from "date-fns/subMonths";
import { CURRENT, Version, versions } from "./versions";

export type VersionResult = Version & { lang: string; isEol: boolean; isNearEol: boolean };

export function getVersion(
  lang?: string,
  version?: string
): VersionResult | null {
  if (!lang || !versions[lang]) {
    throw new InvalidArgumentException(`Invalid lang`);
  }

  const coercedVersion = coerce(version);
  if (!version || !coercedVersion || !valid(coercedVersion)) {
    throw new InvalidArgumentException(`Invalid version`);
  }

  const result = versions[lang].find((v) =>
    satisfies(coercedVersion, v.version)
  );

  if (!result) {
    return null;
  }

  const isEol = result.eol !== CURRENT && isPast(parseISO(result.eol));
  const isNearEol = result.eol !== CURRENT && !isEol && isPast(subMonths(parseISO(result.eol), 6));

  return {
    ...result,
    lang,
    isEol,
    isNearEol
  };
}

export class InvalidArgumentException {
  constructor(public message: string) {}
  name = "InvalidArgumentException";
  toString = () => `${this.name}: "${this.message}"`;
}
