import { test, expect } from '../../fixtures/auth.fixture.js';
import { env } from '../../config/env.js';
import { loginWithCredentials } from '../../utils/auth-actions.js';
import { ensureLeaveEnvironment } from '../../utils/leave-environment.js';
import { createLeaveTestEmployee } from '../../utils/leave-test-data.js';
import { buildWorkingDayRange } from '../../utils/date-data.js';
import { LeaveNavigation } from '../../pages/leave/LeaveNavigation.js';
import { AssignLeavePage } from '../../pages/leave/AssignLeavePage.js';
import { InsufficientBalanceDialog } from '../../pages/leave/InsufficientBalanceDialog.js';

test.describe('Leave - Assign Leave', () => {
    test('AT-LEAVE-011 | Allow leave assignment after confirming insufficient balance',
        { tag: ['@leave'] }, async ({ browser }, testInfo) => {
            const adminContext = await browser.newContext();

            const adminPage = await adminContext.newPage();

            try {
                await loginWithCredentials(
                    adminPage,
                    env.adminUsername,
                    env.adminPassword,
                );

                const environment = await ensureLeaveEnvironment(adminPage);

                const employee =
                    await createLeaveTestEmployee(
                        adminPage,
                        testInfo,
                        {
                            leaveType: environment.leaveType,
                            entitlementDays: 1,
                            createLogin: false,
                        },
                    );

                const navigation = new LeaveNavigation(adminPage);

                const assignLeavePage = new AssignLeavePage(adminPage);

                const dialog = new InsufficientBalanceDialog(adminPage);

                await navigation.goto();
                await navigation.gotoAssignLeave();

                await expect(assignLeavePage.heading).toBeVisible();

                await assignLeavePage.selectEmployee(employee.employeeName);

                await assignLeavePage.selectLeaveType(employee.leaveType);

                const { fromDate, toDate } = buildWorkingDayRange(7, 3);

                await assignLeavePage.fillDateRange(
                    fromDate,
                    toDate,
                );

                await expect(assignLeavePage.balanceNotSufficientMessage).toBeVisible();

                await assignLeavePage.assignLeave();

                await expect(dialog.dialog).toBeVisible();

                await expect(dialog.message).toBeVisible();

                await Promise.all([
                    expect(dialog.successfullySavedToast).toBeVisible(),

                    dialog.confirm(),
                ]);
            } finally {
                await adminContext.close();
            }
        });
});