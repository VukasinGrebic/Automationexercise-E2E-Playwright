import { test } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { RegistrationPage } from "../pages/authentication/RegistrationPage"
import { getRandomString } from "../utils/data-helpers"


test.describe("Registration Flow", async () => {
    let homePage: HomePage
    let registrationPage: RegistrationPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        registrationPage = new RegistrationPage(page)

        await homePage.visit()
        await homePage.clkRegister()
    })

    test.only("Valid registration", async ({ page }) => {
        const firstName = await getRandomString()
        const lastName = await getRandomString()
        const adress = await getRandomString()
        const city = await getRandomString()
        const state = await getRandomString()
        const zipCode = await getRandomString()
        const phone = await getRandomString()
        const ssn = await getRandomString()
        const username = await getRandomString()
        const password = await getRandomString()
        await registrationPage.register(firstName, lastName, adress, city, state, zipCode, phone, ssn, username, password, password)
        await registrationPage.assertRegistration(username)
        await registrationPage.assertSucessMsg()

    })

    test("Invalid firstname registration", async ({ page }) => {
        let firstName = await getRandomString()
        let lastName = await getRandomString()
        let adress = await getRandomString()
        let city = await getRandomString()
        let state = await getRandomString()
        let zipCode = await getRandomString()
        let phone = await getRandomString()
        let ssn = await getRandomString()
        let username = await getRandomString()
        let password = await getRandomString()
        let passwordRe = await getRandomString()
        await registrationPage.register(firstName, lastName, adress, city, state, zipCode, phone, ssn, username, password, password)
    })
})