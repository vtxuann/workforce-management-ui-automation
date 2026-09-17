import { type Locator, type Page } from '@playwright/test';

export class PimNavigation {
    readonly pimMenuLink: Locator;
    readonly employeeListLink: Locator;
    readonly addEmployeeLink: Locator;

    constructor(page: Page) {
        this.pimMenuLink = page.getByRole('link', {
            name: 'PIM',
            exact: true,
        });

        this.employeeListLink = page.getByRole('link', {
            name: 'Employee List',
            exact: true,
        });

        this.addEmployeeLink = page.getByRole('link', {
            name: 'Add Employee',
            exact: true,
        });
    }

    async goto() {
        await this.pimMenuLink.click();
    }

    async gotoEmployeeList() {
        await this.employeeListLink.click();
    }

    async gotoAddEmployee() {
        await this.addEmployeeLink.click();
    }
}