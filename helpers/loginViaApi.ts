import { expect } from "@playwright/test";
import { Page } from "@playwright/test";
import getOtp from './getOtp';

export class loginViaApi {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // This fuction is a common for randomNewLogin and login with preFunded account (No need for another helper for preFunded account)
    async executeLogin(email: string, password: string) {    
        await this.page.goto('https://platform.dev.arpdigital.io/');

        // Enter the email
        await this.page.locator('#email').fill(email);

        // Enter password 
        await this.page.locator('#password').fill(password);

        // Click remember me
        await this.page.locator('#rememberMe').click();

        // Click on continue
        await this.page.getByRole("button", { name: 'Sign In' }).click();

        // Wait for OTP input to be visible
        const otpInput = this.page.locator('input[data-slot="input-otp"]');
        await expect(otpInput).toBeVisible({ timeout: 15000 });

        const otp = await getOtp(email, password);
        if (!otp) throw new Error('Failed to retrieve OTP');

        await otpInput.fill(otp);
        await this.page.waitForTimeout(1000)
        await this.page.goto('https://platform.dev.arpdigital.io/', {
            waitUntil: 'domcontentloaded'
        })
        
        // verify the login and check for the url to have /wallet
        await expect(this.page).toHaveURL(/.*wallet/, { timeout: 3000 });

        const logo = await this.page.getByAltText('ARP Digital');
        await expect(logo).toBeVisible({ timeout: 10000 });
    }
}