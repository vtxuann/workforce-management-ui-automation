import { test, expect } from '../../fixtures/auth.fixture.js';

import { LoginPage } from '../../pages/LoginPage.js';
import { DashboardPage } from '../../pages/DashboardPage.js';

test.describe('Authentication - Logout', () => {
  test('AT-AUTH-007 | Logout from an authenticated session @smoke', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage;

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.logout();

    await expect(page).toHaveURL(/auth\/login/);
    await expect(loginPage.loginButton).toBeVisible();
  });
});