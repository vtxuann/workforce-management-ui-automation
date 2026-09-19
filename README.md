# Workforce Management System - Automated Testing Framework

A Playwright + TypeScript UI automation framework for testing critical workforce management workflows in OrangeHRM Open Source.

The project focuses on maintainable end-to-end test automation, deterministic test data, reproducible Docker environments, and CI execution through GitHub Actions.

## Project Overview

This project demonstrates a QA automation approach for a workforce management system based on OrangeHRM 5.9.

The automated regression suite currently covers three core functional areas:

- Authentication
- PIM (Employee Management)
- Leave Management

The framework runs against an OrangeHRM environment provisioned with Docker Compose and supports both local execution and automated execution on GitHub-hosted CI runners.

### Current Automation Coverage

| Module | Automated Tests |
| --- | ---: |
| Authentication | 9 |
| PIM | 11 |
| Leave | 5 |
| **Total Regression Suite** | **25** |

A focused **7-test smoke suite** covers critical workflows across Authentication, PIM, and Leave.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI Automation | Playwright |
| Language | TypeScript |
| Runtime | Node.js |
| System Under Test | OrangeHRM 5.9 |
| Database | MariaDB |
| Environment | Docker / Docker Compose |
| CI/CD | GitHub Actions |
| Version Control | Git / GitHub |

## Test Scope

### Authentication

Automated coverage includes:

- Valid and invalid login
- Required credential validation
- Logout
- Post-logout session security
- Protected URL access after logout

### PIM - Employee Management

Automated coverage includes:

- Employee search
- Employee creation
- Required-field validation
- Duplicate Employee ID validation
- Employee retrieval
- Employee update
- Data persistence after update
- Employee deletion
- Verification after deletion

### Leave Management

Automated coverage includes:

- Invalid leave date ranges
- Insufficient leave balance
- Admin leave assignment behavior
- Leave approval
- Leave rejection

The Leave tests provision fresh employees and required entitlement data to reduce dependencies between test cases.

## Framework Design

The project uses Page Object Model-style separation between test intent and UI interaction logic.

Key design principles include:

- Reusable page objects for business modules
- Shared authentication actions
- Environment-driven configuration
- Dynamic and isolated test data
- Explicit smoke and regression tagging
- Deterministic environment provisioning
- CI failure evidence through Playwright reports, traces, and screenshots

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
├── config/
├── docs/
│   ├── system-exploration.md
│   ├── system-module-map.md
│   ├── test-cases.md
│   ├── test-plan.md
│   ├── test-scenarios.md
│   └── traceability-matrix.md
├── fixtures/
├── pages/
│   ├── auth/
│   ├── leave/
│   └── pim/
├── scripts/
│   └── bootstrap-orangehrm.sh
├── tests/
│   ├── auth/
│   ├── leave/
│   └── pim/
├── utils/
├── .env.example
├── docker-compose.yml
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Environment Configuration

Copy the environment template:

```bash
cp .env.example .env
```

Configure the required values in `.env`.

The project separates local credentials from source control:

- `.env` is ignored by Git.
- `.env.example` documents required variables without storing secrets.
- GitHub Actions uses repository secrets for sensitive CI credentials.

## Running the Test Environment

Start OrangeHRM and MariaDB:

```bash
docker compose up -d
```

Check the environment:

```bash
docker compose ps
```

### Persistent Local Environment

Stopping the containers without deleting volumes preserves the initialized application and database:

```bash
docker compose down
```

Restart with:

```bash
docker compose up -d
```

### Fresh Environment

Deleting the volumes resets both application and database state:

```bash
docker compose down -v
docker compose up -d
```

A fresh OrangeHRM environment requires initialization before tests can run.

The CI pipeline handles this initialization automatically.

## Running Tests

Install dependencies:

```bash
npm ci
npx playwright install chromium
```

Run TypeScript validation:

```bash
npm run typecheck
```

List discovered tests:

```bash
npm run test:list
```

Run the smoke suite:

```bash
npm run test:smoke
```

Run the complete regression suite:

```bash
npm run test:regression
```

Open the latest Playwright HTML report:

```bash
npx playwright show-report
```

## CI/CD Pipeline

GitHub Actions provisions a fresh OrangeHRM environment for CI execution.

```text
GitHub-hosted Ubuntu runner
        |
        v
Install Node.js dependencies
        |
        v
Install Playwright Chromium
        |
        v
Start OrangeHRM + MariaDB
        |
        v
Bootstrap OrangeHRM
        |
        v
Wait for application readiness
        |
        v
TypeScript type check
        |
        v
Playwright test execution
        |
        v
Upload test reports and evidence
        |
        v
Clean up Docker environment
```

The pipeline uses two execution levels:

| Git Event | Test Suite |
| --- | --- |
| Pull request to `main` | Smoke - 7 tests |
| Push / merge to `main` | Regression - 25 tests |

Both execution paths have been verified on GitHub-hosted runners.

## Test Reporting and Failure Evidence

Playwright generates an HTML report for test execution.

For failed tests, the framework retains:

- Screenshot on failure
- Playwright trace
- Test result artifacts

GitHub Actions uploads the generated report and available test evidence even when a test job fails.

Generated runtime artifacts are excluded from source control.

## Test Documentation

The repository includes QA documentation covering the testing lifecycle:

- [Test Plan](docs/test-plan.md) - overall testing strategy, scope, environment, and approach
- [Test Scenarios](docs/test-scenarios.md) - high-level functional test scenarios
- [Test Cases](docs/test-cases.md) - detailed manual and automated test cases
- [Traceability Matrix](docs/traceability-matrix.md) - mapping between requirements, scenarios, test cases, and automated coverage
- [System Exploration](docs/system-exploration.md) - exploratory findings and observed system behavior
- [System Module Map](docs/system-module-map.md) - functional decomposition of the system under test

## Key Engineering Decisions

### Dynamic Test Data

Employee and Leave workflows create unique test data at runtime instead of relying on fixed employee records.

This reduces cross-test dependencies and makes repeated regression execution more reliable.

### Deterministic CI Environment

GitHub Actions starts OrangeHRM and MariaDB from a fresh Docker environment for each run.

OrangeHRM 5.9 requires initial application installation on a fresh environment. The project automates this bootstrap process so CI does not depend on manual setup or pre-populated local volumes.

### Smoke vs Regression Execution

Pull requests execute a smaller smoke suite for fast feedback.

After changes reach `main`, the complete regression suite runs to validate broader application behavior.

## Known Limitations

- Automated coverage currently focuses on Authentication, PIM, and Leave modules.
- Testing currently targets Chromium.
- The CI bootstrap implementation is tied to the pinned OrangeHRM 5.9 Docker image.
- OrangeHRM 5.9 includes a deprecated configuration-driven CLI installer that is used for unattended CI provisioning because the current installer command requires interactive input.
- Video recording is disabled to keep CI artifacts lightweight; traces and screenshots are retained for failures.

## Status

Current automated suite:

```text
Smoke:       7 tests
Regression: 25 tests
```

Verified CI execution:

```text
Pull Request -> Smoke      -> PASS
main push    -> Regression -> PASS
```