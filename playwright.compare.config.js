// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const base = require('./playwright.config');
/** Playwright для порівняльного експерименту: послідовний запуск в одному процесі, браузер Google Chrome. */
module.exports = defineConfig({
  ...base,
  testDir: './src/test/js/compare',
  testMatch: '*.spec.js',
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  projects: [{ name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } }],
});
