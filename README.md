# QA Automation Challenge

Automated testing project covering Web UI, REST API, and Android mobile applications. The project uses dedicated test layers, reusable components, contract validation, and CI automation.

## Test Coverage

### API Testing

- CRUD operations: GET, POST, PUT, and DELETE.
- Positive and negative scenarios.
- HTTP status code and response header validation.
- JSON Schema validation using AJV.
- Dedicated API service layer to separate HTTP requests from test logic.
- Configurable API base URL.

**Application:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

### Web UI Testing

- End-to-end testing of login and e-commerce workflows.
- Positive and negative scenarios.
- Gherkin feature files using Cucumber.
- Page Object Model (POM) for reusable page interactions.
- Mochawesome test reporting.

**Application:** [SauceDemo](https://www.saucedemo.com/)

### Android Mobile Testing

- Native Android application testing.
- Automated login with valid credentials.
- Locked user login validation.
- Logout flow validation.
- Page Object Model.
- Externalized Android capabilities.

**Application:** Sauce Labs My Demo App for Android.

**Tools:** WebdriverIO, Appium, and UiAutomator2.

## Tech Stack

| Area | Technologies |
|---|---|
| Web automation | Cypress |
| API automation | Cypress, AJV |
| BDD | Cucumber, Gherkin |
| Mobile automation | WebdriverIO, Appium, UiAutomator2 |
| Design patterns | Page Object Model, Service Layer |
| Code quality | ESLint |
| Reporting | Mochawesome |
| CI/CD | GitHub Actions |
| Runtime | Node.js |

## Project Structure

```text
qa-api-ui/
├── .github/
│   └── workflows/
│       └── tests.yml
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   ├── schemas/
│   │   │   │   └── post.schema.json
│   │   │   └── posts.cy.js
│   │   └── ui/
│   │       ├── checkout.feature
│   │       └── login.feature
│   └── support/
│       ├── pages/
│       ├── services/
│       │   └── PostsService.js
│       └── step_definitions/
├── mobile/
│   ├── config/
│   │   └── capabilities.android.json
│   ├── test/
│   │   ├── pageobjects/
│   │   │   └── LoginPage.js
│   │   └── specs/
│   │       ├── login.e2e.js
│   │       ├── login-locked-user.e2e.js
│   │       └── logout.e2e.js
│   ├── wdio.conf.js
│   ├── package.json
│   └── package-lock.json
├── eslint.config.mjs
├── cypress.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js 22
- npm
- Java JDK for Android automation
- Android Studio and Android SDK
- Android Emulator
- Appium and UiAutomator2 (installed through the mobile project dependencies)

## Installation

Install root dependencies:

```bash
npm ci
```

Install mobile dependencies:

```bash
npm --prefix mobile ci
```

## Configuration

### API URL

The API base URL is configurable through the `API_URL` environment variable.

By default, the project uses:

```text
https://jsonplaceholder.typicode.com
```

To use another API environment:

```bash
API_URL=https://your-api-url.com npm run test:api
```

### Android Capabilities

Android execution settings are externalized in:

```text
mobile/config/capabilities.android.json
```

The configuration includes the platform, automation engine, emulator identifier, and application package/activity.

The default emulator identifier is `emulator-5554`. Update the configuration when using a different device.

The Android application APK is not versioned in the repository. Install the application on the emulator before running the mobile tests.

## Running Tests

### ESLint

Run the code quality checks:

```bash
npm run lint
```

### API Tests

Run API tests only:

```bash
npm run test:api
```

### Web Tests

Run Web UI tests only:

```bash
npm run test:web
```

### Mobile Tests

First, start an Android emulator and install the test application.

Start the Appium server:

```bash
cd mobile
npx appium --address 127.0.0.1 --port 4723
```

In another terminal, from the repository root, run:

```bash
npm run test:mobile
```

### Complete Test Suite

Run API and Web tests:

```bash
npm test
```

Run ESLint followed by API and Web tests:

```bash
npm run check
```

Mobile tests are executed separately because they require an Android emulator and an Appium server.

## Test Reports

Mochawesome generates HTML and JSON reports under:

```text
reports/mochawesome/
```

Cypress screenshots are collected under:

```text
cypress/screenshots/
```

Generated reports, screenshots, videos, and local APK files are excluded from version control.

GitHub Actions uploads available test reports and execution evidence as workflow artifacts.

## CI/CD

GitHub Actions automates the validation process on pushes and pull requests targeting the `main` or `master` branches.

The workflow separates execution into independent jobs:

- **Lint:** ESLint code quality checks.
- **API:** REST API automated tests.
- **Web:** Cypress end-to-end tests.
- **Mobile:** Android emulator setup, APK installation, Appium startup, and WebdriverIO execution.

The API, Web, and Mobile jobs depend on the successful completion of the Lint job.

Test reports and execution logs are uploaded as workflow artifacts for later review.

## Test Environment and Limitations

- JSONPlaceholder is a public mock REST API. POST, PUT, and DELETE operations are simulated and do not persist changes.
- SauceDemo is a demonstration e-commerce application. Checkout tests validate a simulated purchase flow, not a real payment gateway.
- Mobile tests use the Sauce Labs My Demo App Android application and require an Android-compatible execution environment.
- Mobile tests are not included in the root `npm test` command because they require an emulator and Appium server.

## Design Decisions

- **Page Object Model:** keeps UI interaction logic separate from test scenarios.
- **API Service Layer:** centralizes HTTP requests and improves maintainability.
- **JSON Schema Validation:** verifies API response structure and data types, beyond status code assertions.
- **Externalized Configuration:** separates environment-specific settings from test implementation.
- **Independent CI Jobs:** makes failures easier to identify across code quality, API, Web, and Mobile execution.
- **Artifact-based Reporting:** preserves execution evidence without committing generated reports to the repository.
