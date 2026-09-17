import { test, expect } from '../../fixtures/pim.fixture.js';
import { generateEmployeeData } from '../../utils/employee-data.js';

test.describe('PIM - Employee Search', () => {
    test('AT-PIM-001 | Search valid employee by name',
        { tag: ['@pim'] }, async ({
            pimNavigation,
            addEmployeePage,
            employeeListPage,
        }) => {
        const employee = generateEmployeeData();

        const fullName = [
            employee.firstName,
            employee.middleName,
            employee.lastName,
        ]
            .filter(Boolean)
            .join(' ');

        // Arrange
        await pimNavigation.goto();
        await pimNavigation.gotoAddEmployee();

        await addEmployeePage.createEmployee(employee);

        // Act
        await pimNavigation.gotoEmployeeList();
        await employeeListPage.searchEmployeeByName(fullName);

        // Assert
        const employeeRow = employeeListPage.getEmployeeRowById(employee.employeeId);

        await expect(employeeRow).toBeVisible();
        await expect(employeeRow).toContainText(employee.employeeId);
        await expect(employeeRow).toContainText(employee.firstName);
        await expect(employeeRow).toContainText(employee.lastName);
    },
    );

    test('AT-PIM-003 | Filter current employees using Include',
        { tag: ['@pim'] }, async ({
            pimNavigation,
            employeeListPage,
        }) => {
        await pimNavigation.goto();
        await pimNavigation.gotoEmployeeList();

        await employeeListPage.selectInclude('Current Employees Only');
        await expect(employeeListPage.includeSelectedValue).toHaveText('Current Employees Only');

        await employeeListPage.searchButton.click();
        await expect(employeeListPage.employeeTableRows.first(),).toBeVisible();

        const rowCount = await employeeListPage.employeeTableRows.count();
        expect(rowCount).toBeGreaterThan(0);
    },
    );
});