import { type Locator, type Page } from '@playwright/test';

export class AssignLeavePage {
    readonly page: Page;

    readonly heading: Locator;

    readonly employeeNameInput: Locator;

    readonly leaveTypeSelect: Locator;
    readonly leaveTypeSelectedValue: Locator;

    readonly fromDateInput: Locator;
    readonly toDateInput: Locator;
    readonly commentsInput: Locator;

    readonly balanceNotSufficientMessage: Locator;

    readonly assignButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.heading = page.getByRole('heading', {
            name: 'Assign Leave',
            exact: true,
        });

        this.employeeNameInput = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText(
                    'Employee Name',
                    { exact: true },
                ),
            })
            .locator('input');

        const leaveTypeGroup = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText(
                    'Leave Type',
                    { exact: true },
                ),
            });

        this.leaveTypeSelect = leaveTypeGroup.locator('.oxd-select-text');

        this.leaveTypeSelectedValue = leaveTypeGroup.locator('.oxd-select-text-input');

        this.fromDateInput = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText(
                    'From Date',
                    { exact: true },
                ),
            })
            .locator('input');

        this.toDateInput = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText(
                    'To Date',
                    { exact: true },
                ),
            })
            .locator('input');

        this.commentsInput = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText(
                    'Comment',
                    { exact: false },
                ),
            })
            .locator('textarea');

        this.balanceNotSufficientMessage =
            page.getByText(
                'Balance not sufficient',
                {
                    exact: false,
                },
            );

        this.assignButton = page.getByRole(
            'button',
            {
                name: 'Assign',
                exact: true,
            },
        );
    }

    async selectEmployee(
        employeeName: string,
    ): Promise<void> {
        await this.employeeNameInput.fill(
            employeeName,
        );

        const option = this.page
            .getByRole('option')
            .filter({
                hasText: employeeName,
            })
            .first();

        await option.waitFor({
            state: 'visible',
        });

        await option.click();
    }

    async selectLeaveType(
        leaveType: string,
    ): Promise<void> {
        await this.leaveTypeSelect.click();

        await this.page
            .getByRole('option', {
                name: leaveType,
                exact: true,
            })
            .click();
    }

    async fillDateRange(
        fromDate: string,
        toDate: string,
    ): Promise<void> {
        await this.fromDateInput.fill(fromDate);

        const currentToDate =
            await this.toDateInput.inputValue();

        if (currentToDate !== toDate) {
            await this.toDateInput.clear();
            await this.toDateInput.fill(toDate);
        }

        await this.toDateInput.blur();
    }

    async fillComments(
        comments: string,
    ): Promise<void> {
        await this.commentsInput.fill(comments);
    }

    async assignLeave(): Promise<void> {
        await this.assignButton.click();
    }
}