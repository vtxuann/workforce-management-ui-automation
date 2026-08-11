import { test, expect } from '@playwright/test';

test('OrangeHRM application should be accessible', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/OrangeHRM/);
});