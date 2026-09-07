# Traceability Matrix - Workforce Management System Automation Framework

## 1. Purpose

This document provides end-to-end traceability between the defined Test Scenarios, detailed Test Cases, and planned Automated Tests for the Workforce Management System Automation Framework.

The Traceability Matrix is designed to:

- Ensure that all approved Test Scenarios are represented by corresponding Test Cases.
- Identify which Test Cases are selected for MVP automation.
- Distinguish automated coverage from manual, deferred, backlog, and pending-oracle coverage.
- Support risk-based automation prioritization.
- Provide visibility into Smoke and Regression suite coverage.
- Maintain a clear traceability chain from test design to Playwright implementation.

The traceability model used by the project is:

`Test Scenario → Test Case → Automated Test`

An Automated Test ID is assigned only when the corresponding Test Case has been selected for MVP automation.

---

## 2. Automation Selection Criteria

Automation candidates are selected based on the following criteria:

### 2.1 Business Risk

Test Cases covering critical business workflows, authentication controls, data-changing operations, or high-impact failures receive higher automation consideration.

### 2.2 Regression Value

Frequently executed behaviors and workflows that are likely to require repeated verification are preferred for automation.

### 2.3 Repeatability

The Test Case should be executable repeatedly with predictable setup, execution, and cleanup conditions.

### 2.4 Deterministic Test Oracle

The expected system behavior must be sufficiently known and objectively verifiable.

Test Cases based on observations for which the intended business requirement remains unclear should not be converted into pass/fail automated regression assertions prematurely.

### 2.5 Test Data Isolation

Automation candidates should support isolated test data or controlled setup so that execution does not depend on the result or execution order of another test.

### 2.6 Automation Maintenance Cost

The expected regression value of the automated test should justify its implementation and maintenance cost.

### 2.7 MVP Scope Alignment

Automation selection prioritizes functionality included in the approved MVP scope.

Candidate-scope or lower-value functionality may remain deferred even when a corresponding Test Case exists.

---

## 3. Automation Decision Definitions

The following automation decisions are used in this Traceability Matrix:

| Decision | Definition |
|---|---|
| Selected | Test Case is selected for implementation in the MVP Playwright automation suite. |
| Backlog | Test Case has automation value but is not prioritized for the current MVP implementation. |
| Manual | Test Case is intentionally retained for manual or exploratory verification because automation is currently inappropriate or the behavior should not yet be treated as a regression contract. |
| Pending Oracle | Test Case has potential automation value, but the expected behavior or test oracle requires further confirmation before reliable automation can be implemented. |
| Deferred Scope | Test Case is not selected because the tested behavior belongs to candidate scope or is outside the current MVP automation focus. |

---

## 4. Automated Test ID Convention

Automated Test IDs follow the format:

`AT-[MODULE]-[NUMBER]`

The numeric suffix is aligned with the corresponding Test Case whenever the Test Case is selected for automation.

Examples:

`TC-AUTH-001 → AT-AUTH-001`

`TC-PIM-006 → AT-PIM-006`

`TC-LEAVE-003 → AT-LEAVE-003`

Test Cases that are not selected for automation do not receive an Automated Test ID.

As a result, gaps between Automated Test IDs are expected and intentional.

---

## 5. Test Suite Classification

Automated Tests selected for implementation are classified into the following execution suites.

### 5.1 Smoke

The Smoke suite contains a small set of critical tests used to verify that essential application functionality is operational.

Smoke tests focus primarily on:

- Authentication availability.
- Authenticated access control.
- Critical employee CRUD operations.
- Critical Leave workflow state transitions.

### 5.2 Regression

The Regression suite provides broader verification of business workflows, validation behavior, data persistence, session behavior, and other repeatable conditions.

A test classified as Smoke may also be executed as part of the complete Regression suite.

---

# 6. Traceability Matrix

## 6.1 Authentication

