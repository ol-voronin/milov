import type { MetadataRoute } from 'next';
import { site, isReadyForIndexing } from '@/config/site';

/**
 * Поки в контактах стоять заглушки, сайт закритий від пошуку повністю.
 * Причина — у коментарі до isReadyForIndexing у src/config/site.ts:
 * знайти сайт у пошуку і подзвонити на неіснуючий номер для цієї
 * аудиторії гірше, ніж не знайти його взагалі.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isReadyForIndexing) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dyakuyemo'],
      },
    ],
    sitemap: `${site.siteUrl}/sitemap.xml`,
  };
}
