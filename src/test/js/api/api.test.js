'use strict';
const fs = require('fs');
const path = require('path');
const { startServer } = require('../../utils/server');

const users = fs.readFileSync(path.join(__dirname, '../../resources/users.csv'), 'utf8')
  .trim().split('\n').slice(1).map((l) => { const [username, password, status] = l.split(','); return { username, password, status: Number(status) }; });

describe('REST API MyPress', () => {
  let server; let base;
  beforeAll(async () => { ({ server, baseUrl: base } = await startServer()); });
  afterAll(() => new Promise((r) => server.close(r)));

  const post = (url, body, headers = {}) => fetch(base + url, {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body),
  });

  test('[critical] API-01: GET /api/health повертає 200 OK', async () => {
    const res = await fetch(base + '/api/health');
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: 'ok' });
  });

  test('[critical] API-02: реєстрація з коректними даними → 201', async () => {
    const res = await post('/api/register', { name: 'Ivan', email: 'ivan@example.com', password: '123456' });
    expect(res.status).toBe(201);
  });

  test('[major] API-03: реєстрація з некоректним email → 400 з описом помилки', async () => {
    const res = await post('/api/register', { name: 'Ivan', email: 'ivan.example.com', password: '123456' });
    expect(res.status).toBe(400);
    expect((await res.json()).errors.email).toBe('Некоректний формат email');
  });

  test.each(users)('[major] API-04: вхід $username / $password → $status', async ({ username, password, status }) => {
    const res = await post('/api/login', { username, password });
    expect(res.status).toBe(status);
  });

  test('[major] API-05: створення публікації без токена → 401', async () => {
    const res = await post('/api/posts', { title: 'Test' });
    expect(res.status).toBe(401);
  });

  test('[minor] API-06: створена публікація знаходиться пошуком', async () => {
    const created = await post('/api/posts', { title: 'Звіт CI', body: 'GitHub Actions' }, { Authorization: 'Bearer token-testuser' });
    expect(created.status).toBe(201);
    const found = await fetch(base + '/api/posts?q=' + encodeURIComponent('звіт ci')).then((r) => r.json());
    expect(found.map((p) => p.title)).toContain('Звіт CI');
  });
});
