import { test } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/authentication/LoginPage"
import { Navbar } from "../pages/components/Navbar"

import { invalidMailLoginData, invalidPasswordLoginData, validLoginData } from "../dataproviders/LoginDataProvider"


test.describe("Login flow", async () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let navbar: Navbar

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navbar = new Navbar(page)

        await homePage.visit()
        await homePage.assertHomePage()
        await homePage.clkSignUp()
    })

    validLoginData.forEach(data => {
        test.only(`Valid login ${data.mail} and logout`, async ({ page }) => {
            await loginPage.login(data.mail, data.password)
            await loginPage.assertLogin()
            await navbar.clickOnTab("Logout")
            await loginPage.assertLogout()
        })
    })

    invalidMailLoginData.forEach(data => {
        test(`Invalid login ${data.password}`, async ({ page }) => {
            await loginPage.login(data.mail, data.password)
            await loginPage.assertErrorMsg()
        })
    })

    invalidPasswordLoginData.forEach(data => {
        test(`Invalid login ${data.mail}`, async ({ page }) => {
            await loginPage.login(data.mail, data.password)
            await loginPage.assertErrorMsg()
        })
    })

})