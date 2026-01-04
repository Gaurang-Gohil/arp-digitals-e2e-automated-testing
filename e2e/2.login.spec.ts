import { test} from '@playwright/test';
import { loginViaApi } from '../helpers/loginViaApi';
import credentials from "../constants/newRandomCreds";


test('Sign In ', async ({ page }) => {
    // Login via API
    const login = new loginViaApi(page);
    console.log("\n \t Testing Signing In -- 🔐");
    await login.executeLogin(credentials.email, credentials.password);
    console.log("\t Signing In Successful -- ✅ \n \n");
})