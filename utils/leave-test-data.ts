import { type Page, type TestInfo } from '@playwright/test';
import { PimNavigation } from '../pages/pim/PimNavigation.js';
import { AddEmployeePage } from '../pages/pim/AddEmployeePage.js';
import { LeaveNavigation } from '../pages/leave/LeaveNavigation.js';
import { AddLeaveEntitlementPage } from '../pages/leave/AddLeaveEntitlementPage.js';

export type LeaveTestEmployee = {
    employeeId: string;
    employeeName: string;
    firstName: string;
    lastName: string;
    username?: string;
    password?: string;
    leaveType: string;
    entitlementDays: number;
};

export type CreateLeaveTestEmployeeOptions = {
    leaveType: string;
    entitlementDays: number;
    createLogin?: boolean;
};

export function buildRequestTag(
    testInfo: TestInfo,
    testCaseId: string,
): string {
    return [
        testCaseId,
        Date.now(),
        testInfo.workerIndex,
        testInfo.repeatEachIndex,
    ].join('-');
}

export async function createLeaveTestEmployee(
    adminPage: Page,
    testInfo: TestInfo,
    {
        leaveType,
        entitlementDays,
        createLogin = true,
    }: CreateLeaveTestEmployeeOptions,
): Promise<LeaveTestEmployee> {
    if (!leaveType.trim()) {
        throw new Error(
            'leaveType must not be empty.',
        );
    }

    if (
        !Number.isFinite(entitlementDays) ||
        entitlementDays <= 0
    ) {
        throw new Error(
            'entitlementDays must be greater than 0. ' +
            `Received: ${entitlementDays}.`,
        );
    }

    const suffix = buildUniqueSuffix(testInfo);

    const firstName = `Leave${suffix}`;
    const lastName = 'Tester';

    const employeeId = (
        `LV${Date.now().toString().slice(-5)}` +
        `${Math.random().toString(36).slice(2, 5)}`
    ).toUpperCase();

    const employeeName = `${firstName} ${lastName}`;

    const username = createLogin
        ? `leave${suffix}`.toLowerCase()
        : undefined;

    const password = createLogin
        ? `Qa!${suffix}Aa9`
        : undefined;

    const pimNavigation = new PimNavigation(adminPage);

    const addEmployeePage = new AddEmployeePage(adminPage);

    await pimNavigation.goto();
    await pimNavigation.gotoAddEmployee();

    await addEmployeePage.heading.waitFor({
        state: 'visible',
    });

    await addEmployeePage.fillEmployeeForm({
        firstName,
        lastName,
        employeeId,
    });

    if (createLogin) {
        await addEmployeePage.fillLoginDetails(
            username!,
            password!,
        );
    }

    await Promise.all([
        adminPage.waitForURL(
            /pim\/viewPersonalDetails\/empNumber\/\d+/,
            {
                timeout: 15_000,
            },
        ),
        addEmployeePage.save(),
    ]);

    const leaveNavigation = new LeaveNavigation(adminPage);

    const entitlementPage = new AddLeaveEntitlementPage(adminPage);

    await leaveNavigation.goto();
    await leaveNavigation.gotoAddEntitlements();

    await entitlementPage.heading.waitFor({
        state: 'visible',
    });

    await entitlementPage.setEntitlement(
        employeeName,
        leaveType,
        entitlementDays,
    );

    return {
        employeeId,
        employeeName,
        firstName,
        lastName,
        username,
        password,
        leaveType,
        entitlementDays,
    };
}

function buildUniqueSuffix(
    testInfo: TestInfo,
): string {
    return [
        Date.now().toString(36),
        testInfo.workerIndex,
        Math.random()
            .toString(36)
            .slice(2, 6),
    ].join('');
}