# SauceDemo Playwright E2E Automation

## Project Overview

This project contains an end-to-end (E2E) UI automation test suite for the SauceDemo web application using:

- Playwright
- JavaScript
- Page Object Model (POM)
- GitHub Actions

The automation suite validates key user workflows including authentication, product interaction, sorting, and checkout.

**Application Under Test:**  
https://www.saucedemo.com/

---

## Test Scenarios

The following scenarios are covered:

1. **Valid Login**
   - Login using valid credentials
   - Verify successful navigation to the Products page

2. **Invalid Login**
   - Attempt login using invalid credentials
   - Verify the appropriate error message is displayed

3. **Product Interaction**
   - View available products
   - Add products to the cart
   - Verify products are added successfully
   - Remove products from the cart

4. **Product Sorting**
   - Sort products by different sorting options
   - Verify that products are displayed in the expected order

5. **Checkout**
   - Add a product to the cart
   - Proceed to checkout
   - Enter customer information
   - Complete the order
   - Verify the order confirmation message

---

## Locator Strategies

The project demonstrates multiple Playwright locator strategies.

1. getByRole()

  Uses the element's accessible role and name to locate an element.

**Example:**

``javascript
page.getByRole('button', {
  name: 'Login'
});

2. getByText()

  Locates an element based on its visible text.

**Example:**
``javascript
page.getByText(
  Thank you for your order!,
    { exact: true }
  );

3. locator()
   
  Uses CSS selectors to locate elements.

**Example:**
``javascript
  page.locator('#first-name');

---

## Project Structure

saucedemo-playwright/
|__ locators/
|   ├── cart.json
|   ├── checkout.json
|   ├── inventory.json
|   ├── login.json
│
├── pages/
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── tests/
│   ├── login.spec.js
│   ├── product.spec.js
│   ├── sorting.spec.js
│   └── checkout.spec.js
│
├── playwright.config.js
├── package.json
├── package-lock.json
├── README.md
└── .github/
    └── workflows/
        └── playwright.yml
---

## Prerequisites

Before running this project, ensure the following are installed on your machine:

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- Git

## Verify the installations:

``bash
node --version
npm --version
git --version

## Installation

  - git clone <YOUR-GITHUB-REPOSITORY-URL>
  - cd saucedemo-playwright-pom
  - npm install
  - npx playwright install
  - npx playwright test
