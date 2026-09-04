import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { invalidCredentials } from '../../utils/test-data.js';

test.describe('Authentication - Login', () => {
  test('AT-AUTH-001 | Login with valid credentials @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);

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
  });

  test('AT-AUTH-002 | Login with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const password = process.env.ADMIN_PASSWORD;

    if (!password) {
      throw new Error('ADMIN_PASSWORD must be defined in the environment.');
    }

    await loginPage.goto();

    await loginPage.login(
      invalidCredentials.invalidUsername,
      password,
    );

    await expect(loginPage.invalidCredentialsMessage).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('AT-AUTH-003 | Login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const username = process.env.ADMIN_USERNAME;

    if (!username) {
      throw new Error('ADMIN_USERNAME must be defined in the environment.');
    }

    await loginPage.goto();

    await loginPage.login(
      username,
      invalidCredentials.invalidPassword,
    );

    await expect(loginPage.invalidCredentialsMessage).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('AT-AUTH-004 | Login with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const password = process.env.ADMIN_PASSWORD;

    if (!password) {
      throw new Error(
        'ADMIN_PASSWORD must be defined in the environment.',
      );
    }

    await loginPage.goto();
    await loginPage.login('', password);

    await expect(loginPage.usernameRequiredMessage).toBeVisible();

    await expect(
      loginPage.passwordRequiredMessage,
    ).not.toBeVisible();

    await expect(page).toHaveURL(/auth\/login/);
  });

  test('AT-AUTH-005 | Login with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const username = process.env.ADMIN_USERNAME;

    if (!username) {
      throw new Error(
        'ADMIN_USERNAME must be defined in the environment.',
      );
    }

    await loginPage.goto();
    await loginPage.login(username, '');

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