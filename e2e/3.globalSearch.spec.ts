import test, { expect } from "@playwright/test";
import { loginViaApi } from "../helpers/loginViaApi";
import credentials from "../constants/newRandomCreds";
import GlobalSearch from "../helpers/globalSearch";


test('Global Search with ctrl + K', async ({ page }) => {
    test.setTimeout(50000);
    // login via API 
    console.log("Loging in via API -- 🔐")
    const login = new loginViaApi(page)
    await login.executeLogin(credentials.email, credentials.password);
    console.log("Loging Successful -- ✅")
    console.log("Testing global search -- 🌎 🔍")

    
    for (const [sectionName, sectionRoute] of Object.entries(sectionNameRoutes)) {

        // search for the section name in ctrl K 
        const search = new GlobalSearch(page);
        await search.search(`${sectionName}`)

        // Check the link if it have sectionRoute in it 
        await page.waitForURL(new RegExp(`.*${sectionRoute}`), {
            waitUntil: 'load',
            timeout: 30000 
        });
        console.log(`Found ${sectionName} -- 🙌 \n`);

        // Wait for the title to be visible
        if(sectionName != 'Overview'){
            const title = await page.getByRole('heading', { name:`${sectionName}`, exact: false});
            await expect(title).toBeVisible({timeout: 10000});
        }
    }
    console.log("Global search successful -- ✅\n\n");
})

const sectionNameRoutes = {
    'Overview': '/wallet',
    'Deposit': '/wallet/deposit',
    'Withdraw': '/wallet/withdraw',
    'Bank Account': '/wallet/bank-accounts',
    'Crypto Wallet': '/wallet/crypto-wallets',
    'Transactions': '/transactions',
    'Checkouts': '/gate/checkouts',
    'Recipient': '/gps/recipients',
    'Send Money': '/gps/transactions/create',
    'Create Checkout': '/gate/checkouts/create',
    'Organization': '/organization',
    'Team Members': '/organization/team-members',
    'API Keys': '/organization/api-keys',
    'Webhooks': '/organization/webhooks',
    'Settings': '/settings'
}