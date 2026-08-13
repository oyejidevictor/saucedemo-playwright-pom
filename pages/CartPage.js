import {expect } from '@playwright/test';
import locators from '../locators/cart.json';

exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;

    this.cartTitle = page.getByText('Your Cart', {
      exact: true
    });

    this.checkoutButton = page.getByRole(locators.elementType, {
      name: locators.elementName
    });
  }

  async goto() {
    await this.page
      .locator(locators.shoppingCartLink)
      .click();
  }

  cartItem(name) {
    return this.page
      .locator('.cart_item')
      .filter({
        hasText: name
      });
  }

  async expectItemPresent(name) {
    await expect(
      this.cartItem(name)
    ).toBeVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
