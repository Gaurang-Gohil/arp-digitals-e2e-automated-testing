import { expect } from "@playwright/test";
import { Page } from "@playwright/test";


export default class GlobalSearch {
    readonly page:Page;

    constructor(page: Page) {
        this.page = page;
    }

    async search(sectionName: string) {

        await this.page.keyboard.press('Control+K');
        
        // Confirm if the command list is visible or not    
        const searchInput = await this.page.getByPlaceholder('Search or jump to...');
        const searchList = await this.page.getByRole('dialog', { name: 'Command Palette' })
        const commandList = this.page.getByRole('listbox', { name: 'Suggestions' });
        await expect(commandList).toBeVisible();
        
        // write name of the section
        await searchInput.fill(sectionName);
        await this.page.getByRole('option', { name: sectionName}).click();
        await expect(searchList).toBeHidden({ timeout: 10000 });
    }
}