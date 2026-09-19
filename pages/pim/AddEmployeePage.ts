import { type Locator, type Page } from '@playwright/test';
import { type EmployeeData } from '../../utils/employee-data.js';

export class AddEmployeePage {
    readonly page: Page;

    readonly heading: Locator;

    readonly firstNameInput: Locator;
    readonly middleNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIdInput: Locator;

    readonly saveButton: Locator;
    readonly cancelButton: Locator;

    readonly firstNameRequiredMessage: Locator;
    readonly lastNameRequiredMessage: Locator;
    readonly employeeIdDuplicateMessage: Locator;

    readonly successfullySavedToast: Locator;

    readonly createLoginDetailsCheckbox: Locator;
    readonly createLoginDetailsSwitch: Locator;
    readonly usernameInput: Locator;
    readonly enabledRadio: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;

    constructor(page: Page) {
        this.page = page;

        this.heading = page.getByRole('heading', {
            name: 'Add Employee',
            exact: true,
        });

        this.firstNameInput = page.locator('input[name="firstName"]');
        this.middleNameInput = page.locator('input[name="middleName"]');
        this.lastNameInput = page.locator('input[name="lastName"]');

        const employeeIdFieldGroup = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText('Employee Id', {
                    exact: true,
                }),
            });

        this.employeeIdInput = employeeIdFieldGroup.locator('input');

        this.saveButton = page.getByRole('button', {
            name: 'Save',
            exact: true,
        });
        this.cancelButton = page.getByRole('button', {
            name: 'Cancel',
            exact: true,
        });

        const firstNameFieldGroup = page
            .locator('.oxd-input-group')
            .filter({
                has: this.firstNameInput,
            });
        const lastNameFieldGroup = page
            .locator('.oxd-input-group')
            .filter({
                has: this.lastNameInput,
            });

        this.firstNameRequiredMessage =
            firstNameFieldGroup.getByText(
                'Required',
                { exact: true },
            );

        this.lastNameRequiredMessage =
            lastNameFieldGroup.getByText(
                'Required',
                { exact: true },
            );

        this.employeeIdDuplicateMessage =
            employeeIdFieldGroup.getByText(
                'Employee Id already exists',
                { exact: true },
            );

        this.successfullySavedToast = page
            .locator('.oxd-toast--success')
            .getByText('Successfully Saved', {
                exact: true,
            });

        const loginDetailsHeader = page
            .locator('.user-form-header')
            .filter({
                has: page.getByText(
                    'Create Login Details',
                    { exact: true },
                ),
            });

        this.createLoginDetailsCheckbox =
            loginDetailsHeader.locator(
                'input[type="checkbox"]',
            );

        this.createLoginDetailsSwitch =
            loginDetailsHeader.locator(
                '.oxd-switch-input',
            );

        this.usernameInput = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText('Username', { exact: true }),
            })
            .locator('input');

        this.enabledRadio = page
            .getByText('Enabled', { exact: true })
            .locator('..')
            .locator('input[type="radio"]');

        this.passwordInput = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText('Password', { exact: true }),
            })
            .locator('input');

        this.confirmPasswordInput = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText('Confirm Password', { exact: true }),
            })
            .locator('input');
    }

    async fillEmployeeForm(employee: EmployeeData) {
        await this.firstNameInput.fill(employee.firstName);
        await this.middleNameInput.fill(employee.middleName ?? '');
        await this.lastNameInput.fill(employee.lastName);
        await this.employeeIdInput.fill(employee.employeeId);
    }

    async save() {
        await this.saveButton.click();
    }

    async createEmployee(employee: EmployeeData) {
        await this.fillEmployeeForm(employee);

        await Promise.all([
            this.page.waitForURL(
                /pim\/viewPersonalDetails\/empNumber\/\d+/,
                {
                    timeout: 15_000,
                },
            ),
            this.save(),
        ]);
    }

    async enableLoginDetails(): Promise<void> {
        if (
            !(await this.createLoginDetailsCheckbox
                .isChecked())
        ) {
            await this.createLoginDetailsSwitch.click();
        }

        await this.usernameInput.waitFor({
            state: 'visible',
        });
    }

    async fillLoginDetails(
        username: string,
        password: string,
    ): Promise<void> {
        await this.enableLoginDetails();

        await this.usernameInput.fill(username);
        await this.enabledRadio.check();
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
    }
}