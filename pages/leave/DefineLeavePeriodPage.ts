import { type Locator, type Page } from '@playwright/test';

export class DefineLeavePeriodPage {
    readonly page: Page;

    readonly heading: Locator;

    readonly startMonthSelect: Locator;
    readonly startDateSelect: Locator;

    readonly currentLeavePeriodGroup: Locator;
    readonly currentLeavePeriodValue: Locator;

    readonly saveButton: Locator;
    readonly successfullySavedToast: Locator;

    constructor(page: Page) {
        this.page = page;

        this.heading = page.getByText(
            'Leave Period',
            {
                exact: true,
            },
        );

        this.startMonthSelect = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText(
                    'Start Month',
                    { exact: true },
                ),
            })
            .locator('.oxd-select-text');

        this.startDateSelect = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText(
                    'Start Date',
                    { exact: true },
                ),
            })
            .locator('.oxd-select-text');

        this.currentLeavePeriodGroup = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText(
                    'Current Leave Period',
                    { exact: true },
                ),
            });

        this.currentLeavePeriodValue =
            this.currentLeavePeriodGroup.locator(
                '.orangehrm-leave-period',
            );

        this.saveButton = page.getByRole(
            'button',
            {
                name: 'Save',
                exact: true,
            },
        );

        this.successfullySavedToast = page
            .locator('.oxd-toast--success')
            .filter({ hasText: 'Successfully Saved' });
    }

    async isConfigured(): Promise<boolean> {
        return (
            await this.currentLeavePeriodGroup.count()
        ) > 0;
    }

    async configureCalendarYear(): Promise<void> {
        await this.selectOption(
            this.startMonthSelect,
            'January',
        );

        await this.selectOption(
            this.startDateSelect,
            '01',
        );

        await this.saveButton.click();

        await this.successfullySavedToast.waitFor({
            state: 'visible',
        });

        await this.currentLeavePeriodGroup.waitFor({
            state: 'visible',
        });
    }

    async getCurrentLeavePeriod(): Promise<string> {
        return (
            await this.currentLeavePeriodValue
                .textContent()
        )?.trim() ?? '';
    }

    private async selectOption(
        select: Locator,
        option: string,
    ): Promise<void> {
        await select.click();

        await this.page
            .getByRole('option', {
                name: option,
                exact: true,
            })
            .click();
    }
}