| Scenario ID | Test Case ID | Test Case | Priority | Automation Decision | Automated Test ID | Suite | Rationale | Status |
|---|---|---|---|---|---|---|---|---|
| TS-AUTH-001 | TC-AUTH-001 | Login with valid credentials | P0 | Selected | AT-AUTH-001 | Smoke | Core authentication happy path with high regression value and deterministic outcome. | Automated |
| TS-AUTH-001 | TC-AUTH-002 | Login with invalid username | P0 | Selected | AT-AUTH-002 | Regression | Critical credential rejection behavior with deterministic validation outcome. | Automated |
| TS-AUTH-001 | TC-AUTH-003 | Login with invalid password | P0 | Selected | AT-AUTH-003 | Regression | Critical credential rejection behavior with deterministic validation outcome. | Automated |
| TS-AUTH-001 | TC-AUTH-004 | Login with empty username | P1 | Selected | AT-AUTH-004 | Regression | Repeatable required-field validation with low automation complexity. | Automated |
| TS-AUTH-001 | TC-AUTH-005 | Login with empty password | P1 | Selected | AT-AUTH-005 | Regression | Repeatable required-field validation with low automation complexity. | Automated |
| TS-AUTH-001 | TC-AUTH-006 | Login with both username and password empty | P2 | Selected | AT-AUTH-006 | Regression | Provides combined required-field validation coverage at low implementation cost. | Automated |
| TS-AUTH-002 | TC-AUTH-007 | Logout from an authenticated session | P0 | Selected | AT-AUTH-007 | Smoke | Critical authentication state transition and prerequisite for post-logout security verification. | Automated |
| TS-AUTH-003 | TC-AUTH-008 | Browser Back after logout | P0 | Selected | AT-AUTH-008 | Regression | Verifies protected functionality remains inaccessible after logout despite browser history behavior. | Automated |
| TS-AUTH-003 | TC-AUTH-009 | Direct navigation to a protected resource after logout | P0 | Selected | AT-AUTH-009 | Smoke | Critical access-control regression verifying unauthenticated users cannot directly access protected functionality. | Automated |

### Authentication Automation Summary

| Metric | Value |
|---|---|
| Test Scenarios | 3 |
| Test Cases | 9 |
| Selected | 9 |
| Backlog | 0 |
| Manual | 0 |
| Pending Oracle | 0 |
| Deferred Scope | 0 |
| Initial Automation Coverage | 100% |

Authentication is fully selected for MVP automation because the workflows are high-value, deterministic, repeatable, and relatively inexpensive to automate.

---

## 6.2 PIM / Employee Management

| Scenario ID | Test Case ID | Test Case | Priority | Automation Decision | Automated Test ID | Suite | Rationale | Status |
|---|---|---|---|---|---|---|---|---|
| TS-PIM-001 | TC-PIM-001 | Search employees using valid employee information | P1 | Selected | AT-PIM-001 | Regression | Core employee retrieval behavior with high repeatability and regression value. | Automated |
| TS-PIM-001 | TC-PIM-002 | Search with information that has no matching employee | P2 | Backlog | - | - | Valid negative search coverage, but lower MVP regression value than successful retrieval. | Backlog |
| TS-PIM-001 | TC-PIM-003 | Apply available employee filters | P1 | Selected | AT-PIM-003 | Regression | Important filtering behavior suitable for repeatable automated verification. | Automated |
| TS-PIM-001 | TC-PIM-004 | Apply multiple search and filter criteria | P2 | Deferred Scope | - | - | Advanced multi-criteria filtering belongs to candidate scope rather than the current MVP automation scope. | Deferred |
| TS-PIM-001 | TC-PIM-005 | Reset search and filter criteria | P2 | Backlog | - | - | Useful supporting behavior but lower automation priority than core search and filtering. | Backlog |
| TS-PIM-002 | TC-PIM-006 | Create an employee with valid required information | P0 | Selected | AT-PIM-006 | Smoke | Critical employee creation workflow and core PIM transaction. | Automated |
| TS-PIM-002 | TC-PIM-007 | Submit employee creation with required name fields empty | P1 | Selected | AT-PIM-007 | Regression | Confirmed First Name and Last Name required-field validation with deterministic observable behavior. | Automated |
| TS-PIM-002 | TC-PIM-008 | Validate Employee ID behavior with alphabetic and special characters | P1 | Manual | - | - | Current behavior is observed, but the intended Employee ID format requirement remains unclear; automation could incorrectly convert implementation behavior into a business requirement. | Manual |
| TS-PIM-002 | TC-PIM-009 | Validate leading and trailing whitespace handling in employee name fields | P1 | Manual | - | - | Valuable data-quality observation, but no confirmed normalization or trimming requirement is currently available. | Manual |
| TS-PIM-002 | TC-PIM-010 | Verify employee search behavior for name values containing whitespace | P1 | Manual | - | - | Search behavior involving preserved whitespace is observed but should not yet be treated as a formal regression contract. | Manual |
| TS-PIM-002 | TC-PIM-011 | Create an employee with a duplicate Employee ID | P1 | Selected | AT-PIM-011 | Regression | Confirmed deterministic validation rule with observable `Employee Id already exists` feedback. | Automated |
| TS-PIM-002 | TC-PIM-012 | Verify newly created employee can be retrieved | P1 | Selected | AT-PIM-012 | Regression | Verifies persistence and retrievability after employee creation. | Automated |
| TS-PIM-003 | TC-PIM-013 | Update an existing employee with valid information | P0 | Selected | AT-PIM-013 | Smoke | Critical employee update workflow with high business and regression value. | Automated |
| TS-PIM-003 | TC-PIM-014 | Validate required name fields when updating an employee | P1 | Selected | AT-PIM-014 | Regression | Confirmed required-field validation for First Name and Last Name during employee update. | Automated |
| TS-PIM-003 | TC-PIM-015 | Update an employee with an empty Employee ID | P1 | Manual | - | - | Empty Employee ID is currently accepted, but the intended business requirement is undocumented; retained as observed behavior rather than automated regression contract. | Manual |
| TS-PIM-003 | TC-PIM-016 | Verify updated employee information persists after saving | P0 | Selected | AT-PIM-016 | Regression | Critical persistence verification after employee update. | Automated |
| TS-PIM-004 | TC-PIM-017 | Cancel employee deletion | P1 | Backlog | - | - | Valid workflow branch but lower MVP automation value than confirmed deletion and post-deletion integrity. | Backlog |
| TS-PIM-004 | TC-PIM-018 | Confirm employee deletion | P0 | Selected | AT-PIM-018 | Smoke | Critical destructive CRUD operation with high regression value. | Automated |
| TS-PIM-004 | TC-PIM-019 | Verify deleted employee is no longer available | P0 | Selected | AT-PIM-019 | Regression | Verifies data integrity and persistence after deletion. | Automated |

