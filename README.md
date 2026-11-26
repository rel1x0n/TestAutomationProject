# TestAutomationProject

Навчальний проєкт з дисципліни «Основи автоматизації тестування».
Автор: Рудько Юрій, група мКН-24.

Об'єкт тестування — навчальний веб-додаток **MyPress**: форма реєстрації, сторінка входу
та панель з публікаціями, а також REST API.

## Технології

| Мета | Інструмент |
|---|---|
| Мова | JavaScript (Node.js 20+) |
| Модульні та API-тести | Jest + jest-html-reporter |
| UI-тести в браузері | Selenium WebDriver + Mocha + Chai, звіт Mochawesome |
| Функціональні та регресійні e2e-тести | Playwright Test |
| CI | GitHub Actions (`.github/workflows/tests.yml`) |

## Структура

```
TestAutomationProject/
├─ .github/workflows/tests.yml   # CI: автоматичний запуск тестів
├─ src/
│  ├─ main/
│  │  ├─ app/                    # веб-додаток MyPress (server.js, public/*.html)
│  │  └─ lib/                    # бізнес-логіка: calculator, validators, posts
│  └─ test/
│     ├─ js/
│     │  ├─ unit/                # модульні тести (Jest)
│     │  ├─ api/                 # API-тести (Jest)
│     │  ├─ selenium/            # UI-тести (Selenium WebDriver + Mocha)
│     │  ├─ suite/               # тестовий набір TS-01 (Mocha)
│     │  ├─ e2e/                 # функціональні та регресійні тести (Playwright)
│     │  └─ legacy/              # застарілий дубльований набір (виключений з запуску)
│     ├─ resources/              # тестові дані: JSON, CSV
│     └─ utils/                  # допоміжні модулі: запуск сервера, WebDriver
├─ jest.config.js · playwright.config.js · .mocharc.*.json
└─ package.json
```

## Запуск

```bash
npm install
npm start                 # веб-додаток на http://localhost:3000
npm test                  # модульні та API-тести (Jest) + HTML-звіт reports/jest
npm run test:smoke        # лише критичні тести [critical]
npm run test:selenium     # UI-тести Selenium (потрібен Google Chrome)
npm run test:suite        # тестовий набір TS-01
npx playwright install chromium && npm run test:e2e   # e2e-тести Playwright
```

Звіти зберігаються в теці `reports/`.
