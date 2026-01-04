import test, { expect } from "@playwright/test";
import { loginViaApi } from "../helpers/loginViaApi";
import creds from "../constants/fundedAccountCreds";
import GlobalSearch from "../helpers/globalSearch";
import countryCurrencyThresholds from "../constants/countryCurrencyThresholds";

test('Testing gps Send', async ({ page }) => {
    test.setTimeout(300000)

    // Login in the funded account via funded account 
    console.log("Loging in via API -- 🔐")
    const login = new loginViaApi(page);
    await login.executeLogin(creds.email, creds.password);
    console.log("Loging Successful -- ✅")

    // Get the send button
    await page.getByRole('button', { name: 'Send' }).click()
    const sendMoneyModal = await page.getByRole('dialog', { name: 'Send Funds' });
    await expect(sendMoneyModal).toBeInViewport();

    // click the send button in the modal
    await page.getByRole('button', { name: 'Send Transfer funds to' }).click()
    await expect(page).toHaveURL(new RegExp(`./gps/transactions/create`));

    // Loop for country
    const countryList = Object.keys(countryCurrencyThresholds);
    let currentTestingCountry;
    let currentTestingCurrency;
    try {

        for (const country of countryList as (keyof typeof countryCurrencyThresholds)[]) {
            // Log the current country
            currentTestingCountry = country;
            console.log(`Testing for ${country} -- 🧪🌍🗺️`)

            // Find the title send 
            const title = await page.getByRole('heading', { name: `Send`, exact: false });
            await expect(title).toBeVisible({ timeout: 10000 });

            // Select a country
            await page.locator('button[data-slot="popover-trigger"]').nth(0).click();
            // Check for the country list to appear
            const coutryOptions = await page.locator('div[data-slot="command-group"]').nth(0);
            await expect(coutryOptions).toBeVisible();
            // Select the country
            await page.getByRole('option', { name: country }).click();


            // Select the recipient
            await page.locator('button[data-slot="popover-trigger"]').nth(1).click();
            await page.getByRole('option', { name: countryCurrencyThresholds[country].Recipient }).click();

            // Loop for currency
            const avalibleCurrencies = countryCurrencyThresholds[country];
            for (const currency of Object.keys(avalibleCurrencies.currencies)) {
                // Log the current currency
                currentTestingCurrency = currency;
                console.log(`Testing for ${currency} -- 🧪💰💸`)

                const currentTestingCurrencyRate = (avalibleCurrencies.currencies as any)[currency];

                // Select the currency
                await page.locator('button[data-slot="select-trigger"]').nth(0).click();
                // Select Currency
                await page.getByRole('option', { name: currency, exact: true }).click();
                await page.getByPlaceholder('0.00').first().fill(`${currentTestingCurrencyRate}`);

                // Get the summary details
                const summaryCard = page.getByText('Our Rate');
                await expect(summaryCard).toBeVisible({ timeout: 15000 })

                // get button check if it's enabled and click it
                const sendButton = page.getByRole('button', { name: 'Confirm & Send' });
                await expect(sendButton).toBeEnabled()
                await sendButton.click();

                // Check if the alert box is visible
                const confirmAlertBox = await page.getByRole('alertdialog', { name: 'Confirm Transfer' });
                await expect(confirmAlertBox).toBeVisible({ timeout: 100 })
                await confirmAlertBox.click();

                await page.getByRole('button', { name: 'Confirm & Send' }).click()

                // Check for the url to be /transaction
                const transactionPageTitle = await page.getByRole('heading', { name: `Transactions`, exact: false });
                await expect(transactionPageTitle).toBeVisible({ timeout: 10000 })

                const search = new GlobalSearch(page);
                await search.search("Send Money");
                console.log("Found Send Money -- 🙌\n")

                if (countryCurrencyThresholds[country].Recipient === "Rania" && currency === "USDC") {
                    break;
                }
                else {
                    // Select a country
                    await page.locator('button[data-slot="popover-trigger"]').nth(0).click();
                    // Check for the country list to appear
                    const coutryOptions = await page.locator('div[data-slot="command-group"]').nth(0);
                    await expect(coutryOptions).toBeVisible();
                    // Select the country
                    await page.getByRole('option', { name: country }).click();
                    // Select the recipient
                    await page.locator('button[data-slot="popover-trigger"]').nth(1).click();
                    await page.getByRole('option', { name: countryCurrencyThresholds[country].Recipient }).click();
                }
                console.log(`Test Successful for ${currency} -- 🤑`);
            }
            console.log(`Test Successful for ${country} -- 🗿`);
        }
    }
    catch (err) {
        console.log(`Test failed for ${currentTestingCountry} and ${currentTestingCurrency} \n error : ${err} -- ❌🗑️🥀`)
    }
})