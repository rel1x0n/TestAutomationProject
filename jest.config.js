/** Конфігурація Jest: модульні та API-тести, HTML-звіт, паралельний запуск. */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src/test/js'],
  testMatch: ['**/unit/**/*.test.js', '**/api/**/*.test.js'],
  maxWorkers: '50%',
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'MyPress — звіт про тестування (Jest)',
      outputPath: './reports/jest/test-report.html',
      includeFailureMsg: true,
      includeConsoleLog: true,
      sort: 'status',
    }],
  ],
};
