import { expect, Locator, Page } from "@playwright/test"
import { Messages } from "../../enums/Messages"

export class RegistrationPage {
    readonly page: Page
    readonly name: Locator
    readonly signupBtn: Locator
    readonly email: Locator
    readonly gender: Locator
    readonly passwordInput: Locator
    readonly daySelect: Locator
    readonly monthSelect: Locator
    readonly yearSelect: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly addressInput: Locator
    readonly countrySelect: Locator
    readonly stateInput: Locator
    readonly cityInput: Locator
    readonly zipCodeInput: Locator
    readonly phoneInput: Locator
    readonly ssnInput: Locator
    readonly usernameInput: Locator
    readonly registerBtn: Locator
    readonly continueBtn: Locator
    readonly deleteBtn: Locator
    readonly successMsg: Locator
    readonly errorMsg: Locator

    constructor(page: Page) {
        this.page = page
        this.name = page.locator("//input[@data-qa='signup-name']")
        this.email = page.locator("//input[@data-qa='signup-email']")
        this.signupBtn = page.locator("//button[@data-qa='signup-button']")
        this.gender = page.locator("#id_gender1")
        this.passwordInput = page.locator("#password")
        this.daySelect = page.locator("#days")
        this.monthSelect = page.locator("#months")
        this.yearSelect = page.locator("#years")
        this.firstNameInput = page.locator("#first_name")
        this.lastNameInput = page.locator("#last_name")
        this.addressInput = page.locator("#address1")
        this.countrySelect = page.locator("#country")
        this.stateInput = page.locator("#state")
        this.cityInput = page.locator("#city")
        this.zipCodeInput = page.locator("#zipcode")
        this.phoneInput = page.locator("#mobile_number")
        this.registerBtn = page.locator("//button[@data-qa='create-account']")
        this.continueBtn = page.locator("//a[contains(@data-qa, 'continue-button')]")
        this.deleteBtn = page.locator("text= Delete Account")
        this.successMsg = page.locator("//b")
        this.errorMsg = page.locator("//div[contains(@class, 'signup-form')]//p")
    }

    async register(name: string, email: string, password: string, day: string, month: string, year: string, firstname: string, lastname: string, address: string, country: string, state: string, city: string, zip: string, phone: string) {
        await this.name.type(name)
        await this.email.type(email)
        await this.signupBtn.click()
        await this.gender.click()
        await this.passwordInput.type(password)
        await this.daySelect.selectOption(day)
        await this.monthSelect.selectOption(month)
        await this.yearSelect.selectOption(year)
        await this.firstNameInput.type(firstname)
        await this.lastNameInput.type(lastname)
        await this.addressInput.type(address)
        await this.countrySelect.selectOption(country)
        await this.stateInput.type(state)
        await this.cityInput.type(city)
        await this.zipCodeInput.type(zip)
        await this.phoneInput.type(phone)
        await this.registerBtn.click()
    }

    async registerInvalid(name: string, email: string) {
        await this.name.type(name)
        await this.email.type(email)
        await this.signupBtn.click()
    }

    async deleteAccount() {
        await this.continueBtn.click()
        await this.deleteBtn.click()
    }


    async assertSucessMsg() {
        await expect(this.successMsg).toContainText(Messages.REGISTRATION_SUCCESS)
    }

    async assertErrorMsg() {
        await expect(this.errorMsg).toContainText(Messages.REGISTRATION_ERROR)
    }

    async assertSucessDeleteMsg() {
        await expect(this.successMsg).toContainText(Messages.REGISTRATION_DELETE_SUCCESS)
    }
}