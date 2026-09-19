import { type Locator, type Page } from '@playwright/test';

export class MyLeavePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
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

    async cancelLeaveAndWaitForCancelled(
        requestTag: string,
    ) {
        const row =
            this.getLeaveRowByTag(
                requestTag,
            );

        await row
            .getByRole('button', {
                name: 'Cancel',
                exact: true,
            })
            .click();

        await row
            .getByText(/Cancelled/)
            .waitFor({
                state: 'visible',
            });
    }

    async cancelLeaveIfAvailable(
        requestTag: string,
    ) {
        const row =
            this.getLeaveRowByTag(
                requestTag,
            );

        if (!(await row.isVisible())) {
            return;
        }

        const cancelButton =
            row.getByRole(
                'button',
                {
                    name: 'Cancel',
                    exact: true,
                },
            );

        if (
            !(await cancelButton.isVisible())
        ) {
            return;
        }

        await cancelButton.click();

        await row
            .getByText(/Cancelled/)
            .waitFor({
                state: 'visible',
            });
    }
}