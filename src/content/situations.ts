/**
 * Картки «Що сталося?» на головній сторінці.
 * Формулювання — від першої особи, мовою користувача (патерн «життєвих
 * подій» порталу Дія), делікатно і без драматизації.
 * topicValue відповідає значенням теми у формі заявки (src/lib/leadSchema.ts).
 */

export type Situation = {
  id: string;
  title: string;
  description: string;
  href: string;
  topicValue: string;
};

export const situations: Situation[] = [
  {
    id: 'death',
    title: 'Загинув або помер близький військовослужбовець',
    description:
      'Потрібно оформити виплати, статуси або інші належні родині кошти.',
    href: '/vyplaty-u-razi-zagybeli',
    topicValue: 'death',
  },
  {
    id: 'delay',
    title: 'Мені затримують виплату',
    description:
      'Документи подані, але немає рішення, відповіді чи виплати.',
    href: '/zatrymka-abo-vidmova',
    topicValue: 'delay',
  },
  {
    id: 'refusal',
    title: 'Мені відмовили у виплаті',
    description:
      'Допоможемо проаналізувати підстави та визначити порядок оскарження.',
    href: '/zatrymka-abo-vidmova#vidmova',
    topicValue: 'refusal',
  },
  {
    id: 'dispute',
    title: 'Не зрозуміло, хто має право на виплату',
    description:
      'Є кілька членів родини, незареєстрований шлюб, утриманці або спір щодо часток.',
    href: '/vyplaty-u-razi-zagybeli#khto-maye-pravo',
    topicValue: 'dispute',
  },
  {
    id: 'missing',
    title: 'Рідна людина зникла безвісти або в полоні',
    description:
      'Пояснимо права родини, порядок звернень і можливі виплати.',
    href: '/znykli-bezvisty-ta-poloneni',
    topicValue: 'missing',
  },
  {
    id: 'other',
    title: 'Інша ситуація',
    description:
      'Коротко опишіть проблему — юрист зателефонує та підкаже, з чого почати.',
    href: '/zamovyty-dzvinok?tema=other',
    topicValue: 'other',
  },
];
