// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Функціональні тести MyPress', () => {
  test('F-01: успішний вхід відкриває Dashboard', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard\.html$/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.locator('#user')).toHaveText('testuser');
  });

  test('F-02: невірний пароль показує повідомлення про помилку', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'wrong');
    await page.click('button[type="submit"]');
    await expect(page.locator('#login-error')).toHaveText('Невірний логін або пароль');
    await expect(page).toHaveURL(/login\.html$/);
  });

  test('F-03: створення нової публікації', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    await page.fill('#post-title', 'Результати e2e-тестів');
    await page.fill('#post-body', 'Створено автоматизованим тестом Playwright');
    await page.click('#add-post');
    await expect(page.locator('.post').first().locator('h3')).toHaveText('Результати e2e-тестів');
  });

  test('F-04: пошук публікації за ключовим словом', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    await page.fill('#search', 'автоматизація');
    await expect(page.locator('.post')).toHaveCount(1);
    await expect(page.locator('.post h3')).toHaveText('Автоматизація тестування');
    await page.fill('#search', 'неіснуюче');
    await expect(page.locator('#no-results')).toBeVisible();
  });
});
