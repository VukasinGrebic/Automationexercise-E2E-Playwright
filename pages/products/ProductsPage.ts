import { expect, Page, Locator } from "@playwright/test"

export class ProductPage {
    readonly page: Page
    readonly loc_searchProducts: Locator
    readonly loc_searchBtn: Locator
    readonly loc_searchedProducts: Locator
    readonly loc_singleProductName: Locator
    readonly loc_category: Locator
    readonly loc_brands: Locator
    readonly loc_products: Locator
    readonly loc_productList: Locator
    readonly loc_addToCart: Locator
    readonly loc_continueShopping: Locator
    readonly loc_viewCart: Locator
    readonly loc_addCartTwo: Locator
    readonly loc_viewProduct: Locator
    readonly loc_productName: Locator
    readonly loc_productCategory: Locator
    readonly loc_productPrice: Locator
    readonly loc_productAvailability: Locator
    readonly loc_productCondition: Locator
    readonly loc_productBrand: Locator
    

    constructor (page: Page) {
        this.page = page
        this.loc_searchProducts = page.locator("#search_product")
        this.loc_searchedProducts = page.locator("//h2[contains(text(), 'Searched Products')]")
        this.loc_searchBtn = page.locator("//button[@id='submit_search']")
        this.loc_category = page.locator("#accordian")
        this.loc_brands = page.locator(".brands-name")
        this.loc_products = page.locator("text=All Products")
        this.loc_productList = page.locator(".features_items")
        this.loc_addToCart = page.locator(".add-to-cart").first()
        this.loc_addCartTwo = page.locator(".add-to-cart").nth(0)
        this.loc_continueShopping = page.locator("text=Continue Shopping")
        this.loc_viewCart = page.locator("text=View Cart")
        this.loc_viewProduct = page.locator("text=View Product").first()
        this.loc_singleProductName = page.locator("//div[contains(@class, 'overlay-content')]//p")
        this.loc_productName = page.locator("//div[contains(@class, 'product-information')]//h2")
        this.loc_productCategory = page.locator("//div[contains(@class, 'product-information')]//p[contains(text(), 'Category:')]")
        this.loc_productPrice = page.locator("//div[contains(@class, 'product-information')]//span[contains(text(), 'Rs.')]")
        this.loc_productAvailability = page.locator("//div[contains(@class, 'product-information')]//b[contains(text(), 'Availability:')]")
        this.loc_productCondition = page.locator("//div[contains(@class, 'product-information')]//b[contains(text(), 'Condition:')]")
        this.loc_productBrand = page.locator("//div[contains(@class, 'product-information')]//b[contains(text(), 'Brand:')]")
    }

    async assertProductsPage () {
        expect(this.loc_products).toContainText("All Products")
        expect(this.loc_productList).toBeVisible
    }

    async viewProduct () {
        await this.loc_viewProduct.click()
    }

    async assertProductInfo () {
        expect(this.loc_productName).toBeVisible
        expect(this.loc_productCategory).toBeVisible
        expect(this.loc_productPrice).toBeVisible
        expect(this.loc_productAvailability).toBeVisible
        expect(this.loc_productCondition).toBeVisible
        expect(this.loc_productBrand).toBeVisible
    }

    async search(name: string) {
        await this.loc_searchProducts.type(name)
        await this.loc_searchBtn.click()
    }

    async assertSearchProducts (name: string) {
        expect(this.loc_searchedProducts).toBeVisible
        expect(this.loc_singleProductName).toContainText(name)
    }


    async addToCart () {
        await this.loc_addToCart.click()
        await this.loc_continueShopping.click()
        await this.loc_addCartTwo.click()
        await this.loc_viewCart.click()
        await this.page.pause()
    }
}