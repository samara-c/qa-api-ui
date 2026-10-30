
Feature: Login

  As a user
  I want to log in to SauceDemo
  So that I can access the products page

  Scenario: Login with valid credentials
    Given I open the login page
    When I log in with username "standard_user" and password "secret_sauce"
    Then I should be on the products page

  Scenario: Login with invalid password
    Given I open the login page
    When I log in with username "standard_user" and password "wrong_password"
    Then the login error should contain "Username and password do not match any user in this service"

  Scenario: Login with empty credentials
    Given I open the login page
    When I submit the login form without credentials
    Then the login error should contain "Username is required"
