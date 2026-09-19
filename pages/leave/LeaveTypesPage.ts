import { type Locator, type Page } from '@playwright/test';

export class LeaveTypesPage {
    readonly page: Page;

    readonly heading: Locator;
    readonly addButton: Locator;

    readonly leaveTypeRows: Locator;

    readonly addLeaveTypeHeading: Locator;
    readonly nameInput: Locator;
    readonly saveButton: Locator;

    readonly successfullySavedToast: Locator;


    constructor(page: Page) {
        this.page = page;

        this.heading = page.getByRole('heading', {
            name: 'Leave Types',
            exact: true,
        });

        this.addButton = page.getByRole('button', {
            name: 'Add',
        });

        this.leaveTypeRows = page.locator(
            '.oxd-table-body [role="row"]',
        );

        this.addLeaveTypeHeading = page.getByRole(
            'heading',
            {
                name: 'Add Leave Type',
                exact: true,
            },
        );

        this.nameInput = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText(
                    'Name',
                    { exact: true },
                ),
            })
            .locator('input');

        this.saveButton = page.getByRole('button', {
            name: 'Save',
            exact: true,
        });

        this.successfullySavedToast = page
            .locator('.oxd-toast--success')
            .filter({
                hasText: 'Successfully Saved',
            });
    }

    async getFirstActiveLeaveTypeName(): Promise<string | null> {
        const firstRow = this.leaveTypeRows.first();

        try {
            await firstRow.waitFor({
                state: 'visible',
                timeout: 5_000,
            });
        } catch {
            return null;
        }

        const name = (
            await firstRow
                .locator('.oxd-table-cell')
                .nth(1)
                .textContent()
        )?.trim();

        return name || null;
    }

    async openAddForm(): Promise<void> {
        await this.addButton.click();

        await this.addLeaveTypeHeading.waitFor({
            state: 'visible',
        });
    }

    async createLeaveType(
        name: string,
    ): Promise<void> {
        await this.openAddForm();

        await this.nameInput.fill(name);

        await Promise.all([
            this.successfullySavedToast.waitFor({
                state: 'visible',
            }),
            this.saveButton.click(),
        ]);
    }
}