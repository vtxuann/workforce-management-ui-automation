import { type Page } from '@playwright/test';
import { LeaveNavigation } from '../pages/leave/LeaveNavigation.js';
import { DefineLeavePeriodPage } from '../pages/leave/DefineLeavePeriodPage.js';
import { LeaveTypesPage } from '../pages/leave/LeaveTypesPage.js';

export type LeaveEnvironment = {
    leaveType: string;
};

export async function ensureLeaveEnvironment(
    page: Page,
): Promise<LeaveEnvironment> {
    const navigation = new LeaveNavigation(page);

    await navigation.goto();

    await ensureLeavePeriod(page);

    const leaveType = await resolveLeaveType(
        page,
        navigation,
    );

    return {
        leaveType,
    };
}

async function ensureLeavePeriod(
    page: Page,
): Promise<void> {
    const leavePeriodPage =
        new DefineLeavePeriodPage(page);

    if (
        !page.url().includes(
            '/leave/defineLeavePeriod',
        )
    ) {
        return;
    }

    await leavePeriodPage.heading.waitFor({
        state: 'visible',
    });

    if (await leavePeriodPage.isConfigured()) {
        return;
    }

    await leavePeriodPage.configureCalendarYear();
}

async function resolveLeaveType(
    page: Page,
    navigation: LeaveNavigation,
): Promise<string> {
    await navigation.gotoLeaveTypes();

    const leaveTypesPage =
        new LeaveTypesPage(page);

    await leaveTypesPage.heading.waitFor({
        state: 'visible',
    });

    const existingLeaveType =
        await leaveTypesPage
            .getFirstActiveLeaveTypeName();

    if (existingLeaveType) {
        return existingLeaveType;
    }

    const leaveType = generateLeaveTypeName();

    await leaveTypesPage.createLeaveType(
        leaveType,
    );

    return leaveType;
}

function generateLeaveTypeName(): string {
    return `Automation Leave ${Date.now()}`;
}