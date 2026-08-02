import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { articles } from '@/content/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/vyplaty-u-razi-zagybeli',
    '/zatrymka-abo-vidmova',
    '/znykli-bezvisty-ta-poloneni',
    '/inshi-vyplaty',
    '/poslugy',
    '/pro-komandu',
    '/faq',
    '/korysna-informatsiya',
    '/kontakty',
    '/dlya-organizatsiy',
    '/polityka-konfidentsiynosti',
    '/umovy-korystuvannia',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${site.siteUrl}${path}`,
    lastModified: new Date(site.lastLegalUpdate),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/vyplaty-u-razi-zagybeli' ? 0.9 : 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.siteUrl}/korysna-informatsiya/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
