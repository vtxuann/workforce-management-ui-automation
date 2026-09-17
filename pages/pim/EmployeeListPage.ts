import { type Locator, type Page } from '@playwright/test';

export class EmployeeListPage {
    readonly page: Page;

    readonly employeeNameInput: Locator;
    readonly employeeNameSuggestionList: Locator;

    readonly employeeIdInput: Locator;

    readonly includeSelect: Locator;
    readonly includeSelectedValue: Locator;

    readonly searchButton: Locator;
    readonly resetButton: Locator;

    readonly employeeTable: Locator;
    readonly employeeTableRows: Locator;

    readonly noRecordsFoundMessage: Locator;

    readonly selectOptionList: Locator;

    constructor(page: Page) {
        this.page = page;

        const filter = page.locator(
            '.oxd-table-filter',
        );

        const employeeIdFieldGroup = filter
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText(
                    'Employee Id',
                    {
                        exact: true,
                    },
                ),
            });

        this.employeeIdInput = employeeIdFieldGroup.locator('input');

        const employeeNameFieldGroup = filter
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText(
                    'Employee Name',
                    {
                        exact: true,
                    },
                ),
            });

        this.employeeNameInput =
            employeeNameFieldGroup.locator(
                'input[placeholder="Type for hints..."]',
            );

        this.employeeNameSuggestionList = page.getByRole('listbox');

        const includeFieldGroup = filter
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText(
                    'Include',
                    {
                        exact: true,
                    },
                ),
            });

        this.includeSelect =
            includeFieldGroup.locator(
                '.oxd-select-text',
            );

        this.includeSelectedValue =
            this.includeSelect.locator(
                '.oxd-select-text-input',
            );

        this.searchButton =
            page.getByRole('button', {
                name: 'Search',
                exact: true,
            });

        this.resetButton =
            page.getByRole('button', {
                name: 'Reset',
                exact: true,
            });

        this.selectOptionList =
            page.getByRole('listbox');

        this.employeeTable = page.locator(
            '.orangehrm-employee-list',
        );

        this.employeeTableRows =
            this.employeeTable
                .locator('.oxd-table-body')
                .getByRole('row');

        this.noRecordsFoundMessage = page
            .locator('.orangehrm-paper-container')
            .getByText(
                'No Records Found',
                {
                    exact: true,
                },
            );
    }

    async searchEmployeeById(
        employeeId: string,
    ) {
        await this.employeeIdInput.fill(
            employeeId,
        );

        await this.searchButton.click();
    }

    async typeEmployeeName(
        employeeName: string,
    ) {
        await this.employeeNameInput.fill(
            employeeName,
        );

        await this.employeeNameSuggestionList
            .waitFor({
                state: 'visible',
            });
    }

    getEmployeeNameSuggestion(
        employeeName: string,
    ): Locator {
        return this.employeeNameSuggestionList
            .getByText(
                employeeName,
                {
                    exact: true,
                },
            );
    }

    async selectEmployeeName(
        employeeName: string,
    ) {
        await this
            .getEmployeeNameSuggestion(
                employeeName,
            )
            .click();
    }

    async searchEmployeeByName(
        employeeName: string,
    ) {
        await this.typeEmployeeName(
            employeeName,
        );

        await this.selectEmployeeName(
            employeeName,
        );

        await this.searchButton.click();
    }

    async selectInclude(
        option: string,
    ) {
        await this.includeSelect.click();

        await this.selectOptionList.waitFor({
            state: 'visible',
        });

        await this.selectOptionList
            .getByText(
                option,
                {
                    exact: true,
                },
            )
            .click();
    }

    getEmployeeRowById(
        employeeId: string,
    ): Locator {
        return this.employeeTableRows.filter({
            has: this.page.getByText(
                employeeId,
                {
                    exact: true,
                },
            ),
        });
    }

    getEditButton(
        employeeId: string,
    ): Locator {
        return this
            .getEmployeeRowById(employeeId)
            .locator(
                'button:has(i.bi-pencil-fill)',
            );
    }

    getDeleteButton(
        employeeId: string,
    ): Locator {
        return this
            .getEmployeeRowById(employeeId)
            .locator(
                'button:has(i.bi-trash)',
            );
    }

    async openEmployeeForEdit(
        employeeId: string,
    ) {
        await this
            .getEditButton(employeeId)
            .click();
    }

    async openDeleteConfirmation(
        employeeId: string,
    ) {
        await this
            .getDeleteButton(employeeId)
            .click();
    }
}