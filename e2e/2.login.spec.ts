import { test} from '@playwright/test';
import credentials from "../constants/newRandomCreds";
import executeLogin from '../helpers/loginViaApi';


test('Sign In ', async ({ page }) => {
     test.setTimeout(50000);
    // Login via API
    console.log("\n \t Testing Signing In -- 🔐");
    await executeLogin(page, credentials.email, credentials.password);
    console.log("\t Signing In Successful -- ✅ \n \n");
})

