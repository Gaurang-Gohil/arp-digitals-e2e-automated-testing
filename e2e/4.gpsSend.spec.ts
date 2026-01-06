import test, { expect } from "@playwright/test";
import creds from "../constants/fundedAccountCreds";
import CountryCurrencyThresholds from "../constants/countryCurrencyThresholds";
import searchPage from "../utils/globalSearch";
import executeLogin from "../utils/loginViaApi";

test('Testing gps Send', async ({ page }) => {
    test.setTimeout(5000000);
    console.log("\n \t Tesing GPS send -- 💸")
    // Login in the funded account via funded account 
    console.log("\n Loging in via API -- 🔐")
    await executeLogin(page,creds.email, creds.password);
    console.log("Loging Successful -- ✅ \n")

    // Get the send button
    await page.getByRole('button', { name: 'Send' }).click()
    const sendMoneyModal = page.getByRole('dialog', { name: 'Send Funds' });
    await expect(sendMoneyModal).toBeInViewport();

    // click the send button in the modal
    await page.getByRole('button', { name: 'Send Transfer funds to' }).click()
    await expect(page).toHaveURL(new RegExp(`./gps/transactions/create`));

    // Loop for country
    let currentTestingCountry:string = "";
    let currentTestingCurrency:string = "";
    try {

        for (const currentCountryDetails of CountryCurrencyThresholds) {
            // Log the current country
            currentTestingCountry = currentCountryDetails.country;
            console.log(`  Testing for ${currentTestingCountry} -- 🧪🌍🗺️`)

            // Find the title send 
            const title = page.getByRole('heading', { name: `Send`, exact: false });
            await expect(title).toBeVisible({ timeout: 10000 });

            // Select a country
            await page.locator('button[data-slot="popover-trigger"]').nth(0).click();
            // Check for the country list to appear
            const coutryOptions = page.locator('div[data-slot="command-group"]').nth(0);
            await expect(coutryOptions).toBeVisible();
            // Select the country
            await page.getByRole('option', { name: currentTestingCountry }).click();


            // Select the recipient
            await page.locator('button[data-slot="popover-trigger"]').nth(1).click();
            await page.getByPlaceholder('Search recipient...').fill(currentCountryDetails.recipient)    
            await page.getByRole('option', { name: currentCountryDetails.recipient }).click();

            // Loop for currency
            // const avalibleCurrencies = CountryCurrencyThresholds.;
            for (const currency of currentCountryDetails.currencies) {
                // Log the current currency
                currentTestingCurrency = currency.symbol;
                const currentTestingCurrencyRate = currency.value;
                
                console.log(`Testing for ${currentTestingCurrency} -- 🧪💰💸`)

                // Select the currency
                await page.locator('button[data-slot="select-trigger"]').nth(0).click();
                // Select Currency
                await page.getByRole('option', { name: currency.symbol, exact: true }).click();
                await page.getByPlaceholder('0.00').first().fill(`${currentTestingCurrencyRate}`);

                // Get the summary details
                const summaryCard = page.getByText('Our Rate');
                await expect(summaryCard).toBeVisible({ timeout: 15000 })

                // get button check if it's enabled and click it
                const sendButton = page.getByRole('button', { name: 'Confirm & Send' });
                await expect(sendButton).toBeEnabled()
                await sendButton.click();

                // Check if the alert box is visible
                const confirmAlertBox = page.getByRole('alertdialog', { name: 'Confirm Transfer' });
                await expect(confirmAlertBox).toBeVisible({ timeout: 100 })
                await confirmAlertBox.click();

                await page.getByRole('button', { name: 'Confirm & Send' }).click()

                // Check for the url to be /transaction
                const transactionPageTitle = page.getByRole('heading', { name: `Transactions`, exact: false });
                await expect(transactionPageTitle).toBeVisible({ timeout: 10000 })

                await searchPage(page ,"Send Money");

                if (currentCountryDetails.recipient === "Rania" && currency.symbol === "USDC") {
                    break;
                }
                else {
                    // Select a country
                    await page.locator('button[data-slot="popover-trigger"]').nth(0).click();
                    // Check for the country list to appear
                    const coutryOptions = page.locator('div[data-slot="command-group"]').nth(0);
                    await expect(coutryOptions).toBeVisible();
                    // Select the country
                    await page.getByRole('option', { name: currentTestingCountry }).click();
                    // Select the recipient
                    await page.locator('button[data-slot="popover-trigger"]').nth(1).click();
                    await page.getByPlaceholder('Search recipient...').fill(currentCountryDetails.recipient)
                    await page.getByRole('option', { name: currentCountryDetails.recipient }).click();
                }
                console.log(`Test Successful for ${currentTestingCountry} -- 🤑`);
            }
            console.log(`  Test Successful for ${currentTestingCountry} -- 🗿`);
        }
    }
    catch (err) {
        console.log(`Test failed for ${currentTestingCountry} and ${currentTestingCurrency} \n error : ${err} -- ❌🗑️🥀`)
    }
})