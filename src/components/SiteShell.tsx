'use client';

import { useState, type ReactNode } from 'react';
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
import { IconButton } from '@astryxdesign/core/IconButton';
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog';
import { Button } from '@astryxdesign/core/Button';
import {
  ScaleIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ClockIcon,
  UsersIcon,
  BanknotesIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { site } from '@/config/site';
import { SiteFooter } from './SiteFooter';
import { MobileCallCta } from './MobileCallCta';
import { ButtonLink } from './ButtonLink';
import { CallbackDialogProvider, CallbackButton } from './CallbackDialog';
import { ArticleSearch } from './ArticleComponents';

/** Меню «Ситуації» з іконками — всі сценарії доступні звідусіль (аудит N1) */
const situationMenu = [
  {
    title: 'Виплати у разі загибелі',
    description: 'Хто має право, документи, порядок дій',
    href: '/vyplaty-u-razi-zagybeli',
    icon: <Icon icon={DocumentTextIcon} size="md" color="accent" />,
  },
  {
    title: 'Затримка або відмова у виплаті',
    description: 'Як зафіксувати бездіяльність та оскаржити',
    href: '/zatrymka-abo-vidmova',
    icon: <Icon icon={ClockIcon} size="md" color="accent" />,
  },
  {
    title: 'Зниклі безвісти та полонені',
    description: 'Права родини та порядок звернень',
    href: '/znykli-bezvisty-ta-poloneni',
    icon: <Icon icon={MagnifyingGlassIcon} size="md" color="accent" />,
  },
  {
    title: 'Пенсія, компенсації, статуси',
    description: 'Інші виплати та оформлення для родини',
    href: '/inshi-vyplaty',
    icon: <Icon icon={BanknotesIcon} size="md" color="accent" />,
  },
  {
    title: 'Спір між членами родини',
    description: 'Хто має право на виплату та частки',
    href: '/vyplaty-u-razi-zagybeli#khto-maye-pravo',
    icon: <Icon icon={UsersIcon} size="md" color="accent" />,
  },
  {
    title: 'Поширені запитання',
    description: 'Короткі відповіді на найчастіші питання',
    href: '/faq',
    icon: <Icon icon={QuestionMarkCircleIcon} size="md" color="accent" />,
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isSelected = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <CallbackDialogProvider>
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
              <HStack gap={2} vAlign="center">
                {/* Пошук по сайту — завжди в шапці */}
                <IconButton
                  label="Пошук по сайту"
                  icon={<Icon icon={MagnifyingGlassIcon} size="md" color="primary" />}
                  variant="ghost"
                  onClick={() => setIsSearchOpen(true)}
                />
                <Link href={`tel:${site.phone}`} isStandalone>
                  <HStack gap={1} vAlign="center">
                    <Icon icon={PhoneIcon} size="sm" color="accent" />
                    {site.phone}
                  </HStack>
                </Link>
                <CallbackButton />
              </HStack>
            }
          />
        }
        mobileNav={{
          content: (
            <VStack gap={4}>
              <Button
                label="Пошук по сайту"
                variant="secondary"
                icon={<Icon icon={MagnifyingGlassIcon} size="sm" color="inherit" />}
                onClick={() => setIsSearchOpen(true)}
              />
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
                <CallbackButton width="100%" />
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

      {/* Модалка пошуку по сайту */}
      <Dialog
        isOpen={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        width={640}
        maxHeight="80vh"
      >
        <DialogHeader title="Пошук по сайту" />
        <VStack paddingBlock={2}>
          {isSearchOpen ? <ArticleSearch includePages /> : null}
        </VStack>
      </Dialog>
    </CallbackDialogProvider>
  );
}
