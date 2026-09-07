import { test, expect } from '../../fixtures/auth.fixture.js';

import { PimPage } from '../../pages/PimPage.js';
import { generateEmployeeData } from '../../utils/employee-data.js';

test.describe('PIM - Employee Search', () => {
    test('AT-PIM-001 | Search valid employee by name', async ({
        authenticatedPage,
    }) => {
        const page = authenticatedPage;

        const pimPage = new PimPage(page);
        const employee = generateEmployeeData();

        const fullName = [
            employee.firstName,
            employee.middleName,
            employee.lastName,
        ]
            .filter(Boolean)
            .join(' ');

        // Arrange
        await pimPage.goto();
        await pimPage.gotoAddEmployee();

        await pimPage.createEmployee(employee);

        // Act
        await pimPage.gotoEmployeeList();

        await pimPage.searchEmployeeByName(
            fullName,
        );

        // Assert
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

    test('AT-PIM-003 | Filter employees by Employment Status', async ({
        authenticatedPage,
    }) => {
        const pimPage = new PimPage(authenticatedPage);

        await pimPage.goto();
        await pimPage.gotoEmployeeList();

        await pimPage.selectEmploymentStatus(
            'Freelancer',
        );

        await expect(
            pimPage.employmentStatusSelectedValue,
        ).toHaveText('Freelancer');

        await pimPage.searchButton.click();

        await expect(
            pimPage.employeeTableRows.first(),
        ).toBeVisible();

        const rowCount =
            await pimPage.employeeTableRows.count();

        expect(rowCount).toBeGreaterThan(0);

        for (let index = 0; index < rowCount; index++) {
            await expect(
                pimPage.employeeTableRows.nth(index),
            ).toContainText('Freelancer');
        }
    });
});