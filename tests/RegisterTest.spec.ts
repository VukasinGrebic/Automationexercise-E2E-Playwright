import { test } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { RegistrationPage } from "../pages/authentication/RegistrationPage"
import { getRandomNumber, getRandomString } from "../utils/data-helpers"
import { Credentials } from "../enums/Credentials"


test.describe.parallel("Registration Flow", async () => {
    let homePage: HomePage
    let registrationPage: RegistrationPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        registrationPage = new RegistrationPage(page)

        await homePage.visit()
        await homePage.assertHomePage()
        await homePage.clkSignUp()
    })

    test("Valid registration", async ({ page }) => {
        const name = await getRandomString()
        const email = await getRandomString() + "@mail.com"
        const password = await getRandomString()
        const day = await getRandomNumber(1, 30)
        const dayString = day.toString();
        const month = await getRandomNumber(1, 12)
        const monthString = month.toString();
        const year = await getRandomNumber(1950, 2002)
        const yearString = year.toString();
        const firstName = await getRandomString()
        const lastName = await getRandomString()
        const address = await getRandomString()
        const country = "Canada"
        const state = await getRandomString()
        const city = await getRandomString()
        const zip = await getRandomString()
        const phone = await getRandomString()
        await registrationPage.register(name, email, password, dayString, monthString, yearString, firstName, lastName, address, country, state, city,zip, phone)
        await registrationPage.assertSucessMsg()

    })

    test("Registration with existing mail", async ({ page }) => {
        const name = await getRandomString()
        const email = Credentials.EMAIL
        await registrationPage.registerInvalid(name, email)
        await registrationPage.assertErrorMsg()
    })

    test("Deleting account", async ({ page }) => {
        const name = await getRandomString()
        const email = await getRandomString() + "@mail.com"
        const password = await getRandomString()
        const day = await getRandomNumber(1, 30)
        const dayString = day.toString();
        const month = await getRandomNumber(1, 12)
        const monthString = month.toString();
        const year = await getRandomNumber(1950, 2002)
        const yearString = year.toString();
        const firstName = await getRandomString()
        const lastName = await getRandomString()
        const address = await getRandomString()
        const country = "Canada"
        const state = await getRandomString()
        const city = await getRandomString()
        const zip = await getRandomString()
        const phone = await getRandomString()
        await registrationPage.register(name, email, password, dayString, monthString, yearString, firstName, lastName, address, country, state, city,zip, phone)
        await registrationPage.assertSucessMsg()
        await registrationPage.deleteAccount()
        await registrationPage.assertSucessDeleteMsg()

    })

})