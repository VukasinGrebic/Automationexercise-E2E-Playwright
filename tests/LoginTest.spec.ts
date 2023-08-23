import { test } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/authentication/LoginPage"
import { getRandomString } from "../utils/data-helpers"

test.describe.only("Login flow", async () => {
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
        const mail = "randomtest@mail.com"
        const password = "sifra1"
        await loginPage.login(mail, password)
        await loginPage.assertLogin()
    })

    test("Invalid username login", async ({ page }) => {
        const mail = await getRandomString() + "@mail.com"
        const password = "sifra1"
        await loginPage.login(mail, password)
        await loginPage.assertErrorMsg()
    })

    test("Invalid password login", async ({ page }) => {
        const mail = "randomtest@mail.com"
        const password = await getRandomString()
        await loginPage.login(mail, password)
        await loginPage.assertErrorMsg()
    })

})