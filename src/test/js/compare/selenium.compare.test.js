'use strict';
const { expect } = require('chai');
const { By, until } = require('selenium-webdriver');
const { buildDriver } = require('../../utils/driver');

describe('Порівняння: Selenium WebDriver + Mocha', function () {
  this.timeout(30000);
  let driver;
  before(async () => { driver = await buildDriver(); });
  after(async () => { if (driver) await driver.quit(); });
  beforeEach(async () => {
    await driver.get(process.env.BASE_URL + '/login.html');
    await driver.executeScript('localStorage.clear()'); // ізоляцію тестів забезпечуємо вручну
  });

  async function login(user, pass) {
    await driver.findElement(By.id('username')).sendKeys(user);
    await driver.findElement(By.id('password')).sendKeys(pass);
    await driver.findElement(By.css('button[type="submit"]')).click();
    if (pass === 'password123') await driver.wait(until.urlContains('/dashboard.html'), 5000);
  }
  // Очікування тексту з повторною спробою, якщо елемент перемалювався (StaleElementReference)
  const textIs = (css, text) => async () => {
    try { return (await driver.findElement(By.css(css)).getText()) === text; } catch { return false; }
  };

  it('TC1: успішний вхід відкриває Dashboard', async () => {
    await login('testuser', 'password123');
    await driver.wait(textIs('h1', 'Dashboard'), 5000);
  });

  it('TC2: невірний пароль показує помилку', async () => {
    await login('testuser', 'wrong');
    const err = await driver.findElement(By.id('login-error'));
    await driver.wait(until.elementIsVisible(err), 5000);
    expect(await err.getText()).to.equal('Невірний логін або пароль');
  });

  it('TC3: створення публікації', async () => {
    await login('testuser', 'password123');
    await driver.wait(until.elementLocated(By.css('.post')), 5000);
    await driver.findElement(By.id('post-title')).sendKeys('Порівняння фреймворків');
    await driver.findElement(By.id('post-body')).sendKeys('Звіт ІНДЗ');
    await driver.findElement(By.id('add-post')).click();
    await driver.wait(textIs('.post h3', 'Порівняння фреймворків'), 5000);
  });

  it('TC4: пошук публікації за ключовим словом', async () => {
    await login('testuser', 'password123');
    await driver.findElement(By.id('search')).sendKeys('автоматизація');
    await driver.wait(async () => (await driver.findElements(By.css('.post'))).length === 1, 5000);
    await driver.wait(textIs('.post h3', 'Автоматизація тестування'), 5000);
  });

  it('TC5: вихід із системи', async () => {
    await login('testuser', 'password123');
    await driver.findElement(By.id('logout')).click();
    await driver.wait(until.urlMatches(/login\.html$/), 5000);
  });
});
