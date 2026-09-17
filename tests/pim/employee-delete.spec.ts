import { test, expect } from '../../fixtures/pim.fixture.js';
import { generateEmployeeData } from '../../utils/employee-data.js';

test.describe('PIM - Delete Employee', () => {
    test('AT-PIM-018 | Delete employee',
        { tag: ['@smoke', '@pim'] }, async ({
            pimNavigation,
            addEmployeePage,
            employeeListPage,
            deleteEmployeeDialog,
        }) => {
        const employee = generateEmployeeData();

        // Arrange
        await pimNavigation.goto();
        await pimNavigation.gotoAddEmployee();

        await addEmployeePage.createEmployee(employee);

        await pimNavigation.gotoEmployeeList();

        await employeeListPage.searchEmployeeById(employee.employeeId);

        const employeeRow = employeeListPage.getEmployeeRowById(employee.employeeId);
        await expect(employeeRow).toBeVisible();

        // Act
        const deleteButton = employeeListPage.getDeleteButton(employee.employeeId);
        await expect(deleteButton).toBeVisible();

        await deleteButton.click();

        // Assert confirmation dialog
        await expect(deleteEmployeeDialog.dialog).toBeVisible();

        await expect(deleteEmployeeDialog.title).toBeVisible();

        await expect(deleteEmployeeDialog.message).toBeVisible();

        await expect(deleteEmployeeDialog.cancelButton).toBeVisible();

        await expect(deleteEmployeeDialog.confirmButton).toBeVisible();

        // Confirm deletion
        await Promise.all([
            expect(
                deleteEmployeeDialog
                    .successfullyDeletedToast,
            ).toBeVisible(),

            deleteEmployeeDialog.confirm(),
        ]);

        await expect(deleteEmployeeDialog.dialog).toBeHidden();
    },
    );

    test('AT-PIM-019 | Verify deleted employee is unavailable',
        { tag: ['@pim'] }, async ({
            pimNavigation,
            addEmployeePage,
            employeeListPage,
            deleteEmployeeDialog,
            authenticatedPage,
        }) => {
        const employee = generateEmployeeData();

        // Arrange - Create employee
        await pimNavigation.goto();
        await pimNavigation.gotoAddEmployee();

        await addEmployeePage.createEmployee(employee);

        // Verify employee exists
        await pimNavigation.gotoEmployeeList();

        await employeeListPage.searchEmployeeById(employee.employeeId);

        const employeeRow = employeeListPage.getEmployeeRowById(employee.employeeId);
        await expect(employeeRow).toBeVisible();

        // Delete employee
        await employeeListPage.openDeleteConfirmation(employee.employeeId);

        await expect(deleteEmployeeDialog.dialog).toBeVisible();

        await Promise.all([
            expect(
                deleteEmployeeDialog
                    .successfullyDeletedToast,
            ).toBeVisible(),

            deleteEmployeeDialog.confirm(),
        ]);

        // Search deleted employee again
        await employeeListPage.searchEmployeeById(employee.employeeId);

        // Assert
        await expect(employeeListPage.noRecordsFoundMessage).toBeVisible();
        await expect(employeeRow).toHaveCount(0);
        await expect(authenticatedPage).toHaveURL(/viewEmployeeList/);
    },
    );
});