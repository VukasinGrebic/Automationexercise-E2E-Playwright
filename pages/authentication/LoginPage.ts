import { expect, Locator, Page } from "@playwright/test"
import { Messages } from "../../enums/Messages"

export class LoginPage {
    readonly page: Page
    readonly loc_emailField: Locator
    readonly loc_passwordField: Locator
    readonly loc_loginBtn: Locator
    readonly loc_deleteAccount: Locator
    readonly loc_logoutBtn: Locator
    readonly loc_errorMsg: Locator
    readonly loc_logoutPage: Locator

    constructor(page: Page) {
        this.page = page
        this.loc_emailField = page.locator("//input[@data-qa='login-email']")
        this.loc_passwordField = page.locator("//input[@data-qa='login-password']")
        this.loc_loginBtn = page.locator("//button[@data-qa='login-button']")
        this.loc_deleteAccount = page.locator("text= Delete Account")
        this.loc_logoutBtn = page.locator("text= Logout")
        this.loc_errorMsg = page.locator("//p[contains(@style,'color: red')]")
        this.loc_logoutPage = page.locator("//div[contains(@class,'login-form')]//h2")
    }

    async login(email: string, password: string) {
        await this.loc_emailField.type(email)
        await this.loc_passwordField.type(password)
        await this.loc_loginBtn.click()
    }

    async logout() {
        await this.loc_logoutBtn.click()
    }

    async assertLogin() {
        await expect(this.loc_deleteAccount).toBeVisible()
    }

    async assertErrorMsg() {
        await expect(this.loc_errorMsg).toContainText(Messages.LOGIN_ERROR)
    }

    async assertLogout () {
        await expect(this.loc_logoutPage).toContainText(Messages.LOGOUT)
    }


}