import { test as base, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';

const adminUsername = process.env.ADMIN_USERNAME!;
const adminPassword = process.env.ADMIN_PASSWORD!;

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(
      adminUsername,
      adminPassword,
    );

    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboardPage.userDropdown).toBeVisible();

    if (!(await dashboardPage.isDisplayed())) {
      throw new Error(
        'authenticatedPage fixture: login did not reach the Dashboard as expected.'
      );
    }

    await use(page);
  },
});

export { expect };