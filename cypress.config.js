const { defineConfig } = require('cypress');

/** Cypress: e2e-тести MyPress (сервер запускається окремо на порту 3100). */
module.exports = defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://localhost:3100',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
    screenshotOnRunFailure: true,
  },
});
