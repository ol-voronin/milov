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
    '/rodyna-viyskovogo',
    '/poslugy',
    '/pro-komandu',
    '/faq',
    '/korysna-informatsiya',
    '/kontakty',
    '/dlya-organizatsiy',
    '/polityka-konfidentsiynosti',
    '/umovy-korystuvannia',
  ];

  /**
   * Пріоритет сторінок для пошукових систем.
   * Вищий пріоритет = більша ймовірність глибшого індексування.
   * Ці значення порівнюються між собою в межах одного сайту.
   */
  const priorityMap: Record<string, number> = {
    '': 1.0,
    '/vyplaty-u-razi-zagybeli': 0.9,
    '/zatrymka-abo-vidmova': 0.9,
    '/znykli-bezvisty-ta-poloneni': 0.9,
    '/rodyna-viyskovogo': 0.8,
    '/inshi-vyplaty': 0.8,
    '/poslugy': 0.8,
    '/faq': 0.7,
    '/korysna-informatsiya': 0.7,
    '/pro-komandu': 0.6,
    '/kontakty': 0.6,
    '/dlya-organizatsiy': 0.5,
    '/polityka-konfidentsiynosti': 0.3,
    '/umovy-korystuvannia': 0.3,
  };

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${site.siteUrl}${path}`,
    lastModified: new Date(site.lastLegalUpdate),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: priorityMap[path] ?? 0.5,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.siteUrl}/korysna-informatsiya/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
