import { type Locator, type Page } from '@playwright/test';

export class LeaveListPage {
    readonly page: Page;

    readonly heading: Locator;

    readonly employeeNameInput: Locator;
    readonly searchButton: Locator;

    readonly successfullyUpdatedToast: Locator;

    constructor(page: Page) {
        this.page = page;

        this.heading = page.getByRole('heading', {
            name: 'Leave List',
            exact: true,
        });

        const employeeNameFieldGroup = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText(
                    'Employee Name',
                    {
                        exact: true,
                    },
                ),
            });

        this.employeeNameInput =
            employeeNameFieldGroup.locator(
                'input[placeholder="Type for hints..."]',
            );

        this.searchButton =
            page.getByRole('button', {
                name: 'Search',
                exact: true,
            });

        this.successfullyUpdatedToast = page
            .locator('.oxd-toast--success')
            .getByText(
                'Successfully Updated',
                {
                    exact: true,
                },
            );
    }

    getLeaveRowByTag(
        requestTag: string,
    ): Locator {
        return this.page
            .locator('.oxd-table-row')
            .filter({
                hasText: requestTag,
            });
    }

    async approveLeave(
        requestTag: string,
    ) {
        const row =
            this.getLeaveRowByTag(requestTag);

        await row
            .getByRole('button', {
                name: 'Approve',
                exact: true,
            })
            .click();
    }

    async rejectLeave(
        requestTag: string,
    ) {
        const row = this.getLeaveRowByTag(requestTag);

        await row
            .getByRole('button', {
                name: 'Reject',
                exact: true,
            })
            .click();
    }
}