import { test as authTest, expect } from './auth.fixture.js';
import { PimNavigation } from '../pages/pim/PimNavigation.js';
import { AddEmployeePage } from '../pages/pim/AddEmployeePage.js';
import { EmployeeListPage } from '../pages/pim/EmployeeListPage.js';
import { PersonalDetailsPage } from '../pages/pim/PersonalDetailsPage.js';
import { DeleteEmployeeDialog } from '../pages/pim/DeleteEmployeeDialog.js';

type PimFixtures = {
    pimNavigation: PimNavigation;
    addEmployeePage: AddEmployeePage;
    employeeListPage: EmployeeListPage;
    personalDetailsPage: PersonalDetailsPage;
    deleteEmployeeDialog: DeleteEmployeeDialog;
};

export const test =
    authTest.extend<PimFixtures>({
        pimNavigation: async (
            { authenticatedPage },
            use,
        ) => {
            await use(
                new PimNavigation(
                    authenticatedPage,
                ),
            );
        },

        addEmployeePage: async (
            { authenticatedPage },
            use,
        ) => {
            await use(
                new AddEmployeePage(
                    authenticatedPage,
                ),
            );
        },

        employeeListPage: async (
            { authenticatedPage },
            use,
        ) => {
            await use(
                new EmployeeListPage(
                    authenticatedPage,
                ),
            );
        },

        personalDetailsPage: async (
            { authenticatedPage },
            use,
        ) => {
            await use(
                new PersonalDetailsPage(
                    authenticatedPage,
                ),
            );
        },

        deleteEmployeeDialog: async (
            { authenticatedPage },
            use,
        ) => {
            await use(
                new DeleteEmployeeDialog(
                    authenticatedPage,
                ),
            );
        },
    });

export { expect };