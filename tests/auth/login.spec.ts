import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { DashboardPage } from '../../pages/DashboardPage.js';
import { env } from '../../config/env.js';
import { invalidCredentials } from '../../utils/test-data.js';

test.describe('Authentication - Login', () => {
  test('AT-AUTH-001 | Login with valid credentials @smoke', async ({
    page, }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();

    await loginPage.login(
      env.adminUsername,
      env.adminPassword,
    );

    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboardPage.userDropdown).toBeVisible();
  });

  test('AT-AUTH-002 | Login with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      invalidCredentials.invalidUsername,
      env.adminPassword,
    );

    await expect(loginPage.invalidCredentialsMessage).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('AT-AUTH-003 | Login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      env.adminUsername,
      invalidCredentials.invalidPassword,
    );

    await expect(loginPage.invalidCredentialsMessage).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('AT-AUTH-004 | Login with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', env.adminPassword);

    await expect(loginPage.usernameRequiredMessage).toBeVisible();

    await expect(
      loginPage.passwordRequiredMessage,
    ).not.toBeVisible();

    await expect(page).toHaveURL(/auth\/login/);
  });

  test('AT-AUTH-005 | Login with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(env.adminUsername, '')

    await expect(loginPage.passwordRequiredMessage).toBeVisible();

    await expect(
      loginPage.usernameRequiredMessage,
    ).not.toBeVisible();

    await expect(page).toHaveURL(/auth\/login/);
  });

  test('AT-AUTH-006 | Login with both username and password empty', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await expect(loginPage.usernameRequiredMessage).toBeVisible();
    await expect(loginPage.passwordRequiredMessage).toBeVisible();

    await expect(page).toHaveURL(/auth\/login/);
  });
});