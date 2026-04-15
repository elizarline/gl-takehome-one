import { test, expect } from '@playwright/test';
import { BASE_URL, VALID_PASSWORD, USERS } from '../constants';

test.describe('Item page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('[data-test="username"]').fill(USERS.standard);
    await page.locator('[data-test="password"]').fill(VALID_PASSWORD);
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
  });

  test('clicking an item card navigates to its detail page', async ({ page }) => {
    await page.locator('[data-test="item-4-title-link"]').click();

    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);
  });

  test('item detail page shows name, description, price and add to cart button', async ({ page }) => {
    await page.locator('[data-test="item-4-title-link"]').click();

    await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-price"]')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  });

  test('item can be added and removed from cart via inventory card', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
  });

  test('item can be added and removed from cart on the detail page', async ({ page }) => {
    await page.locator('[data-test="item-4-title-link"]').click();

    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    await page.locator('[data-test="remove"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
  });

  test('back to products returns to inventory', async ({ page }) => {
    await page.locator('[data-test="item-4-title-link"]').click();
    await page.locator('[data-test="back-to-products"]').click();

    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
    await expect(page.locator('[data-test="title"]')).toBeVisible();
  });
});
