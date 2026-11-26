// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Регресійні тести сторінки входу після оновлення', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/login.html'); });

  test('R-01: поля вводу відображаються', async ({ page }) => {
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
  });

  test('R-02: кнопка входу доступна', async ({ page }) => {
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });

  test('R-03: після входу відбувається перенаправлення на Dashboard', async ({ page }) => {
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('R-04: неавторизованого користувача Dashboard повертає на вхід', async ({ page }) => {
    await page.goto('/dashboard.html');
    await expect(page).toHaveURL(/login\.html$/);
  });

  test('R-05: вихід із системи повертає на сторінку входу', async ({ page }) => {
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    await page.click('#logout');
    await expect(page).toHaveURL(/login\.html$/);
  });
});
