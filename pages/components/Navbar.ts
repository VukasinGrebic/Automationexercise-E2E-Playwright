import { Locator, Page } from "@playwright/test"

export class Navbar {
    readonly page: Page
    readonly home: Locator
    readonly products: Locator
    readonly cart: Locator
    readonly logout: Locator
    readonly deleteAccount: Locator

    constructor (page: Page) {
        this.page = page
        this.home = page.locator("text= Home")
        this.products = page.locator("text= Products")
        this.cart = page.locator("text= Cart").first()
        this.logout = page.locator("text= Logout")
        this.deleteAccount = page.locator("text= Delete Account")
    }

    async clickOnTab(tabName) {
        switch (tabName) {
            case "Home":
                await this.home.click()
                break
            case "Products":
                await this.products.click()
                break
            case "Cart":
                await this.cart.click()
                break
            case "Logout":
                await this.logout.click()
                break
            case "Delete Account":
                await this.deleteAccount.click()
                break
            default:
                throw new Error("This tab does not exist")
        }
    }

}