import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import './globals.css';
import { Providers } from '@/components/Providers';
import { SiteShell } from '@/components/SiteShell';
import { site } from '@/config/site';
import { JsonLd, legalServiceSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.brandName} — юридична допомога родинам військових`,
    template: `%s — ${site.brandName}`,
  },
  description:
    'Допомагаємо родинам військових розібратися у виплатах, документах і захистити свої права. Консультації онлайн і телефоном по всій Україні.',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: site.brandName,
    title: `${site.brandName} — юридична допомога родинам військових`,
    description:
      'Перевіримо вашу ситуацію, пояснимо порядок дій та, за потреби, візьмемо на себе юридичний супровід.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <JsonLd data={legalServiceSchema()} />
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
