import { test} from '@playwright/test';
import { loginViaApi } from '../helpers/loginViaApi';
import credentials from "../constants/newRandomCreds";


test('Sign In ', async ({ page }) => {
    // Login via API
    const login = new loginViaApi(page);
    await login.executeLogin(credentials.email, credentials.password);

})