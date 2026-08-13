import { expect } from '@playwright/test';
import locators from '../locators/login.json';

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.locator(locators.usernameInput);
    this.passwordInput = page.locator(locators.passwordInput);
    this.loginButton = page.getByRole(locators.elementType, {
      name: locators.elementName
    });

    this.errorMessage = page.locator(locators.errorMessage);
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError(message) {
    await expect(this.errorMessage).toContainText(message);
  }
}
