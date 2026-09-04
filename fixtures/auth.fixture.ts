import { test as base, expect, type Page } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { env } from '../config/env.js';

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();

    await loginPage.login(
      env.adminUsername,
      env.adminPassword,
    );

    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboardPage.userDropdown).toBeVisible();

    await use(page);
  },
});

export { expect };