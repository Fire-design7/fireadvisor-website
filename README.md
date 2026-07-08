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

## 3. Настройка на Mailgun (имейлите)

1. Отидете на [mailgun.com](https://www.mailgun.com) → регистрирайте се.
2. Добавете и потвърдете домейн (най-добре поддомейн, напр. `mg.fireadvisor.eu`, за да не пречи на съществуващия ви имейл поток) — Mailgun ще ви даде DNS записи (TXT, MX, CNAME), които трябва да добавите при регистъра на домейна ви.
3. От **Sending → Domain settings** вземете:
   - **API Key** → `MAILGUN_API_KEY`
   - **Domain** (напр. `mg.fireadvisor.eu`) → `MAILGUN_DOMAIN`
4. Решете от какъв адрес да излизат имейлите (`MAILGUN_FROM_EMAIL`, напр. `"Fire Advisor <no-reply@mg.fireadvisor.eu>"`) и на кой имейл да получавате известията (`MAILGUN_OWNER_EMAIL`).
5. Ако акаунтът ви е в EU регион на Mailgun (пита се при регистрация), сложете `MAILGUN_EU_REGION=true`.

---

## 4. Локални тестови ключове

Копирайте `.env.local.example` като `.env.local` в основната папка на проекта и попълнете стойностите от стъпки 2 и 3. Този файл никога не се качва в git.

---

## 5. Публикуване на живо във Vercel

1. Качете проекта в GitHub (частен репозиторий е ОК): създайте нов repo и качете кода (мога да го направя вместо вас при потвърждение).
2. Отидете на [vercel.com](https://vercel.com) → **Sign up** (може директно с GitHub акаунта).
3. **Add New → Project** → изберете GitHub repo-то на проекта.
4. В **Environment Variables** добавете същите ключове като в `.env.local` (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM_EMAIL, MAILGUN_OWNER_EMAIL, MAILGUN_EU_REGION).
5. Натиснете **Deploy**. След минута сайтът е достъпен на временен `*.vercel.app` адрес.
6. За да свържете реалния домейн: **Project → Settings → Domains** → добавете `fireadvisor.eu` и `www.fireadvisor.eu`, следвайте инструкциите за DNS записи (обикновено един `A`/`CNAME` запис при вашия регистър на домейна).

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
- Формата за запитване праща към `src/app/api/inquiries/route.ts`, който пише в Supabase (`supabase/schema.sql`) и праща имейли през Mailgun (`src/lib/mailgun.ts`)
- 301 redirect-и от стария сайт (`/about`, `/services`, `/contact`) са в `next.config.ts`
- `src/app/sitemap.ts` и `src/app/robots.ts` генерират SEO файловете автоматично
