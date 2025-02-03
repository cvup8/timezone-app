import { HomePage } from "../../pages/home.page";
import { test, Page } from "@playwright/test";
import { TimezoneRow } from "@/e2e/data/timezoneRow";

test.describe("Delete Timezone", () => {
    let page: Page;
    let homePage: HomePage;
    const localTimezone = "America/Denver";
    let newTimezoneRow: TimezoneRow

    test.use({ timezoneId: localTimezone })
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new HomePage(page, localTimezone);

        await page.goto("");
        // Ensures page has finished loading
        await homePage.expectTimezoneRowToShow(homePage.localRow);

        newTimezoneRow = await homePage.addNewTimezone();
    });

    test("Timezone is deleted from table", async () => {
        await homePage.deleteTimezone(newTimezoneRow);
        await homePage.expectTimezoneRowToNotShow(newTimezoneRow);
    });
});

