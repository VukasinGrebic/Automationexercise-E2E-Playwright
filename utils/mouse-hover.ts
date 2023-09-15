import { Page } from "@playwright/test"

export class LoginPage {
  readonly page: Page
}

export class MouseHover {
  readonly page: Page


  constructor(page: Page) {
    this.page = page

  }

  async scrollDown() {
    await this.page.evaluate(() => {
      window.scrollBy(0, 10000)
    })
  }

  async scrollUp() {
    await this.page.evaluate(() => {
      window.scrollBy(0, -10000)
    })
  }
}