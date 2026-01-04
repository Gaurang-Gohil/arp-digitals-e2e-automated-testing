import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'node:path';
import getOtp from '../helpers/getOtp';
import { randomBytes } from 'node:crypto';

test('Sign Up', async ({ page }) => {
    console.log("Testing Sign up -- ⚙️")
    // Go to the login url 
    await page.goto('https://platform.dev.arpdigital.io/');
    await expect(page).toHaveTitle('ARP Digital - Client Dashboard');

    // Find the Create One link and click it.
    await page.getByText("Create One").click()
    await expect(page).toHaveURL(/.*register/);

    // Fill the first and last name 
    console.log("Entering Details -- ⌨️")
    await page.locator('#first').fill(getRandomName().firstName)
    await page.locator('#last').fill(getRandomName().lastName)

    // Fill the email address field 
    const credentials = await generateEmailAddress()
    await page.getByRole('textbox', { name: "Email" }).fill(credentials.email)

    // Register the mail to mail.tm
    await registerMail(credentials.email, credentials.password);

    // Fill the password
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill(credentials.password)
    await page.getByRole('textbox', { name: 'Confirm password' }).fill(credentials.password)

    // Click remember me
    await page.locator("#agree").click();

    // Click continue
    await page.getByText('continue').click();

    const otpInput = page.locator('input[data-slot="input-otp"]');
    await expect(otpInput).toBeVisible({ timeout: 15000 });
    // Enter otp
    console.log("Entering OTP -- 🔑")
    const otp = await getOtp(credentials.email, credentials.password);
        if (!otp) throw new Error('Failed to retrieve OTP');

        await otpInput.fill(otp);
        await page.waitForTimeout(1000)

    // Ensure we reach the Workspace/Org selection page
    await expect(page).toHaveURL(/.*org/, { timeout: 15000 });

    // Select Workspace Type
    console.log("Entering org name -- 🏢")
    await page.getByText('Individual', { exact: true }).click();

    // Fill Org Name
    await page.locator('#org').fill(getRandomName().orgName);

    // Create Workspace
    await page.getByRole('button', { name: 'Create workspace' }).click();

    // Final Assertion
    await expect(page).toHaveURL(/.*wallet/, { timeout: 20000 });
    console.log(`Org created successfull -- ✅ \n Sign Up successfull -- ✅\n \n`);
})


const getRandomName = () => {
    const getRandomNumber = () => {
        return Math.floor((Math.random() * 100) / 5);
    }
    const nameList = {
        first: [
            "Liam", "Olivia", "Noah", "Emma", "Oliver",
            "Elizabeth", "William", "Catherine", "James", "Eleanor",
            "Luna", "River", "Juniper", "Jasper", "Willow",
            "Kai", "Mia", "Leo", "Ivy", "Ezra"
        ],
        last: [
            "Smith", "Johnson", "Williams", "Brown", "Jones",
            "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
            "Hernandez", "Lopez", "Gonzales", "Wilson", "Anderson",
            "Thomas", "Taylor", "Moore", "Jackson", "Martin"
        ],
        orgName: [
            "Nexus Venture Group", "BlueSky Logistics", "Ironclad Security", "Omni Health Systems", "Vertex Data Solutions",
            "Evergreen Renewables", "Starlight Media", "Titan Manufacturing", "Prism Financial Services", "CloudNine Software",
            "Silverline Hospitality", "AeroTech Aerospace", "Beacon Consulting", "Nova Retail Group", "Global Edge Marketing",
            "Summit Real Estate", "Pioneer Agriculture", "Horizon Energy", "Atlas Infrastructure", "Unity Non-Profit"
        ]
    }

    const firstName = nameList.first[getRandomNumber()]
    const lastName = nameList.last[getRandomNumber()]
    const orgName = nameList.orgName[getRandomNumber()]

    return { firstName: firstName, lastName: lastName, orgName: orgName }
}


const generateEmailAddress = async () => {
    const domainList = await fetch("https://api.mail.tm/domains", {
        method: "GET",
    })
    const generateRandomString = (length: number): string => {
        return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
    };

    const data = await domainList.json();
    const availbaleDomain = data['hydra:member'][0].domain;

    const email = `testuser${generateRandomString(8)}@${availbaleDomain}`;
    const password = "SecurePassword1!";

    const fileContent = `export default {
    email: '${email}',
    password: '${password}'
        };`;

    fs.writeFileSync(
        path.join(__dirname, '../constants/newRandomCreds.ts'),
        fileContent 
    );

    return { email: email, password: password };
}

const registerMail = async (email: string, password: string) => {
    await fetch('https://api.mail.tm/accounts', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            address: email,
            password: password
        })
    })
}