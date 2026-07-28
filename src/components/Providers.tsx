'use client';

import type { ReactNode, ComponentProps } from 'react';
import NextLink from 'next/link';
import { Theme } from '@astryxdesign/core/theme';
import { LinkProvider } from '@astryxdesign/core/Link';
import { InternationalizationProvider } from '@astryxdesign/core/i18n';
// Попередньо скомпільована тема (astryx theme build) — без runtime-інжекції,
// тому токени доступні вже під час SSR і немає стрибка шрифтів.
import { familyDefenseTheme } from '@/theme/family-defense';

/** Міст між Astryx Link і роутером Next.js */
function RouterLink(props: ComponentProps<'a'> & { href?: string }) {
  const { href = '', ...rest } = props;
  const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('viber:');
  if (isExternal) {
    return <a href={href} {...rest} />;
  }
  return <NextLink href={href} {...rest} />;
}

/**
 * Українські підписи для службових елементів Astryx
 * (burger-меню, закриття діалогів, очищення полів тощо).
 */
const ukOverrides = {
  uk: {
    '@astryx.mobileNav.toggle.open': 'Відкрити меню',
    '@astryx.mobileNav.closeNavigation': 'Закрити меню',
    '@astryx.mobileNav.navigation': 'Навігація',
    '@astryx.appShell.mobileNavigation': 'Мобільна навігація',
    '@astryx.dialog.close': 'Закрити',
    '@astryx.alertDialog.cancel': 'Скасувати',
    '@astryx.textInput.clearLabel': 'Очистити поле',
    '@astryx.link.newTab': 'відкривається в новій вкладці',
    '@astryx.banner.dismiss': 'Приховати повідомлення',
    '@astryx.banner.expand': 'Показати деталі',
    '@astryx.banner.collapse': 'Згорнути деталі',
  },
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <InternationalizationProvider locale="uk" overrides={ukOverrides}>
      <Theme theme={familyDefenseTheme} mode="light">
        <LinkProvider component={RouterLink}>{children}</LinkProvider>
      </Theme>
    </InternationalizationProvider>
  );
}
