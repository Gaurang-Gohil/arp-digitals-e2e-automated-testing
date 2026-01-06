import test, { expect, Page } from "@playwright/test";
import credentials from "../constants/newRandomCreds";
import { sectionRoutes } from "../constants/globalSearchRoutes";
import searchPage from "../helpers/globalSearch";
import executeLogin from "../helpers/loginViaApi";
import logInAdminPanel from "../helpers/logInAdminPanel";

test("Global Search with ctrl + K", async ({ page, context }) => {
    test.setTimeout(100000);
    console.log("\n \tTesting global search -- 🌎 🔍");
    // login via API
    console.log("\n Logging in via API -- 🔐");
    await executeLogin(page, credentials.email, credentials.password);
    console.log("Logging Successful -- ✅\n");

    for (const [sectionName, sectionRoute] of Object.entries(sectionRoutes)) {
        // search for the section name in ctrl K
        if (sectionName !== "Checkouts") {
            testSection(page, sectionName, sectionRoute);
        } else {
            logInAdminPanel({ page, context });
            
        }
    }
    console.log("\t Global search successful -- ✅ \n \n");
});

async function testSection(
    page: Page,
    sectionName: string,
    sectionRoute: string
) {
    console.log(`Searching ${sectionName} -- 🔍`);

    await searchPage(page, `${sectionName}`);

    // Check the link if it have sectionRoute in it
    await page.waitForURL(new RegExp(`.*${sectionRoute}`), {
        waitUntil: "load",
        timeout: 30000,
    });
    console.log(`  Found ${sectionName} -- 🙌 \n`);

    // Wait for the title to be visible
    if (sectionName != "Overview") {
        const title = page.getByRole("heading", {
            name: `${sectionName}`,
            exact: false,
        });
        await expect(title).toBeVisible({ timeout: 10000 });
    }
}
