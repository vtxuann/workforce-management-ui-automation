import { test, expect } from '../../fixtures/auth.fixture.js';

import { PimPage } from '../../pages/PimPage.js';
import { generateEmployeeData } from '../../utils/employee-data.js';

test.describe('PIM - Create Employee', () => {
    test('AT-PIM-006 | Create employee with valid data @smoke', async ({
        authenticatedPage,
    }) => {
        const page = authenticatedPage;

        const pimPage = new PimPage(page);
        const employee = generateEmployeeData();

        await pimPage.goto();
        await pimPage.gotoAddEmployee();

        await expect(pimPage.addEmployeeHeading).toBeVisible();

        await pimPage.fillEmployeeForm(employee);

        await Promise.all([
            expect(
                pimPage.successfullySavedToast,
            ).toBeVisible(),

            pimPage.saveEmployee(),
        ]);

        await expect(
            pimPage.personalDetailsHeading,
        ).toBeVisible();

        await expect(
            pimPage.firstNameInput,
        ).toHaveValue(employee.firstName);

        await expect(
            pimPage.middleNameInput,
        ).toHaveValue(employee.middleName ?? '');

        await expect(
            pimPage.lastNameInput,
        ).toHaveValue(employee.lastName);

        await expect(
            pimPage.employeeIdFormInput,
        ).toHaveValue(employee.employeeId);

    });

    test('AT-PIM-007 | Validate required employee name fields', async ({
        authenticatedPage,
    }) => {
        const page = authenticatedPage;
        const pimPage = new PimPage(page);

        await pimPage.goto();
        await pimPage.gotoAddEmployee();

        await expect(
            pimPage.addEmployeeHeading,
        ).toBeVisible();

        // First Name is required
        await pimPage.firstNameInput.clear();
        await pimPage.lastNameInput.fill('Tester');

        await pimPage.saveEmployee();

        await expect(pimPage.firstNameRequiredMessage).toBeVisible();

        await expect(page).toHaveURL(/pim\/addEmployee/);

        await expect(pimPage.addEmployeeHeading).toBeVisible();

        // Last Name is required
        await pimPage.firstNameInput.fill('Auto');
        await pimPage.lastNameInput.clear();

        await pimPage.saveEmployee();

        await expect(
            pimPage.lastNameRequiredMessage,
        ).toBeVisible();

        await expect(page).toHaveURL(/pim\/addEmployee/);

        await expect(pimPage.addEmployeeHeading).toBeVisible();
    });

    test('AT-PIM-011 | Prevent duplicate Employee ID', async ({
        authenticatedPage,
    }) => {
        const page = authenticatedPage;
        const pimPage = new PimPage(page);

        const existingEmployee = generateEmployeeData();
        const duplicateEmployee = generateEmployeeData();

        // Arrange
        await pimPage.goto();
        await pimPage.gotoAddEmployee();

        await pimPage.createEmployee(existingEmployee);

        // Act
        await pimPage.gotoAddEmployee();

        await pimPage.fillEmployeeForm({
            ...duplicateEmployee,
            employeeId: existingEmployee.employeeId,
        });

        await pimPage.employeeIdFormInput.press('Tab');

        // Assert
        await expect(pimPage.employeeIdDuplicateMessage).toBeVisible();

        await expect(pimPage.employeeIdFormInput).toHaveValue(existingEmployee.employeeId);

        await expect(page).toHaveURL(/pim\/addEmployee/);

        await expect(pimPage.addEmployeeHeading).toBeVisible();
    });

    test('AT-PIM-012 | Retrieve created employee by Employee ID', async ({
        authenticatedPage,
    }) => {
        const page = authenticatedPage;

        const pimPage = new PimPage(page);
        const employee = generateEmployeeData();

        await pimPage.goto();
        await pimPage.gotoAddEmployee();

        await pimPage.createEmployee(employee);

        await pimPage.gotoEmployeeList();

        await pimPage.searchEmployeeById(
            employee.employeeId,
        );

        const employeeRow =
            pimPage.getEmployeeRowById(
                employee.employeeId,
            );

        await expect(employeeRow).toBeVisible();

        await expect(employeeRow).toContainText(
            employee.employeeId,
        );

        await expect(employeeRow).toContainText(
            employee.firstName,
        );

        await expect(employeeRow).toContainText(
            employee.lastName,
        );

    });
});