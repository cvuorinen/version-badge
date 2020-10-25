# Version Badge

Create badges to display if a given version of a programming language, framework etc. is still supported
or if it's EOL (end-of-life).

![lang 0.1](https://img.shields.io/badge/lang%200.1-2020--01--01-red)
![example 2.0](https://img.shields.io/badge/example%202.0-2030--01--01-green?style=flat-square)

Supported products and version ranges can be seen in [versions.ts](src/versions.ts). If there are some versions
missing or you don't find a programming language/framework you would like to use it with, PRs are welcome.

Version Badge exposes 3 endpoints that are run as Netlify Functions.

All endpoints require two parameters, `lang` and `version`.

* `lang`: name of the language/framework (as written in [versions.ts](src/versions.ts))
* `version`: [semver](https://www.npmjs.com/package/semver) compatible version identifier, for example `1.2.3`, `2.5`, `4.6.x`, `>=1.0.0`, `v2` etc.

## Badgen

Returns [Badgen](https://badgen.net/) compatible data to generate a live badge image.

Endpoint: `https://version-badge.netlify.app/badgen/:lang/:version`

Combine with `https://badgen.net/https` prefix and without `https://`.
Use `https://flat.badgen.net/https` prefix for flat badge image style.

More information about using Badgen with custom endpoint: https://badgen.net/https

Note, remember to URL encode any characters that require it, e.g. `>=`

### Examples

`![php 7.1](https://badgen.net/https/version-badge.netlify.app/badgen/php/7.1)`<br>
![php 7.1](https://badgen.net/https/version-badge.netlify.app/badgen/php/7.1)

`![nodejs 16](https://flat.badgen.net/https/version-badge.netlify.app/badgen/nodejs/%3E%3D16.0.1)`<br>
![nodejs 16](https://flat.badgen.net/https/version-badge.netlify.app/badgen/nodejs/%3E%3D16.0.1)


## Shields IO

Returns [Shields IO](https://shields.io/) compatible data to generate a live badge image.

Endpoint: `https://version-badge.netlify.app/shields/:lang/:version`

Combine with `https://img.shields.io/endpoint` and provide version-badge endpoint as `url` query parameter.
Add `style` query parameter to use a different badge image style (see https://shields.io/#styles for available styles).

More information about using Shields IO with custom endpoint: https://shields.io/endpoint

Remember to URL encode the version badge URL as it is used as a query parameter.<br>
Note, any characters that require URL encoding in the version badge URL need to be
double encoded, e.g. `>=` (see examples).

### Examples

`![php 7.1](https://img.shields.io/endpoint?url=https%3A%2F%2Fversion-badge.netlify.app%2Fshields%2Fphp%2F7.1)`<br>
![php 7.1](https://img.shields.io/endpoint?url=https%3A%2F%2Fversion-badge.netlify.app%2Fshields%2Fphp%2F7.1)


`![nodejs 16](https://img.shields.io/endpoint?style=flat-square&url=https%3A%2F%2Fversion-badge.netlify.app%2Fshields%2Fnodejs%2F%253E%253D16)`<br>
![nodejs 16](https://img.shields.io/endpoint?style=flat-square&url=https%3A%2F%2Fversion-badge.netlify.app%2Fshields%2Fnodejs%2F%253E%253D16)


## Version EOL

Returns EOL informations as JSON. Can be used to create custom implementations of version EOL check.
For example if you want to integrate it in a CI pipeline etc.

Endpoint: https://version-badge.netlify.app/version-eol

Response format:

```ts
type VersionResult = {
    lang: string;
    version: string;
    eol: DateString | "current"; // Date string as YYYY-MM-DD
    isEol: boolean;
}
```

Can be called with either GET or POST request.

With GET request, provide `lang` and `version` as query parameters.

With POST request, send JSON body with an object that has keys `lang` and `version`.

### Examples

`GET https://version-badge.netlify.app/version-eol?lang=nodejs&version=16.0`

`POST https://version-badge.netlify.app/version-eol`<br>
With body `{ "lang": "nodejs", "version": "16.0" }`

Response:

```json
{
    "version": "16.x",
    "eol": "2024-04-30",
    "lang": "nodejs",
    "isEol": false
}
```
