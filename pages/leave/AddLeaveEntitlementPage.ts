import { type Locator, type Page } from '@playwright/test';

export class AddLeaveEntitlementPage {
    readonly page: Page;

    readonly heading: Locator;

    readonly employeeNameInput: Locator;
    readonly leaveTypeSelect: Locator;
    readonly leavePeriodSelect: Locator;
    readonly entitlementInput: Locator;

    readonly saveButton: Locator;

    readonly selectOptionList: Locator;

    readonly updatingEntitlementDialog: Locator;
    readonly updatingEntitlementMessage: Locator;
    readonly confirmButton: Locator;

    readonly successfullySavedToast: Locator;

    constructor(page: Page) {
        this.page = page;

        this.heading = page.getByText(
            'Add Leave Entitlement',
            {
                exact: true,
            },
        );

        const employeeNameFieldGroup = this.getFieldGroup('Employee Name');
        this.employeeNameInput =
            employeeNameFieldGroup.locator(
                'input[placeholder="Type for hints..."]',
            );

        const leaveTypeFieldGroup = this.getFieldGroup('Leave Type');
        this.leaveTypeSelect = leaveTypeFieldGroup.locator('.oxd-select-text');

        const leavePeriodFieldGroup = this.getFieldGroup('Leave Period');
        this.leavePeriodSelect = leavePeriodFieldGroup.locator('.oxd-select-text');

        const entitlementFieldGroup = this.getFieldGroup('Entitlement');
        this.entitlementInput = entitlementFieldGroup.locator('input');

        this.saveButton =
            page.getByRole('button', {
                name: 'Save',
                exact: true,
            });

        this.selectOptionList = page.getByRole('listbox');

        this.updatingEntitlementDialog = page
            .locator('.oxd-dialog-sheet')
            .filter({
                has: page.getByText(
                    'Updating Entitlement',
                    {
                        exact: true,
                    },
                ),
            });

        this.updatingEntitlementMessage =
            this.updatingEntitlementDialog
                .locator(
                    '.oxd-text--card-body',
                );

        this.confirmButton =
            this.updatingEntitlementDialog
                .getByRole(
                    'button',
                    {
                        name: 'Confirm',
                        exact: true,
                    },
                );

        this.successfullySavedToast = page
            .locator('.oxd-toast--success')
            .filter({
                hasText: 'Successfully Saved',
            });
    }

    private getFieldGroup(
        label: string,
    ): Locator {
        return this.page
            .locator('.oxd-input-group')
            .filter({
                has: this.page.getByText(
                    label,
                    {
                        exact: true,
                    },
                ),
            });
    }

    async selectEmployee(
        employeeName: string,
    ): Promise<void> {
        await this.employeeNameInput.fill(
            employeeName,
        );

        await this.page
            .getByRole('listbox')
            .getByText(
                employeeName,
                {
                    exact: true,
                },
            )
            .click();
    }

    async selectLeaveType(
        leaveType: string,
    ): Promise<void> {
        await this.leaveTypeSelect.click();

        await this.selectOptionList
            .getByText(
                leaveType,
                {
                    exact: true,
                },
            )
            .click();
    }

    async fillEntitlement(
        amount: number,
    ): Promise<void> {
        await this.entitlementInput.fill(
            String(amount),
        );
    }

    async save(): Promise<void> {
        await this.saveButton.click();
    }

    async confirmEntitlementUpdate(): Promise<void> {
        await this.updatingEntitlementDialog
            .waitFor({
                state: 'visible',
            });

        await this.confirmButton.click();
    }

    async setEntitlement(
        employeeName: string,
        leaveType: string,
        totalDays: number,
    ): Promise<void> {
        await this.selectEmployee(employeeName);
        await this.selectLeaveType(leaveType);
        await this.fillEntitlement(totalDays);

        await this.save();

        await this.updatingEntitlementDialog
            .waitFor({
                state: 'visible',
            });

        await Promise.all([
            this.successfullySavedToast
                .waitFor({
                    state: 'visible',
                }),

            this.confirmButton.click(),
        ]);
    }
}