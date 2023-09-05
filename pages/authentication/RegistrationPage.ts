import { expect, Locator, Page } from "@playwright/test"
import { Messages } from "../../enums/Messages"

export class RegistrationPage {
    readonly page: Page
    readonly loc_name: Locator
    readonly loc_signupBtn: Locator
    readonly loc_email: Locator
    readonly loc_gender: Locator
    readonly loc_passwordInput: Locator
    readonly loc_daySelect: Locator
    readonly loc_monthSelect: Locator
    readonly loc_yearSelect: Locator
    readonly loc_firstloc_nameInput: Locator
    readonly loc_lastloc_nameInput: Locator
    readonly loc_addressInput: Locator
    readonly loc_countrySelect: Locator
    readonly loc_stateInput: Locator
    readonly loc_cityInput: Locator
    readonly loc_zipCodeInput: Locator
    readonly loc_phoneInput: Locator
    readonly loc_ssnInput: Locator
    readonly loc_userloc_nameInput: Locator
    readonly loc_registerBtn: Locator
    readonly loc_continueBtn: Locator
    readonly loc_deleteBtn: Locator
    readonly loc_successMsg: Locator
    readonly loc_errorMsg: Locator

    constructor(page: Page) {
        this.page = page
        this.loc_name = page.locator("//input[@data-qa='signup-name']")
        this.loc_email = page.locator("//input[@data-qa='signup-email']")
        this.loc_signupBtn = page.locator("//button[@data-qa='signup-button']")
        this.loc_gender = page.locator("#id_gender1")
        this.loc_passwordInput = page.locator("#password")
        this.loc_daySelect = page.locator("#days")
        this.loc_monthSelect = page.locator("#months")
        this.loc_yearSelect = page.locator("#years")
        this.loc_firstloc_nameInput = page.locator("#first_name")
        this.loc_lastloc_nameInput = page.locator("#last_name")
        this.loc_addressInput = page.locator("#address1")
        this.loc_countrySelect = page.locator("#country")
        this.loc_stateInput = page.locator("#state")
        this.loc_cityInput = page.locator("#city")
        this.loc_zipCodeInput = page.locator("#zipcode")
        this.loc_phoneInput = page.locator("#mobile_number")
        this.loc_registerBtn = page.locator("//button[@data-qa='create-account']")
        this.loc_continueBtn = page.locator("//a[contains(@data-qa, 'continue-button')]")
        this.loc_successMsg = page.locator("//b")
        this.loc_errorMsg = page.locator("//div[contains(@class, 'signup-form')]//p")
    }

    async register(name: string, email: string, password: string, day: string, month: string, year: string, firstname: string, lastname: string, address: string, country: string, state: string, city: string, zip: string, phone: string) {
        await this.loc_name.type(name)
        await this.loc_email.type(email)
        await this.loc_signupBtn.click()
        await this.loc_gender.click()
        await this.loc_passwordInput.type(password)
        await this.loc_daySelect.selectOption(day)
        await this.loc_monthSelect.selectOption(month)
        await this.loc_yearSelect.selectOption(year)
        await this.loc_firstloc_nameInput.type(firstname)
        await this.loc_lastloc_nameInput.type(lastname)
        await this.loc_addressInput.type(address)
        await this.loc_countrySelect.selectOption(country)
        await this.loc_stateInput.type(state)
        await this.loc_cityInput.type(city)
        await this.loc_zipCodeInput.type(zip)
        await this.loc_phoneInput.type(phone)
        await this.loc_registerBtn.click()
    }

    async registerInvalid(name: string, email: string) {
        await this.loc_name.type(name)
        await this.loc_email.type(email)
        await this.loc_signupBtn.click()
    }

    async continue() {
        await this.loc_continueBtn.click()
    }

    async assertSucessMsg() {
        await expect(this.loc_successMsg).toContainText(Messages.REGISTRATION_SUCCESS)
    }

    async assertErrorMsg() {
        await expect(this.loc_errorMsg).toContainText(Messages.REGISTRATION_ERROR)
    }

    async assertSucessDeleteMsg() {
        await expect(this.loc_successMsg).toContainText(Messages.REGISTRATION_DELETE_SUCCESS)
    }
}