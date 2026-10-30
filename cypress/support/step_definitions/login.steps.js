
const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

const LoginPage = require("../pages/LoginPage");
const ProductsPage = require("../pages/ProductsPage");

const loginPage = new LoginPage();
const productsPage = new ProductsPage();

Given("I open the login page", () => {
  loginPage.visit();
});

When(
  "I log in with username {string} and password {string}",
  (username, password) => {
    loginPage.login(username, password);
  }
);

When("I submit the login form without credentials", () => {
  loginPage.submit();
});

Then("I should be on the products page", () => {
  cy.url().should("include", "/inventory.html");
  productsPage.getTitle().should("have.text", "Products");
  productsPage.getInventory().should("be.visible");
});

Then("the login error should contain {string}", (message) => {
  loginPage.getErrorMessage().should("be.visible").and("contain", message);
});
