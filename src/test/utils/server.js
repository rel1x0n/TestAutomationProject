'use strict';
const { start } = require('../../main/app/server');
/** Запускає веб-додаток на вільному порту і повертає його адресу. */
async function startServer() {
  const server = await start(0);
  return { server, baseUrl: `http://localhost:${server.address().port}` };
}
module.exports = { startServer };
