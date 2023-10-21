const SITE_URL = process.env.SITE_URL;

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  outDir: './out',
};

module.exports = config;