### PIM Automation Summary

| Metric | Value |
|---|---|
| Test Scenarios | 4 |
| Test Cases | 19 |
| Selected | 11 |
| Backlog | 3 |
| Manual | 4 |
| Pending Oracle | 0 |
| Deferred Scope | 1 |
| Initial Automation Coverage | 57.9% |

PIM automation prioritizes core employee search and CRUD workflows, deterministic validation rules, and data persistence.

Observed behaviors without sufficiently confirmed business requirements remain manual rather than being prematurely converted into automated regression contracts.

---

## 6.3 Leave Management

| Scenario ID | Test Case ID | Test Case | Priority | Automation Decision | Automated Test ID | Suite | Rationale | Status |
|---|---|---|---|---|---|---|---|---|
| TS-LEAVE-001 | TC-LEAVE-001 | Submit a leave request with valid information | P0 | Pending Oracle | - | - | High automation value, but successful submission behavior and resulting state require further confirmation before implementation. | Pending |
| TS-LEAVE-001 | TC-LEAVE-002 | Submit leave request with required fields missing | P1 | Pending Oracle | - | - | Required fields and exact validation behavior require further confirmation. | Pending |
| TS-LEAVE-001 | TC-LEAVE-003 | Submit leave request with an invalid date range | P1 | Selected | AT-LEAVE-003 | Regression | Observed deterministic date-range validation provides a reliable automation oracle. | Planned |
| TS-LEAVE-001 | TC-LEAVE-004 | Submit leave request with insufficient leave balance | P0 | Selected | AT-LEAVE-004 | Regression | High-value business-rule validation with observed insufficient-balance feedback. | Planned |
| TS-LEAVE-002 | TC-LEAVE-005 | View available leave records | P2 | Backlog | - | - | Useful supporting coverage but lower MVP automation priority. | Backlog |
| TS-LEAVE-002 | TC-LEAVE-006 | Search leave records using relevant criteria | P2 | Backlog | - | - | Valuable regression coverage but lower priority than critical Leave transactions. | Backlog |
| TS-LEAVE-002 | TC-LEAVE-007 | Filter leave records | P2 | Backlog | - | - | Supporting filter behavior with lower MVP regression priority. | Backlog |
| TS-LEAVE-002 | TC-LEAVE-008 | Verify relevant leave information and request status | P2 | Backlog | - | - | Useful data-verification coverage but not required for the initial automation MVP. | Backlog |
| TS-LEAVE-003 | TC-LEAVE-009 | Assign leave to an employee with valid information | P1 | Pending Oracle | - | - | Valid assignment has automation value, but successful assignment feedback and resulting state require further confirmation. | Pending |
| TS-LEAVE-003 | TC-LEAVE-010 | Submit leave assignment with required information missing | P1 | Pending Oracle | - | - | Exact required fields and validation behavior require further confirmation. | Pending |
| TS-LEAVE-003 | TC-LEAVE-011 | Assign leave when employee has insufficient leave balance | P0 | Selected | AT-LEAVE-011 | Regression | Observed insufficient-balance workflow provides a meaningful and repeatable business-rule regression test. | Planned |
| TS-LEAVE-004 | TC-LEAVE-012 | Approve a pending leave request | P0 | Selected | AT-LEAVE-012 | Smoke | Critical Leave state transition with high business impact. | Planned |
| TS-LEAVE-004 | TC-LEAVE-013 | Reject a pending leave request | P0 | Selected | AT-LEAVE-013 | Regression | Critical Leave state transition with high regression value. | Planned |
| TS-LEAVE-004 | TC-LEAVE-014 | Verify leave request status after approval or rejection | P0 | Pending Oracle | - | - | Status persistence after navigation or refresh requires further confirmation before reliable automation. | Pending |

