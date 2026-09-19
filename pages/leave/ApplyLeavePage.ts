import { type Locator, type Page } from '@playwright/test';

export class ApplyLeavePage {
    readonly page: Page;

    readonly heading: Locator;

    readonly leaveTypeSelect: Locator;
    readonly leaveTypeSelectedValue: Locator;

    readonly fromDateInput: Locator;
    readonly toDateInput: Locator;
    readonly commentsInput: Locator;

    readonly leaveBalanceText: Locator;

    readonly invalidDateRangeMessage: Locator;
    readonly balanceNotSufficientMessage: Locator;

    readonly applyButton: Locator;

    readonly successfullySavedToast: Locator;
    readonly leaveBalanceExceededToast: Locator;

    constructor(page: Page) {
        this.page = page;

        this.heading = page.getByRole('heading', {
            name: 'Apply Leave',
            exact: true,
        });

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
                    'Comments',
                    { exact: true },
                ),
            })
            .locator('textarea');

        this.leaveBalanceText = page.locator('.orangehrm-leave-balance-text');

        this.invalidDateRangeMessage =
            page.getByText(
                'To date should be after from date',
                {
                    exact: false,
                },
            );

        this.balanceNotSufficientMessage =
            page.getByText(
                'Balance not sufficient',
                {
                    exact: false,
                },
            );

        this.applyButton = page.getByRole(
            'button',
            {
                name: 'Apply',
                exact: true,
            },
        );

        this.successfullySavedToast = page
            .locator('.oxd-toast--success')
            .filter({
                hasText: 'Successfully Saved',
            });

        this.leaveBalanceExceededToast = page
            .locator('.oxd-toast--error')
            .getByText(
                'Leave Balance Exceeded',
                { exact: true },
            );
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

        const currentToDate = await this.toDateInput.inputValue();

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

    async applyLeave(): Promise<void> {
        await this.applyButton.click();
    }
}