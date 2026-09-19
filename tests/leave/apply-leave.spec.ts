import { test, expect } from '../../fixtures/auth.fixture.js';
import { env } from '../../config/env.js';
import { loginWithCredentials } from '../../utils/auth-actions.js';
import { ensureLeaveEnvironment } from '../../utils/leave-environment.js';
import { createLeaveTestEmployee } from '../../utils/leave-test-data.js';
import { buildWorkingDayRange, dateFromToday } from '../../utils/date-data.js';
import { LeaveNavigation } from '../../pages/leave/LeaveNavigation.js';
import { ApplyLeavePage } from '../../pages/leave/ApplyLeavePage.js';

const SUFFICIENT_ENTITLEMENT = 10;
const INSUFFICIENT_ENTITLEMENT = 1;

test.describe('Leave - Apply Leave', () => {
    test('AT-LEAVE-003 | Prevent leave application with invalid date range',
        { tag: ['@leave'] }, async ({ browser }, testInfo) => {
        const adminContext = await browser.newContext();
        const essContext = await browser.newContext();
        const adminPage = await adminContext.newPage();
        const essPage = await essContext.newPage();

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
                        entitlementDays: SUFFICIENT_ENTITLEMENT,
                    },
                );

            await loginWithCredentials(
                essPage,
                employee.username!,
                employee.password!,
            );

            const navigation = new LeaveNavigation(essPage);

            const applyLeavePage = new ApplyLeavePage(essPage);

            await navigation.goto();
            await navigation.gotoApplyLeave();

            await expect(applyLeavePage.heading).toBeVisible();

            await applyLeavePage.selectLeaveType(employee.leaveType);

            const fromDate = dateFromToday(10);
            const toDate = dateFromToday(5);

            await applyLeavePage.fillDateRange(
                fromDate,
                toDate,
            );

            await expect(applyLeavePage.fromDateInput).toHaveValue(fromDate);

            await expect(applyLeavePage.toDateInput).toHaveValue(toDate);

            await expect(applyLeavePage.invalidDateRangeMessage).toBeVisible();

            await applyLeavePage.applyLeave();

            await expect(applyLeavePage.invalidDateRangeMessage).toBeVisible();

            await expect(essPage).toHaveURL(/leave\/applyLeave/);
        } finally {
            await essContext.close();
            await adminContext.close();
        }
    });

    test('AT-LEAVE-004 | Prevent leave application when balance is insufficient',
        { tag: ['@leave'] }, async ({ browser }, testInfo) => {
        const adminContext = await browser.newContext();
        const essContext = await browser.newContext();
        const adminPage = await adminContext.newPage();
        const essPage = await essContext.newPage();

        try {
            await loginWithCredentials(
                adminPage,
                env.adminUsername,
                env.adminPassword,
            );

            const environment = await ensureLeaveEnvironment(adminPage);

            const employee = await createLeaveTestEmployee(
                adminPage,
                testInfo,
                {
                    leaveType: environment.leaveType,
                    entitlementDays: INSUFFICIENT_ENTITLEMENT,
                },
            );

            await loginWithCredentials(
                essPage,
                employee.username!,
                employee.password!,
            );

            const navigation = new LeaveNavigation(essPage);

            const applyLeavePage = new ApplyLeavePage(essPage);

            await navigation.goto();
            await navigation.gotoApplyLeave();

            await expect(applyLeavePage.heading).toBeVisible();

            await applyLeavePage.selectLeaveType(employee.leaveType);

            const { fromDate, toDate } = buildWorkingDayRange(7, 3);

            await applyLeavePage.fillDateRange(
                fromDate,
                toDate,
            );

            await expect(applyLeavePage.balanceNotSufficientMessage).toBeVisible();

            await Promise.all([
                expect(applyLeavePage.leaveBalanceExceededToast).toBeVisible(),
                applyLeavePage.applyLeave(),
            ]);

            await expect(essPage).toHaveURL(/leave\/applyLeave/);
        } finally {
            await essContext.close();
            await adminContext.close();
        }
    });
});