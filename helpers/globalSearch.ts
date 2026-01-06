import { expect } from "@playwright/test";
import { Page } from "@playwright/test";

    export default async function searchPage(page:Page, sectionName: string) {

        await page.keyboard.press('Control+K');
        
        // Confirm if the command list is visible or not    
        const searchInput = page.getByPlaceholder('Search or jump to...');
        const searchList = page.getByRole('dialog', { name: 'Command Palette' })
        const commandList = page.getByRole('listbox', { name: 'Suggestions' });
        await expect(commandList).toBeVisible();
        
        // write name of the section
        await searchInput.fill(sectionName);
        await page.getByRole('option', { name: sectionName}).click();
        await expect(searchList).toBeHidden({ timeout: 1000 });
    }
