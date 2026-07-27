/**
 * ЮРИДИЧНИЙ КОНТЕНТ: ВИДИ ВИПЛАТ ТА ОФОРМЛЕНЬ
 *
 * Це CMS-модель нормативної інформації. Суми, строки, коло отримувачів
 * НЕ зашиваються в компоненти — лише тут.
 *
 * ⚠️ ПРАВИЛА ЗАПОВНЕННЯ:
 * 1. Не вигадуйте назви постанов, номери статей, суми чи строки.
 * 2. Кожен факт має посилатися на офіційне джерело (officialSource).
 * 3. Поки факт не перевірено адвокатом — ставте позначку
 *    NEEDS_LAWYER_REVIEW у відповідне поле. Компоненти показують її
 *    як службову примітку і НЕ показують неперевірені суми відвідувачам.
 * 4. Після перевірки заповнюйте lastVerifiedAt та verifiedBy.
 */

export const NEEDS_LAWYER_REVIEW =
  '[ПОТРІБНА ПЕРЕВІРКА АДВОКАТОМ ПЕРЕД ПУБЛІКАЦІЄЮ]';

export type OfficialSource = {
  title: string;
  url: string;
};

export type PaymentInfo = {
  id: string;
  /** Назва простою мовою */
  title: string;
  /** Пояснення простою мовою, без канцеляризмів */
  plainDescription: string;
  /** Сума або порядок визначення суми. Порожньо або NEEDS_LAWYER_REVIEW — не показується */
  amount: string;
  /** Хто може мати право (узагальнено, без гарантій) */
  eligibilitySummary: string;
  /** Порядок виплати (частинами / одноразово тощо) */
  paymentSchedule: string;
  /** Період чинності норми */
  applicableFrom: string;
  applicableTo: string;
  /** Офіційні джерела (тільки державні сайти) */
  officialSource: OfficialSource[];
  /** Дата останньої перевірки адвокатом (ISO) або порожньо */
  lastVerifiedAt: string;
  /** Хто перевірив */
  verifiedBy: string;
  /** Важливі винятки та застереження */
  importantExceptions: string;
};

/**
 * Офіційні джерела для повторного використання.
 * Тільки головні сторінки державних ресурсів — конкретні акти
 * має додати адвокат після перевірки.
 */
export const officialSources: OfficialSource[] = [
  { title: 'Верховна Рада України — законодавство', url: 'https://zakon.rada.gov.ua' },
  { title: 'Кабінет Міністрів України', url: 'https://www.kmu.gov.ua' },
  { title: 'Міністерство оборони України', url: 'https://www.mil.gov.ua' },
  { title: 'Міністерство у справах ветеранів України', url: 'https://mva.gov.ua' },
  { title: 'Портал Дія', url: 'https://diia.gov.ua' },
  { title: 'Пенсійний фонд України', url: 'https://www.pfu.gov.ua' },
];

