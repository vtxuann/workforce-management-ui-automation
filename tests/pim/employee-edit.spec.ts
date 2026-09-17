import { test, expect } from '../../fixtures/pim.fixture.js';
import { generateEmployeeData, type EmployeeData } from '../../utils/employee-data.js';
import { type PersonalDetailsPage } from '../../pages/pim/PersonalDetailsPage.js';

async function expectEmployeeDetails(
    personalDetailsPage: PersonalDetailsPage,
    employee: EmployeeData,
) {
    await expect(personalDetailsPage.firstNameInput).toHaveValue(employee.firstName);
    await expect(personalDetailsPage.middleNameInput).toHaveValue(employee.middleName ?? '');
    await expect(personalDetailsPage.lastNameInput).toHaveValue(employee.lastName);
    await expect(personalDetailsPage.employeeIdInput).toHaveValue(employee.employeeId);
}

test.describe('PIM - Edit Employee', () => {
    test('AT-PIM-013 | Update employee with valid data @smoke',
        { tag: ['@smoke', '@pim'] }, async ({
            pimNavigation,
            addEmployeePage,
            personalDetailsPage,
        }) => {
        const employee =
            generateEmployeeData();

        const updatedEmployee = {
            ...employee,
            firstName:
                `Edit${Date.now()
                    .toString()
                    .slice(-5)}`,
            middleName: 'QA',
            lastName: 'Updated',
        };

        // Arrange
        await pimNavigation.goto();
        await pimNavigation.gotoAddEmployee();

        await addEmployeePage.createEmployee(employee);

        await expect(personalDetailsPage.heading).toBeVisible();
        await expectEmployeeDetails(personalDetailsPage, employee);

        // Act
        await personalDetailsPage.updateEmployeeNames(updatedEmployee);

        await expect(personalDetailsPage.firstNameInput).toHaveValue(updatedEmployee.firstName);
        await expect(personalDetailsPage.middleNameInput).toHaveValue(updatedEmployee.middleName);
        await expect(personalDetailsPage.lastNameInput).toHaveValue(updatedEmployee.lastName);

        await Promise.all([
            expect(personalDetailsPage.successfullyUpdatedToast).toBeVisible(),
            personalDetailsPage.save(),
        ]);

        // Assert
        await expectEmployeeDetails(personalDetailsPage, updatedEmployee);
    },
    );

    test('AT-PIM-014 | Validate required employee name fields on edit',
        { tag: ['@pim'] }, async ({
            pimNavigation,
            addEmployeePage,
            personalDetailsPage,
            authenticatedPage,
        }) => {
        const employee = generateEmployeeData();

        // Arrange
        await pimNavigation.goto();
        await pimNavigation.gotoAddEmployee();

        await addEmployeePage.createEmployee(employee);

        await expect(personalDetailsPage.heading).toBeVisible();
        await expectEmployeeDetails(personalDetailsPage, employee);

        // First Name required
        await personalDetailsPage.firstNameInput.clear();
        await expect(personalDetailsPage.firstNameInput).toHaveValue('');

        await personalDetailsPage.save();

        await expect(personalDetailsPage.firstNameRequiredMessage).toBeVisible();
        await expect(authenticatedPage).toHaveURL(/pim\/viewPersonalDetails\/empNumber\/\d+/);

        // Restore First Name
        await personalDetailsPage.firstNameInput.fill(employee.firstName);

        await expect(personalDetailsPage.firstNameInput).toHaveValue(employee.firstName);

        // Last Name required
        await personalDetailsPage.lastNameInput.clear();
        await expect(personalDetailsPage.lastNameInput).toHaveValue('');

        await personalDetailsPage.save();

        await expect(personalDetailsPage.lastNameRequiredMessage).toBeVisible();
        await expect(authenticatedPage).toHaveURL(/pim\/viewPersonalDetails\/empNumber\/\d+/);
    },
    );

    test('AT-PIM-016 | Persist updated employee data',
        { tag: ['@pim'] }, async ({
            pimNavigation,
            addEmployeePage,
            employeeListPage,
            personalDetailsPage,
            authenticatedPage,
        }) => {
        const employee = generateEmployeeData();

        const updatedEmployee = {
            ...employee,
            firstName:
                `Persist${Date.now()
                    .toString()
                    .slice(-5)}`,
            middleName: 'QA',
            lastName: 'Verified',
        };

        // Arrange
        await pimNavigation.goto();
        await pimNavigation.gotoAddEmployee();

        await addEmployeePage.createEmployee(employee);

        await expect(personalDetailsPage.heading).toBeVisible();

        await expectEmployeeDetails(personalDetailsPage, employee);

        // Update
        await personalDetailsPage.updateEmployeeNames(updatedEmployee);

        await expect(personalDetailsPage.firstNameInput).toHaveValue(updatedEmployee.firstName);
        await expect(personalDetailsPage.lastNameInput).toHaveValue(updatedEmployee.lastName);

        await Promise.all([
            expect(
                personalDetailsPage
                    .successfullyUpdatedToast,
            ).toBeVisible(),

            personalDetailsPage.save(),
        ]);

        await expectEmployeeDetails(personalDetailsPage, updatedEmployee);

        // Retrieve independently
        await pimNavigation.gotoEmployeeList();

        await employeeListPage.searchEmployeeById(employee.employeeId);

        const employeeRow = employeeListPage.getEmployeeRowById(employee.employeeId);
        await expect(employeeRow).toBeVisible();

        await employeeListPage.openEmployeeForEdit(employee.employeeId);

        await personalDetailsPage.waitUntilDisplayed();
        await expect(authenticatedPage).toHaveURL(/pim\/viewPersonalDetails\/empNumber\/\d+/);

        // Verify persisted data
        await expectEmployeeDetails(personalDetailsPage, updatedEmployee);
    },
    );
});