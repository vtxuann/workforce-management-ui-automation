import { type Locator, type Page } from '@playwright/test';

export class LeaveNavigation {
    readonly leaveMenuLink: Locator;

    readonly topbarMenu: Locator;

    readonly applyLeaveLink: Locator;
    readonly assignLeaveLink: Locator;
    readonly leaveListLink: Locator;
    readonly myLeaveLink: Locator;

    readonly entitlementsMenuLink: Locator;
    readonly addEntitlementsLink: Locator;

    readonly configureMenuLink: Locator;
    readonly leavePeriodLink: Locator;
    readonly leaveTypesLink: Locator;

    constructor(page: Page) {
        this.leaveMenuLink = page.getByRole('link', {
            name: 'Leave',
            exact: true,
        });

        this.topbarMenu = page.getByRole('navigation', {
            name: 'Topbar Menu',
        });

        this.applyLeaveLink = this.topbarMenu.getByRole(
            'link',
            {
                name: 'Apply',
                exact: true,
            },
        );

        this.assignLeaveLink = this.topbarMenu.getByRole(
            'link',
            {
                name: 'Assign Leave',
                exact: true,
            },
        );

        this.leaveListLink = this.topbarMenu.getByRole(
            'link',
            {
                name: 'Leave List',
                exact: true,
            },
        );

        this.myLeaveLink = this.topbarMenu.getByRole(
            'link',
            {
                name: 'My Leave',
                exact: true,
            },
        );

        this.entitlementsMenuLink =
            this.topbarMenu.getByText(
                'Entitlements',
                {
                    exact: true,
                },
            );

        this.addEntitlementsLink =
            this.topbarMenu.getByRole('menuitem', {
                name: 'Add Entitlements',
                exact: true,
            });

        this.configureMenuLink =
            this.topbarMenu.getByText(
                'Configure',
                {
                    exact: true,
                },
            );

        this.leavePeriodLink =
            this.topbarMenu.getByRole('menuitem', {
                name: 'Leave Period',
                exact: true,
            });

        this.leaveTypesLink =
            this.topbarMenu.getByRole('menuitem', {
                name: 'Leave Types',
                exact: true,
            });
    }

    async goto(): Promise<void> {
        await this.leaveMenuLink.click();
    }

    async gotoApplyLeave(): Promise<void> {
        await this.applyLeaveLink.click();
    }

    async gotoAssignLeave(): Promise<void> {
        await this.assignLeaveLink.click();
    }

    async gotoLeaveList(): Promise<void> {
        await this.leaveListLink.click();
    }

    async gotoMyLeave(): Promise<void> {
        await this.myLeaveLink.click();
    }

    async gotoAddEntitlements(): Promise<void> {

        await this.entitlementsMenuLink.click();

        await this.addEntitlementsLink.waitFor({
            state: 'visible',
        });

        await this.addEntitlementsLink.click();
    }

    async gotoLeavePeriod(): Promise<void> {

        await this.configureMenuLink.click();

        await this.leavePeriodLink.waitFor({
            state: 'visible',
        });

        await this.leavePeriodLink.click();
    }

    async gotoLeaveTypes(): Promise<void> {

        await this.configureMenuLink.click();

        await this.leaveTypesLink.waitFor({
            state: 'visible',
        });

        await this.leaveTypesLink.click();
    }
}