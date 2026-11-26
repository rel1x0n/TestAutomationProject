'use strict';
const { startServer } = require('./server');
/** Кореневі хуки Mocha: один запуск веб-додатку на весь набір тестів. */
let server;
exports.mochaHooks = {
  async beforeAll() {
    const s = await startServer();
    server = s.server;
    process.env.BASE_URL = s.baseUrl;
  },
  async afterAll() {
    await new Promise((r) => server.close(r));
  },
};
