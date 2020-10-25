export type DateString = string; // YYYY-MM-DD
export type Version = { version: string; eol: DateString };
export type Versions = { [key: string]: Version[] };

export const versions: Versions = {
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