export const payments: PaymentInfo[] = [
  {
    id: 'odnorazova-hroshova-dopomoha',
    title: 'Одноразова грошова допомога',
    plainDescription:
      'Державна виплата членам родини у разі загибелі або смерті військовослужбовця. Перевіримо, хто з членів родини має право на виплату та які документи потрібно подати.',
    amount: NEEDS_LAWYER_REVIEW,
    eligibilitySummary:
      'Зазвичай — дружина або чоловік, діти, батьки та утриманці. Точне коло та частки залежать від обставин і можуть змінюватися особистим розпорядженням військовослужбовця.',
    paymentSchedule: NEEDS_LAWYER_REVIEW,
    applicableFrom: NEEDS_LAWYER_REVIEW,
    applicableTo: '',
    officialSource: [
      { title: 'Міністерство оборони України', url: 'https://www.mil.gov.ua' },
      { title: 'Верховна Рада України — законодавство', url: 'https://zakon.rada.gov.ua' },
    ],
    lastVerifiedAt: '',
    verifiedBy: '',
    importantExceptions:
      'Право на виплату та розмір частки залежать від складу родини, наявності особистого розпорядження та інших обставин. ' +
      NEEDS_LAWYER_REVIEW,
  },
  {
    id: 'nevyplachene-hroshove-zabezpechennia',
    title: 'Невиплачене грошове забезпечення',
    plainDescription:
      'Кошти, які військовослужбовець заробив, але не встиг отримати: залишок грошового забезпечення за останній період служби.',
    amount: 'Залежить від нарахувань конкретної особи',
    eligibilitySummary: NEEDS_LAWYER_REVIEW,
    paymentSchedule: NEEDS_LAWYER_REVIEW,
    applicableFrom: '',
    applicableTo: '',
    officialSource: [
      { title: 'Міністерство оборони України', url: 'https://www.mil.gov.ua' },
    ],
    lastVerifiedAt: '',
    verifiedBy: '',
    importantExceptions: NEEDS_LAWYER_REVIEW,
  },
  {
    id: 'dodatkova-vynahoroda',
    title: 'Додаткова винагорода',
    plainDescription:
      'Окремі види винагороди, які могли бути нараховані військовослужбовцю, але не виплачені. Право на них залежить від законних підстав у конкретній ситуації.',
    amount: NEEDS_LAWYER_REVIEW,
    eligibilitySummary: NEEDS_LAWYER_REVIEW,
    paymentSchedule: NEEDS_LAWYER_REVIEW,
    applicableFrom: '',
    applicableTo: '',
    officialSource: [
      { title: 'Кабінет Міністрів України', url: 'https://www.kmu.gov.ua' },
    ],
    lastVerifiedAt: '',
    verifiedBy: '',
    importantExceptions: NEEDS_LAWYER_REVIEW,
  },
  {
    id: 'kompensatsiia-za-vidpustky',
    title: 'Компенсація за невикористані відпустки',
    plainDescription:
      'Грошова компенсація за дні відпустки, які військовослужбовець не встиг використати.',
    amount: 'Залежить від кількості невикористаних днів та грошового забезпечення',
    eligibilitySummary: NEEDS_LAWYER_REVIEW,
    paymentSchedule: NEEDS_LAWYER_REVIEW,
    applicableFrom: '',
    applicableTo: '',
    officialSource: [
      { title: 'Міністерство оборони України', url: 'https://www.mil.gov.ua' },
    ],
    lastVerifiedAt: '',
    verifiedBy: '',
    importantExceptions: NEEDS_LAWYER_REVIEW,
  },
  {
    id: 'pensiia-vtrata-hoduvalnyka',
    title: 'Пенсія у зв’язку з втратою годувальника',
    plainDescription:
      'Щомісячна пенсія для членів родини, які були на утриманні загиблого. Оформлюється через Пенсійний фонд України.',
    amount: NEEDS_LAWYER_REVIEW,
    eligibilitySummary:
      'Зазвичай — непрацездатні члени родини та особи, які були на утриманні. Точні умови залежать від обставин.',
    paymentSchedule: 'Щомісячно, після призначення',
    applicableFrom: '',
    applicableTo: '',
    officialSource: [
      { title: 'Пенсійний фонд України', url: 'https://www.pfu.gov.ua' },
    ],
    lastVerifiedAt: '',
    verifiedBy: '',
    importantExceptions: NEEDS_LAWYER_REVIEW,
  },
  {
    id: 'dopomoha-na-pokhovannia',
    title: 'Допомога на поховання',
    plainDescription:
      'Окрема виплата особі, яка здійснила поховання. Не залежить від інших виплат родині.',
    amount: NEEDS_LAWYER_REVIEW,
    eligibilitySummary: 'Особа, яка взяла на себе організацію поховання.',
    paymentSchedule: NEEDS_LAWYER_REVIEW,
    applicableFrom: '',
    applicableTo: '',
    officialSource: [
      { title: 'Кабінет Міністрів України', url: 'https://www.kmu.gov.ua' },
    ],
    lastVerifiedAt: '',
    verifiedBy: '',
    importantExceptions: NEEDS_LAWYER_REVIEW,
  },
  {
    id: 'derzhavni-ta-mistsevi-prohramy',
    title: 'Державні та місцеві програми підтримки',
    plainDescription:
      'Окремі області, міста та громади мають власні програми допомоги родинам загиблих. Наявність і умови залежать від місця проживання.',
    amount: 'Залежить від конкретної програми',
    eligibilitySummary: 'Визначається умовами кожної програми окремо.',
    paymentSchedule: 'Залежить від конкретної програми',
    applicableFrom: '',
    applicableTo: '',
    officialSource: [
      { title: 'Портал Дія', url: 'https://diia.gov.ua' },
      { title: 'Міністерство у справах ветеранів України', url: 'https://mva.gov.ua' },
    ],
    lastVerifiedAt: '',
    verifiedBy: '',
    importantExceptions:
      'Перелік програм змінюється. Актуальність для вашої громади потрібно перевіряти окремо.',
  },
  {
    id: 'status-chlena-simi',
    title: 'Статус члена сім’ї загиблого Захисника або Захисниці',
    plainDescription:
      'Офіційний статус, який відкриває доступ до пільг і соціальних гарантій: медичних, житлових, освітніх та інших.',
    amount: '',
    eligibilitySummary: NEEDS_LAWYER_REVIEW,
    paymentSchedule: '',
    applicableFrom: '',
    applicableTo: '',
    officialSource: [
      { title: 'Міністерство у справах ветеранів України', url: 'https://mva.gov.ua' },
      { title: 'Портал Дія', url: 'https://diia.gov.ua' },
    ],
    lastVerifiedAt: '',
    verifiedBy: '',
    importantExceptions: NEEDS_LAWYER_REVIEW,
  },
];
