// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Порівняння: Playwright', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/login.html'); }); // новий контекст браузера для кожного тесту

  async function login(page, user, pass) {
    await page.fill('#username', user);
    await page.fill('#password', pass);
    await page.click('button[type="submit"]');
  }

  test('TC1: успішний вхід відкриває Dashboard', async ({ page }) => {
    await login(page, 'testuser', 'password123');
    await expect(page).toHaveURL(/dashboard\.html$/);
    await expect(page.locator('h1')).toHaveText('Dashboard');
  });

  test('TC2: невірний пароль показує помилку', async ({ page }) => {
    await login(page, 'testuser', 'wrong');
    await expect(page.locator('#login-error')).toHaveText('Невірний логін або пароль');
  });

  test('TC3: створення публікації', async ({ page }) => {
    await login(page, 'testuser', 'password123');
    await page.fill('#post-title', 'Порівняння фреймворків');
    await page.fill('#post-body', 'Звіт ІНДЗ');
    await page.click('#add-post');
    await expect(page.locator('.post h3').first()).toHaveText('Порівняння фреймворків');
  });

  test('TC4: пошук публікації за ключовим словом', async ({ page }) => {
    await login(page, 'testuser', 'password123');
    await page.fill('#search', 'автоматизація');
    await expect(page.locator('.post')).toHaveCount(1);
    await expect(page.locator('.post h3')).toHaveText('Автоматизація тестування');
  });

  test('TC5: вихід із системи', async ({ page }) => {
    await login(page, 'testuser', 'password123');
    await page.click('#logout');
    await expect(page).toHaveURL(/login\.html$/);
  });
});
