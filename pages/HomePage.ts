import { Locator, Page } from "@playwright/test"

export class HomePage {
    readonly page: Page
    readonly registerBtn: Locator
    
    constructor (page: Page) {
        this.page = page
        this.registerBtn = page.locator("text=Register")
    }

    async visit () {
        await this.page.goto("https://parabank.parasoft.com/parabank/index.htm")
    }

    async clkRegister () {
        await this.registerBtn.click()
    }
}