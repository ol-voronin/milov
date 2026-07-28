'use client';

import { Section } from '@astryxdesign/core/Section';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Text } from '@astryxdesign/core/Text';
import { Link } from '@astryxdesign/core/Link';
import { Divider } from '@astryxdesign/core/Divider';
import { Theme } from '@astryxdesign/core/theme';
import { site } from '@/config/site';
import { brandTheme } from '@/theme/brandTheme';
import { Container } from './Container';

const navColumns = [
  {
    title: 'Ситуації',
    links: [
      { label: 'Виплати у разі загибелі', href: '/vyplaty-u-razi-zagybeli' },
      { label: 'Затримка або відмова', href: '/zatrymka-abo-vidmova' },
      { label: 'Зниклі безвісти та полонені', href: '/znykli-bezvisty-ta-poloneni' },
      { label: 'Пенсія, компенсації, статуси', href: '/inshi-vyplaty' },
      { label: 'Замовити дзвінок', href: '/zamovyty-dzvinok' },
    ],
  },
  {
    title: 'Практика',
    links: [
      { label: 'Послуги', href: '/poslugy' },
      { label: 'Про команду', href: '/pro-komandu' },
      { label: 'Поширені запитання', href: '/faq' },
      { label: 'Корисна інформація', href: '/korysna-informatsiya' },
    ],
  },
  {
    title: 'Правова інформація',
    links: [
      { label: 'Політика конфіденційності', href: '/polityka-konfidentsiynosti' },
      { label: 'Умови користування сайтом', href: '/umovy-korystuvannia' },
      { label: 'Контакти', href: '/kontakty' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer>
      {/* Футер виділяється: брендова смуга + темна тема (запит власника) */}
      <div className="footer-accent" aria-hidden="true" />
      <Theme theme={brandTheme} mode="dark">
        <Section variant="muted" padding={8} paddingBlock={10}>
      <Container gap={8}>
        <Grid columns={{ minWidth: 230 }} gap={6}>
          <VStack gap={3}>
            <Text as="p" type="label" weight="semibold">
              {site.brandName}
            </Text>
            <Text as="p" type="supporting">
              Юридична допомога родинам військовослужбовців: виплати, документи,
              оскарження відмов і захист прав.
            </Text>
            <VStack gap={1}>
              <Link href={`tel:${site.phone}`} isStandalone>
                {site.phone}
              </Link>
              <Link href={`mailto:${site.email}`} isStandalone>
                {site.email}
              </Link>
              <Text as="p" type="supporting">
                {site.workingHours}
              </Text>
              <Text as="p" type="supporting">
                {site.serviceArea}
              </Text>
            </VStack>
          </VStack>
          {navColumns.map((col) => (
            <VStack gap={3} key={col.title}>
              <Text as="p" type="label" weight="semibold">
                {col.title}
              </Text>
              <VStack gap={2} hAlign="start">
                {col.links.map((l) => (
                  <Link key={l.href} href={l.href} isStandalone>
                    {l.label}
                  </Link>
                ))}
              </VStack>
            </VStack>
          ))}
        </Grid>

        <Divider />

        <VStack gap={3}>
          <Text as="p" type="label" weight="semibold">
            Важливо знати
          </Text>
          <Text as="p" type="supporting">
            Матеріали сайту мають загальний інформаційний характер і не є
            індивідуальною юридичною консультацією. Право на виплати, їх розмір,
            порядок та строки залежать від обставин справи і чинної редакції
            законодавства.
          </Text>
          <Text as="p" type="supporting">
            Цей сайт не є сайтом Міністерства оборони України, ТЦК та СП,
            військової частини або іншого державного органу.
          </Text>
          <HStack gap={2} wrap="wrap" vAlign="center">
            <Text type="supporting">
              © {new Date().getFullYear()} {site.legalEntityName}
            </Text>
            <Text type="supporting">·</Text>
            <Text type="supporting">
              Питання щодо персональних даних: {site.privacyContact}
            </Text>
          </HStack>
        </VStack>
      </Container>
        </Section>
      </Theme>
    </footer>
  );
}
