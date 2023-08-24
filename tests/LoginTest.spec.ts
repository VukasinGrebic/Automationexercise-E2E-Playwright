import { test } from "../dataproviders/LoginDataProvider"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/authentication/LoginPage"
import { getRandomString } from "../utils/data-helpers"

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




    test("Valid login", async ({ page, email, password}) => {
        await loginPage.login(email, password)
        await loginPage.assertLogin()
    })

    test("Invalid username login", async ({ page, password }) => {
        const mail = await getRandomString() + "@mail.com"
        await loginPage.login(mail, password)
        await loginPage.assertErrorMsg()
    })

    test("Invalid password login", async ({ page, email }) => {
        const password = await getRandomString()
        await loginPage.login(email, password)
        await loginPage.assertErrorMsg()
    })

})