import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [['html', { open: 'never' }], ['list'], ['junit', { outputFile: 'results/junit.xml' }]],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', testDir: './tests/ui', use: { ...devices['Desktop Chrome'], baseURL: 'https://www.saucedemo.com' } },
    { name: 'firefox', testDir: './tests/ui', use: { ...devices['Desktop Firefox'], baseURL: 'https://www.saucedemo.com' } },
    { name: 'webkit', testDir: './tests/ui', use: { ...devices['Desktop Safari'], baseURL: 'https://www.saucedemo.com' } },
    { name: 'api', testDir: './tests/api', use: { baseURL: 'https://restful-booker.herokuapp.com' } },
  ],
});
