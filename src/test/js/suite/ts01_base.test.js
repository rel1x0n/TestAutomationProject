'use strict';
/**
 * TS-01 «Базовий набір MyPress» (ЛР4).
 * Кожен тест-кейс має ідентифікатор, назву, кроки та очікуваний результат.
 */
const { expect } = require('chai');
const { By } = require('selenium-webdriver');
const { buildDriver } = require('../../utils/driver');
const calc = require('../../../main/lib/calculator');

describe('TS-01. Базовий набір MyPress', function () {
  this.timeout(30000);

  describe('UI', () => {
    let driver;
    before(async () => { driver = await buildDriver(); });
    after(async () => { if (driver) await driver.quit(); });

    /*
     * TC-UI-01. Доступність сторінки входу.
     * Кроки: 1) відкрити /login.html; 2) знайти поля «Логін», «Пароль» і кнопку «Увійти».
     * Очікуваний результат: сторінка відкривається, усі елементи відображаються.
     */
    it('TC-UI-01: сторінка входу доступна і містить форму', async () => {
      await driver.get(process.env.BASE_URL + '/login.html');
      expect(await driver.findElement(By.id('username')).isDisplayed()).to.equal(true);
      expect(await driver.findElement(By.id('password')).isDisplayed()).to.equal(true);
      expect(await driver.findElement(By.css('button[type="submit"]')).getText()).to.equal('Увійти');
    });
  });

  describe('API', () => {
    /*
     * TC-API-01. Статус сервісу. Кроки: надіслати GET /api/health.
     * Очікуваний результат: код 200 OK, тіло {"status":"ok"}.
     */
    it('TC-API-01: GET /api/health повертає 200 OK', async () => {
      const res = await fetch(process.env.BASE_URL + '/api/health');
      expect(res.status).to.equal(200);
      expect(await res.json()).to.deep.equal({ status: 'ok' });
    });

    /*
     * TC-API-02. Невдалий вхід. Кроки: POST /api/login з неправильним паролем.
     * Очікуваний результат: код 401.
     */
    it('TC-API-02: вхід з неправильним паролем повертає 401', async () => {
      const res = await fetch(process.env.BASE_URL + '/api/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'wrong' }),
      });
      expect(res.status).to.equal(401);
    });
  });

  describe('Unit', () => {
    /*
     * TC-UNIT-01. Обчислення суми. Кроки: викликати add(a, b).
     * Очікуваний результат: правильна сума для кожного набору даних (data-driven).
     */
    [[2, 3, 5], [-1, 1, 0], [10, 15, 25]].forEach(([a, b, sum]) => {
      it(`TC-UNIT-01: add(${a}, ${b}) = ${sum}`, () => {
        expect(calc.add(a, b)).to.equal(sum);
      });
    });
  });
});
