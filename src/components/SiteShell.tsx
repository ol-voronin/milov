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
import { MobileNav } from '@astryxdesign/core/MobileNav';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Icon } from '@astryxdesign/core/Icon';
import { IconButton } from '@astryxdesign/core/IconButton';
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog';
import { Button } from '@astryxdesign/core/Button';
import {
  PhoneIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ClockIcon,
  UsersIcon,
  BanknotesIcon,
  QuestionMarkCircleIcon,
  BriefcaseIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';
import { BrandMark } from './BrandMark';
import { site } from '@/config/site';
import {
  primaryNav,
  situationLinks,
  helpLinks,
  type NavLink,
} from '@/config/navigation';
import { SiteFooter } from './SiteFooter';
import { MobileCallCta } from './MobileCallCta';
import { ButtonLink } from './ButtonLink';
import { CallbackDialogProvider, CallbackButton } from './CallbackDialog';
import { ArticleSearch } from './ArticleComponents';

/**
 * Іконки для пунктів меню — окремо від назв, бо назви живуть
 * у src/config/navigation.ts (єдине джерело для шапки, футера й
 * блоків «Далі за темою»).
 */
const menuIcons: Record<string, typeof DocumentTextIcon> = {
  '/vyplaty-u-razi-zagybeli': DocumentTextIcon,
  '/zatrymka-abo-vidmova': ClockIcon,
  '/znykli-bezvisty-ta-poloneni': MagnifyingGlassIcon,
  '/inshi-vyplaty': BanknotesIcon,
  /* Статуси й пільги для родини — посвідчення читається точніше,
     ніж щит чи будинок, і не повторює жодну з решти іконок */
  '/rodyna-viyskovogo': IdentificationIcon,
  '/poslugy': BriefcaseIcon,
  '/pro-komandu': UsersIcon,
  '/faq': QuestionMarkCircleIcon,
};

const toMenuItems = (links: NavLink[]) =>
  links.map((l) => ({
    title: l.label,
    description: l.description,
    href: l.href,
    icon: menuIcons[l.href] ? (
      <Icon icon={menuIcons[l.href]} size="md" color="accent" />
    ) : undefined,
  }));

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  /**
   * Drawer керуємо самі: автоматичний режим AppShell рендерив пункти
   * меню просто в потоці сторінки замість висувної панелі.
   */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                logo={<BrandMark size={32} />}
              />
            }
            startContent={
              <>
                {primaryNav.map((entry) =>
                  entry.items ? (
                    <TopNavMenu
                      key={entry.label}
                      label={entry.label}
                      items={toMenuItems(entry.items)}
                    />
                  ) : (
                    <TopNavItem
                      key={entry.href}
                      label={entry.label}
                      href={entry.href!}
                      isSelected={isSelected(entry.href!)}
                    />
                  ),
                )}
              </>
            }
            endContent={
              <HStack gap={4} vAlign="center">
                {/* Пошук по сайту — у шапці на десктопі, у burger-меню на телефоні */}
                <span className="header-search">
                  <IconButton
                    label="Пошук по сайту"
                    icon={<Icon icon={MagnifyingGlassIcon} size="md" color="primary" />}
                    variant="ghost"
                    onClick={() => setIsSearchOpen(true)}
                  />
                </span>
                <Link href={`tel:${site.phone}`} isStandalone>
                  <HStack gap={2} vAlign="center">
                    <Icon icon={PhoneIcon} size="sm" color="accent" />
                    {/* На мобільному лишається лише іконка (globals.css) */}
                    <span className="header-phone-text">{site.phone}</span>
                  </HStack>
                </Link>
                <span className="header-cta">
                  <CallbackButton />
                </span>
                {/* Власний burger — видимий лише на мобільному (globals.css) */}
                <span className="header-burger">
                  <IconButton
                    label="Відкрити меню"
                    icon={<Icon icon={Bars3Icon} size="md" color="primary" />}
                    variant="ghost"
                    onClick={() => setIsMenuOpen(true)}
                  />
                </span>
              </HStack>
            }
          />
        }
        mobileNav={
          <MobileNav
            isOpen={isMenuOpen}
            onOpenChange={setIsMenuOpen}
            /* Не рядок, а власний вузол: рядок Astryx рендерить як h2 (32px),
               і в колонці 300px назва ламалася на два рядки й обрізалася */
            header={
              <HStack gap={2} vAlign="center">
                <BrandMark size={24} />
                <Text type="label" weight="semibold">
                  {site.brandName}
                </Text>
              </HStack>
            }
            width={320}
          >
            <VStack gap={4}>
              <Button
                label="Пошук по сайту"
                variant="secondary"
                width="100%"
                icon={<Icon icon={MagnifyingGlassIcon} size="sm" color="inherit" />}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSearchOpen(true);
                }}
              />
              {/* Ті самі групи, що й у шапці — щоб на телефоні структура
                  сайту читалася так само, а не плоским списком із 9 пунктів */}
              <SideNavSection title="Що сталося">
                {situationLinks.map((item) => (
                  <SideNavItem
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    isSelected={isSelected(item.href)}
                    onClick={() => setIsMenuOpen(false)}
                  />
                ))}
              </SideNavSection>
              <SideNavSection title="Наша допомога">
                {helpLinks.map((item) => (
                  <SideNavItem
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    isSelected={isSelected(item.href)}
                    onClick={() => setIsMenuOpen(false)}
                  />
                ))}
              </SideNavSection>
              <SideNavSection title="Матеріали">
                <SideNavItem
                  label="Інструкції та чеклісти"
                  href="/korysna-informatsiya"
                  isSelected={isSelected('/korysna-informatsiya')}
                  onClick={() => setIsMenuOpen(false)}
                />
                <SideNavItem
                  label="Контакти"
                  href="/kontakty"
                  isSelected={isSelected('/kontakty')}
                  onClick={() => setIsMenuOpen(false)}
                />
              </SideNavSection>
              <VStack gap={2}>
                <CallbackButton width="100%" />
                <ButtonLink
                  label="Зателефонувати"
                  variant="secondary"
                  width="100%"
                  href={`tel:${site.phone}`}
                />
              </VStack>
            </VStack>
          </MobileNav>
        }
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
        <DialogHeader title="Пошук по сайту" onOpenChange={setIsSearchOpen} />
        <VStack paddingBlock={2}>
          {isSearchOpen ? <ArticleSearch includePages /> : null}
        </VStack>
      </Dialog>
    </CallbackDialogProvider>
  );
}
