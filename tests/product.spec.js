import {test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.beforeEach(async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    'standard_user',
    'secret_sauce'
  );
});


test('Product interaction - add and remove product', async ({ page }) => {

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  // Verify inventory page
  await inventoryPage.expectLoaded();

  await expect(
    inventoryPage.productName(
      'Sauce Labs Backpack'
    )
  ).toBeVisible();

  // Add product
  await inventoryPage.addBackpackToCart();

  // Verify remove button appears
  await expect(
    inventoryPage.backpackRemoveButton
  ).toBeVisible();

  // Verify cart count
  await expect(
    inventoryPage.cartBadge
  ).toHaveText('1');

  // Open cart
  await cartPage.goto();

  // Verify cart
  await expect(
    cartPage.cartTitle
  ).toBeVisible();

  await cartPage.expectItemPresent(
    'Sauce Labs Backpack'
  );

  // Remove product
  await page
    .getByRole('button', {
      name: 'Remove'
    })
    .click();

  // Verify product was removed
  await expect(
    page.getByText(
      'Sauce Labs Backpack',
      { exact: true }
    )
  ).toHaveCount(0);

  await expect(
    inventoryPage.cartBadge
  ).toBeHidden();
});


test('Product sorting - A to Z', async ({ page }) => {

  const inventoryPage = new InventoryPage(page);

  await inventoryPage.sortBy('az');

  const productNames =
    await inventoryPage.getProductNames();

  const sortedNames =
    [...productNames].sort((a, b) =>
      a.localeCompare(b)
    );

  // Assertion
  expect(productNames).toEqual(sortedNames);

  // Assertion
  await expect(
    inventoryPage.sortDropdown
  ).toHaveValue('az');
});


test('Product sorting - price low to high', async ({ page }) => {

  const inventoryPage = new InventoryPage(page);

  await inventoryPage.sortBy('lohi');

  const prices =
    await inventoryPage.getProductPrices();

  const sortedPrices =
    [...prices].sort((a, b) => a - b);

  // Assertion
  expect(prices).toEqual(sortedPrices);

  // Assertion
  await expect(
    inventoryPage.sortDropdown
  ).toHaveValue('lohi');
});