### Leave Automation Summary

| Metric | Value |
|---|---|
| Test Scenarios | 4 |
| Test Cases | 14 |
| Selected | 5 |
| Backlog | 4 |
| Manual | 0 |
| Pending Oracle | 5 |
| Deferred Scope | 0 |
| Initial Automation Coverage | 35.7% |

The lower initial automation percentage for Leave is intentional.

Several Leave Test Cases remain valuable functional coverage but require stronger test oracles before being implemented as deterministic Playwright regression tests.

---

# 7. Overall Automation Coverage Summary

## 7.1 Coverage by Module

| Module | Test Scenarios | Test Cases | Selected for MVP Automation | Initial Automation Coverage |
|---|---|---|---|---|
| Authentication | 3 | 9 | 9 | 100.0% |
| PIM / Employee Management | 4 | 19 | 11 | 57.9% |
| Leave Management | 4 | 14 | 5 | 35.7% |
| **Total** | **11** | **42** | **25** | **59.5%** |

Automation Coverage is calculated as:

`Selected Test Cases / Total Test Cases × 100`

The automation percentage represents implementation selection rather than total functional test coverage.

Test Cases retained as Manual, Backlog, Pending Oracle, or Deferred Scope remain part of the overall test design and coverage model.

---

## 7.2 Coverage by Automation Decision

| Automation Decision | Test Cases | Percentage |
|---|---|---|
| Selected | 25 | 59.5% |
| Backlog | 7 | 16.7% |
| Manual | 4 | 9.5% |
| Pending Oracle | 5 | 11.9% |
| Deferred Scope | 1 | 2.4% |
| **Total** | **42** | **100%** |

---

## 7.3 Selected Automation by Module

| Module | Selected Automated Tests |
|---|---|
| Authentication | 9 |
| PIM / Employee Management | 11 |
| Leave Management | 5 |
| **Total** | **25** |

---

# 8. Smoke Suite Selection

The initial Smoke suite contains a focused subset of the selected automated tests.

| Automated Test ID | Test Case ID | Module | Workflow | Priority |
|---|---|---|---|---|
| AT-AUTH-001 | TC-AUTH-001 | Authentication | Valid Login | P0 |
| AT-AUTH-007 | TC-AUTH-007 | Authentication | Logout | P0 |
| AT-AUTH-009 | TC-AUTH-009 | Authentication | Protected-resource access after logout | P0 |
| AT-PIM-006 | TC-PIM-006 | PIM | Create Employee | P0 |
| AT-PIM-013 | TC-PIM-013 | PIM | Update Employee | P0 |
| AT-PIM-018 | TC-PIM-018 | PIM | Delete Employee | P0 |
| AT-LEAVE-012 | TC-LEAVE-012 | Leave | Approve Leave | P0 |

### Smoke Suite Size

`7 Automated Tests`

The Smoke suite intentionally focuses on essential system availability and critical business transactions rather than exhaustive validation coverage.

