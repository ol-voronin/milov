'use client';

import type { ReactNode, ComponentProps } from 'react';
import NextLink from 'next/link';
import { Theme } from '@astryxdesign/core/theme';
import { LinkProvider } from '@astryxdesign/core/Link';
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

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Theme theme={familyDefenseTheme} mode="light">
      <LinkProvider component={RouterLink}>{children}</LinkProvider>
    </Theme>
  );
}
