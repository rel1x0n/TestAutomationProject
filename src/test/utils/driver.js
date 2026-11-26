'use strict';
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
/**
 * Створює екземпляр Chrome WebDriver. Шлях до браузера і драйвера можна задати змінними
 * CHROME_BIN і CHROMEDRIVER_PATH; без них Selenium Manager знаходить їх автоматично.
 */
async function buildDriver() {
  const options = new chrome.Options().addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1280,900',
    // Вимикаємо менеджер паролів Chrome: після входу зі «слабким» паролем він показує вікно
    // перевірки витоку паролів, яке блокує подальшу роботу тесту
    '--disable-features=PasswordLeakDetection,PasswordManagerOnboarding');
  options.setUserPreferences({
    credentials_enable_service: false,
    'profile.password_manager_enabled': false,
    'profile.password_manager_leak_detection': false,
  });
  if (process.env.CHROME_BIN) options.setChromeBinaryPath(process.env.CHROME_BIN);
  const builder = new Builder().forBrowser('chrome').setChromeOptions(options);
  if (process.env.CHROMEDRIVER_PATH) {
    const service = new chrome.ServiceBuilder(process.env.CHROMEDRIVER_PATH);
    if (process.env.CHROMEDRIVER_ARGS) service.addArguments(...process.env.CHROMEDRIVER_ARGS.split(' '));
    builder.setChromeService(service);
  }
  return builder.build();
}
module.exports = { buildDriver };
