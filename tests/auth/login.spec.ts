import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { DashboardPage } from '../../pages/DashboardPage.js';
import { invalidCredentials } from '../../utils/test-data.js';

const adminUsername = process.env.ADMIN_USERNAME!;
const adminPassword = process.env.ADMIN_PASSWORD!;

test.describe('Authentication - Login', () => {
  test('AT-AUTH-001 | Login with valid credentials',
    { tag: ['@smoke', '@auth'] }, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);

      await loginPage.goto();
      await loginPage.login(
        adminUsername,
        adminPassword,
      );

      await expect(page).toHaveURL(/dashboard/);
      await expect(dashboardPage.userDropdown).toBeVisible();
    });

  test('AT-AUTH-002 | Login with invalid username',
    { tag: ['@auth'] }, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(
        invalidCredentials.invalidUsername,
        adminPassword,
      );

      await expect(loginPage.invalidCredentialsMessage).toBeVisible();
      await expect(page).toHaveURL(/auth\/login/);
    });

  test('AT-AUTH-003 | Login with invalid password',
    { tag: ['@auth'] }, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(
        adminUsername,
        invalidCredentials.invalidPassword,
      );

      await expect(loginPage.invalidCredentialsMessage).toBeVisible();
      await expect(page).toHaveURL(/auth\/login/);
    });

  test('AT-AUTH-004 | Login with empty username',
    { tag: ['@auth'] }, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login('', adminPassword);

      await expect(loginPage.usernameRequiredMessage).toBeVisible();
      await expect(loginPage.passwordRequiredMessage).not.toBeVisible();
      await expect(page).toHaveURL(/auth\/login/);
    });

  test('AT-AUTH-005 | Login with empty password',
    { tag: ['@auth'] }, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(adminUsername, '');

      await expect(loginPage.passwordRequiredMessage).toBeVisible();
      await expect(loginPage.usernameRequiredMessage).not.toBeVisible();
      await expect(page).toHaveURL(/auth\/login/);
    });

  test('AT-AUTH-006 | Login with both username and password empty',
    { tag: ['@auth'] }, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login('', '');

      await expect(loginPage.usernameRequiredMessage).toBeVisible();
      await expect(loginPage.passwordRequiredMessage).toBeVisible();
      await expect(page).toHaveURL(/auth\/login/);
    });
});