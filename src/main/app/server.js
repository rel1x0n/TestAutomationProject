'use strict';
/**
 * MyPress — навчальний веб-додаток (об'єкт тестування):
 *   /              — форма реєстрації (ім'я, email, пароль)
 *   /login.html    — сторінка входу; /dashboard.html — панель з публікаціями
 *   /api/...       — REST API (health, register, login, posts)
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { validateRegistration } = require('../lib/validators');
const { createStore } = require('../lib/posts');

const PUBLIC = path.join(__dirname, 'public');
const USERS = { testuser: 'password123' };
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css' };

function json(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}
function readBody(req) {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (c) => { raw += c; });
    req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch { resolve(null); } });
  });
}

function createApp() {
  const posts = createStore([
    { title: 'Ласкаво просимо до MyPress', body: 'Перша публікація блогу.' },
    { title: 'Автоматизація тестування', body: 'Selenium, Playwright, Jest і Mocha.' },
  ]);
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/api/health') return json(res, 200, { status: 'ok' });
    if (url.pathname === '/api/register' && req.method === 'POST') {
      const body = await readBody(req);
      if (!body) return json(res, 400, { errors: { body: 'Некоректний JSON' } });
      const r = validateRegistration(body);
      return r.valid ? json(res, 201, { message: 'Форма відправлена успішно' }) : json(res, 400, { errors: r.errors });
    }
    if (url.pathname === '/api/login' && req.method === 'POST') {
      const { username, password } = (await readBody(req)) || {};
      return USERS[username] && USERS[username] === password
        ? json(res, 200, { token: 'token-' + username, user: username })
        : json(res, 401, { error: 'Невірний логін або пароль' });
    }
    if (url.pathname === '/api/posts' && req.method === 'GET') return json(res, 200, posts.list(url.searchParams.get('q') || ''));
    if (url.pathname === '/api/posts' && req.method === 'POST') {
      if (req.headers.authorization !== 'Bearer token-testuser') return json(res, 401, { error: 'Потрібна авторизація' });
      try { return json(res, 201, posts.create((await readBody(req)) || {})); } catch (e) { return json(res, 400, { error: e.message }); }
    }
    const file = path.join(PUBLIC, url.pathname === '/' ? 'index.html' : url.pathname);
    if (!file.startsWith(PUBLIC) || !fs.existsSync(file)) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
}

function start(port = process.env.PORT || 3000) {
  return new Promise((resolve) => {
    const server = createApp().listen(port, () => resolve(server));
  });
}

if (require.main === module) {
  start().then((s) => console.log(`MyPress: http://localhost:${s.address().port}`));
}
module.exports = { createApp, start };
