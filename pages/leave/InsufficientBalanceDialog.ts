import { type Locator, type Page } from '@playwright/test';

export class InsufficientBalanceDialog {
    readonly dialog: Locator;
    readonly heading: Locator;
    readonly message: Locator;

    readonly okButton: Locator;
    readonly cancelButton: Locator;

    readonly successfullySavedToast: Locator;

    constructor(page: Page) {
        this.dialog = page
            .locator('.oxd-dialog-sheet')
            .filter({ hasText: 'Confirm Leave Assignment' });

        this.heading =
            this.dialog.getByText(
                'Confirm Leave Assignment',
                {
                    exact: true,
                },
            );

        this.message =
            this.dialog.getByText(
                'Employee does not have sufficient leave balance for leave request. Click OK to confirm leave assignment.',
                {
                    exact: true,
                },
            );

        this.okButton =
            this.dialog.getByRole(
                'button',
                {
                    name: 'Ok',
                    exact: true,
                },
            );

        this.cancelButton =
            this.dialog.getByRole(
                'button',
                {
                    name: 'Cancel',
                    exact: true,
                },
            );

        this.successfullySavedToast = page
            .locator('.oxd-toast--success')
            .getByText(
                'Successfully Saved',
                { exact: true },
            );
    }

    async confirm(): Promise<void> {
        await this.okButton.click();
    }

    async cancel(): Promise<void> {
        await this.cancelButton.click();
    }
}