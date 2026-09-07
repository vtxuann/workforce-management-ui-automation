import { type Locator, type Page } from '@playwright/test';

import { type EmployeeData } from '../utils/employee-data.js';

export class PimPage {
    readonly page: Page;

    // Navigation
    readonly pimMenuLink: Locator;
    readonly employeeListLink: Locator;
    readonly addEmployeeLink: Locator;

    // Headings
    readonly addEmployeeHeading: Locator;
    readonly personalDetailsHeading: Locator;

    // Add/Edit Employee form
    readonly firstNameInput: Locator;
    readonly middleNameInput: Locator;
    readonly lastNameInput: Locator;

    readonly employeeIdFormFieldGroup: Locator;
    readonly employeeIdFormInput: Locator;

    readonly addEmployeeSaveButton: Locator;
    readonly cancelButton: Locator;

    readonly personalDetailsForm: Locator;
    readonly personalDetailsSaveButton: Locator;

    // Employee List 
    readonly employeeNameSearchFieldGroup: Locator;
    readonly employeeNameSearchInput: Locator;
    readonly employeeNameSuggestionList: Locator;
    readonly employeeIdSearchFieldGroup: Locator;
    readonly employeeIdSearchInput: Locator;
    readonly searchButton: Locator;
    readonly resetButton: Locator;

    // Filtered employee 
    readonly employmentStatusFieldGroup: Locator;
    readonly employmentStatusSelect: Locator;
    readonly selectOptionList: Locator;
    readonly employmentStatusSelectedValue: Locator;

    // Employee table
    readonly employeeTable: Locator;
    readonly employeeTableRows: Locator;

    // Employee state
    readonly noRecordsFoundMessage: Locator;

    // Validation
    readonly firstNameFieldGroup: Locator;
    readonly lastNameFieldGroup: Locator;
    readonly firstNameRequiredMessage: Locator;
    readonly lastNameRequiredMessage: Locator;

    // Toasts
    readonly successfullySavedToast: Locator;
    readonly successfullyDeletedToast: Locator;
    readonly successfullyUpdatedToast: Locator;

    readonly employeeIdDuplicateMessage: Locator;

    // Delete confirmation
    readonly deleteDialog: Locator;
    readonly deleteConfirmationTitle: Locator;
    readonly deleteConfirmationMessage: Locator;
    readonly confirmDeleteButton: Locator;
    readonly cancelDeleteButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Navigation
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

        // Headings
        this.addEmployeeHeading = page.getByRole('heading', {
            name: 'Add Employee',
            exact: true,
        });

        this.personalDetailsHeading = page.getByRole('heading', {
            name: 'Personal Details',
            exact: true,
        });

        // Add/Edit Employee form
        this.firstNameInput =
            page.locator('input[name="firstName"]');

        this.middleNameInput =
            page.locator('input[name="middleName"]');

        this.lastNameInput =
            page.locator('input[name="lastName"]');

