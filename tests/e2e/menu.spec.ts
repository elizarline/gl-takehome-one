import { test, expect } from '@playwright/test';
import { BASE_URL, VALID_PASSWORD, USERS } from '../constants';

test.describe('Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('[data-test="username"]').fill(USERS.standard);
    await page.locator('[data-test="password"]').fill(VALID_PASSWORD);
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
  });

  test('menu opens and displays all nav items', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();

    await expect(page.locator('[data-test="inventory-sidebar-link"]')).toBeVisible();
    await expect(page.locator('[data-test="about-sidebar-link"]')).toBeVisible();
    await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
    await expect(page.locator('[data-test="reset-sidebar-link"]')).toBeVisible();
  });

  test('menu closes when X is tapped', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();

    await page.getByRole('button', { name: 'Close Menu' }).click();
    await expect(page.locator('[data-test="logout-sidebar-link"]')).not.toBeVisible();
  });

  test('About navigates to Sauce Labs site', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="about-sidebar-link"]').click();

    await expect(page).toHaveURL(/saucelabs\.com/);
  });

  test('All Items returns to inventory page', async ({ page }) => {
    await page.goto(`${BASE_URL}/inventory-item.html?id=4`);
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="inventory-sidebar-link"]').click();

    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
    await expect(page.locator('[data-test="title"]')).toBeVisible();
  });

  test('Logout returns to login page', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();

    await expect(page).toHaveURL(`${BASE_URL}/`);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
