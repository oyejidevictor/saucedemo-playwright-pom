import {test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

const username = 'standard_user';
const password = 'secret_sauce';

test.describe('Login Tests', () => {

  test('Valid Login', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();

    // Assertion: login page is displayed
    await expect(
      loginPage.usernameInput
    ).toBeVisible();

    await expect(
      loginPage.passwordInput
    ).toBeVisible();

    await loginPage.login(
      username,
      password
    );

    // Assertions after successful login
    await inventoryPage.expectLoaded();

    await expect(
      inventoryPage.pageTitle
    ).toHaveText('Products');

    await expect(
      inventoryPage.inventoryList
    ).toBeVisible();
  });


  test('Invalid Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      'standard_user',
      'wrong_password'
    );

    // Assertion: error message displayed
    await loginPage.expectLoginError(
      'Username and password do not match any user in this service'
    );

    // Assertion: user remains on login page
    await expect(page).toHaveURL(
      /saucedemo\.com\/?$/
    );

    // Assertion: login button remains available
    await expect(
      loginPage.loginButton
    ).toBeVisible();
  });

});