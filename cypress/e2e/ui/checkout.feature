
Feature: Checkout

  Scenario: Complete a purchase successfully
    Given I open the login page
    When I log in with username "standard_user" and password "secret_sauce"
    Then I should be on the products page
    When I add the first product and proceed to checkout
    And I enter checkout information with first name "Samara", last name "Cardoso", and postal code "12345"
    And I finish the purchase
    Then I should see the order confirmation

  Scenario: Prevent checkout when postal code is missing
    Given I open the login page
    When I log in with username "standard_user" and password "secret_sauce"
    Then I should be on the products page
    When I add the first product and proceed to checkout
    And I submit checkout information without a postal code
    Then the checkout error should contain "Error: Postal Code is required"
