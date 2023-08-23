import { test } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/authentication/LoginPage"

test.describe.parallel("Login flow", async () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()

    })

   


    test("Valid login", async ({ page }) => {
        let username = "randomtest@mail.com";
        let password = "sifra1"
        await loginPage.login(username, password)
        await loginPage.assertLogin()
        await loginPage.assertMessage()
    })

    test("Invalid username login", async ({ page }) => {
        let username = ""
        let password = "sifra1"
        await loginPage.login(username, password)
        await loginPage.assertErrorMsg()
    })

    test("Invalid password login", async ({ page }) => {
        let username = "username1"
        let password = ""
        await loginPage.login(username, password)
        await loginPage.assertErrorMsg()
    })

})