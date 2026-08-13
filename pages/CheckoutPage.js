import { expect } from '@playwright/test';
import locators from '../locators/checkout.json';

exports.CheckoutPage = class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.firstNameInput =
      page.locator(locators.firstNameInput);

    this.lastNameInput =
      page.locator(locators.lastNameInput);

    this.postalCodeInput =
      page.locator(locators.postalCodeInput);

    this.continueButton =
      page.getByRole(locators.continueButton);

    this.finishButton =
      page.getByRole(locators.finishButton);

    this.completeHeader =
      page.getByText(
        locators.completeHeader,
        { exact: true }
      );

    this.confirmationImage =
      page.locator(locators.confirmationImage);
  }

  async fillCustomerDetails(
    firstName,
    lastName,
    postalCode
  ) {
    await this.firstNameInput.fill(firstName);

    await this.lastNameInput.fill(lastName);

    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async expectOrderComplete() {
    await expect(this.page).toHaveURL(
      /checkout-complete\.html/
    );

    await expect(
      this.completeHeader
    ).toBeVisible();

    await expect(
      this.confirmationImage
    ).toBeVisible();
  }
}