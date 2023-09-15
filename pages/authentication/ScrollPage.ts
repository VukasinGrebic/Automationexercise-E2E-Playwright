import { expect, Locator, Page } from "@playwright/test"
import { Messages } from "../../enums/Messages"

export class ScrollPage {
    readonly page: Page
    readonly loc_subscription: Locator
    readonly loc_scrollUp: Locator
    readonly loc_title: Locator

    constructor(page: Page) {
        this.page = page
        this.loc_subscription = page.locator("text=Subscription")
        this.loc_scrollUp = page.locator("#scrollUp")
        this.loc_title = page.locator("text=Full-Fledged practice website for Automation Engineers").first()
    }

    
    async assertSubscription() {
        await expect(this.loc_subscription).toBeVisible()
    }

    async scrollUp() {
        await this.loc_scrollUp.click()
    }

    async assertTitle() {
        await expect(this.loc_title).toBeVisible()
    }

}