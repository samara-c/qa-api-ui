
# QA Automation Challenge

Automated API and end-to-end testing project using Cypress,
Cucumber and the Page Object Model.

## Scope

- API testing: GET, POST, PUT and DELETE.
- API response validation: status codes, headers and response bodies.
- E2E testing: login, navigation, cart and checkout.
- Positive and negative scenarios.
- HTML test reporting with Mochawesome.
- CI/CD with GitHub Actions.

## Tech Stack

- Node.js
- Cypress
- Cucumber / Gherkin
- Mochawesome
- GitHub Actions

## Project Structure

- `cypress/e2e/api/`: API tests.
- `cypress/e2e/ui/`: E2E feature files.
- `cypress/support/pages/`: Page Objects.
- `cypress/support/step_definitions/`: Cucumber step definitions.
- `reports/`: Test reports.
- `.github/workflows/`: CI/CD workflows.

## Prerequisites

- Node.js 22
- npm

## Installation

```bash
npm ci
```

## Run Tests

Open Cypress:

```bash
npm run cy:open
```

Run all tests in headless mode:

```bash
npm run cy:run
```

## Test Reports

Mochawesome reports are configured under `reports/mochawesome/`.
Screenshots and videos can be collected for failed test runs.

GitHub Actions uploads reports and available evidence as workflow artifacts.

## Test Environment and Limitations

The API tests use JSONPlaceholder, a public mock REST API.
Create, update and delete operations are simulated and are not persisted.

The UI tests use SauceDemo, a demonstration e-commerce application.
Checkout tests validate the application's simulated purchase flow,
not a real payment gateway.

## CI/CD

GitHub Actions runs the automated suite on pushes and pull requests
targeting the main or master branch. Reports and evidence are uploaded
as workflow artifacts.
