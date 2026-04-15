import { test, expect } from '@playwright/test';
import { BASE_URL, VALID_PASSWORD, USERS } from '../constants';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('successful login redirects to inventory', async ({ page }) => {
    await page.locator('[data-test="username"]').fill(USERS.standard);
    await page.locator('[data-test="password"]').fill(VALID_PASSWORD);
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
    await expect(page.locator('[data-test="title"]')).toBeVisible();
  });

  test('locked out user sees error message', async ({ page }) => {
    await page.locator('[data-test="username"]').fill(USERS.locked_out);
    await page.locator('[data-test="password"]').fill(VALID_PASSWORD);
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(BASE_URL + '/');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('invalid credentials show error message', async ({ page }) => {
    await page.locator('[data-test="username"]').fill(USERS.standard);
    await page.locator('[data-test="password"]').fill('wrong_password');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(BASE_URL + '/');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
