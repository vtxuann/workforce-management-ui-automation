import { type Locator, type Page } from '@playwright/test';
import { type EmployeeData } from '../../utils/employee-data.js';

export class PersonalDetailsPage {
    readonly page: Page;

    readonly heading: Locator;

    readonly firstNameInput: Locator;
    readonly middleNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIdInput: Locator;

    readonly saveButton: Locator;

    readonly firstNameRequiredMessage: Locator;
    readonly lastNameRequiredMessage: Locator;

    readonly successfullyUpdatedToast: Locator;

    constructor(page: Page) {
        this.page = page;

        this.heading = page.getByRole('heading', {
            name: 'Personal Details',
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

        const personalDetailsForm = page
            .locator('form')
            .filter({
                has: this.firstNameInput,
            });

        this.saveButton =
            personalDetailsForm.getByRole(
                'button',
                {
                    name: 'Save',
                    exact: true,
                },
            );

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
        this.successfullyUpdatedToast = page
            .locator('.oxd-toast--success')
            .getByText('Successfully Updated', {
                exact: true,
            });
    }

    async updateEmployeeNames(
        employee: Pick<EmployeeData, 'firstName' | 'middleName' | 'lastName'>) {
        await this.firstNameInput.fill(employee.firstName);
        await this.middleNameInput.fill(employee.middleName ?? '');
        await this.lastNameInput.fill(employee.lastName);
    }

    async save() {
        await this.saveButton.click();
    }

    async waitUntilDisplayed() {
        await this.page.waitForURL(
            /pim\/viewPersonalDetails\/empNumber\/\d+/,
            {
                timeout: 15_000,
            },
        );

        await this.heading.waitFor({ state: 'visible' });
    }
}