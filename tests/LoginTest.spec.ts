import { test } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/authentication/LoginPage"
import { getRandomString } from "../utils/data-helpers"

import { invalidMailLoginData, invalidPasswordLoginData, validLoginData } from "../dataproviders/LoginDataProvider"


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

    validLoginData.forEach(data => {
        test(`Valid login ${data.mail}`, async ({ page }) => {
            await loginPage.login(data.mail, data.password)
            await loginPage.assertLogin()
        })
    })

    invalidMailLoginData.forEach(data => {
        test(`Invalid login ${data.password}`, async ({ page }) => {
            await loginPage.login(await getRandomString() + "@mail.com", data.password)
            await loginPage.assertErrorMsg()
        })
    })

    invalidPasswordLoginData.forEach(data => {
        test(`Invalid login ${data.mail}`, async ({ page }) => {
            await loginPage.login(data.mail, await getRandomString())
            await loginPage.assertErrorMsg()
        })
    })

})