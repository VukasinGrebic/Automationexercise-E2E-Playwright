import { test } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/authentication/LoginPage"
import { ProductPage } from "../pages/products/ProductsPage"
import { Navbar } from "../pages/components/Navbar"
import { Credentials } from "../enums/Credentials"
import { ActionItems } from "../enums/ActionItems"

test.describe.parallel("Products flow", async () =>{
    let homePage: HomePage
    let productPage: ProductPage
    let loginPage: LoginPage
    let navbar: Navbar

    test.beforeEach(async ({ page }) => { 
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        navbar = new Navbar(page)

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
    })

    test("User is adding multiple same product to cart", async ({page}) => {
        await productPage.viewProduct()
        await productPage.assertProductInfo()
        await productPage.addToCartMultiple()
        await productPage.assertMultipleCart(ActionItems.QUANTITY_MULTIPLE)
        await productPage.removeFromCart()
    })
})