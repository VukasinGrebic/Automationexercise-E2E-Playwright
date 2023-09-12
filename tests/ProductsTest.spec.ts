import { test } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/authentication/LoginPage"
import { ProductPage } from "../pages/products/ProductsPage"
import { RegistrationPage } from "../pages/authentication/RegistrationPage"
import { Navbar } from "../pages/components/Navbar"
import { Credentials } from "../enums/Credentials"
import { ActionItems } from "../enums/ActionItems"
import { Messages } from "../enums/Messages"
import { getRandomNumber, getRandomString } from "../utils/data-helpers"
import { validLoginData } from "../dataproviders/LoginDataProvider"
import { MouseHover } from "../utils/mouse-hover"

test.describe.parallel("Products flow", async () =>{
    let homePage: HomePage
    let productPage: ProductPage
    let loginPage: LoginPage
    let navbar: Navbar
    let mouseHover: MouseHover


    test.beforeEach(async ({ page }) => { 
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        navbar = new Navbar(page)
        mouseHover = new MouseHover(page)
   
        await homePage.visit()
        await homePage.assertHomePage()
        await homePage.clkSignUp()
        await loginPage.login(Credentials.EMAIL, Credentials.PASSWORD)
        await loginPage.assertLogin()
        await navbar.clickOnTab("Products")
    })

    test("User is visiting products page", async ({page}) => {
        await productPage.assertProductsPage()
        await productPage.viewProduct()
        await productPage.assertProductInfo()
    })

    test("User is searching products page", async ({page}) => {
        await productPage.search(ActionItems.BLUE_TOP)
        await productPage.assertSearchProducts(ActionItems.BLUE_TOP)
    })

    test("User is adding products to cart", async ({page}) => {
        await productPage.addToCart()
        await productPage.assertCart(ActionItems.PRICE_ONE, ActionItems.PRICE_TWO, ActionItems.QUANTITY)
        await productPage.removeFromCartMultiple()
        await productPage.assertEmptyCart()
    })

    test("User is adding multiple same product to cart", async ({page}) => {
        await productPage.viewProduct()
        await productPage.assertProductInfo()
        await productPage.addToCartMultiple()
        await productPage.assertMultipleCart(ActionItems.QUANTITY_MULTIPLE)
        await productPage.removeFromCart()
        await productPage.assertEmptyCart()
    })

    test("User is checking category",async ( {page} ) => {
        await productPage.assertCategoryWoman()
        await productPage.expandCategoryWoman()
        await productPage.clickDress()
        await productPage.assertCategory(Messages.DRESS_CATEGORY)
        await productPage.expandCategoryKids()
        await productPage.clickTopsAndShirts()
        await productPage.assertCategory(Messages.TOPS_SHIRTS_CATEGORY)
    })

    test("User is checking brand",async ( {page} ) => {
        await productPage.assertBrands()
        await productPage.clickPolo()
        await productPage.assertBrand(Messages.POLO)
        await productPage.viewProduct()
        await productPage.assertProductInfo()
        await productPage.clickBiba()
        await productPage.assertBrand(Messages.BIBA)
        await productPage.viewProduct()
        await productPage.assertProductInfo()
    })

    test("User is adding review",async ( {page} ) => {
        let name = await getRandomString()
        const email = await getRandomString() + "@mail.com"
        await productPage.viewProduct()
        await productPage.assertReview()
        await productPage.enterReview(name, email, name)
        await productPage.assertReview()
        await productPage.assertReviewMsg(Messages.REVIEW_MSG)
        
    })

    test.only("User is adding products to cart from recommended items", async ({page}) => {
        await navbar.clickOnTab("Home")
        await mouseHover.scrollDown()
        await productPage.assertRecommendedItems()
        await productPage.addToCartSingleRec()
        await productPage.assertCartSingleRec(ActionItems.PRICE_REC, ActionItems.QUANTITY)
        await productPage.removeFromCart()
    })

})

    test.describe.parallel("Products order flow", async () =>{
        let registrationPage: RegistrationPage
        let homePage: HomePage
        let productPage: ProductPage
        let loginPage: LoginPage
        let navbar: Navbar

        test.beforeEach(async ({ page }) => { 
            homePage = new HomePage(page)
            loginPage = new LoginPage(page)
            productPage = new ProductPage(page)
            navbar = new Navbar(page)
            registrationPage = new RegistrationPage(page)
    
            await homePage.visit()
            await homePage.assertHomePage()
        })

    test("User is ordering and registrating while checking out", async ({page}) => {
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
        await productPage.addToCart()
        await productPage.assertCart(ActionItems.PRICE_ONE, ActionItems.PRICE_TWO, ActionItems.QUANTITY)
        await productPage.proceedToCheckout()
        await productPage.proceedToRegisterLogin()
        await registrationPage.register(name, email, password, dayString, monthString, yearString, firstName, lastName, address, country, state, city,zip, phone)
        await registrationPage.assertSucessMsg()
        await registrationPage.continue()
        await navbar.clickOnTab("Cart")
        await productPage.proceedToCheckout()
        await productPage.assertCart(ActionItems.PRICE_ONE, ActionItems.PRICE_TWO, ActionItems.QUANTITY)
        await productPage.assertAddress()
        await productPage.enterComment(firstName)
        await productPage.placeOrder()
        await productPage.paymentInfo(name, yearString, dayString, monthString, yearString)
        await productPage.assertOrder(Messages.ORDER_SUCCESS)
    })

    test("User is ordering and registrating before checking out", async ({page}) => {
        const name = await getRandomString()
        const email = await getRandomString() + "@mail.com"
        const password = await getRandomString()
        const day = await getRandomNumber(1, 30)
        const dayString = day.toString()
        const month = await getRandomNumber(1, 12)
        const monthString = month.toString()
        const year = await getRandomNumber(1950, 2002)
        const yearString = year.toString()
        const firstName = await getRandomString()
        const lastName = await getRandomString()
        const address = await getRandomString()
        const country = "Canada"
        const state = await getRandomString()
        const city = await getRandomString()
        const zip = await getRandomString()
        const phone = await getRandomString()
        await homePage.clkSignUp()
        await registrationPage.register(name, email, password, dayString, monthString, yearString, firstName, lastName, address, country, state, city,zip, phone)
        await registrationPage.assertSucessMsg()
        await registrationPage.continue()
        await productPage.addToCart()
        await productPage.assertCart(ActionItems.PRICE_ONE, ActionItems.PRICE_TWO, ActionItems.QUANTITY)
        await productPage.proceedToCheckout()
        await productPage.assertCart(ActionItems.PRICE_ONE, ActionItems.PRICE_TWO, ActionItems.QUANTITY)
        await productPage.assertAddress()
        await productPage.enterComment(firstName)
        await productPage.placeOrder()
        await productPage.paymentInfo(name, yearString, dayString, monthString, yearString)
        await productPage.assertOrder(Messages.ORDER_SUCCESS)
    })

    validLoginData.forEach(data => {
        test(`User is ordering and loging before checking out ${data.mail}`, async ({page}) => {
            const name = await getRandomString()
            const day = await getRandomNumber(1, 30)
            const dayString = day.toString()
            const month = await getRandomNumber(1, 12)
            const monthString = month.toString()
            const year = await getRandomNumber(1950, 2002)
            const yearString = year.toString()
            await homePage.clkSignUp()
            await loginPage.login(data.mail, data.password)
            await loginPage.assertLogin()
            await productPage.addToCart()
            await productPage.assertCart(ActionItems.PRICE_ONE, ActionItems.PRICE_TWO, ActionItems.QUANTITY)
            await productPage.proceedToCheckout()
            await productPage.assertCart(ActionItems.PRICE_ONE, ActionItems.PRICE_TWO, ActionItems.QUANTITY)
            await productPage.assertAddress()
            await productPage.enterComment(name)
            await productPage.placeOrder()
            await productPage.paymentInfo(name, yearString, dayString, monthString, yearString)
            await productPage.assertOrder(Messages.ORDER_SUCCESS)
        })
    })

    validLoginData.forEach(data => {
    test("User is searching products page and logging in after", async ({page}) => {
        await navbar.clickOnTab("Products")
        await productPage.assertProductsPage()
        await productPage.search(ActionItems.BLUE_TOP)
        await productPage.assertSearchProducts(ActionItems.BLUE_TOP)
        await productPage.addToCartSingle()
        await navbar.clickOnTab("Cart")
        await productPage.assertCartSingle(ActionItems.PRICE_ONE, ActionItems.QUANTITY)
        await homePage.clkSignUp()
        await loginPage.login(data.mail, data.password)
        await loginPage.assertLogin()
        await navbar.clickOnTab("Cart")
        await productPage.assertCartSingle(ActionItems.PRICE_ONE, ActionItems.QUANTITY)
        await productPage.removeFromCart()
    })
    })

})
