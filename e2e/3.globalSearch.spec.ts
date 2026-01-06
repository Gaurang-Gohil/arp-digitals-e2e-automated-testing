import test, { expect } from "@playwright/test";
import credentials from "../constants/newRandomCreds";
import searchPage from "../utils/globalSearch";
import executeLogin from "../utils/loginViaApi";
import { sectionNameRoutes } from "../constants/globalSearchRoutes";


test('Global Search with ctrl + K', async ({ page }) => {
    test.setTimeout(100000);
    console.log("\n \tTesting global search -- 🌎 🔍")
    // login via API 
    console.log("\n Loging in via API -- 🔐")
    await executeLogin(page, credentials.email, credentials.password);
    console.log("Logging Successful -- ✅\n")


    for (const [sectionName, sectionRoute] of Object.entries(sectionNameRoutes)) {

        // search for the section name in ctrl K 
        console.log(`Searching ${sectionName} -- 🔍`);

        await searchPage( page,`${sectionName}`)

        // Check the link if it have sectionRoute in it 
        await page.waitForURL(new RegExp(`.*${sectionRoute}`), {
            waitUntil: 'load',
            timeout: 30000
        });
        console.log(`  Found ${sectionName} -- 🙌 \n`);

        // Wait for the title to be visible
        if (sectionName != 'Overview') {
            const title = page.getByRole('heading', { name: `${sectionName}`, exact: false });
            await expect(title).toBeVisible({ timeout: 10000 });
        }
    }
    console.log("\t Global search successful -- ✅ \n \n");
})

