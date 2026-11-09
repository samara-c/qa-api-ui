# QA Automation Challenge

Automated testing solution covering Web UI, REST API, and Android mobile applications. The project demonstrates a layered automation architecture, reusable test components, API contract validation, code quality checks, and CI/CD integration.

## 1. Solution Overview

The solution is organized into three independent automation areas:

- **Web UI:** End-to-end testing using Cypress, Cucumber, Gherkin, and the Page Object Model.
- **API:** REST API testing using Cypress, a dedicated service layer, and JSON Schema validation with AJV.
- **Mobile:** Native Android application testing using WebdriverIO, Appium, and UiAutomator2.

ESLint is used as a code quality gate. GitHub Actions orchestrates the execution of the automated suites.

## 2. Solution Architecture

The architecture separates test scenarios from application interaction logic and environment-specific configuration.

```text
                         QA Automation Solution
                                   |
             +---------------------+---------------------+
             |                     |                     |
          Web UI                  API                  Mobile
             |                     |                     |
          Cypress               Cypress              WebdriverIO
             |                     |                     |
          Cucumber             PostsService             Appium
          Gherkin                  |                     |
             |                 cy.request()          UiAutomator2
        Step Definitions            |                     |
             |                 JSONPlaceholder       Android Emulator
         Page Objects               |
             |                 AJV / JSON Schema
         SauceDemo
             |
       Login / Checkout
```

### Web UI Architecture

The Web automation layer uses Cucumber and Gherkin to describe business scenarios in a readable format.

The execution flow is:

1. Feature files describe the expected behavior.
2. Step definitions connect Gherkin steps to automation actions.
3. Page Objects encapsulate page elements and interactions.
4. Cypress executes the browser interactions and assertions.

This separation keeps test scenarios readable and reduces duplicated UI interaction code.

### API Architecture

The API automation layer separates test scenarios from HTTP communication.

The execution flow is:

1. API test specifications define the expected behavior.
2. `PostsService.js` centralizes HTTP requests.
3. Cypress `cy.request()` executes the requests.
4. Assertions validate HTTP status codes, headers, response values, and structure.
5. AJV validates API responses against the JSON Schema.

The schema is maintained separately from the test implementation, making contract changes easier to manage.

### Mobile Architecture

The mobile automation layer uses WebdriverIO with Appium and UiAutomator2.

The execution flow is:

1. `wdio.conf.js` loads the execution configuration.
2. Android capabilities are loaded from an external JSON file.
3. WebdriverIO communicates with the Appium server.
4. Appium uses UiAutomator2 to interact with the Android application.
5. Page Objects encapsulate mobile application interactions.
6. Test specifications validate login, locked-user behavior, and logout.

The current implementation targets Android emulators.

## 3. Project Structure

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

## 4. Technology Stack

| Area | Technology | Purpose |
|---|---|---|
| Web automation | Cypress | Browser-based end-to-end testing |
| BDD | Cucumber / Gherkin | Readable business scenarios |
| API automation | Cypress | HTTP request execution and assertions |
| Contract validation | AJV | JSON Schema validation |
| Mobile automation | WebdriverIO | Mobile test execution |
| Mobile automation server | Appium | Native application automation |
| Android automation | UiAutomator2 | Android device interaction |
| Design patterns | Page Object Model | Reusable UI interactions |
| API architecture | Service Layer | Separation of HTTP logic and tests |
| Code quality | ESLint | Static code analysis |
| Reporting | Mochawesome | HTML and JSON test reports |
| CI/CD | GitHub Actions | Automated validation pipeline |

## 5. Technical Decisions

### Separation by Testing Layer

Web, API, and Mobile tests are maintained in separate directories and use dedicated execution configurations.

This allows each test suite to evolve independently and makes failures easier to identify.

### Page Object Model

The Page Object Model was selected to centralize selectors and application interactions.

Instead of repeating locators and interaction logic in every test, specifications use reusable page methods.

### API Service Layer

The API service layer keeps HTTP request implementation separate from test scenarios.

This improves maintainability and makes request changes less dependent on individual test cases.

### JSON Schema Validation

Status-code assertions alone do not guarantee that an API response follows the expected contract.

AJV was selected to validate response structure, required properties, and data types against an external JSON Schema.

### Externalized Configuration

Environment-specific values are kept outside the test scenarios.

- API base URL is configured through `API_URL`.
- Android capabilities are stored in `mobile/config/capabilities.android.json`.
- Cypress configuration is maintained in `cypress.config.js`.

This reduces hard-coded environment dependencies and makes test execution easier to adapt.

### Independent CI Jobs

The CI pipeline separates code quality, API, Web, and Mobile execution.

This provides clearer feedback about which layer failed and allows the non-mobile suites to execute without requiring an Android emulator.

### Generated Reports as Artifacts

Reports and execution evidence are generated during test execution but are not committed to version control.

GitHub Actions stores available reports and logs as workflow artifacts.

## 6. Test Coverage

### API Tests

