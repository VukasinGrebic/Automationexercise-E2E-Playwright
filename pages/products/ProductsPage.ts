import { expect, Page, Locator } from "@playwright/test"

export class ProductPage {
    readonly page: Page
    readonly loc_searchProducts: Locator
    readonly loc_searchBtn: Locator
    readonly loc_searchedProducts: Locator
    readonly loc_singleProductName: Locator
    readonly loc_category: Locator
    readonly loc_brands: Locator
    readonly loc_product: Locator
    readonly loc_products: Locator
    readonly loc_productList: Locator
    readonly loc_addToCart: Locator
    readonly loc_continueShopping: Locator
    readonly loc_viewCart: Locator
    readonly loc_addToCartTwo: Locator
    readonly loc_viewProduct: Locator
    readonly loc_productName: Locator
    readonly loc_productCategory: Locator
    readonly loc_productPrice: Locator
    readonly loc_productAvailability: Locator
    readonly loc_productCondition: Locator
    readonly loc_productBrand: Locator
    readonly loc_priceOne: Locator
    readonly loc_priceTwo: Locator
    readonly loc_quantityOne: Locator
    readonly loc_quantityTwo: Locator
    readonly loc_priceTotalOne: Locator
    readonly loc_priceTotalTwo: Locator
    readonly loc_remove: Locator
    readonly loc_quantity: Locator
    readonly loc_addCart: Locator
    readonly loc_proceedToCheckout: Locator
    readonly loc_registerLogin: Locator
    readonly loc_address: Locator
    readonly loc_message: Locator
    readonly loc_placeOrder: Locator
    readonly loc_cardName: Locator
    readonly loc_cardNumber: Locator
    readonly loc_cvc: Locator
    readonly loc_expirationMM: Locator
    readonly loc_expirationYYYY: Locator
    readonly loc_payAndConfirm: Locator
    readonly loc_orderSuccess: Locator
    readonly loc_emptyCart: Locator

    constructor (page: Page) {
        this.page = page
        this.loc_searchProducts = page.locator("#search_product")
        this.loc_searchedProducts = page.locator("//h2[contains(text(), 'Searched Products')]")
        this.loc_searchBtn = page.locator("//button[@id='submit_search']")
        this.loc_category = page.locator("#accordian")
        this.loc_brands = page.locator(".brands-name")
        this.loc_product = page.locator(".cart_product")
        this.loc_products = page.locator("text=All Products")
        this.loc_productList = page.locator(".features_items")
        this.loc_addToCart = page.locator("//a[contains(@data-product-id, '1')]").first()
        this.loc_addToCartTwo = page.locator("//a[contains(@data-product-id, '2')]").first()
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
        this.loc_priceOne = page.locator("//tr[contains(@id, 'product-1')]/td[contains(@class, 'cart_price')]/p")
        this.loc_priceTwo = page.locator("//tr[contains(@id, 'product-2')]/td[contains(@class, 'cart_price')]/p")
        this.loc_quantityOne = page.locator("//tr[contains(@id, 'product-1')]/td[contains(@class, 'cart_quantity')]/button")
        this.loc_quantityTwo = page.locator("//tr[contains(@id, 'product-2')]/td[contains(@class, 'cart_quantity')]/button")
        this.loc_priceTotalOne = page.locator("//tr[contains(@id, 'product-1')]/td[contains(@class, 'cart_total')]/p")
        this.loc_priceTotalTwo = page.locator("//tr[contains(@id, 'product-2')]/td[contains(@class, 'cart_total')]/p")
        this.loc_remove = page.locator(".cart_quantity_delete").first()
        this.loc_quantity = page.locator("#quantity")
        this.loc_addCart = page.locator(".cart")
        this.loc_proceedToCheckout = page.locator("text=Proceed To Checkout")
        this.loc_registerLogin = page.locator("//u[contains(text(), 'Register / Login')]")
        this.loc_address = page.locator(".address_country_name").first()
        this.loc_message = page.locator("//textarea[contains(@name, 'message')]")
        this.loc_placeOrder = page.locator("text=Place Order")
        this.loc_cardName = page.locator(("//input[contains(@data-qa, 'name-on-card')]"))
        this.loc_cardNumber = page.locator(("//input[contains(@data-qa, 'card-number')]"))
        this.loc_cvc = page.locator(("//input[contains(@data-qa, 'cvc')]"))
        this.loc_expirationMM = page.locator(("//input[contains(@data-qa, 'expiry-month')]"))
        this.loc_expirationYYYY = page.locator(("//input[contains(@data-qa, 'expiry-year')]"))
        this.loc_payAndConfirm = page.locator("text=Pay and Confirm Order")
        this.loc_orderSuccess = page.locator("//p").first()
        this.loc_emptyCart = page.locator("#empty_cart")
    }

