import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { DashboardPage } from '../../pages/DashboardPage.js';

test.describe('Authentication - Logout', () => {
  test('AT-AUTH-007 | Logout from an authenticated session @smoke', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      throw new Error(
        'ADMIN_USERNAME and ADMIN_PASSWORD must be defined in the environment.',
      );
    }

    await loginPage.goto();
    await loginPage.login(username, password);

    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboardPage.userDropdown).toBeVisible();

    await dashboardPage.logout();

    await expect(page).toHaveURL(/auth\/login/);
    await expect(loginPage.loginButton).toBeVisible();
  });
});