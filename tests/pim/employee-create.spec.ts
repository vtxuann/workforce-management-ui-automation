import { test, expect } from '../../fixtures/pim.fixture.js';
import { generateEmployeeData } from '../../utils/employee-data.js';

test.describe('PIM - Create Employee', () => {
    test('AT-PIM-006 | Create employee with valid data',
        { tag: ['@smoke', '@pim'] }, async ({
            pimNavigation,
            addEmployeePage,
            personalDetailsPage,
        }) => {
        const employee =
            generateEmployeeData();

        await pimNavigation.goto();
        await pimNavigation.gotoAddEmployee();

        await expect(addEmployeePage.heading).toBeVisible();

        await addEmployeePage.fillEmployeeForm(employee);

        await Promise.all([
            expect(addEmployeePage.successfullySavedToast).toBeVisible(),
            addEmployeePage.save(),
        ]);

        await expect(personalDetailsPage.heading).toBeVisible();
        await expect(personalDetailsPage.firstNameInput).toHaveValue(employee.firstName);
        await expect(personalDetailsPage.middleNameInput).toHaveValue(employee.middleName ?? '');
        await expect(personalDetailsPage.lastNameInput).toHaveValue(employee.lastName);
        await expect(personalDetailsPage.employeeIdInput).toHaveValue(employee.employeeId,
        );
    },
    );

    test('AT-PIM-007 | Validate required employee name fields',
        { tag: ['@pim'] }, async ({
            pimNavigation,
            addEmployeePage,
            authenticatedPage,
        }) => {
        await pimNavigation.goto();
        await pimNavigation.gotoAddEmployee();

        await expect(addEmployeePage.heading).toBeVisible();

        // First Name is required
        await addEmployeePage.firstNameInput.clear();
        await addEmployeePage.lastNameInput.fill('Tester');
        await addEmployeePage.save();

        await expect(addEmployeePage.firstNameRequiredMessage).toBeVisible();
        await expect(authenticatedPage).toHaveURL(/pim\/addEmployee/);
        await expect(addEmployeePage.heading).toBeVisible();

        // Last Name is required
        await addEmployeePage.firstNameInput.fill('Auto');
        await addEmployeePage.lastNameInput.clear();
        await addEmployeePage.save();

        await expect(addEmployeePage.lastNameRequiredMessage).toBeVisible();
        await expect(authenticatedPage).toHaveURL(/pim\/addEmployee/);
        await expect(addEmployeePage.heading).toBeVisible();
    },
    );

    test('AT-PIM-011 | Prevent duplicate Employee ID',
        { tag: ['@pim'] }, async ({
            pimNavigation,
            addEmployeePage,
            authenticatedPage,
        }) => {
        const existingEmployee = generateEmployeeData();
        const duplicateEmployee = generateEmployeeData();

        // Arrange
        await pimNavigation.goto();
        await pimNavigation.gotoAddEmployee();

        await addEmployeePage.createEmployee(existingEmployee);

        // Act
        await pimNavigation.gotoAddEmployee();

        await addEmployeePage
            .fillEmployeeForm({
                ...duplicateEmployee,
                employeeId:
                    existingEmployee.employeeId,
            });
        await addEmployeePage.employeeIdInput.press('Tab');

        // Assert
        await expect(addEmployeePage.employeeIdDuplicateMessage).toBeVisible();
        await expect(addEmployeePage.employeeIdInput).toHaveValue(existingEmployee.employeeId);
        await expect(authenticatedPage).toHaveURL(/pim\/addEmployee/);
        await expect(addEmployeePage.heading).toBeVisible();
    },
    );

    test('AT-PIM-012 | Retrieve created employee by Employee ID',
        { tag: ['@pim'] }, async ({
            pimNavigation,
            addEmployeePage,
            employeeListPage,
        }) => {
        const employee = generateEmployeeData();

        await pimNavigation.goto();
        await pimNavigation.gotoAddEmployee();

        await addEmployeePage.createEmployee(employee);

        await pimNavigation.gotoEmployeeList();

        await employeeListPage
            .searchEmployeeById(
                employee.employeeId,
            );
        const employeeRow =
            employeeListPage
                .getEmployeeRowById(
                    employee.employeeId,
                );

        await expect(employeeRow).toBeVisible();
        await expect(employeeRow).toContainText(employee.employeeId);
        await expect(employeeRow).toContainText(employee.firstName);
        await expect(employeeRow).toContainText(employee.lastName);
    },
    );
});