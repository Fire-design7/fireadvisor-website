# Fire Advisor — сайт

Нов, двуезичен (BG/EN) сайт на fireadvisor.eu, изграден с Next.js. Пълната бизнес логика и решения за архитектурата са описани в `FireAdvisor-Business-Specification.md` и `FireAdvisor-Build-Prompt.md` (в Downloads папката, извън този проект).

Това ръководство е за вас — собственика — не изисква технически познания.

---

## 1. Как да пуснете сайта локално (за преглед)

Node.js вече е инсталиран на този компютър в `C:\Users\z004nbne\tools\node`. Ако отваряте нов терминал (PowerShell), изпълнете:

```powershell
$env:Path = "C:\Users\z004nbne\tools\node;$env:Path"
cd D:\Projects\fireadvisor-website
npm run dev
```

После отворете `http://localhost:3000` в браузъра.

---

## 2. Настройка на Supabase (база данни за запитванията)

1. Отидете на [supabase.com](https://supabase.com) → **Sign up** (безплатно за начало).
2. Създайте нов проект (New Project) — изберете регион в Европа (напр. Frankfurt) за по-бърз достъп от България.
3. След като проектът се създаде, отидете в **SQL Editor** → **New query**.
4. Отворете файла `supabase/schema.sql` от този проект, копирайте съдържанието и го поставете в SQL Editor-а, после натиснете **Run**. Това създава таблицата `inquiries`, в която ще се пазят запитванията от сайта.
5. Отидете в **Project Settings → API**. Ще ви трябват две стойности:
   - **Project URL** → това е `SUPABASE_URL`
   - **service_role key** (в секция "Project API keys", не "anon public"!) → това е `SUPABASE_SERVICE_ROLE_KEY`

⚠️ `service_role key` дава пълен достъп до базата данни — никога не го споделяйте публично и не го качвайте в git (той е защитен от `.gitignore` автоматично, стига да стои само в `.env.local` / Vercel).

---

## 3. Настройка на Resend (имейлите)

Resend е избран вместо Mailgun, защото не изисква кредитна карта за безплатния план (3000 имейла/месец — далеч повече от нужното).

1. Отидете на [resend.com](https://resend.com) → **Sign up** (може директно с GitHub акаунта).
2. **Domains → Add Domain** — добавете `fireadvisor.eu` (или поддомейн, напр. `mail.fireadvisor.eu`, ако предпочитате да не пипате нищо на основния домейн). Resend ще ви даде DNS записи (TXT, MX, CNAME) за добавяне в jump.bg — **не пипайте MX записите на Google Workspace**, добавяте само новите редове, които Resend показва.
3. След като домейнът се потвърди (обикновено до час), отидете в **API Keys → Create API Key**:
   - Стойността → `RESEND_API_KEY`
4. Решете от какъв адрес да излизат имейлите (`RESEND_FROM_EMAIL`, напр. `"Fire Advisor <no-reply@mail.fireadvisor.eu>"`) и на кой имейл да получавате известията (`RESEND_OWNER_EMAIL`).

**Защо имейлите могат да падат в Spam дори с verified домейн:**
- **SPF** и **DKIM** записите, които Resend дава, доказват, че вие сте истинският изпращач — Resend ги проверява сам при верификацията на домейна, затова не е нужно нищо допълнително.
- **Важно**: домейн може да има само **един** SPF TXT запис. Ако вече имате SPF за Google Workspace на основния `fireadvisor.eu` и добавите Resend на **същия** домейн (не поддомейн), трябва да обедините двата в един ред (`v=spf1 include:_spf.google.com include:amazonses.com ~all`), иначе вторият чупи и двата. Точно затова по-горе препоръчваме поддомейн (`mail.fireadvisor.eu`) — той има собствена, отделна DNS зона и този проблем изобщо не възниква.
- **DMARC** не е задължителен за верификацията в Resend, но силно се препоръчва за по-добра репутация — добавете TXT запис с Name `_dmarc` и съдържание `v=DMARC1; p=none; rua=mailto:info@fireadvisor.eu` в jump.bg. `p=none` означава само наблюдение, без да отхвърля нищо — безопасно да се добави винаги.
- Нов, току-що верифициран домейн няма история/репутация пред Gmail/Outlook — първите имейли е нормално да бъдат по-склонни към Spam, докато домейнът "загрее". Затова `RESEND_CUSTOMER_CONFIRMATION` е изключено по подразбиране (виж `.env.local.example`) — пращаме само известието към вас, докато репутацията се стабилизира, преди да пращаме и потвърждения към клиенти.

---

## 4. Локални тестови ключове

Копирайте `.env.local.example` като `.env.local` в основната папка на проекта и попълнете стойностите от стъпки 2 и 3. Този файл никога не се качва в git.

---

## 5. Публикуване на живо във Vercel

1. ✅ Кодът вече е в GitHub: [github.com/Fire-design7/fireadvisor-website](https://github.com/Fire-design7/fireadvisor-website)
2. Отидете на [vercel.com](https://vercel.com) → **Sign up** (може директно с GitHub акаунта).
3. **Add New → Project** → изберете `fireadvisor-website` от списъка → **Import**.
4. В **Environment Variables** добавете същите ключове като в `.env.local` (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_OWNER_EMAIL). Може да пропуснете тази стъпка първоначално и да ги добавите по-късно — сайтът ще работи, само формата за контакт няма да изпраща, докато не ги зададете.
5. Натиснете **Deploy**. След минута сайтът е достъпен на временен `*.vercel.app` адрес.
6. За да свържете реалния домейн: **Project → Settings → Domains** → добавете `fireadvisor.eu` и `www.fireadvisor.eu`, следвайте инструкциите за DNS записи (A запис за root домейна, CNAME за `www`) — добавят се в jump.bg, без да пипате MX записите на Google Workspace.

---

## 6. Проверка на старите Google Ads линкове

Преди да насочите домейна към новия сайт:
1. Извадете точния списък с Final URL адреси от активните Google Ads кампании (Google Ads → Campaigns → Ads → колона "Final URL").
2. Отворете всеки от старите адреси (`/about`, `/services`, `/contact`) върху новия сайт (на `*.vercel.app` преди да смените домейна) и проверете, че пренасочва коректно към новата страница.
3. Настройте **conversion tracking** в Google Ads към страницата "Благодарим за запитването" — в момента отчетът ви показваше 0 реализации, което вероятно означава, че липсва проследяване.

---

## 7. Добавяне на реално съдържание

Всичко в сайта се редактира чрез прости файлове — не е нужен админ панел:

| Какво искате да смените | Файл |
|---|---|
| Телефон, имейл | `src/content/site-config.ts` |
| Текстове по услуги | `src/content/services.ts` |
| Текстове по сектори | `src/content/sectors.ts` |
| Ресурси (PDF-та) | `src/content/resources.ts` + качете реалните PDF файлове в `public/resources/` |
| Био, философия, сертификати | текстовете в `messages/bg.json` и `messages/en.json`, секция `about` |
| Всички други текстове по сайта | `messages/bg.json` (български) и `messages/en.json` (английски) |

Просто ми кажете какво искате да смените и ще редактирам файловете вместо вас.

---

## 8. Нова публикация в блога

Кажете ми нещо от рода на: *"Напиши ми блог пост за [тема], на български и английски"*. Ще създам файловете в `content/blog/bg/` и `content/blog/en/`, ще ви покажа чернова, и при одобрение ще направя commit + push — Vercel автоматично публикува новата статия до минута.

---

## 9. Технически детайли (за бъдещи Claude Code сесии)

- Next.js 16, App Router, TypeScript, Tailwind CSS v4
- `next-intl` за BG (root, без представка) / EN (`/en`) рутинг — виж `src/i18n/`
- Съдържанието на услуги/сектори/проекти/ресурси е в `src/content/*.ts` (не база данни)
- Блог постовете са MDX файлове в `content/blog/{bg,en}/`
- Формата за запитване праща към `src/app/api/inquiries/route.ts`, който пише в Supabase (`supabase/schema.sql`) и праща имейли през Resend (`src/lib/email.ts`)
- 301 redirect-и от стария сайт (`/about`, `/services`, `/contact`, `/blog-2`, `/archives/:id`) са в `next.config.ts`
- `src/app/sitemap.ts` и `src/app/robots.ts` генерират SEO файловете автоматично
