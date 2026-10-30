
const {
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

const ProductsPage = require("../pages/ProductsPage");
const CheckoutPage = require("../pages/CheckoutPage");

const productsPage = new ProductsPage();
const checkoutPage = new CheckoutPage();

When("I add the first product and proceed to checkout", () => {
  productsPage.addFirstProductToCart();
  productsPage.openCart();
  checkoutPage.startCheckout();
});

When(
  "I enter checkout information with first name {string}, last name {string}, and postal code {string}",
  (firstName, lastName, postalCode) => {
    checkoutPage.fillInformation(firstName, lastName, postalCode);
    checkoutPage.continueCheckout();
  }
);

When("I finish the purchase", () => {
  cy.get(".cart_item").should("have.length", 1);
  checkoutPage.finishOrder();
});

When("I submit checkout information without a postal code", () => {
  checkoutPage.fillInformation("Samara", "Cardoso", "");
  checkoutPage.continueCheckout();
});

Then("I should see the order confirmation", () => {
  cy.url().should("include", "/checkout-complete.html");

  checkoutPage
    .getConfirmationMessage()
    .should("be.visible")
    .and("have.text", "Thank you for your order!");
});

Then("the checkout error should contain {string}", (message) => {
  checkoutPage
    .getErrorMessage()
    .should("be.visible")
    .and("contain", message);
});