All Smoke tests may also participate in the complete Regression suite.

---

# 9. Regression Suite Selection

The MVP Regression suite consists of all 25 Test Cases selected for automation.

The Regression suite therefore includes:

- 7 Smoke tests.
- 18 additional Regression tests.

### Authentication Regression Coverage

`AT-AUTH-001`
`AT-AUTH-002`
`AT-AUTH-003`
`AT-AUTH-004`
`AT-AUTH-005`
`AT-AUTH-006`
`AT-AUTH-007`
`AT-AUTH-008`
`AT-AUTH-009`

### PIM Regression Coverage

`AT-PIM-001`
`AT-PIM-003`
`AT-PIM-006`
`AT-PIM-007`
`AT-PIM-011`
`AT-PIM-012`
`AT-PIM-013`
`AT-PIM-014`
`AT-PIM-016`
`AT-PIM-018`
`AT-PIM-019`

### Leave Regression Coverage

`AT-LEAVE-003`
`AT-LEAVE-004`
`AT-LEAVE-011`
`AT-LEAVE-012`
`AT-LEAVE-013`

---

# 10. Manual Coverage

The following Test Cases are intentionally retained as manual coverage.

| Test Case ID | Module | Reason |
|---|---|---|
| TC-PIM-008 | PIM | Intended Employee ID format requirement is not confirmed. |
| TC-PIM-009 | PIM | Whitespace normalization/trimming requirement is not confirmed. |
| TC-PIM-010 | PIM | Search behavior involving stored whitespace is observed but should not yet become a regression contract. |
| TC-PIM-015 | PIM | Empty Employee ID is accepted during update, but the intended business requirement is undocumented. |

These Test Cases may later be reconsidered for automation if explicit requirements or stable expected behaviors become available.

---

# 11. Pending Oracle Coverage

The following Test Cases have meaningful automation value but require further behavioral confirmation.

| Test Case ID | Module | Required Clarification |
|---|---|---|
| TC-LEAVE-001 | Leave | Confirm successful Apply Leave feedback and resulting request state. |
| TC-LEAVE-002 | Leave | Confirm required fields and exact validation behavior. |
| TC-LEAVE-009 | Leave | Confirm successful Assign Leave feedback and resulting state. |
| TC-LEAVE-010 | Leave | Confirm required fields and exact validation behavior for Assign Leave. |
| TC-LEAVE-014 | Leave | Confirm request status persistence after navigation or refresh. |

Pending Oracle Test Cases should not receive an `AT-*` identifier until their expected behavior is sufficiently deterministic for regression automation.

---

# 12. Backlog Coverage

The following Test Cases are considered valid future automation candidates but are not prioritized for the MVP.

| Test Case ID | Module | Reason |
|---|---|---|
| TC-PIM-002 | PIM | Lower-risk negative employee search condition. |
| TC-PIM-005 | PIM | Reset behavior has lower regression value than core search/filter operations. |
| TC-PIM-017 | PIM | Delete cancellation is a valid workflow branch but lower priority than deletion and post-deletion verification. |
| TC-LEAVE-005 | Leave | Basic record-viewing coverage has lower MVP priority. |
| TC-LEAVE-006 | Leave | Leave search is useful but lower priority than core Leave transactions. |
| TC-LEAVE-007 | Leave | Leave filtering is useful but lower priority than core Leave transactions. |
| TC-LEAVE-008 | Leave | Supporting data/status verification can be added after critical Leave workflows are stable. |

Backlog Test Cases may be promoted to `Selected` in later automation iterations without changing the approved Test Scenario scope.

---

# 13. Deferred Scope

| Test Case ID | Module | Reason |
|---|---|---|
| TC-PIM-004 | PIM | Advanced multi-criteria employee filtering belongs to Candidate Scope rather than the current MVP automation scope. |

Deferred Scope differs from Backlog:

- **Backlog** indicates an in-scope Test Case that is not currently prioritized for automation.
- **Deferred Scope** indicates that the behavior is not part of the current MVP automation implementation scope.

---

# 14. Automation Implementation Principles

The Playwright implementation should follow the principles below.

### 14.1 Independent Execution

Automated tests should not depend on another automated test having executed successfully.

For example:

`AT-PIM-012`

must create or prepare its own employee test data rather than depending on:

`AT-PIM-006`

to run first.

