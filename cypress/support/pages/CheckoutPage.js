
class CheckoutPage {
  startCheckout() {
    cy.get('[data-test="checkout"]').click();
  }

  fillInformation(firstName, lastName, postalCode) {
    cy.get('[data-test="firstName"]').clear().type(firstName);
    cy.get('[data-test="lastName"]').clear().type(lastName);

    if (postalCode) {
      cy.get('[data-test="postalCode"]').clear().type(postalCode);
    }
  }

  continueCheckout() {
    cy.get('[data-test="continue"]').click();
  }

  finishOrder() {
    cy.get('[data-test="finish"]').click();
  }

  getErrorMessage() {
    return cy.get('[data-test="error"]');
  }

  getConfirmationMessage() {
    return cy.get(".complete-header");
  }
}

module.exports = CheckoutPage;
