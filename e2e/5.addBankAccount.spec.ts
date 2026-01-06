import test, { expect } from "@playwright/test";
import creds from "../constants/newRandomCreds"
import generateBankDetails from "../constants/bankDetails";
import searchPage from "../utils/globalSearch";
import addBankAccount from "../utils/addBankAccount";
import executeLogin from "../utils/loginViaApi";


test('Add Bank Account', async ({ page }) => {
    console.log("\n \t Tesing Add Bank Account -- 💸")
    // Login in via API 
    console.log("\n Loging in via API -- 🔐")
    await executeLogin(page, creds.email, creds.password);
    console.log("Loging Successful -- ✅ \n")

    // go to bank account page
    await searchPage(page,"Bank Accounts");
    const listOfBankDetails = generateBankDetails();

    
    for (const bankDetails of listOfBankDetails) {
        await addBankAccount(page, bankDetails);
        await page.keyboard.press('Control+r');    
    }
    await page.waitForTimeout(1000)
});