import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { DashboardPage } from '../../pages/DashboardPage.js';

test.describe('Authentication - Session Security', () => {
  test('AT-AUTH-008 | Prevent protected access using Browser Back after logout', async ({
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

    // Authenticate.
    await loginPage.goto();
    await loginPage.login(username, password);

    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboardPage.userDropdown).toBeVisible();

    // Terminate the authenticated session.
    await dashboardPage.logout();

    await expect(page).toHaveURL(/auth\/login/);
    await expect(loginPage.loginButton).toBeVisible();

    // Attempt to restore the previous authenticated page.
    await page.goBack({
      waitUntil: 'domcontentloaded',
    });

    const pimMenuItem = page.getByRole('link', {
      name: 'PIM',
      exact: true,
    });

    if (await pimMenuItem.isVisible()) {
      const protectedHref = await pimMenuItem.getAttribute('href');

      expect(protectedHref).toBeTruthy();

      await page.goto(protectedHref!);
    }

    await expect(page).toHaveURL(/auth\/login/);
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('AT-AUTH-009 | Prevent direct protected URL access after logout @smoke', async ({
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

    // Attempt direct navigation to a known protected resource.
    await page.goto('/web/index.php/dashboard/index');

    await expect(page).toHaveURL(/auth\/login/);
    await expect(loginPage.loginButton).toBeVisible();
  });
});