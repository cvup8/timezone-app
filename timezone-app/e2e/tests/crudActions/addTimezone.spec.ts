import { HomePage } from "../../pages/home.page";
import { test, Page } from "@playwright/test";

test.describe("Add Timezone", () => {
    let page: Page;
    let homePage: HomePage;
    const localTimezone = "America/Denver";

    test.fixme(({ isMobile }) =>  isMobile, "Should fix Github Issue");
    test.use({ timezoneId: localTimezone })
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new HomePage(page, localTimezone);

        await page.goto("");
        await homePage.expectTimezoneRowToShow(homePage.localRow);
    });

    test("Unique timezone is added to table with a label and correctly converted time", async () => {
        const newTimezoneRow = await homePage.addNewTimezone();

        if (newTimezoneRow.label && newTimezoneRow.timezone && newTimezoneRow.localizedTime) {
            await homePage.expectTimezoneRowToShow(newTimezoneRow);
        } else {
            test.fail()
        }
      });
});

