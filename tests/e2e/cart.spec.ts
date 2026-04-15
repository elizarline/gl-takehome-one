import { test, expect } from '@playwright/test';
import { BASE_URL, VALID_PASSWORD, USERS } from '../constants';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('[data-test="username"]').fill(USERS.standard);
    await page.locator('[data-test="password"]').fill(VALID_PASSWORD);
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
  });

  test('adding an item from inventory updates the cart badge', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('adding an item from the item detail page updates the cart badge', async ({ page }) => {
    await page.locator('[data-test="item-4-title-link"]').click();
    await page.locator('[data-test="add-to-cart"]').click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('added items appear in the cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(`${BASE_URL}/cart.html`);
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
  });

  test('removing an item from the cart clears the badge', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
  });
});