    async assertProductsPage () {
        await expect(this.loc_products).toContainText("All Products")
        await expect(this.loc_productList).toBeVisible()
    }

    async viewProduct () {
        await this.loc_viewProduct.click()
    }

    async assertProductInfo () {
        await expect(this.loc_productName).toBeVisible()
        await expect(this.loc_productCategory).toBeVisible()
        await expect(this.loc_productPrice).toBeVisible()
        await expect(this.loc_productAvailability).toBeVisible()
        await expect(this.loc_productCondition).toBeVisible()
        await expect(this.loc_productBrand).toBeVisible()
    }

    async search(name: string) {
        await this.loc_searchProducts.type(name)
        await this.loc_searchBtn.click()
    }

    async assertSearchProducts (name: string) {
        await expect(this.loc_searchedProducts).toBeVisible()
        await expect(this.loc_singleProductName).toContainText(name)
    }


    async addToCart () {
        await this.loc_addToCart.click()
        await this.loc_continueShopping.click()
        await this.loc_addToCartTwo.click()
        await this.loc_viewCart.click()
    }

    async addToCartMultiple () {
        await this.loc_quantity.clear()
        await this.loc_quantity.type("4")
        await this.loc_addCart.click()
        await this.loc_viewCart.click()
    }

    async assertCart (priceOne: string, priceTwo: string, qunatity: string,) {
        await expect(this.loc_product).toHaveCount(2)
        await expect(this.loc_priceOne).toContainText(priceOne)
        await expect(this.loc_priceTwo).toContainText(priceTwo)
        await expect(this.loc_quantityOne).toContainText(qunatity)
        await expect(this.loc_quantityTwo).toContainText(qunatity)
        await expect(this.loc_priceTotalOne).toContainText(priceOne)
        await expect(this.loc_priceTotalTwo).toContainText(priceTwo)
    }

    async assertMultipleCart (qunatity: string) {
        await expect(this.loc_quantityOne).toContainText(qunatity)
    }
    
    async removeFromCart() {
        await this.loc_remove.click()
    }

    async removeFromCartMultiple () {
        await this.loc_remove.click()
        await this.page.waitForTimeout(1500)
        await this.loc_remove.click()
    }

    async assertEmptyCart () {
        await expect(this.loc_emptyCart).toBeVisible()
    }

    async proceedToCheckout () {
        await this.loc_proceedToCheckout.click()
    }

    async proceedToRegisterLogin () {
        await this.loc_registerLogin.click()
    }

    async assertAddress () {
        await expect(this.loc_address).toBeVisible()
    }

    async enterComment (message: string) {
        await this.loc_message.type(message)
    }

    async placeOrder () {
        await this.loc_placeOrder.click()
    }

    async paymentInfo (name: string, number: string, cvc: string, mm: string, yyyy: string) {
        await this.loc_cardName.type(name)
        await this.loc_cardNumber.type(number)
        await this.loc_cvc.type(cvc)
        await this.loc_expirationMM.type(mm)
        await this.loc_expirationYYYY.type(yyyy)
        await this.loc_payAndConfirm.click()
    }

    async assertOrder (message: string) {
        await expect(this.loc_orderSuccess).toContainText(message)
    }
}