'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AppShell } from '@astryxdesign/core/AppShell';
import { TopNav, TopNavHeading, TopNavItem } from '@astryxdesign/core/TopNav';
import { SideNavItem, SideNavSection } from '@astryxdesign/core/SideNav';
import { Link } from '@astryxdesign/core/Link';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Icon } from '@astryxdesign/core/Icon';
import { ScaleIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { site } from '@/config/site';
import { SiteFooter } from './SiteFooter';
import { MobileCallCta } from './MobileCallCta';
import { ButtonLink } from './ButtonLink';

const navItems = [
  { label: 'Виплати у разі загибелі', href: '/vyplaty-u-razi-zagybeli' },
  { label: 'Послуги', href: '/poslugy' },
  { label: 'Корисна інформація', href: '/korysna-informatsiya' },
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
              <ButtonLink label="Замовити дзвінок" variant="primary" href="/#callback" />
            </HStack>
          }
        />
      }
      mobileNav={{
        content: (
          <VStack gap={4}>
            <SideNavSection title="Розділи сайту">
              {navItems.map((item) => (
                <SideNavItem
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  isSelected={isSelected(item.href)}
                />
              ))}
              <SideNavItem
                label="Поширені запитання"
                href="/faq"
                isSelected={isSelected('/faq')}
              />
            </SideNavSection>
            <VStack gap={2}>
              <ButtonLink label="Замовити дзвінок" variant="primary" href="/#callback" />
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
