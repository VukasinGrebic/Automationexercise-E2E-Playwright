import { expect, Locator, Page } from "@playwright/test"

export class LoginPage {
    readonly page: Page
    readonly usernameField: Locator
    readonly passwordField: Locator
    readonly loginBtn: Locator
    readonly balance: Locator
    readonly accountOverview: Locator
    readonly errorMsg: Locator

    constructor(page: Page) {
        this.page = page
        this.usernameField = page.locator("//input[contains(@name,'username')]")
        this.passwordField = page.locator("//input[contains(@name,'password')]")
        this.loginBtn = page.locator("//div[contains(@class,'login')]/input[contains(@type, 'submit')]")
        this.balance = page.locator("text=Balance")
        this.accountOverview = page.locator("//h1")
        this.errorMsg = page.locator("//p[contains(@class, 'error')]")
    }

    async login(username: string, password: string) {
        await this.usernameField.type(username)
        await this.passwordField.type(password)
        await this.loginBtn.click()
    }

    async assertLogin() {
        await expect(this.balance).toBeVisible
    }

    async assertMessage() {
        await expect(this.accountOverview).toContainText("Accounts Overview")
    }

    async assertErrorMsg() {
        await expect(this.errorMsg).toContainText("Please enter a username and password.")
    }


}