        this.employeeIdFormFieldGroup = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText('Employee Id', {
                    exact: true,
                }),
            });

        this.employeeIdFormInput =
            this.employeeIdFormFieldGroup.locator('input');

        this.addEmployeeSaveButton =
            page.getByRole('button', {
                name: 'Save',
                exact: true,
            });

        this.cancelButton = page.getByRole('button', {
            name: 'Cancel',
            exact: true,
        });

        // Employee form
        this.personalDetailsForm = page
            .locator('form')
            .filter({
                has: this.firstNameInput,
            });

        this.personalDetailsSaveButton =
            this.personalDetailsForm.getByRole(
                'button',
                {
                    name: 'Save',
                    exact: true,
                },
            );

        // Employee List 
        this.employeeIdSearchFieldGroup = page
            .locator('.oxd-table-filter')
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText('Employee Id', {
                    exact: true,
                }),
            });

        this.employeeIdSearchInput =
            this.employeeIdSearchFieldGroup.locator('input');

        this.searchButton = page.getByRole('button', {
            name: 'Search',
            exact: true,
        });

        this.resetButton = page.getByRole('button', {
            name: 'Reset',
            exact: true,
        });

        this.employeeNameSearchFieldGroup = page
            .locator('.oxd-table-filter')
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText('Employee Name', {
                    exact: true,
                }),
            });

        this.employeeNameSearchInput =
            this.employeeNameSearchFieldGroup.locator(
                'input[placeholder="Type for hints..."]',
            );

        this.employeeNameSuggestionList = page.getByRole('listbox');

        // Filtered employee
        this.employmentStatusFieldGroup = page
            .locator('.oxd-table-filter')
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText('Employment Status', {
                    exact: true,
                }),
            });

        this.employmentStatusSelect =
            this.employmentStatusFieldGroup.locator(
                '.oxd-select-text',
            );

        this.selectOptionList = page.getByRole('listbox');

        this.employmentStatusSelectedValue =
            this.employmentStatusSelect.locator(
                '.oxd-select-text-input',
            );

        // Employee table
        this.employeeTable = page.locator(
            '.orangehrm-employee-list',
        );

        this.employeeTableRows = this.employeeTable
            .locator('.oxd-table-body')
            .getByRole('row');

        // Employee state
        this.noRecordsFoundMessage = page
            .locator('.orangehrm-paper-container')
            .getByText('No Records Found', { exact: true });

        // Validation
        this.firstNameFieldGroup = page
            .locator('.oxd-input-group')
            .filter({
                has: page.locator('input[name="firstName"]'),
            });

        this.lastNameFieldGroup = page
            .locator('.oxd-input-group')
            .filter({
                has: page.locator('input[name="lastName"]'),
            });

        this.firstNameRequiredMessage =
            this.firstNameFieldGroup.getByText(
                'Required',
                { exact: true },
            );

        this.lastNameRequiredMessage =
            this.lastNameFieldGroup.getByText(
                'Required',
                { exact: true },
            );

        // Toasts
        this.successfullySavedToast = page
            .locator('.oxd-toast--success')
            .getByText('Successfully Saved', {
                exact: true,
            });

        this.successfullyDeletedToast = page
            .locator('.oxd-toast--success')
            .getByText('Successfully Deleted', {
                exact: true,
            });

        this.successfullyUpdatedToast = page
            .locator('.oxd-toast--success')
            .getByText('Successfully Updated', {
                exact: true,
            });

        this.employeeIdDuplicateMessage =
            this.employeeIdFormFieldGroup.getByText(
                'Employee Id already exists',
                { exact: true },
            );

        // Delete confirmation
        this.deleteDialog = page.locator(
            '.orangehrm-dialog-popup',
        );

        this.deleteConfirmationTitle = this.deleteDialog.getByText(
            'Are you Sure?',
            { exact: true },
        );

        this.deleteConfirmationMessage = this.deleteDialog.getByText(
            'The selected record will be permanently deleted. Are you sure you want to continue?',
            { exact: true },
        );

        this.confirmDeleteButton = this.deleteDialog.getByRole(
            'button',
            {
                name: 'Yes, Delete',
            },
        );

        this.cancelDeleteButton = this.deleteDialog.getByRole(
            'button',
            {
                name: 'No, Cancel',
            },
        );
    }

    // Navigation
    async goto() {
        await this.pimMenuLink.click();
    }

    async gotoEmployeeList() {
        await this.employeeListLink.click();
    }

    async gotoAddEmployee() {
        await this.addEmployeeLink.click();
    }

    // Create
    async fillEmployeeForm(employee: EmployeeData) {
        await this.firstNameInput.fill(employee.firstName);

        await this.middleNameInput.fill(
            employee.middleName ?? '',
        );

        await this.lastNameInput.fill(employee.lastName);
        await this.employeeIdFormInput.fill(employee.employeeId);
    }

    async saveEmployee() {
        await this.addEmployeeSaveButton.click();
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
            this.saveEmployee(),
        ]);
    }

    async waitForPersonalDetails() {
        await this.page.waitForURL(
            /pim\/viewPersonalDetails\/empNumber\/\d+/,
            {
                timeout: 15_000,
            },
        );
    }

    // Edit
    async updateEmployeeNames(
        employee: Pick<
            EmployeeData,
            'firstName' | 'middleName' | 'lastName'
        >,
    ) {
        await this.firstNameInput.fill(
            employee.firstName,
        );

        await this.middleNameInput.fill(
            employee.middleName ?? '',
        );

        await this.lastNameInput.fill(
            employee.lastName,
        );
    }

    async savePersonalDetails() {
        await this.personalDetailsSaveButton.click();
    }

    getEmployeeEditButton(employeeId: string): Locator {
        return this
            .getEmployeeRowById(employeeId)
            .locator(
                'button:has(i.bi-pencil-fill)',
            );
    }

    async openEmployeeForEdit(
        employeeId: string,
    ) {
        await this
            .getEmployeeEditButton(employeeId)
            .click();

        await this.personalDetailsHeading.waitFor({
            state: 'visible',
        });
    }

    // Search / Filter
    async searchEmployeeById(employeeId: string) {
        await this.employeeIdSearchInput.fill(employeeId);
        await this.searchButton.click();
    }

    async typeEmployeeName(employeeName: string) {
        await this.employeeNameSearchInput.fill(employeeName);

        await this.employeeNameSuggestionList.waitFor({
            state: 'visible',
        });
    }

    getEmployeeNameSuggestion(employeeName: string): Locator {
        return this.employeeNameSuggestionList.getByText(
            employeeName,
            {
                exact: true,
            },
        );
    }

    async selectEmployeeName(employeeName: string) {
        await this
            .getEmployeeNameSuggestion(employeeName)
            .click();
    }

    async searchEmployeeByName(employeeName: string) {
        await this.typeEmployeeName(employeeName);
        await this.selectEmployeeName(employeeName);
        await this.searchButton.click();
    }

    async selectEmploymentStatus(status: string) {
        await this.employmentStatusSelect.click();

        await this.selectOptionList.waitFor({
            state: 'visible',
        });

        await this.selectOptionList
            .getByText(status, {
                exact: true,
            })
            .click();
    }

    // Table
    getEmployeeRowById(
        employeeId: string,
    ): Locator {
        return this.employeeTableRows.filter({
            has: this.page.getByText(
                employeeId,
                { exact: true },
            ),
        });
    }

    // Delete
    getDeleteButtonForEmployee(employeeId: string): Locator {
        return this.getEmployeeRowById(employeeId)
            .locator('button:has(i.bi-trash)');
    }

    async openDeleteConfirmation(employeeId: string) {
        await this.getDeleteButtonForEmployee(employeeId).click();
    }

    async confirmDelete() {
        await this.confirmDeleteButton.click();
    }

    async deleteEmployeeById(employeeId: string) {
        await this.gotoEmployeeList();
        await this.searchEmployeeById(employeeId);
        await this.openDeleteConfirmation(employeeId);
        await this.confirmDelete();
    }
}