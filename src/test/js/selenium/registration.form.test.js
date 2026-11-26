'use strict';
const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const { By, until } = require('selenium-webdriver');
const { buildDriver } = require('../../utils/driver');
const cases = require('../../resources/registration_cases.json').slice(0, 4);   // TC01–TC04

const SHOTS = path.join(__dirname, '../../../../reports/screenshots');

describe('ЛР1. Форма реєстрації — автоматизовані тест-кейси (Selenium WebDriver)', function () {
  this.timeout(30000);
  let driver;
  before(async () => { driver = await buildDriver(); fs.mkdirSync(SHOTS, { recursive: true }); });
  after(async () => { if (driver) await driver.quit(); });

  async function fill({ name, email, password }) {
    await driver.get(process.env.BASE_URL + '/');
    for (const [id, value] of Object.entries({ name, email, password })) {
      const el = await driver.findElement(By.id(id));
      await el.clear();
      if (value) await el.sendKeys(value);
    }
    await driver.findElement(By.id('submit')).click();
  }

  for (const c of cases) {
    it(`${c.id}: ${c.scenario}`, async () => {
      await fill(c);
      if (c.expected === 'success') {
        const msg = await driver.wait(until.elementLocated(By.id('success')), 5000);
        await driver.wait(until.elementIsVisible(msg), 5000);
        expect(await msg.getText()).to.equal('Форма відправлена успішно');
      } else {
        const err = await driver.findElement(By.id(`${c.expected}-error`));
        await driver.wait(async () => (await err.getText()) !== '', 5000);
        expect(await err.getText()).to.not.equal('');
        expect(await driver.findElement(By.id('success')).isDisplayed()).to.equal(false);
      }
      fs.writeFileSync(path.join(SHOTS, `selenium_${c.id}.png`), await driver.takeScreenshot(), 'base64');
    });
  }
});
