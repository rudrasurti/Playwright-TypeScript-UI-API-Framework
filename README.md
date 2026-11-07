# Playwright + TypeScript UI & API Framework

![Playwright Tests](https://github.com/rudrasurti/Playwright-TypeScript-UI-API-Framework/actions/workflows/playwright.yml/badge.svg)
![Playwright](https://img.shields.io/badge/Playwright-1.65-2EAD33)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)

**Live test report:** [rudrasurti.github.io/Playwright-TypeScript-UI-API-Framework](https://rudrasurti.github.io/Playwright-TypeScript-UI-API-Framework/)

A Playwright framework in TypeScript that tests a web shop UI on three browsers and a REST API in the same suite, with the Page Object Model and a full CI pipeline.

## What's covered

| Area | Tests |
|---|---|
| UI login (`tests/ui/login.spec.ts`) | Valid login · locked-out user · wrong password |
| UI shopping (`tests/ui/shopping.spec.ts`) | Product list · cart badge · sort by price · full checkout |
| API bookings (`tests/api/booking.spec.ts`) | Health check · create + read · update with token · delete without token → 403 · unknown id → 404 |

UI tests run on Chromium, Firefox and WebKit (Safari engine): **26 tests** in total.
Apps under test: [Sauce Demo](https://www.saucedemo.com) and [Restful-booker](https://restful-booker.herokuapp.com/apidoc/index.html).

## Project structure

```
.
├── pages/                    # Page Objects
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── ui/                   # browser tests
│   └── api/                  # API tests with Playwright's request fixture
├── playwright.config.ts      # 4 projects: chromium, firefox, webkit, api
├── Dockerfile                # run in the official Playwright image
└── .github/workflows/playwright.yml
```

## Run locally

```bash
npm ci
npx playwright install --with-deps

npm test               # everything
npm run test:api       # API only
npx playwright test --grep @smoke
npm run report         # open the HTML report
```

Docker:

```bash
docker build -t pw-tests .
docker run --rm pw-tests
```

## CI/CD

| Stage | What it does |
|---|---|
| Type check | `tsc --noEmit` catches errors before any test runs |
| Matrix | Chromium, Firefox, WebKit and API run as 4 parallel jobs |
| Reliability | Retries on CI, trace on first retry, screenshot and video on failure |
| Merged report | Blob reports from every job merged into one HTML report |
| GitHub Pages | Latest report published after every run on `main` |
| Dependabot | Weekly updates for npm packages and GitHub Actions |

## Design choices

- **Page Object Model:** selectors live in one place; tests read like user steps
- **`data-test` selectors:** stable against style and layout changes
- **UI + API in one suite:** one config, one report, one pipeline
- **Independent tests:** each test logs in or creates its own data

---

**Rudra Surti** · Senior SDET · [Website](https://rudrasurti.github.io) · [LinkedIn](https://www.linkedin.com/in/rudra-surti/) · [Medium](https://medium.com/@rudrasurti98)
