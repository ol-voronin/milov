import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { HStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { Link } from '@astryxdesign/core/Link';
import { Container } from '@/components/Container';
import { PageHero } from '@/components/ContentBlocks';
import { ButtonLink } from '@/components/ButtonLink';
import { NextSteps } from '@/components/NextSteps';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Контакти',
  description:
    'Зв’яжіться з нами телефоном, електронною поштою або через форму на сайті. Працюємо з родинами військових по всій Україні, онлайн і телефоном.',
  alternates: { canonical: '/kontakty' },
  openGraph: {
    title: 'Контакти — Заступа',
    description:
      'Телефон, пошта, форма зворотного зв’язку. Консультуємо родини військових онлайн і телефоном по всій Україні.',
  },
};

export default function ContactsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Головна', path: '/' },
          { name: 'Контакти', path: '/kontakty' },
        ])}
      />

      {/* Стислий вступ без фотобанера: замір показав, що банер з'їдав
          428px — 28% сторінки — заради 207 слів тексту */}
      <PageHero
        title="Контакти"
        lead="Оберіть зручний спосіб зв’язку — або залиште номер, і юрист зателефонує сам."
        crumbs={[{ label: 'Контакти' }]}
        compact
        cta={false}
      />

      <Section variant="transparent" padding={8} paddingBlock={6}>
        <Container rhythm="minor">
          {/* Список, а не три картки з дрібним текстом: контактів усього
              три, і сітка карток тут створювала більше рамок, ніж змісту */}
          <dl className="contact-list">
            <div className="contact-row">
              <dt>Телефон</dt>
              <dd>
                <Link href={`tel:${site.phone}`} isStandalone>
                  {site.phone}
                </Link>
                <Text as="p" type="supporting">
                  {site.workingHours}
                </Text>
              </dd>
            </div>

            <div className="contact-row">
              <dt>Пошта</dt>
              <dd>
                <Link href={`mailto:${site.email}`} isStandalone>
                  {site.email}
                </Link>
                <Text as="p" type="supporting">
                  Відповідаємо в межах графіка роботи
                </Text>
              </dd>
            </div>

            {/* Месенджери показуються лише після додавання реальних
                контактів у src/config/site.ts */}
            {site.telegram || site.viber ? (
              <div className="contact-row">
                <dt>Месенджери</dt>
                <dd>
                  <HStack gap={2} wrap="wrap">
                    {site.telegram ? (
                      <ButtonLink
                        label="Написати в Telegram"
                        variant="secondary"
                        href={site.telegram}
                      />
                    ) : null}
                    {site.viber ? (
                      <ButtonLink
                        label="Написати у Viber"
                        variant="secondary"
                        href={site.viber}
                      />
                    ) : null}
                  </HStack>
                </dd>
              </div>
            ) : null}

            <div className="contact-row">
              <dt>Де працюємо</dt>
              <dd>
                <Text as="p" type="body">
                  {site.serviceArea}
                </Text>
                <Text as="p" type="supporting">
                  Місто: {site.city}
                </Text>
              </dd>
            </div>

            <div className="contact-row">
              <dt>Персональні дані</dt>
              <dd>
                <Link href={`mailto:${site.privacyContact}`} isStandalone>
                  {site.privacyContact}
                </Link>
                <Text as="p" type="supporting">
                  Запити щодо обробки ваших даних
                </Text>
              </dd>
            </div>
          </dl>

          <HStack gap={3} wrap="wrap" vAlign="center">
            <ButtonLink
              label="Зателефонувати"
              variant="primary"
              href={`tel:${site.phone}`}
            />
            <Text type="supporting">
              Не готові дзвонити? Залиште номер — зателефонуємо самі.
            </Text>
          </HStack>
        </Container>
      </Section>

      <NextSteps page="contacts" />
    </>
  );
}
