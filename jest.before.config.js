/** Конфігурація «до оптимізації» (ЛР8): з дубльованим legacy-набором і послідовним запуском. */
const base = require('./jest.config');
module.exports = {
  ...base,
  testMatch: ['**/unit/**/*.test.js', '**/api/**/*.test.js', '**/legacy/**/*.test.js'],
  maxWorkers: 1,
  reporters: ['default', ['jest-html-reporter', {
    pageTitle: 'MyPress — звіт до оптимізації', outputPath: './reports/jest/test-report-before.html',
    includeFailureMsg: true, sort: 'status',
  }]],
};
