import { test, expect } from '@playwright/test';
import { BASE_URL, VALID_PASSWORD, USERS } from '../constants';

// TODO: Add UI layout tests here
// Utilize unused tests users to run more indepth UI testing to verify expected page layouts, etc.
test.describe('UI Layout Tests', () => {
    test('should verify UI layout requirements TBD', async ({ page }) => {
        await page.goto(BASE_URL);
    });

    test('verify UI title is visible', async ({ page }) => {
         await page.goto(BASE_URL);
        await expect(page.locator('[data-test="title"]')).toBeVisible();
    });
    
    test('verify item title layout', async ({ page }) => {
        await page.goto(BASE_URL);
        await expect(page.locator('[data-test="item-title"]')).toHaveCSS('font-size', '16px');          
    });

    test('verify item price is visible', async ({ page }) => {
        await page.goto(BASE_URL);
        await expect(page.locator('[data-test="item-price"]')).toBeVisible();
    }); 
});