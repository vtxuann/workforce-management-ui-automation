import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  readonly invalidCredentialsMessage: Locator;

  readonly usernameFieldGroup: Locator;
  readonly passwordFieldGroup: Locator;

  readonly usernameRequiredMessage: Locator;
  readonly passwordRequiredMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');

    this.loginButton = page.getByRole('button', {
      name: 'Login',
    });

    this.invalidCredentialsMessage = page.getByText(
      'Invalid credentials',
      { exact: true },
    );

    this.usernameFieldGroup = page
      .locator('.oxd-input-group')
      .filter({
        has: page.getByText('Username', { exact: true }),
      });

    this.passwordFieldGroup = page
      .locator('.oxd-input-group')
      .filter({
        has: page.getByText('Password', { exact: true }),
      });

    this.usernameRequiredMessage =
      this.usernameFieldGroup.getByText('Required', {
        exact: true,
      });

    this.passwordRequiredMessage =
      this.passwordFieldGroup.getByText('Required', {
        exact: true,
      });
  }

  async goto() {
    await this.page.goto('/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}