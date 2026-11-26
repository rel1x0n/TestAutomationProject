// @ts-check
const { defineConfig, devices } = require('@playwright/test');
/** Playwright: функціональні та регресійні e2e-тести MyPress. */
module.exports = defineConfig({
  testDir: './src/test/js/e2e',
  timeout: 30000,
  fullyParallel: true,
  reporter: [['list'], ['html', { outputFolder: 'reports/playwright', open: 'never' }], ['json', { outputFile: 'reports/playwright/results.json' }]],
  use: {
    baseURL: 'http://localhost:3100',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    launchOptions: process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN } : {},
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: { command: 'node src/main/app/server.js', url: 'http://localhost:3100/api/health', env: { PORT: '3100' }, reuseExistingServer: true },
});
