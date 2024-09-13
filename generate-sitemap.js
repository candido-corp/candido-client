import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const staticPages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/opportunities', changefreq: 'weekly', priority: 0.8 },
  { url: '/login', changefreq: 'monthly', priority: 0.5 },
  { url: '/login/blur', changefreq: 'monthly', priority: 0.5 },
  { url: '/register', changefreq: 'monthly', priority: 0.5 },
  { url: '/reset-password', changefreq: 'monthly', priority: 0.5 },
  { url: '/dashboard', changefreq: 'monthly', priority: 0.5 },
  { url: '/user', changefreq: 'monthly', priority: 0.5 },
  { url: '/user/opportunities', changefreq: 'daily', priority: 0.5 },
  { url: '/user/opportunities/stats', changefreq: 'daily', priority: 0.5 },
  { url: '/user/opportunities/history', changefreq: 'daily', priority: 0.5 },
  { url: '/user/opportunities/saved', changefreq: 'daily', priority: 0.5 },
  { url: '/forms', changefreq: 'weekly', priority: 0.5 },
  { url: '/forms/create', changefreq: 'weekly', priority: 0.5 },
  { url: '/settings', changefreq: 'monthly', priority: 0.4 },
  { url: '/settings/general', changefreq: 'monthly', priority: 0.4 },
  { url: '/settings/user', changefreq: 'monthly', priority: 0.4 },
  { url: '/settings/form', changefreq: 'monthly', priority: 0.4 },
];

// Dynamic routes to be created once we have the data
const dynamicPages = [
  { url: '/opportunities/:opportunityId', changefreq: 'weekly', priority: 0.8 },
  {
    url: '/opportunities/:opportunityId/apply',
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    url: '/register/email/verify/:token',
    changefreq: 'monthly',
    priority: 0.5,
  },
  { url: '/forms/:formId', changefreq: 'weekly', priority: 0.5 },
  { url: '/forms/:formId/builder', changefreq: 'weekly', priority: 0.5 },
  {
    url: '/forms/:formId/builder/preview',
    changefreq: 'weekly',
    priority: 0.5,
  },
];

const pages = [...staticPages, ...dynamicPages];

const generateSitemap = async () => {
  const sitemapStream = new SitemapStream({
    hostname: 'http://localhost:3000',
  });

  const writeStream = createWriteStream(
    path.resolve(__dirname, './public/sitemap.xml')
  );

  pages.forEach((page) => {
    sitemapStream.write(page);
  });

  sitemapStream.end();

  streamToPromise(sitemapStream).then((data) => {
    console.log('Sitemap generated successfully!!!');
  });

  sitemapStream.pipe(writeStream);
};

generateSitemap();
