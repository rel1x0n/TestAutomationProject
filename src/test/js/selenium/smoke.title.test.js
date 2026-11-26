'use strict';
const { expect } = require('chai');
const { By } = require('selenium-webdriver');
const { buildDriver } = require('../../utils/driver');

describe('ЛР3. Перший тест Selenium WebDriver: відкриття сторінок', function () {
  this.timeout(30000);
  let driver;
  before(async () => { driver = await buildDriver(); });
  after(async () => { if (driver) await driver.quit(); });

  it('відкриває головну сторінку і перевіряє заголовок вкладки', async () => {
    await driver.get(process.env.BASE_URL + '/');
    expect(await driver.getTitle()).to.equal('MyPress – Реєстрація');
  });

  it('додатковий тест: сторінка входу містить заголовок «Вхід до MyPress»', async () => {
    await driver.get(process.env.BASE_URL + '/login.html');
    expect(await driver.getTitle()).to.equal('MyPress – Вхід');
    expect(await driver.findElement(By.css('h1')).getText()).to.equal('Вхід до MyPress');
  });
});
