import { expect, Locator, Page } from "@playwright/test"

export class RegistrationPage {
    readonly page: Page
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly addressInput: Locator
    readonly cityInput: Locator
    readonly stateInput: Locator
    readonly zipCodeInput: Locator
    readonly phoneInput: Locator
    readonly ssnInput: Locator
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly passwordConfirmInput: Locator
    readonly registerBtn: Locator
    readonly successMsg: Locator
    readonly welcomeMsg: Locator

    constructor(page: Page) {
        this.page = page
        this.firstNameInput = page.locator("//input[@name='customer.firstName']")
        this.lastNameInput = page.locator("//input[@name='customer.lastName']")
        this.addressInput = page.locator("//input[@name='customer.address.street']")
        this.cityInput = page.locator("//input[@name='customer.address.city']")
        this.stateInput = page.locator("//input[@name='customer.address.state']")
        this.zipCodeInput = page.locator("//input[@name='customer.address.zipCode']")
        this.phoneInput = page.locator("//input[@name='customer.phoneNumber']")
        this.ssnInput = page.locator("//input[@name='customer.ssn']")
        this.usernameInput = page.locator("//input[@name='customer.username']")
        this.passwordInput = page.locator("//input[@name='customer.password']")
        this.passwordConfirmInput = page.locator("//input[@name='repeatedPassword']")
        this.registerBtn = page.locator("//input[contains(@value,'Register')]")
        this.successMsg = page.locator("//div[@id='rightPanel']/p")
        this.welcomeMsg = page.locator("//h1")
    }

    async register(firstName: string, lastName: string, address: string, city: string, state: string, zipCode: string, phone: string, ssn: string, username: string, password: string, passwordRe: string) {
        await this.firstNameInput.type(firstName)
        await this.lastNameInput.type(lastName)
        await this.addressInput.type(address)
        await this.cityInput.type(city)
        await this.stateInput.type(state)
        await this.zipCodeInput.type(zipCode)
        await this.phoneInput.type(phone)
        await this.ssnInput.type(ssn)
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.passwordConfirmInput.type(passwordRe)
        await this.registerBtn.click()
    }

    async assertRegistration(username: string) {
        await expect(this.welcomeMsg).toContainText("Welcome " + username)
    }

    async assertSucessMsg() {
        await expect(this.successMsg).toContainText("Your account was created successfully. You are now logged in.")
    }


}