import { test, expect } from '../../fixtures/auth.fixture.js';
import { env } from '../../config/env.js';
import { loginWithCredentials } from '../../utils/auth-actions.js';
import { ensureLeaveEnvironment } from '../../utils/leave-environment.js';
import { buildRequestTag, createLeaveTestEmployee } from '../../utils/leave-test-data.js';
import { workingDateFromToday } from '../../utils/date-data.js';
import { LeaveNavigation } from '../../pages/leave/LeaveNavigation.js';
import { ApplyLeavePage } from '../../pages/leave/ApplyLeavePage.js';
import { LeaveListPage } from '../../pages/leave/LeaveListPage.js';
import { MyLeavePage } from '../../pages/leave/MyLeavePage.js';

async function createPendingLeave(
    essPage: import('@playwright/test').Page,
    employee: Awaited<
        ReturnType<typeof createLeaveTestEmployee>
    >,
    date: string,
    comment: string,
): Promise<void> {
    const navigation =
        new LeaveNavigation(essPage);

    const applyLeavePage =
        new ApplyLeavePage(essPage);

    await navigation.goto();
    await navigation.gotoApplyLeave();

    await applyLeavePage.heading.waitFor({
        state: 'visible',
    });

    await applyLeavePage.selectLeaveType(
        employee.leaveType,
    );

    await applyLeavePage.fillDateRange(
        date,
        date,
    );

    await applyLeavePage.fillComments(comment);

    await Promise.all([
        applyLeavePage
            .successfullySavedToast
            .waitFor({
                state: 'visible',
            }),
        applyLeavePage.applyLeave(),
    ]);
}

test.describe('Leave - Approval Workflow', () => {
    test('AT-LEAVE-012 | Approve employee leave request',
        { tag: ['@smoke', '@leave'] }, async ({ browser }, testInfo) => {
            const adminContext = await browser.newContext();

            const essContext = await browser.newContext();

            const adminPage = await adminContext.newPage();

            const essPage = await essContext.newPage();

            const comment = buildRequestTag(
                testInfo,
                'AT-LEAVE-012',
            );

            const date = workingDateFromToday(14);

            let approved = false;

            try {
                await loginWithCredentials(
                    adminPage,
                    env.adminUsername,
                    env.adminPassword,
                );

                const environment = await ensureLeaveEnvironment(
                    adminPage,
                );

                const employee = await createLeaveTestEmployee(
                    adminPage,
                    testInfo,
                    {
                        leaveType: environment.leaveType,
                        entitlementDays: 10,
                    },
                );

                await loginWithCredentials(
                    essPage,
                    employee.username!,
                    employee.password!,
                );

                await createPendingLeave(
                    essPage,
                    employee,
                    date,
                    comment,
                );

                const adminNavigation = new LeaveNavigation(adminPage);

                const leaveListPage = new LeaveListPage(adminPage);

                await adminNavigation.goto();
                await adminNavigation.gotoLeaveList();

                const pendingRow =
                    leaveListPage.getLeaveRowByTag(
                        comment,
                    );

                await expect(pendingRow).toBeVisible();

                await expect(pendingRow).toContainText('Pending Approval');

                await expect(pendingRow).toContainText(date);

                await expect(pendingRow).toContainText(employee.leaveType);

                await Promise.all([
                    expect(leaveListPage.successfullyUpdatedToast).toBeVisible(),
                    leaveListPage.approveLeave(comment)
                ]);

                approved = true;

                await expect(pendingRow).toBeHidden();

                const essNavigation = new LeaveNavigation(essPage);

                const myLeavePage = new MyLeavePage(essPage);

                await essNavigation.goto();
                await essNavigation.gotoMyLeave();

                const employeeRow = myLeavePage.getLeaveRowByTag(comment);

                await expect(employeeRow).toBeVisible();

                await expect(employeeRow).toContainText('Scheduled');
            } finally {
                if (approved) {
                    try {
                        const essNavigation = new LeaveNavigation(essPage);

                        const myLeavePage = new MyLeavePage(essPage);

                        await essNavigation.goto();
                        await essNavigation.gotoMyLeave();

                        await myLeavePage.cancelLeaveIfAvailable(comment);
                    } catch (error) {
                        console.warn(
                            `Leave cleanup failed for ${comment}:`,
                            error,
                        );
                    }
                }

                await essContext.close();
                await adminContext.close();
            }
        });

    test('AT-LEAVE-013 | Reject employee leave request',
        { tag: ['@leave'] }, async ({ browser }, testInfo) => {
            const adminContext = await browser.newContext();

            const essContext = await browser.newContext();

            const adminPage = await adminContext.newPage();

            const essPage = await essContext.newPage();

            const comment = buildRequestTag(
                testInfo,
                'AT-LEAVE-013',
            );

            const date = workingDateFromToday(21);

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
                        entitlementDays: 10,
                    },
                );

                await loginWithCredentials(
                    essPage,
                    employee.username!,
                    employee.password!,
                );

                await createPendingLeave(
                    essPage,
                    employee,
                    date,
                    comment,
                );

                const adminNavigation = new LeaveNavigation(adminPage);

                const leaveListPage = new LeaveListPage(adminPage);

                await adminNavigation.goto();
                await adminNavigation.gotoLeaveList();

                const pendingRow = leaveListPage.getLeaveRowByTag(comment);

                await expect(pendingRow).toBeVisible();

                await expect(pendingRow).toContainText('Pending Approval');

                await Promise.all([
                    expect(leaveListPage.successfullyUpdatedToast).toBeVisible(),
                    leaveListPage.rejectLeave(comment)
                ]);

                await expect(pendingRow).toBeHidden();

                const essNavigation = new LeaveNavigation(essPage);

                const myLeavePage = new MyLeavePage(essPage);

                await essNavigation.goto();
                await essNavigation.gotoMyLeave();

                const employeeRow = myLeavePage.getLeaveRowByTag(comment);

                await expect(employeeRow).toBeVisible();

                await expect(employeeRow).toContainText('Rejected');
            } finally {
                await essContext.close();
                await adminContext.close();
            }
        });
});