import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Checkout - complete purchase successfully', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.expectLoaded();
  await inventory.addBackpackToCart();
  await expect(inventory.cartBadge).toHaveText('1');

  await cart.goto();
  await cart.expectItemPresent('Sauce Labs Backpack');
  await cart.checkout();

  await expect(page).toHaveURL(/checkout-step-one\.html/);
  await checkout.fillCustomerDetails('Victor', 'Oyejide', '100001');
  await checkout.continueToOverview();

  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
  await expect(page.getByText('Payment Information')).toBeVisible();
  await expect(page.getByText('Shipping Information')).toBeVisible();
  await expect(page.getByText('Price Total')).toBeVisible();

  await checkout.finishOrder();
  await checkout.expectOrderComplete();
});
