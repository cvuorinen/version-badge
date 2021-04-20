export type DateString = string; // YYYY-MM-DD

// use instead of date when a version is current stable release and has no eol date yet
export const CURRENT = "current";

export type Version = { version: string; eol: DateString | typeof CURRENT };

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
    { version: "6.x", eol: "2019-04-01" },
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
  // https://www.python.org/downloads/
  // https://endoflife.date/python
  python: [
    { version: "3.9.x", eol: "2025-10-05" },
    { version: "3.8.x", eol: "2024-10-14" },
    { version: "3.7.x", eol: "2023-06-27" },
    { version: "3.6.x", eol: "2021-12-23" },
    { version: "3.5.x", eol: "2020-09-13" },
    { version: "2.7.x", eol: "2020-01-01" },
  ],

  // https://angular.io/guide/releases#support-policy-and-schedule
  angular: [
    { version: "10.x", eol: "2021-12-24" },
    { version: "9.x", eol: "2021-08-06" },
    { version: "8.x", eol: "2020-11-28" },
    { version: "7.x", eol: "2020-04-18" },
    { version: "6.x", eol: "2019-11-03" },
    { version: "5.x", eol: "2019-05-01" },
    { version: "4.x", eol: "2018-09-23" },
  ],
  // https://docs.angularjs.org/misc/version-support-status
  angularjs: [
    { version: "1.8.x", eol: "2021-12-31" },
    { version: "1.7.x", eol: "2020-06-04" },
    { version: "1.6.x", eol: "2018-07-01" },
    { version: "1.5.x", eol: "2017-01-13" },
  ],
  // https://github.com/vuejs/roadmap#release-channels-and-lts
  vue: [
    { version: "3.x", eol: CURRENT },
    { version: "2.x", eol: "2023-09-18" },
    { version: "1.x", eol: "2019-09-30" },
  ],
  // https://symfony.com/releases
  // https://endoflife.date/symfony
  symfony: [
    { version: "5.2.x", eol: "2021-07-21" },
    { version: "5.1.x", eol: "2021-01-21" },
    { version: "5.0.x", eol: "2020-07-21" },
    { version: "4.4.x", eol: "2023-11-21" },
    { version: "4.3.x", eol: "2020-07-01" },
    { version: "4.2.x", eol: "2020-01-01" },
    { version: "4.1.x", eol: "2019-07-01" },
    { version: "4.0.x", eol: "2019-01-01" },
    { version: "3.4.x", eol: "2021-11-01" },
    { version: "3.3.x", eol: "2018-07-01" },
    { version: "3.2.x", eol: "2018-01-01" },
    { version: "3.1.x", eol: "2017-07-01" },
    { version: "3.0.x", eol: "2017-01-01" },
    { version: "2.8.x", eol: "2019-11-01" },
    { version: "2.7.x", eol: "2019-05-01" },
    { version: "2.3.x", eol: "2017-05-01" },
  ],
  // https://loopback.io/doc/en/contrib/Long-term-support.html
  loopback: [
    { version: "4", eol: "2021-04-01" },
    { version: "3", eol: "2020-12-01" },
    { version: "2", eol: "2019-04-01" },
  ],
  // https://expressjs.com/en/advanced/security-updates.html
  express: [
    { version: "4.x", eol: CURRENT },
    { version: "3.x", eol: "2015-08-01" },
  ],

  // https://wiki.centos.org/About/Product
  // https://wiki.centos.org/FAQ/General#What_is_the_support_.27.27end_of_life.27.27_for_each_CentOS_release.3F
  centos: [
    { version: "8", eol: "2029-05-31" },
    { version: "7", eol: "2024-06-30" },
    { version: "6", eol: "2020-11-30" },
    { version: "5", eol: "2017-03-31" },
    { version: "4", eol: "2012-02-29" },
    { version: "3", eol: "2010-10-31" },
  ],
};
