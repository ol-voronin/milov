# Категоризація сайту у фільтрах контенту

## Навіщо це взагалі

`zastupa.com.ua` зареєстровано 2 серпня 2026. Для баз, за якими працюють
корпоративні фільтри, це «uncategorized» — домен без історії. А політика
більшості організацій ріже нерозпізнані сайти за замовчуванням, бо саме
так поводяться фішингові одноденки.

Перевірено на практиці: робочий ноутбук у EPAM показує заглушку Infoblox
замість сайту.

**Чому це не дрібниця саме тут.** Наша аудиторія читає сайт зокрема
з роботи — з лікарень, соцслужб, ТЦК та СП, банків, шкіл. У всіх цих
організаціях стоять такі самі фільтри. Некатегоризований домен означає,
що частина людей побачить заглушку і вирішить, що з сайтом щось не так.

---

## Що вже зроблено на боці сайту

Це допомагає автоматичним класифікаторам, але **не знімає** вже наявне
блокування в конкретній компанії.

| Що | Де |
|---|---|
| `LegalService` зі `serviceType`, `knowsAbout`, `audience`, `isicV4: 6910` | `src/components/JsonLd.tsx` |
| `category: 'Legal Services'`, `classification`, `rating: general` | `src/app/layout.tsx` |
| Чіткий `title`, `description`, українська мова контенту | усі сторінки |
| Відкритий `robots.txt` і `sitemap.xml` | краулери бачать увесь сайт |

`isicV4: 6910` — це код «Діяльність у сфері права» за міжнародним
класифікатором. Він однозначно каже, до якої галузі належить сайт.

---

## Що зробити вручну

Форми безкоштовні, займають хвилин по п'ять. Скрізь просити категорію
**Legal / Legal Services**, іноді доступна точніша — *Government and
Legal Organizations*.

| Постачальник | Куди подавати |
|---|---|
| **Cisco Talos** (Umbrella, WSA, Meraki) | [talosintelligence.com/reputation_center/web_categorization](https://talosintelligence.com/reputation_center/web_categorization) — Lookup, далі Submit a Web Categorization Request |
| **Forcepoint** | [Site Lookup у Customer Hub](https://forcepoint2.my.site.com/ForcepointCustomerHub/s/article/How-To-Submit-Uncategorized-Sites) → Analyze → Recategorization |
| **Fortinet** (FortiGuard) | Форма «Web Filter Lookup» на fortiguard.com → Request Reclassification |
| **Zscaler** | site review на zscaler.com/tools |
| **Netcraft, Symantec/Broadcom, Trellix** | у кожного своя форма «submit a site for review» |

Infoblox, який стоїть в EPAM, здебільшого спирається на власні та
партнерські фіди — прямої публічної форми в нього немає. Тут працює
інший шлях: заявка через внутрішню підтримку компанії з поясненням,
навіщо доступ потрібен.

---

## Текст для заявки

Однаковий підійде майже скрізь:

> Site: https://zastupa.com.ua
> Requested category: Legal Services (Government and Legal Organizations)
>
> Ukrainian-language informational website of a legal practice.
> It explains the rights of families of Ukrainian servicemen: state
> benefits, appeals against refusals, pensions and legal statuses.
> The site contains no commerce, no user-generated content, no ads
> and no age-restricted material. Recently registered domain,
> currently uncategorized.

---

## Коли подавати

Тепер уже можна: домен віддає реальний сайт, індексація відкрита,
структуровані дані на місці. Раніше подавати не було сенсу — рецензент
побачив би заглушку.

Повторна перевірка — через тиждень-два: відкрити сайт з робочої мережі
або скористатися публічними lookup-формами тих самих постачальників.