### 14.2 Reusable Setup

Common setup operations should be implemented through reusable fixtures, helpers, Page Objects, or test-data utilities where appropriate.

Examples include:

- Authentication setup.
- Employee creation.
- Employee lookup.
- Leave request preparation.
- Test data generation.

### 14.3 Deterministic Assertions

Assertions should verify observable application behavior rather than inferred or undocumented requirements.

### 14.4 No Fixed Execution Dependencies

The test suite should support independent execution and configurable parallel execution.

Tests should not rely on execution order or fixed waits to establish application state.

### 14.5 Stable Test Data

Unique or isolated test data should be generated where required to avoid collisions between executions.

Examples include:

- Employee IDs.
- Employee names used for retrieval.
- Records created specifically for update or deletion tests.

### 14.6 Evidence-Based Automation

Observed behavior should only become an automated regression contract when the expected outcome is sufficiently reliable and appropriate to preserve.

Exploratory observations with unresolved requirements should remain Manual or Pending Oracle until clarified.

---

# 15. Automation Implementation Order

The selected automation should be implemented incrementally according to business risk, dependency value, and framework maturity.

## Phase 1 - Authentication

Implement all selected Authentication tests:

`AT-AUTH-001 → AT-AUTH-009`

Authentication is implemented first because authenticated state is required by the PIM and Leave modules.

## Phase 2 - PIM Core CRUD

Prioritize:

1. `AT-PIM-006` - Create Employee
2. `AT-PIM-012` - Create persistence
3. `AT-PIM-013` - Update Employee
4. `AT-PIM-016` - Update persistence
5. `AT-PIM-018` - Delete Employee
6. `AT-PIM-019` - Delete integrity

## Phase 3 - PIM Search and Validation

Implement:

- `AT-PIM-001`
- `AT-PIM-003`
- `AT-PIM-007`
- `AT-PIM-011`
- `AT-PIM-014`

## Phase 4 - Leave

Implement the currently selected deterministic Leave tests:

- `AT-LEAVE-003`
- `AT-LEAVE-004`
- `AT-LEAVE-011`
- `AT-LEAVE-012`
- `AT-LEAVE-013`

Pending Oracle Leave Test Cases may be added after their expected behaviors have been confirmed.

---

# 16. CI/CD Execution Strategy

The initial automation suites are intended to support the following CI/CD execution model.

### Pull Request / Fast Validation

Execute:

`Smoke Suite`

Purpose:

- Detect critical regressions quickly.
- Validate essential application functionality.
- Provide faster feedback before broader regression execution.

### Main Branch / Full Regression

Execute:

`Complete MVP Regression Suite`

Purpose:

- Execute all 25 selected automated tests.
- Validate Authentication, PIM, and selected Leave regression coverage.
- Produce the configured Playwright HTML report and failure evidence.

The exact GitHub Actions workflow and execution triggers will be finalized during the CI/CD implementation phase.

---

# 17. Traceability Maintenance Rules

The Traceability Matrix should be updated whenever automation coverage changes.

### When a Planned Automated Test is implemented

Example:

`TC-AUTH-001 → AT-AUTH-001`

Update:

`Status: Planned → Automated`

### When a Backlog Test Case is selected

Update:

`Automation Decision: Backlog → Selected`

Assign the corresponding `AT-*` identifier and execution suite.

### When a Pending Oracle is clarified

If the expected behavior becomes deterministic and appropriate for regression automation:

`Pending Oracle → Selected`

Otherwise:

`Pending Oracle → Manual`

or:

`Pending Oracle → Not Automated`

as appropriate.

### When an automated test is removed

The Test Case should not automatically be removed from test coverage.

Instead, update the automation decision and retain traceability to explain why automation coverage changed.

---

# 18. Final Traceability Summary

The current MVP test design contains:

- **11 Test Scenarios**
- **42 Test Cases**
- **25 Test Cases selected for MVP automation**
- **7 Backlog Test Cases**
- **4 Manual Test Cases**
- **5 Pending Oracle Test Cases**
- **1 Deferred Scope Test Case**
- **7 Smoke Tests**
- **25 total tests in the planned MVP Regression suite**

The resulting traceability model is:

`Test Scenario → Test Case → Automation Decision → Automated Test → Execution Suite`

This structure separates functional test coverage from automation coverage and allows the framework to expand incrementally without requiring all defined Test Cases to be automated.