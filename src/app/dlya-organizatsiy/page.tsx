import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Link } from '@astryxdesign/core/Link';
import { Container } from '@/components/Container';
import { PageHero } from '@/components/ContentBlocks';
import { ButtonLink } from '@/components/ButtonLink';
import { CheckList } from '@/components/CheckList';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { site } from '@/config/site';

/**
 * Сторінка для реферальних партнерів: фондів, волонтерів, психологів,
 * ветеранських спільнот, соціальних працівників.
 *
 * НАВІЩО ОКРЕМА СТОРІНКА. Родина в горі питає не пошукову систему,
 * а знайому людину. Той, хто вже поруч із родиною, — найкоротший шлях
 * до неї, і водночас найчесніший: нікого не наздоганяють рекламою.
 *
 * ТОН. Це не пропозиція «дайте нам ліди». Це пропозиція матеріалу,
 * який організація може віддати родині безоплатно й без жодних умов.
 * Якщо після цього хтось звернеться — добре; якщо ні — родина все одно
 * отримала користь. Інакше це виглядало б як торгівля чужим горем.
 *
 * ⚠️ Стаття 13 Правил адвокатської етики: жодних заяв про вірогідність
 * успішного виконання доручень і жодних оцінювальних характеристик.
 * Сторінка навмисно не містить слів «доб'ємося», «гарантуємо», «найкращі».
 */
export const metadata: Metadata = {
  title: 'Для організацій, які супроводжують родини військових',
  description:
    'Безоплатні матеріали для фондів, волонтерів, психологів і ветеранських спільнот: чеклісти й пояснення для родин загиблих і зниклих безвісти військовослужбовців.',
  alternates: { canonical: '/dlya-organizatsiy' },
};

export default function ForOrganisationsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Головна', path: '/' },
          { name: 'Для організацій', path: '/dlya-organizatsiy' },
        ])}
      />

      <PageHero
        title="Для організацій, які супроводжують родини"
        lead="Фондам, волонтерам, психологам і ветеранським спільнотам — матеріали, які можна віддати родині без жодних умов."
        crumbs={[{ label: 'Для організацій' }]}
        statement="Родина в горі питає не пошукову систему, а знайому людину. Якщо ця людина — ви, вам має бути що їй дати."
        cta={false}
      />

      <Section variant="transparent" padding={8} paddingBlock={8}>
        <Container rhythm="major">
          <VStack gap={5}>
            <VStack gap={3} maxWidth={720}>
              <span className="section-rule" aria-hidden="true" />
              <Heading level={2}>Що ми пропонуємо</Heading>
              <Text as="p" type="body" color="secondary" textWrap="pretty">
                Матеріали безоплатні й без умов. Ви можете друкувати їх,
                пересилати, розміщувати в себе, прибрати наш контакт або
                залишити — на ваш розсуд. Ми не просимо передавати нам дані
                людей і не пропонуємо винагороди за звернення.
              </Text>
            </VStack>

            <CheckList
              tone="navy"
              columns={2}
              items={[
                'Чекліст «Перші кроки» — одна друкована сторінка для родини',
                'Перелік документів за кожним видом виплати',
                'Пояснення строків: що і коли має відбутися після подання заяви',
                'Відповіді на типові запитання простою мовою',
              ]}
            />

            <HStack gap={3} wrap="wrap" vAlign="center">
              <ButtonLink
                label="Завантажити чекліст (PDF)"
                variant="primary"
                href="/downloads/pershi-kroky-checklist.pdf"
              />
              <ButtonLink
                label="Переглянути всі матеріали"
                variant="secondary"
                href="/korysna-informatsiya"
              />
            </HStack>
          </VStack>

          <VStack gap={5}>
            <VStack gap={3} maxWidth={720}>
              <span className="section-rule" aria-hidden="true" />
              <Heading level={2}>Як це зазвичай працює</Heading>
            </VStack>

            <ol className="partner-steps">
              <li>
                <strong>Ви берете матеріали.</strong> Нічого підписувати не
                потрібно. Якщо потрібен інший формат або ваш логотип поруч —
                напишіть, зробимо.
              </li>
              <li>
                <strong>Родина отримує їх від вас.</strong> Не від юриста,
                якого вона не знає, а від людини, якій уже довіряє.
              </li>
              <li>
                <strong>Якщо виникає юридичне питання</strong> — родина може
                звернутися до нас сама. Або не звернутися: матеріали корисні
                й без цього.
              </li>
              <li>
                <strong>Складні випадки ми беремо на консультацію</strong>{' '}
                поза чергою, якщо звернення надходить через партнерську
                організацію.
              </li>
            </ol>
          </VStack>

          <VStack gap={5}>
            <VStack gap={3} maxWidth={720}>
              <span className="section-rule" aria-hidden="true" />
              <Heading level={2}>Чого ми не робимо</Heading>
              <Text as="p" type="body" color="secondary" textWrap="pretty">
                Про це варто сказати прямо, бо в цій сфері трапляється різне.
              </Text>
            </VStack>

            <ul className="partner-limits">
              <li>Не просимо передавати нам контакти родин</li>
              <li>Не платимо і не беремо плати за рекомендації</li>
              <li>Не звертаємося до родин першими</li>
              <li>Не обіцяємо результату — ні родині, ні вам</li>
              <li>
                Не використовуємо матеріали співпраці як рекламу без вашої
                письмової згоди
              </li>
            </ul>
          </VStack>

          <VStack gap={4}>
            <VStack gap={3} maxWidth={720}>
              <span className="section-rule" aria-hidden="true" />
              <Heading level={2}>Написати нам</Heading>
              <Text as="p" type="body" color="secondary" textWrap="pretty">
                Якщо ваша організація працює з родинами військовослужбовців і
                вам потрібні матеріали, спільний вебінар або консультація для
                вашої команди — напишіть. Відповідаємо в межах графіка роботи.
              </Text>
            </VStack>
            <HStack gap={4} wrap="wrap" vAlign="center">
              <Link href={`mailto:${site.email}?subject=Співпраця з організацією`} isStandalone>
                {site.email}
              </Link>
              <Link href={`tel:${site.phone}`} isStandalone>
                {site.phone}
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Section>
    </>
  );
}
