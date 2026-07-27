'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AppShell } from '@astryxdesign/core/AppShell';
import {
  TopNav,
  TopNavHeading,
  TopNavItem,
  TopNavMenu,
} from '@astryxdesign/core/TopNav';
import { SideNavItem, SideNavSection } from '@astryxdesign/core/SideNav';
import { Link } from '@astryxdesign/core/Link';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Icon } from '@astryxdesign/core/Icon';
import { ScaleIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { site } from '@/config/site';
import { SiteFooter } from './SiteFooter';
import { MobileCallCta } from './MobileCallCta';
import { ButtonLink } from './ButtonLink';

/** Меню «Ситуації» — всі 5 сценаріїв доступні з будь-якої сторінки (аудит N1) */
const situationMenu = [
  {
    title: 'Виплати у разі загибелі',
    description: 'Хто має право, документи, порядок дій',
    href: '/vyplaty-u-razi-zagybeli',
  },
  {
    title: 'Затримка або відмова у виплаті',
    description: 'Як зафіксувати бездіяльність та оскаржити',
    href: '/zatrymka-abo-vidmova',
  },
  {
    title: 'Зниклі безвісти та полонені',
    description: 'Права родини та порядок звернень',
    href: '/znykli-bezvisty-ta-poloneni',
  },
  {
    title: 'Пенсія, компенсації, статуси',
    description: 'Інші виплати та оформлення для родини',
    href: '/inshi-vyplaty',
  },
  {
    title: 'Поширені запитання',
    description: 'Короткі відповіді на найчастіші питання',
    href: '/faq',
  },
];

const navItems = [
  { label: 'Послуги', href: '/poslugy' },
  { label: 'Корисна інформація', href: '/korysna-informatsiya' },
  { label: 'Про нас', href: '/pro-komandu' },
  { label: 'Контакти', href: '/kontakty' },
];

const mobileNavItems = [
  { label: 'Виплати у разі загибелі', href: '/vyplaty-u-razi-zagybeli' },
  { label: 'Затримка або відмова', href: '/zatrymka-abo-vidmova' },
  { label: 'Зниклі безвісти та полонені', href: '/znykli-bezvisty-ta-poloneni' },
  { label: 'Пенсія, компенсації, статуси', href: '/inshi-vyplaty' },
  { label: 'Послуги', href: '/poslugy' },
  { label: 'Корисна інформація', href: '/korysna-informatsiya' },
  { label: 'Поширені запитання', href: '/faq' },
  { label: 'Про нас', href: '/pro-komandu' },
  { label: 'Контакти', href: '/kontakty' },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isSelected = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <AppShell
      height="auto"
      variant="surface"
      contentPadding={0}
      topNav={
        <TopNav
          label="Головна навігація"
          heading={
            <TopNavHeading
              heading={site.brandName}
              headingHref="/"
              logo={<Icon icon={ScaleIcon} size="md" color="accent" />}
            />
          }
          startContent={
            <>
              <TopNavMenu label="Ситуації" items={situationMenu} />
              {navItems.map((item) => (
                <TopNavItem
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  isSelected={isSelected(item.href)}
                />
              ))}
            </>
          }
          endContent={
            <HStack gap={3} vAlign="center">
              <Link href={`tel:${site.phone}`} isStandalone>
                <HStack gap={1} vAlign="center">
                  <Icon icon={PhoneIcon} size="sm" color="accent" />
                  {site.phone}
                </HStack>
              </Link>
              <ButtonLink
                label="Замовити дзвінок"
                variant="primary"
                href="/zamovyty-dzvinok"
              />
            </HStack>
          }
        />
      }
      mobileNav={{
        content: (
          <VStack gap={4}>
            <SideNavSection title="Розділи сайту">
              {mobileNavItems.map((item) => (
                <SideNavItem
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  isSelected={isSelected(item.href)}
                />
              ))}
            </SideNavSection>
            <VStack gap={2}>
              <ButtonLink
                label="Замовити дзвінок"
                variant="primary"
                href="/zamovyty-dzvinok"
              />
              <ButtonLink
                label={`Зателефонувати: ${site.phone}`}
                variant="secondary"
                href={`tel:${site.phone}`}
              />
            </VStack>
          </VStack>
        ),
      }}
    >
      {children}
      <SiteFooter />
      <MobileCallCta />
    </AppShell>
  );
}
