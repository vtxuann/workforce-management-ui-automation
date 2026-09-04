# Test Plan - Workforce Management System Automation Framework

## 1. Introduction

### 1.1 Purpose

This Test Plan defines the testing scope, objectives, strategy, environment, deliverables, and entry/exit criteria for the Workforce Management System Automation Framework.

The purpose of this document is to establish a clear and focused testing approach for the MVP automation scope before detailed test case design and Playwright implementation.

### 1.2 Project Context

The System Under Test (SUT) is OrangeHRM, a web-based Human Resource Management System hosted locally using Docker to provide a controlled and reproducible test environment.

The automation framework is developed using Playwright and TypeScript, with the initial focus on high-risk and high-value workforce management workflows.

---

## 2. Test Objectives

The primary objectives of this testing effort are to:

- Validate core business workflows (Authentication, PIM, Leave Management) behave correctly under both positive and negative conditions.
- Build a maintainable, reusable automation framework using Playwright and the Page Object Model.
- Establish a regression suite capable of running reliably in a CI/CD pipeline.
- Demonstrate a risk-based approach to test scope, prioritization, and coverage.

The project prioritizes meaningful regression coverage rather than maximizing the number of automated test cases.

---

## 3. Test Scope

### 3.1 In Scope

The MVP automation scope consists of the following modules:

#### Authentication - P0

- Login with valid credentials.
- Login with invalid credentials.
- Required-field validation for Username and Password.
- Logout.
- Post-logout session behavior, including Browser Back.

#### PIM / Employee Management - P0

**Employee Search and Filtering**

- Search employees using relevant employee information.
- Verify matching and non-matching search results.
- Verify filter behavior.
- Verify reset functionality.

**Add Employee**

- Create an employee with valid information.
- Verify successful employee creation.
- Verify required-field validation.
- Verify invalid Employee ID behavior.
- Verify employee data persistence after creation.

**Edit Employee**

- Update existing employee information.
- Verify successful update.
- Verify updated data persistence after saving.
- Verify validation behavior for invalid or empty input where applicable.

**Delete Employee**

- Open the employee deletion confirmation dialog.
- Cancel employee deletion.
- Verify that the employee remains available after cancellation.
- Confirm employee deletion.
- Verify successful deletion.
- Verify deletion-related notification behavior.

#### Leave - P1

**Apply Leave**

- Submit a leave request with valid information.
- Verify required-field validation.
- Verify invalid leave date-range behavior.
- Verify insufficient leave-balance behavior.

**Leave List**

- View leave records.
- Search leave records.
- Filter leave records.
- Verify relevant leave information and request status.

**Assign Leave**

- Assign leave to an employee with valid information.
- Verify required-field validation.
- Verify leave assignment behavior.

**Leave Approval**

- Approve a leave request.
- Reject a leave request.
- Verify corresponding request status changes.

---

### 3.2 Out of Scope

The following areas are outside the current MVP automation scope:

- Admin
- Dashboard
- Time
- Recruitment
- Performance
- Directory
- Buzz
- Claim
- Other system configuration features outside the defined and finalized MVP scope
- Performance testing
- Load testing
- Security penetration testing
- Mobile application testing

Candidate-scope workflows may be considered after the MVP automation framework and core regression coverage are stable.

---

## 4. Test Strategy

### 4.1 Test Types
- **Functional Testing** - Validates that each in-scope workflow behaves according to observed business rules (positive and negative scenarios).
- **Regression Testing** - Automated re-execution of core workflows via Playwright to catch regressions.
- **Smoke Testing** - A minimal subset of critical tests verifying core functionality is operational.

### 4.2 Test Conditions
- **Positive Testing** - Confirms expected behavior under valid conditions. 
- **Negative Testing** - Confirms the system correctly rejects invalid input or invalid business conditions.
- **UI Validation Testing** - Verifies field-level validation messages and visual feedback.
- **Business Rule / Workflow Testing** - Validates multi-step processes governed by business logic.
- **Data Persistence Testing** - Confirms data changes are correctly saved and reflected across the application. 

### 4.3 Test Design Techniques
- **Equivalence Partitioning** - Grouping valid and invalid input classes to avoid redundant testing.  
- **Boundary Value Analysis** - Testing values at the edge of valid/invalid ranges.  
- **Decision Table Testing** - Mapping combinations of input conditions to expected outcomes.  
- **State Transition Testing** - Validating behavior across defined states and transitions.  
- **Error Guessing**  - Applying tester experience to probe likely problem areas beyond formal techniques.

### 4.4 Automation Approach
- **Framework:** Playwright Test
- **Language:** TypeScript
- **Primary Browser:** Chromium
- **Design Pattern:** Page Object Model (POM)
- **Configuration:** Environment variables managed through .env
- **Reporting:** Playwright HTML Reporter 
- **Execution:** Playwright test runner with configurable parallel execution

---

## 5. Test Environment & Resources