Application: [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

| Scenario | Expected behavior |
|---|---|
| GET existing post | Returns HTTP 200 and a valid response schema |
| GET nonexistent post | Returns HTTP 404 |
| POST new post | Returns HTTP 201 and a valid response schema |
| PUT existing post | Returns HTTP 200 and a valid response schema |
| DELETE post | Returns HTTP 200 |

### Web UI Tests

Application: [SauceDemo](https://www.saucedemo.com/)

The Web suite covers login and e-commerce workflows, including positive and negative scenarios.

Feature files are written in Gherkin and connected to Cypress implementations through step definitions and Page Objects.

### Android Mobile Tests

Application: Sauce Labs My Demo App for Android.

| Scenario | Expected behavior |
|---|---|
| Valid login | User successfully accesses the product catalog |
| Locked user login | Application displays the expected error |
| Logout | User session is closed and login becomes available again |

## 7. Prerequisites

### General

- Node.js 22
- npm

### Android Mobile Execution

- Java JDK
- Android Studio
- Android SDK
- Android Emulator
- Appium and UiAutomator2 driver

The mobile test application must be installed on the emulator before local test execution.

## 8. Installation

From the repository root, install the main dependencies:

```bash
npm ci
```

Install the mobile dependencies:

```bash
npm --prefix mobile ci
```

## 9. Configuration

### API Environment

The default API base URL is:

```text
https://jsonplaceholder.typicode.com
```

To override it, provide the `API_URL` environment variable:

```bash
API_URL=https://your-api-url.com npm run test:api
```

### Android Capabilities

Android execution settings are maintained in:

```text
mobile/config/capabilities.android.json
```

The configuration includes:

- Platform name
- Automation engine
- Device name
- Emulator UDID
- Application package
- Application activity
- Reset behavior

The default configuration targets an Android emulator identified as `emulator-5554`.

Update the device identifier when executing on another emulator or physical device.

## 10. Execution Commands

All root commands should be executed from the repository root.

### Code Quality

Run ESLint:

```bash
npm run lint
```

### API Tests

```bash
npm run test:api
```

### Web Tests

```bash
npm run test:web
```

### API and Web Tests

Run both suites:

```bash
npm test
```

### Complete Root Validation

Run ESLint followed by API and Web tests:

```bash
npm run check
```

### Mobile Tests

Start an Android emulator and install the test APK.

Start the Appium server in a terminal:

```bash
cd mobile
npx appium --address 127.0.0.1 --port 4723
```

In another terminal, from the repository root:

```bash
npm run test:mobile
```

The mobile package also provides the Android test command:

```bash
npm --prefix mobile run test:android
```

Mobile tests are executed separately from the root `npm test` command because they require an Android emulator and an active Appium server.

## 11. CI/CD Pipeline

GitHub Actions is configured to run automated validation on pushes and pull requests targeting the `main` or `master` branches.

The workflow is organized into four jobs:

| Job | Responsibility |
|---|---|
| Lint | Runs ESLint |
| API | Executes REST API tests |
| Web | Executes Cypress end-to-end tests |
| Mobile | Starts an Android emulator and executes Appium tests |

The API, Web, and Mobile jobs depend on the successful completion of the Lint job.

The Mobile job provisions an Android emulator, installs the test application, starts Appium, and executes the WebdriverIO suite.

Test reports, screenshots, and execution logs are uploaded as GitHub Actions artifacts when available.

## 12. Reports and Generated Files

Mochawesome reports are generated under:

```text
reports/mochawesome/
```

Cypress screenshots are generated under:

```text
cypress/screenshots/
```

Cypress videos, when enabled, are stored under:

```text
cypress/videos/
```

Generated reports, screenshots, videos, local APK files, and dependency directories are excluded from version control through `.gitignore`.

## 13. Known Limitations

### API Environment

JSONPlaceholder is a public mock REST API.

POST, PUT, and DELETE operations simulate server responses. Changes are not persisted, so the tests validate the API behavior rather than permanent data modifications.

### Web Application

SauceDemo is a demonstration e-commerce application.

The checkout flow validates a simulated purchase process and does not integrate with a real payment gateway.

### Mobile Platform

The current mobile suite targets Android only.

iOS execution, real-device coverage, and device-farm integration are not included in the current implementation.

### Mobile Environment Dependency

Local mobile execution requires an Android emulator, an installed application APK, and a running Appium server.

The mobile suite is therefore independent of the root API and Web test commands.

### External Dependencies

The test suites depend on publicly available demonstration applications and external services.

Network availability, service interruptions, or changes to those applications may affect test execution.

### Test Data

The project uses demonstration credentials and non-production data.

No production credentials, payment information, or sensitive application data are required.

## 14. Future Improvements

Potential improvements include:

- Expand API contract coverage to additional endpoints.
- Add more negative and boundary-value scenarios.
- Extend mobile coverage to additional workflows.
- Add iOS automation.
- Introduce test data management and environment-specific profiles.
- Integrate execution with a cloud device farm.
- Add API authentication and authorization scenarios when supported by the target environment.

