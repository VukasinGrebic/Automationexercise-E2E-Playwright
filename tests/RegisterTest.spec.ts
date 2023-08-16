import { test } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { RegistrationPage } from "../pages/authentication/RegistrationPage"
import { getRandomString } from "../utils/data-helpers"


test.describe.only("Registration Flow", async () => {
    let homePage: HomePage
    let registrationPage: RegistrationPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        registrationPage = new RegistrationPage(page)

        await homePage.visit()
        await homePage.clkRegister()
    })

    test("Valid registration", async ({ page }) => {
        const firstName = await getRandomString()
        const lastName = await getRandomString()
        const adress = await getRandomString()
        const city = await getRandomString()
        const state = await getRandomString()
        const zipCode = await getRandomString()
        const ssn = await getRandomString()
        const username = await getRandomString()
        const password = await getRandomString()
        await registrationPage.register(firstName, lastName, adress, city, state, zipCode, ssn, username, password, password)
        await registrationPage.assertRegistration(username)
        await registrationPage.assertSucessMsg()

    })

    test("Invalid firstname registration", async ({ page }) => {
        const firstName = ""
        const lastName = await getRandomString()
        const adress = await getRandomString()
        const city = await getRandomString()
        const state = await getRandomString()
        const zipCode = await getRandomString()
        const ssn = await getRandomString()
        const username = await getRandomString()
        const password = await getRandomString()
        await registrationPage.register(firstName, lastName, adress, city, state, zipCode, ssn, username, password, password)
        await registrationPage.assertErrorMsg("First name is required")
    })

    test("Invalid lastname registration", async ({ page }) => {
        const firstName = await getRandomString()
        const lastName = ""
        const adress = await getRandomString()
        const city = await getRandomString()
        const state = await getRandomString()
        const zipCode = await getRandomString()
        const ssn = await getRandomString()
        const username = await getRandomString()
        const password = await getRandomString()
        await registrationPage.register(firstName, lastName, adress, city, state, zipCode, ssn, username, password, password)
        await registrationPage.assertErrorMsg("Last name is required")
    })

    test("Invalid address registration", async ({ page }) => {
        const firstName = await getRandomString()
        const lastName = await getRandomString()
        const adress = ""
        const city = await getRandomString()
        const state = await getRandomString()
        const zipCode = await getRandomString()
        const ssn = await getRandomString()
        const username = await getRandomString()
        const password = await getRandomString()

        await registrationPage.register(firstName, lastName, adress, city, state, zipCode,  ssn, username, password, password)
        await registrationPage.assertErrorMsg("Address is required")
    })

    test("Invalid city registration", async ({ page }) => {
        const firstName = await getRandomString()
        const lastName = await getRandomString()
        const adress = await getRandomString()
        const city = ""
        const state = await getRandomString()
        const zipCode = await getRandomString()
        const ssn = await getRandomString()
        const username = await getRandomString()
        const password = await getRandomString()
       
        await registrationPage.register(firstName, lastName, adress, city, state, zipCode, ssn, username, password, password)
        await registrationPage.assertErrorMsg("City is required")
    })

    test("Invalid state registration", async ({ page }) => {
        const firstName = await getRandomString()
        const lastName = await getRandomString()
        const adress = await getRandomString()
        const city = await getRandomString()
        const state = ""
        const zipCode = await getRandomString()
        const ssn = await getRandomString()
        const username = await getRandomString()
        const password = await getRandomString()
        await registrationPage.register(firstName, lastName, adress, city, state, zipCode, ssn, username, password, password)
        await registrationPage.assertErrorMsg("State is required")
    })

    test("Invalid zip code registration", async ({ page }) => {
        const firstName = await getRandomString()
        const lastName = await getRandomString()
        const adress = await getRandomString()
        const city = await getRandomString()
        const state = await getRandomString()
        const zipCode = ""
        const ssn = await getRandomString()
        const username = await getRandomString()
        const password = await getRandomString()
        await registrationPage.register(firstName, lastName, adress, city, state, zipCode, ssn, username, password, password)
        await registrationPage.assertErrorMsg("Zip Code is required")
    })

    test("Invalid Social Security Number registration", async ({ page }) => {
        const firstName = await getRandomString()
        const lastName = await getRandomString()
        const adress = await getRandomString()
        const city = await getRandomString()
        const state = await getRandomString()
        const zipCode = await getRandomString()
        const ssn = ""
        const username = await getRandomString()
        const password = await getRandomString()
        await registrationPage.register(firstName, lastName, adress, city, state, zipCode, ssn, username, password, password)
        await registrationPage.assertErrorMsg("Social Security Number is required")
    })

    test("Invalid Username registration", async ({ page }) => {
        const firstName = await getRandomString()
        const lastName = await getRandomString()
        const adress = await getRandomString()
        const city = await getRandomString()
        const state = await getRandomString()
        const zipCode = await getRandomString()

        const ssn = await getRandomString()
        const username = ""
        const password = await getRandomString()
        await registrationPage.register(firstName, lastName, adress, city, state, zipCode, ssn, username, password, password)
        await registrationPage.assertErrorMsg("Username is required")
    })

    test("Invalid Password registration", async ({ page }) => {
        const firstName = await getRandomString()
        const lastName = await getRandomString()
        const adress = await getRandomString()
        const city = await getRandomString()
        const state = await getRandomString()
        const zipCode = await getRandomString()
        const ssn = await getRandomString()
        const username = await getRandomString()
        const password = ""
        const passwordRe = await getRandomString()
        await registrationPage.register(firstName, lastName, adress, city, state, zipCode, ssn, username, password, passwordRe)
        await registrationPage.assertErrorMsg("Password is required")
    })

    test("Invalid Password confirmation registration", async ({ page }) => {
        const firstName = await getRandomString()
        const lastName = await getRandomString()
        const adress = await getRandomString()
        const city = await getRandomString()
        const state = await getRandomString()
        const zipCode = await getRandomString()
        const ssn = await getRandomString()
        const username = await getRandomString()
        const password = await getRandomString()
        const passwordRe = ""
        await registrationPage.register(firstName, lastName, adress, city, state, zipCode, ssn, username, password, passwordRe)
        await registrationPage.assertErrorMsg("Password confirmation is required.")
    })
})