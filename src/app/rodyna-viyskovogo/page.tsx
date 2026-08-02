import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Collapsible, CollapsibleGroup } from '@astryxdesign/core/Collapsible';
import { Container } from '@/components/Container';
import { PageHero } from '@/components/ContentBlocks';
import { LegalNotice, LegalMeta, OfficialSources } from '@/components/LegalComponents';
import { NextSteps } from '@/components/NextSteps';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { officialSources } from '@/content/payments';
import { servingTopics } from '@/content/servingFamily';
import { photos } from '@/config/photos';

/**
 * Розділ для родин військовослужбовців, які служать зараз.
 *
 * Решта сайту звертається до людей, які вже в найгіршій точці. Ця
 * сторінка — до тих, хто в тривозі, а не в горі: вони не знають, що їм
 * належить, поки він служить.
 *
 * Межа розділу свідома: тільки те, що стосується РОДИНИ. Справи самого
 * військовослужбовця (СЗЧ, ВЛК, звільнення) практика не веде, і про це
 * сказано прямо на сторінці «Хто веде вашу справу».
 */
export const metadata: Metadata = {
  title: 'Родина військовослужбовця: пільги, статуси, виплати при пораненні',
  description:
    'Що належить родині, поки військовослужбовець служить: статус УБД і пільги для дружини й дітей, виплати у разі поранення, кредитні канікули, довіреність. Простою мовою.',
  alternates: { canonical: '/rodyna-viyskovogo' },
};

export default function ServingFamilyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Головна', path: '/' },
          { name: 'Родина військовослужбовця', path: '/rodyna-viyskovogo' },
        ])}
      />

      <PageHero
        title="Поки він служить: що належить родині"
        lead="Статуси, пільги й виплати, про які родини найчастіше дізнаються запізно."
        crumbs={[{ label: 'Родина військовослужбовця' }]}
        photo={photos.servingFamily}
      />

      <Section variant="transparent" padding={8} paddingBlock={8}>
        <Container rhythm="major">
          <VStack gap={4}>
            <VStack gap={3} maxWidth={720}>
              <span className="section-rule" aria-hidden="true" />
              <Heading level={2}>Оберіть своє питання</Heading>
              <Text as="p" type="body" color="secondary" textWrap="pretty">
                Обсяг прав залежить від статусу військовослужбовця, обставин
                служби та місцевих програм. Наявність теми в переліку не означає,
                що всі перелічені права доступні кожній родині.
              </Text>
            </VStack>

            <CollapsibleGroup type="single" hasDividers>
              {servingTopics.map((t) => (
                <Collapsible
                  key={t.id}
                  value={t.id}
                  defaultIsOpen={false}
                  trigger={
                    <VStack gap={1} hAlign="start">
                      <Text type="large" weight="medium">
                        {t.title}
                      </Text>
                      <Text type="supporting">{t.question}</Text>
                    </VStack>
                  }
                >
                  <VStack gap={3} paddingBlock={2} hAlign="start" maxWidth={780}>
                    <Text as="p" type="body" color="secondary" textWrap="pretty">
                      {t.summary}
                    </Text>
                    <ul className="team-row__tasks">
                      {t.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </VStack>
                </Collapsible>
              ))}
            </CollapsibleGroup>
          </VStack>

          {/* Межа спеціалізації — прямо на сторінці, а не дрібним шрифтом.
              Дешевше сказати це зараз, ніж витрачати час родини на дзвінок,
              який закінчиться «ми цим не займаємось». */}
          <div className="scope-note">
            <VStack gap={2}>
              <Text type="label" weight="semibold">
                Чим ми не займаємось
              </Text>
              <Text as="p" type="body" color="secondary" textWrap="pretty">
                Ми працюємо з правами родини. Справи самого військовослужбовця —
                СЗЧ, ВЛК, оскарження висновків щодо придатності, звільнення чи
                переведення — ми не ведемо. Якщо питання про це, краще одразу
                звернутися до юриста відповідної спеціалізації: так ви не
                втратите час.
              </Text>
            </VStack>
          </div>

          <LegalNotice />
          <OfficialSources sources={officialSources} />
          <LegalMeta />
        </Container>
      </Section>

      <NextSteps page="servingFamily" />
    </>
  );
}
