import { Locator, Page, expect } from "@playwright/test";
import { getFormattedTimeFromTimezone } from "../helpers/date";
import { TimezoneRow } from "../data/timezoneRow";
import { TimezoneFormPage } from "./timezoneForm.page";

export class HomePage {
    private readonly page: Page;
    readonly addTimezoneButton: Locator;
    readonly localRow: TimezoneRow;
    readonly timezoneFormPage: TimezoneFormPage;

    constructor(page: Page, localTimezone: string) {
        this.page = page;
        this.addTimezoneButton = page.getByRole("button", { name: "Add timezone" });
        this.localRow = {
            label: "Local(You)",
            timezone: localTimezone,
            localizedTime: getFormattedTimeFromTimezone(localTimezone)
        };
        this.timezoneFormPage = new TimezoneFormPage(page);
    }

    async addNewTimezone() {
        await this.addTimezoneButton.click()
        return await this.timezoneFormPage.fillFormAndSave();
    }

    async deleteTimezone(row: TimezoneRow) {
        await this.page.getByRole("button", { name: `Delete , ${row.label}` }).click();
    }

    async expectTimezoneRowToShow(row: TimezoneRow) {
        await expect(this.page.getByRole("cell", { name: `${row.label}`, exact: true })).toHaveCount(1);
        await expect(this.page.getByRole("cell", { name: `${row.timezone}`, exact: true })).toHaveCount(1);
        await expect(this.page.getByRole("cell", { name: `${row.localizedTime}` })).toHaveCount(1);
    }

    async expectTimezoneRowToNotShow(row: TimezoneRow) {
        await expect(this.page.getByRole("cell", { name: `${row.label}`, exact: true })).toHaveCount(0);
        await expect(this.page.getByRole("cell", { name: `${row.timezone}`, exact: true })).toHaveCount(0);
        await expect(this.page.getByRole("cell", { name: `${row.localizedTime}` })).toHaveCount(0);
    }
}