import test, { Locator, Page } from "@playwright/test";
import { TimezoneRow } from "../data/timezoneRow";
import { getFormattedTimeFromTimezone } from "../helpers/date";

export class TimezoneFormPage {
    private readonly page: Page;
    readonly labelInput: Locator;
    readonly timezoneDropdown: Locator; 
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.labelInput = this.page.getByRole("textbox", { name: "label" });
        this.timezoneDropdown = this.page.getByLabel("Location");
        this.saveButton = this.page.getByRole("button", { name: "Save" });
    }

    private async findNewTimezone() {
        const timezones = [
            "America/Denver",
            "America/New_York",
            "America/Chicago",
            "America/Los_Angeles",
            "America/Juneau",
            "Pacific/Honolulu"
        ];
        for (let i = 0; i < timezones.length; i++) {
            const tzOption = timezones[i];
            const tzOptionLocator = this.page.getByRole("cell").filter({ hasText: tzOption});
            if (await tzOptionLocator.count() == 0) return tzOption;
        }
        // All timezone options have be added
        return null;
    }

    async fillFormAndSave() {
        const newTimezone = await this.findNewTimezone();
        const newLabel = `${newTimezone}-label`;
        let newTimezoneRow: TimezoneRow;

        if (newTimezone) {
            await this.labelInput.fill(newLabel);
            await this.timezoneDropdown.selectOption(newTimezone);
            await this.saveButton.click();

            newTimezoneRow = {
                label: newLabel,
                timezone: newTimezone,
                localizedTime: getFormattedTimeFromTimezone(newTimezone)
            };
        } else {
            // All timezones have been used up, so return an empty row
            newTimezoneRow = {
                label: null,
                timezone: null,
                localizedTime: null
            };
        }
        return newTimezoneRow;
    }
}