import { type Locator, type Page } from '@playwright/test';

export class DeleteEmployeeDialog {
    readonly dialog: Locator;

    readonly title: Locator;
    readonly message: Locator;

    readonly confirmButton: Locator;
    readonly cancelButton: Locator;

    readonly successfullyDeletedToast: Locator;

    constructor(page: Page) {
        this.dialog = page.locator(
            '.orangehrm-dialog-popup',
        );

        this.title = this.dialog.getByText(
            'Are you Sure?',
            {
                exact: true,
            },
        );

        this.message = this.dialog.getByText(
            'The selected record will be permanently deleted. Are you sure you want to continue?',
            {
                exact: true,
            },
        );

        this.confirmButton =
            this.dialog.getByRole(
                'button',
                {
                    name: 'Yes, Delete',
                },
            );

        this.cancelButton =
            this.dialog.getByRole(
                'button',
                {
                    name: 'No, Cancel',
                },
            );

        this.successfullyDeletedToast = page
            .locator('.oxd-toast--success')
            .getByText(
                'Successfully Deleted',
                {
                    exact: true,
                },
            );
    }

    async confirm() {
        await this.confirmButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }
}