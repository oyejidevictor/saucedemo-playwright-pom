import { expect } from '@playwright/test';
import locators from '../locators/inventory.json';
import cartLocators from '../locators/cart.json';

exports.InventoryPage = class InventoryPage {
  constructor(page) {
    this.page = page;

    this.pageTitle = page.getByText('Products', {
      exact: true
    });

    this.inventoryList = page.locator(locators.inventoryList);

    this.cartBadge = page.locator(cartLocators.cartBadge);

    this.sortDropdown = page.locator(locators.sortDropdown);

    this.backpackAddButton = page.locator(
      locators.backpackAddToCartButton
    );

    this.backpackRemoveButton = page.locator(
      locators.backpackRemoveButton
    );
  }

  productName(name) {
    return this.page.getByText(name, {
      exact: true
    });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);

    await expect(this.pageTitle).toBeVisible();

    await expect(this.inventoryList).toBeVisible();
  }

  async addBackpackToCart() {
    await this.backpackAddButton.click();
  }

  async removeBackpackFromCart() {
    await this.backpackRemoveButton.click();
  }

  async sortBy(value) {
    await this.sortDropdown.selectOption(value);
  }

  async getProductNames() {
    return await this.page
      .locator('.inventory_item_name')
      .allTextContents();
  }

  async getProductPrices() {
    const prices = await this.page
      .locator('.inventory_item_price')
      .allTextContents();

    return prices.map(price =>
      Number(price.replace('$', ''))
    );
  }
}
