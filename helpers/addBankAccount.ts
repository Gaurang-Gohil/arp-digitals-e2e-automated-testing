import { expect, Page } from "@playwright/test";
import { AccountDetails } from "../constants/bankDetails";


export default async function addBankAccount(page: Page, bankDetails: AccountDetails) {
    const title = page.getByRole('heading', { name: `Bank`, exact: false });
    await expect(title).toBeVisible({ timeout: 1000 });

    // click the add bank account button
    await page.getByRole('button', { name: 'Add Bank Account' }).click()
    const bankDialog = page.getByRole('dialog', { name: 'Add Bank Account' });
    await expect(bankDialog).toBeVisible({ timeout: 1000 });

    // Select currency
    await page.getByText('Select currency...').click()
    await page.getByPlaceholder('Search currency...').fill(bankDetails.currency);
    await page.getByRole('option', { name: `${bankDetails.currency}` }).click()

    // Select country
    await page.locator("#country").click();
    await page.getByPlaceholder('Search country...').fill(bankDetails.countryCode);

    // add beneficiary name
    await page.getByRole('textbox', { name: 'Beneficiary name must contain' }).fill(bankDetails.beneficiaryName)

    // add bank name
    await page.getByRole('textbox', { name: 'Bank name must contain' }).fill(bankDetails.bankName)
    // add bank account number 
    await page.getByRole('textbox', { name: 'Account number must be' }).fill(bankDetails.accountNumber.toString())
    // add swift/bic code
    await page.getByRole('textbox', { name: 'Routing code must be' }).fill(bankDetails.swift_bic)
    // add iban number
    await page.getByRole('textbox', { name: 'IBAN should start with 2' }).fill(bankDetails.iban)
    // save the details
    await page.getByRole('heading', { name: 'Add Bank Account' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
}