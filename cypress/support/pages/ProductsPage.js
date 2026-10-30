
class ProductsPage {
  getTitle() {
    return cy.get(".title");
  }

  getInventory() {
    return cy.get(".inventory_list");
  }

  addFirstProductToCart() {
    cy.get('[data-test^="add-to-cart-"]').first().click();
  }

  openCart() {
    cy.get(".shopping_cart_link").click();
  }
}

module.exports = ProductsPage;
