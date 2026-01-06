import { expect } from "@playwright/test";
import { Page } from "@playwright/test";
import getOtp from '../utils/getOtp';


    // This fuction is a common for randomNewLogin and login with preFunded account (No need for another helper for preFunded account)
    export default async function executeLogin(page:Page, email: string, password: string) {    
        await page.goto('https://platform.dev.arpdigital.io/');

        // Enter the email
        await page.locator('#email').fill(email);

        // Enter password 
        await page.locator('#password').fill(password);

        // Click remember me
        await page.locator('#rememberMe').click();

        // Click on continue
        await page.getByRole("button", { name: 'Sign In' }).click();

        // Wait for OTP input to be visible
        const otpInput = page.locator('input[data-slot="input-otp"]');
        await expect(otpInput).toBeVisible({ timeout: 15000 });

        const otp = await getOtp(email, password);
        if (!otp) throw new Error('Failed to retrieve OTP');

        await otpInput.fill(otp);
        await page.waitForTimeout(1000)
        await page.goto('https://platform.dev.arpdigital.io/', {
            waitUntil: 'domcontentloaded'
        })
        
        // verify the login and check for the url to have /wallet
        await expect(page).toHaveURL(/.*wallet/, { timeout: 10000 });

        const logo = await page.getByAltText('ARP Digital');
        await expect(logo).toBeVisible({ timeout: 10000 });
    }
