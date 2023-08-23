import { test } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/authentication/LoginPage"
import { getRandomString } from "../utils/data-helpers"
import { Credentials } from "../pages/enums/Credentials"

test.describe.parallel("Login flow", async () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.assertHomePage()
        await homePage.clkSignUp()
    })




    test("Valid login", async ({ page }) => {
        const mail = Credentials.EMAIL
        const password = Credentials.PASSWORD
        await loginPage.login(mail, password)
        await loginPage.assertLogin()
    })

    test("Invalid username login", async ({ page }) => {
        const mail = await getRandomString() + "@mail.com"
        const password = Credentials.PASSWORD
        await loginPage.login(mail, password)
        await loginPage.assertErrorMsg()
    })

    test("Invalid password login", async ({ page }) => {
        const mail = Credentials.EMAIL
        const password = await getRandomString()
        await loginPage.login(mail, password)
        await loginPage.assertErrorMsg()
    })

})