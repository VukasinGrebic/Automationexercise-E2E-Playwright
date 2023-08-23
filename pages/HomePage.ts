import { Locator, Page } from "@playwright/test"

export class HomePage {
    readonly page: Page
    readonly signupBtn: Locator
    
    constructor (page: Page) {
        this.page = page
        this.signupBtn = page.locator("text=Signup / Login")
    }

    async visit () {
        await this.page.goto("https://automationexercise.com/")
    }

    async clkSignUp () {
        await this.signupBtn.click()
    }
}