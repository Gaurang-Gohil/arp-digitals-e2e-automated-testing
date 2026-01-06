import test, { expect } from "@playwright/test";
import creds from "../constants/newRandomCreds"
import generateBankDetails from "../constants/bankDetails";
import searchPage from "../helpers/globalSearch";
import addBankAccount from "../helpers/addBankAccount";
import executeLogin from "../helpers/loginViaApi";


test('Add Bank Account', async ({ page }) => {
    test.setTimeout(50000);
    console.log("\n \t Tesing Add Bank Account -- 💸")
    // Login in via API 
    console.log("\n Logging in via API -- 🔐")
    await executeLogin(page, creds.email, creds.password);
    console.log("Logging Successful -- ✅ \n")

    // go to bank account page
    await searchPage(page, "Bank Accounts");
    const listOfBankDetails = generateBankDetails();


    for (const bankDetails of listOfBankDetails) {
        console.log(`Adding bank account for "${bankDetails.countryCode}" -- 🏦 `)
        await addBankAccount(page, bankDetails);
        console.log(`Bank account added for "${bankDetails.countryCode}" -- ✅ `)

        await page.keyboard.press('Control+r');

        const title = page.getByRole('heading', { name: `Bank`, exact: false });
        await expect(title).toBeVisible({ timeout: 1000 });
    }
});