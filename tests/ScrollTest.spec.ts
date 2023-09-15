import { test } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/authentication/LoginPage"
import { Credentials } from "../enums/Credentials"
import { MouseHover } from "../utils/mouse-hover"
import { ScrollPage } from "../pages/authentication/Scrollpage"

test.describe.parallel("Products flow", async () =>{
    let homePage: HomePage
    let loginPage: LoginPage
    let mouseHover: MouseHover
    let scrollPage: ScrollPage

    test.beforeEach(async ({ page }) => { 
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        mouseHover = new MouseHover(page)
        scrollPage = new ScrollPage(page)
   
        await homePage.visit()
        await homePage.assertHomePage()
        await homePage.clkSignUp()
        await loginPage.login(Credentials.EMAIL, Credentials.PASSWORD)
        await loginPage.assertLogin()
    })

    test("User is scrolling up using button", async ({page}) => {
        await mouseHover.scrollDown()
        await scrollPage.assertSubscription()
        await scrollPage.scrollUp()
        await scrollPage.assertTitle()
    })

    test("User is scrolling up using mouse", async ({page}) => {
        await mouseHover.scrollDown()
        await scrollPage.assertSubscription()
        await mouseHover.scrollUp()
        await scrollPage.assertTitle()
    })

})