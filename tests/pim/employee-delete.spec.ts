import { test, expect } from '../../fixtures/auth.fixture.js';

import { PimPage } from '../../pages/PimPage.js';
import { generateEmployeeData } from '../../utils/employee-data.js';

test.describe('PIM - Delete Employee', () => {
    test('AT-PIM-018 | Delete employee @smoke', async ({
        authenticatedPage,
    }) => {
        const page = authenticatedPage;
        const pimPage = new PimPage(page);
        const employee = generateEmployeeData();

        // Arrange
        await pimPage.goto();
        await pimPage.gotoAddEmployee();
        await pimPage.createEmployee(employee);

        await pimPage.gotoEmployeeList();
        await pimPage.searchEmployeeById(employee.employeeId);

        const employeeRow = pimPage.getEmployeeRowById(
            employee.employeeId,
        );

        await expect(employeeRow).toBeVisible();

        // Act - Open deletion confirmation
        const deleteButton = pimPage.getDeleteButtonForEmployee(
            employee.employeeId,
        );

        await expect(deleteButton).toBeVisible();
        await deleteButton.click();

        // Assert confirmation dialog
        await expect(pimPage.deleteDialog).toBeVisible();

        await expect(
            pimPage.deleteConfirmationTitle,
        ).toBeVisible();

        await expect(
            pimPage.deleteConfirmationMessage,
        ).toBeVisible();

        await expect(
            pimPage.cancelDeleteButton,
        ).toBeVisible();

        await expect(
            pimPage.confirmDeleteButton,
        ).toBeVisible();

        // Confirm deletion
        await Promise.all([
            expect(
                pimPage.successfullyDeletedToast,
            ).toBeVisible(),

            pimPage.confirmDeleteButton.click(),
        ]);

        await expect(
            pimPage.deleteDialog,
        ).toBeHidden();
    });

    test(
        'AT-PIM-019 | Verify deleted employee is unavailable',
        async ({ authenticatedPage }) => {
            const page = authenticatedPage;
            const pimPage = new PimPage(page);

            const employee = generateEmployeeData();

            // Arrange - Create employee
            await pimPage.goto();
            await pimPage.gotoAddEmployee();
            await pimPage.createEmployee(employee);

            // Verify employee exists before deletion
            await pimPage.gotoEmployeeList();

            await pimPage.searchEmployeeById(employee.employeeId);

            const employeeRow = pimPage.getEmployeeRowById(employee.employeeId);

            await expect(employeeRow).toBeVisible();

            // Delete employee
            await pimPage.openDeleteConfirmation(employee.employeeId);

            await expect(pimPage.deleteDialog).toBeVisible();

            await Promise.all([
                expect(pimPage.successfullyDeletedToast).toBeVisible(),
                pimPage.confirmDelete(),
            ]);

            // Act - Search deleted employee again
            await pimPage.searchEmployeeById(employee.employeeId);

            // Assert
            await expect(pimPage.noRecordsFoundMessage).toBeVisible();

            await expect(employeeRow).toHaveCount(0);

            await expect(page).toHaveURL(/viewEmployeeList/);
        },
    );
});