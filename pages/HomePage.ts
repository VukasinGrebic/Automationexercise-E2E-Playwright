import { expect, Locator, Page } from "@playwright/test"


export class HomePage {
    readonly page: Page
    readonly signupBtn: Locator
    readonly category: Locator
    
    constructor (page: Page) {
        this.page = page
        this.signupBtn = page.locator("text=Signup / Login")
        this.category = page.locator("//h2[contains(text(),'Category')]")
    }

    async visit () {
        await this.page.goto("https://automationexercise.com/")
    }

    async clkSignUp () {
        await this.signupBtn.click()
    }
    
    async assertHomePage () {
        await expect(this.category).toBeVisible()
    }
}