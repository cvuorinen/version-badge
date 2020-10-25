import coerce from "semver/functions/coerce";
import valid from "semver/functions/valid";
import satisfies from "semver/functions/satisfies";
import isPast from "date-fns/isPast";
import parseISO from "date-fns/parseISO";
import { Version, versions } from "./versions";

export type VersionResult = Version & { lang: string; isEol: boolean };

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

  return {
    ...result,
    lang,
    isEol: isPast(parseISO(result.eol)),
  };
}

export class InvalidArgumentException {
  constructor(public message: string) {}
  name = "InvalidArgumentException";
  toString = () => `${this.name}: "${this.message}"`;
}