### 5.1 Test Environment

| Component | Detail |
|---|---|
| System Under Test | OrangeHRM |
| Hosting | Docker / Docker Compose |
| Environment | Local |
| Application Access | Configured through BASE_URL |
| Operating System | Windows |
| Browser | Chromium |
| Automation Framework | Playwright Test |
| Programming Language | TypeScript |
| Test Reporting | Playwright HTML Reporter |

### 5.2 Resources

The project is developed as an individual QA portfolio project.

Primary resources include:

- Docker Desktop for application hosting.
- Playwright for UI automation.
- TypeScript for test implementation.
- Git for version control.
- Existing OrangeHRM test data and accounts required by the selected workflows.

Sensitive information such as credentials must be stored through environment variables and must not be committed to source control.

---

## 6. Test Deliverables

- Test Plan: Defines the overall testing strategy, scope, resources, and schedule for the project.
- Test Scenarios: Outlines high-level testing scenarios derived from approved workflows and business requirements.
- Test Cases: Details the specific steps, test data, preconditions, and expected results for execution
- Bug Reports: Documents and tracks defects identified during exploratory testing or test execution.
- Automated Test Scripts: Contains reusable code and automation scripts designed to execute repetitive or regression test cases. 
- Traceability Matrix: Maps approved scope and test scenarios to corresponding test cases and automated tests to maintain coverage and traceability.
- Test Summary Report: Summarizes final test execution results, automation coverage, defects, and overall testing outcomes.

---

## 7. Entry and Exit Criteria

### 7.1 Entry Criteria
- The Dockerized OrangeHRM environment is running and accessible.
- The Playwright project is correctly configured.
- Required test accounts are available.
- Required baseline test data is available.
- Relevant system exploration has been completed.
- The MVP scope has been defined and finalized.
- Test scenarios and expected results are sufficiently defined for the workflow under implementation.

### 7.2 Exit Criteria
- Planned MVP test scenarios have been reviewed and converted into appropriate test cases.
- Critical P0 workflows have corresponding automated coverage.
- Planned P1 workflows have been implemented according to the approved automation scope.
- Automated tests execute reliably in the target environment.
- Test execution results are documented through the Playwright report.
- Critical defects identified during testing are documented and appropriately addressed or explicitly accepted.
- Traceability between approved scope, test scenarios, test cases, and automated tests is established.
- The automation framework remains maintainable and can support future scope expansion.

---

## 8. Test Schedule (High-Level)

The project uses a phase-based schedule rather than fixed calendar deadlines because it is a self-directed portfolio project.

| Phase | Scope | Status |
|---|---|---|
| Sprint 0 | Environment setup and Dockerized OrangeHRM | Complete |
| Sprint 1 | Playwright project and framework initialization| Complete |
| Sprint 2 | System exploration and risk-based scope definition | Complete |
| Sprint 3 | Test planning and test design | In Progress |
| Sprint 4 | Authentication test automation | Planned |
| Sprint 5 | PIM / Employee Management automation | Planned |
| Sprint 6 | Leave Management automation | Planned |
| Sprint 7 | Regression refinement, reporting, and CI/CD | Planned |
| Sprint 8 | Final documentation and portfolio review | Planned |

The schedule is subject to change based on findings discovered during test design and automation implementation.

---

## 9. Risks and Assumptions

### 9.1 Risks & Mitigation

| Risk | Mitigation |
|---|---|
| UI changes may affect locator stability | Prefer resilient, user-facing locators and centralize selectors through Page Objects. |
| Test data collisions during parallel execution | Use controlled or generated data where appropriate and minimize test-order dependencies. |
| Local Docker environment may become unstable or inconsistent | Document clear setup and reset steps in README.md; rely on Docker healthcheck before test execution. |
| Some workflows depend on specific existing application state | Define explicit preconditions and test data requirements for affected scenarios. |
| RBAC behavior is not fully covered due to limited test-account availability | Keep RBAC-specific scenarios outside the initial MVP and reassess when suitable accounts are available. | 
| Flaky tests due to timing/async UI behavior | Use Playwright's built-in auto-waiting and explicit assertions instead of fixed sleeps or arbitrary timeouts. |
| Cached page behavior after logout may expose previously rendered UI when using Browser Back | Verify post-logout navigation behavior by navigating back and attempting to interact with the restored page; verify that protected functionality cannot be accessed without an authenticated session. |

### 9.2 Assumptions

- The Dockerized OrangeHRM environment provides sufficiently representative application behavior for this portfolio project.
- Required test accounts and baseline test data are available for the selected MVP workflows.
- The project is developed and maintained by a single person as a self-directed QA portfolio project.
- The primary purpose of the project is to demonstrate practical QA analysis, test design, and UI automation skills rather than provide exhaustive coverage of the entire OrangeHRM system.
- Scope may be revisited if new evidence discovered during test design or automation materially changes the risk or suitability of a workflow.