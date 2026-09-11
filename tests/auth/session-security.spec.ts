import { test, expect } from '../../fixtures/auth.fixture.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { DashboardPage } from '../../pages/DashboardPage.js';

test.describe('Authentication - Post-Logout Session Security (TS-AUTH-003)', () => {
  test('AT-AUTH-008 | Prevent protected access using Browser Back after logout',
    { tag: ['@auth'] }, async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage;

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Terminate the authenticated session.
    await dashboardPage.logout();

    await expect(page).toHaveURL(/auth\/login/);
    await expect(loginPage.loginButton).toBeVisible();

    await page.goBack({
    waitUntil: 'domcontentloaded',
  });

    await expect(page).toHaveURL(/auth\/login/);
    await expect(loginPage.loginButton).toBeVisible();

  });

  test('AT-AUTH-009 | Prevent direct protected URL access after logout',
    { tag: ['@smoke', '@auth'] }, async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage;

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.logout();

    await expect(page).toHaveURL(/auth\/login/);

    // Attempt direct navigation to a known protected resource.
    await page.goto('/web/index.php/dashboard/index');

    await expect(page).toHaveURL(/auth\/login/);
    await expect(loginPage.loginButton).toBeVisible();
  });
});