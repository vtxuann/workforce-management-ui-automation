import { test, expect } from '../../fixtures/auth.fixture.js';

import { PimPage } from '../../pages/PimPage.js';
import { generateEmployeeData, type EmployeeData } from '../../utils/employee-data.js';

async function expectEmployeeDetails(
    pimPage: PimPage,
    employee: EmployeeData,
) {
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
}

test.describe('PIM - Edit Employee', () => {
    test(
        'AT-PIM-013 | Update employee with valid data @smoke',
        async ({ authenticatedPage }) => {
            const page = authenticatedPage;
            const pimPage = new PimPage(page);

            const employee = generateEmployeeData();

            const updatedEmployee = {
                ...employee,
                firstName: `Edit${Date.now().toString().slice(-5)}`,
                middleName: 'QA',
                lastName: 'Updated',
            };

            // Arrange
            await pimPage.goto();
            await pimPage.gotoAddEmployee();
            await pimPage.createEmployee(employee);

            await expect(
                pimPage.personalDetailsHeading,
            ).toBeVisible();

            // Wait until Personal Details is fully hydrated
            await expectEmployeeDetails(
                pimPage,
                employee,
            );

            // Act
            await pimPage.updateEmployeeNames(updatedEmployee);

            // Verify inputs actually contain edited values
            // before submitting
            await expect(
                pimPage.firstNameInput,
            ).toHaveValue(updatedEmployee.firstName);

            await expect(
                pimPage.middleNameInput,
            ).toHaveValue(updatedEmployee.middleName);

            await expect(
                pimPage.lastNameInput,
            ).toHaveValue(updatedEmployee.lastName);

            await Promise.all([
                expect(
                    pimPage.successfullyUpdatedToast,
                ).toBeVisible(),

                pimPage.savePersonalDetails(),
            ]);

            // Assert
            await expectEmployeeDetails(
                pimPage,
                updatedEmployee,
            );
        },
    );

    test(
        'AT-PIM-014 | Validate required employee name fields on edit',
        async ({ authenticatedPage }) => {
            const page = authenticatedPage;
            const pimPage = new PimPage(page);

            const employee = generateEmployeeData();

            // Arrange
            await pimPage.goto();
            await pimPage.gotoAddEmployee();
            await pimPage.createEmployee(employee);

            await expect(
                pimPage.personalDetailsHeading,
            ).toBeVisible();

            await expectEmployeeDetails(
                pimPage,
                employee,
            );

            // First Name required
            await pimPage.firstNameInput.clear();

            await expect(
                pimPage.firstNameInput,
            ).toHaveValue('');

            await pimPage.savePersonalDetails();

            await expect(
                pimPage.firstNameRequiredMessage,
            ).toBeVisible();

            await expect(page).toHaveURL(
                /pim\/viewPersonalDetails\/empNumber\/\d+/,
            );

            // Restore First Name
            await pimPage.firstNameInput.fill(
                employee.firstName,
            );

            await expect(
                pimPage.firstNameInput,
            ).toHaveValue(employee.firstName);

            // Last Name required
            await pimPage.lastNameInput.clear();

            await expect(
                pimPage.lastNameInput,
            ).toHaveValue('');

            await pimPage.savePersonalDetails();

            await expect(
                pimPage.lastNameRequiredMessage,
            ).toBeVisible();

            await expect(page).toHaveURL(
                /pim\/viewPersonalDetails\/empNumber\/\d+/,
            );
        },
    );

    test(
        'AT-PIM-016 | Persist updated employee data',
        async ({ authenticatedPage }) => {
            const page = authenticatedPage;
            const pimPage = new PimPage(page);

            const employee = generateEmployeeData();

            const updatedEmployee = {
                ...employee,
                firstName: `Persist${Date.now().toString().slice(-5)}`,
                middleName: 'QA',
                lastName: 'Verified',
            };

            // Arrange
            await pimPage.goto();
            await pimPage.gotoAddEmployee();
            await pimPage.createEmployee(employee);

            await expect(
                pimPage.personalDetailsHeading,
            ).toBeVisible();

            await expectEmployeeDetails(
                pimPage,
                employee,
            );

            // Update
            await pimPage.updateEmployeeNames(updatedEmployee);

            await expect(
                pimPage.firstNameInput,
            ).toHaveValue(updatedEmployee.firstName);

            await expect(
                pimPage.lastNameInput,
            ).toHaveValue(updatedEmployee.lastName);

            await Promise.all([
                expect(
                    pimPage.successfullyUpdatedToast,
                ).toBeVisible(),

                pimPage.savePersonalDetails(),
            ]);

            await expectEmployeeDetails(
                pimPage,
                updatedEmployee,
            );

            // Retrieve independently
            await pimPage.gotoEmployeeList();

            await pimPage.searchEmployeeById(
                employee.employeeId,
            );

            const employeeRow =
                pimPage.getEmployeeRowById(
                    employee.employeeId,
                );

            await expect(
                employeeRow,
            ).toBeVisible();

            await pimPage.openEmployeeForEdit(
                employee.employeeId,
            );

            await expect(page).toHaveURL(
                /pim\/viewPersonalDetails\/empNumber\/\d+/,
            );

            // Verify persisted data after retrieval
            await expectEmployeeDetails(
                pimPage,
                updatedEmployee,
            );
        },
    );
});