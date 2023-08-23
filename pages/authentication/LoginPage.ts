import { expect, Locator, Page } from "@playwright/test"
import { Messages } from "../enums/Messages"

export class LoginPage {
    readonly page: Page
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly loginBtn: Locator
    readonly deleteAccount: Locator
    readonly logoutBtn: Locator
    readonly errorMsg: Locator

    constructor(page: Page) {
        this.page = page
        this.emailField = page.locator("//input[@data-qa='login-email']")
        this.passwordField = page.locator("//input[@data-qa='login-password']")
        this.loginBtn = page.locator("//button[@data-qa='login-button']")
        this.deleteAccount = page.locator("text= Delete Account")
        this.logoutBtn = page.locator("text= Logout")
        this.errorMsg = page.locator("//p[contains(@style,'color: red')]")
    }

    async login(email: string, password: string) {
        await this.emailField.type(email)
        await this.passwordField.type(password)
        await this.loginBtn.click()
    }

    async assertLogin() {
        await expect(this.deleteAccount).toBeVisible()
    }

    async assertErrorMsg() {
        await expect(this.errorMsg).toContainText(Messages.LoginError)
    }


}