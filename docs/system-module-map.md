# System & Module Map

## 1. Purpose

This document maps the major application modules and business workflows identified during system exploration.

The purpose is to define a risk-based automation scope for the Workforce Management System Automation Framework.

Automation priorities are determined based on:

- Business criticality
- Risk
- Automation value
- Exploration depth
- Workflow stability and testability

This document defines the initial scope for the automation MVP. It does not represent the complete functional test scope of the application.

---

## 2. Scope Classification

The following matrix classifies each major application module based on business criticality, risk, automation value, priority, and current automation scope.

| Module | Business Criticality | Risk | Automation Value | Priority | Scope |
|---|---|---|---|---|---|
| Authentication | High | High | High | P0 | In Scope |
| PIM / Employee Management | High | High | High | P0 | In Scope |
| Leave | High | High | High | P1 | In Scope |
| Admin | High | High | Medium | P1 | Candidate Scope |
| Dashboard | Medium | Medium | Medium | P2 | Candidate Scope |
| Time | High | Medium | Medium | P2 | Candidate Scope |
| Recruitment | Medium | Medium | Medium | P3 | Out of MVP Scope |
| Performance | Medium | Medium | Medium | P3 | Out of MVP Scope |
| Directory | Low | Low | Medium | P3 | Out of MVP Scope |
| Buzz | Low | Low | Low | P3 | Out of MVP Scope |
| Claim | Medium | Medium | Medium | P3 | Out of MVP Scope |

### Priority Definitions

- **P0 — Critical:** Core workflows that must be included in the primary automation suite.
- **P1 — High:** High-value workflows that should be automated after the P0 foundation.
- **P2 — Medium:** Valuable candidates for future expansion once the core suite is established.
- **P3 — Low:** Deferred or excluded from the current MVP due to lower relative ROI or insufficient exploration evidence.

### Scope Definitions

- **In Scope:** Confirmed as part of the current automation MVP.
- **Candidate Scope:** Potentially valuable for automation but requires further exploration or prioritization before inclusion.
- **Out of MVP Scope:** Explicitly excluded from the current MVP and reserved for potential future expansion.

---

## 3. Module Assessment

### 3.1 Authentication

- **Business Criticality: High**  
  Authentication is the entry point to protected application workflows. Login and logout behavior directly affects users' ability to access and exit the system.

- **Risk: High**  
  Authentication failures can prevent legitimate users from accessing the application. Post-logout Browser Back behavior also requires regression coverage because previously visited authenticated content may remain visible through browser cache.

- **Automation Value: High**  
  Login, validation, invalid-credential, and logout scenarios are deterministic, repeatable, and frequently executed, making them strong candidates for automated regression testing.

- **Decision: In Scope**

---

### 3.2 PIM / Employee Management

- **Business Criticality: High**
  PIM manages core employee information and supports key employee lifecycle workflows, including searching, creating, editing, and deleting employee records.

- **Risk: High** 
  PIM operations directly affect employee master data. Incorrect validation, persistence, update, or deletion behavior can lead to inaccurate or inconsistent employee records.

- **Automation Value: High** 
  PIM provides repeatable CRUD workflows, deterministic validation scenarios, data-persistence checks, and high regression value. It is also well suited for demonstrating reusable Page Object and test-data patterns.

- **Decision: In Scope**

---

### 3.3 Leave 

- **Business Criticality: High** 
  Leave Management supports employee leave requests, leave balances, assignment, and approval workflows, making it an important employee-management function.

- **Risk: High**
  Leave workflows contain business rules such as date-range validation and leave-balance constraints. Incorrect behavior can result in invalid leave requests or incorrect approval outcomes.

- **Automation Value: High** 
  Leave workflows provide deterministic validation, business-rule assertions, and state-transition scenarios that are suitable for repeatable automated regression testing.

- **Decision: In Scope**

---

### 3.4 Admin

- **Business Criticality: High**
  Admin provides system-level functionality such as User Management, Job, Organization, Nationalities, and configuration-related features that can affect application administration.

- **Risk: High**
  Administrative actions can affect system users and configuration. In addition, role-based access behavior has not yet been fully validated, creating additional uncertainty around authorization-related risks.

- **Automation Value: Medium**
  Admin workflows are potentially valuable for automation, but some areas require further exploration, particularly User Management and RBAC behavior, before committing them to the core automation scope.

- **Decision: Candidate Scope**

---

### 3.5 Dashboard

- **Business Criticality: Medium** 
  Dashboard provides an overview of employee-related information and serves as a central navigation point after login, but most core transactional workflows are handled in other modules.

- **Risk: Medium** 
  Dashboard failures may affect information visibility and navigation, but generally have less direct impact on underlying employee or leave data.

- **Automation Value: Medium**  
  Basic dashboard loading and navigation checks can provide useful smoke-test coverage. However, comprehensive automation of individual dashboard widgets provides lower regression value than core transactional workflows.

- **Decision: Candidate Scope**

---

### 3.6 Time

- **Business Criticality: High**  
  Time Management supports timesheets, attendance-related actions, customers, projects, and activities, which are relevant to employee work records.

- **Risk: Medium** 
  Time-related data can have significant business impact, but the current exploration only provides a high-level understanding of the module and does not yet establish sufficient evidence for a higher risk classification.

- **Automation Value: Medium**  
  Time workflows may provide valuable automation opportunities, but further exploration is required to identify stable business workflows, validation rules, state transitions, and test-data requirements.

- **Decision: Candidate Scope**

---

### 3.7 Recruitment

- **Business Criticality: Medium** 
  Recruitment supports vacancy and candidate management and provides functionality for tracking candidates through different recruitment stages.

- **Risk: Medium** 
  Candidate lifecycle behavior has business relevance, but the current exploration does not provide sufficient detail on validation, permissions, state-transition rules, or data integrity.

- **Automation Value: Medium** 
  Recruitment workflows are potentially suitable for automation, but the current exploration depth and project constraints do not justify prioritizing them for the MVP.

- **Decision: Out of MVP Scope**

---

### 3.8 Performance

- **Business Criticality: Medium** 
  Performance supports KPI configuration, performance reviews, and employee trackers, providing functionality related to employee performance management.

- **Risk: Medium**
  Performance-related data can be significant, but the current exploration does not sufficiently establish the module's validation rules, review lifecycle, permissions, or data dependencies.

- **Automation Value: Medium** 
  Performance workflows may be automated, but they require additional domain-specific exploration and test-data preparation before providing sufficient ROI for the current MVP.

- **Decision: Out of MVP Scope**

---

### 3.9 Directory
- **Business Criticality: Low** 
  Directory primarily provides searchable employee contact and profile information and does not directly manage core transactional employee workflows.

- **Risk: Low** 
  Incorrect Directory behavior would primarily affect information discovery and visibility rather than directly modifying core employee or business data.

- **Automation Value: Medium** 
  Search and filtering functionality is technically suitable for automation, but its regression value is lower than the core workflows selected for the MVP.

- **Decision: Out of MVP Scope**

---

### 3.10 Buzz

- **Business Criticality: Low** 
  Buzz provides internal social and communication features such as posts, likes, comments, and image sharing, which are not part of the core employee-management workflows prioritized for this project.

- **Risk: Low** 
  Failures in Buzz are expected to have limited impact on core employee records or primary business workflows.

- **Automation Value: Low** 
  Although individual interactions can be automated, the workflows have relatively low regression value for the objectives of this automation framework.

- **Decision: Out of MVP Scope**

---

### 3.11 Claim

- **Business Criticality: Medium** 
  Claim supports employee expense-related activities such as business travel, client entertainment, and project-related purchases.

- **Risk: Medium** 
  Claim data may have business significance, but the current exploration does not provide enough evidence about its validation rules, approval flow, or data integrity requirements to justify a higher risk classification.

- **Automation Value: Medium** 
  Claim workflows may be suitable for automation, but the module has not been explored sufficiently to justify investment within the current MVP.

- **Decision: Out of MVP Scope**

---

## 4. Initial Automation Scope

The initial automation scope is divided into three categories: In Scope — MVP, Candidate Scope, and Out of MVP Scope.

The MVP focuses on high-priority workflows that provide meaningful regression coverage and can be implemented using a maintainable automation framework.

### 4.1 In Scope — MVP

#### Authentication

- Valid Login: Verify successful authentication and redirection to Dashboard.
- Required Field Validation: Verify validation behavior when Username and/or Password is empty.
- Invalid Login: Verify authentication failure and corresponding error messages.
- Logout: Verify successful logout and post-logout access behavior, including Browser Back handling.

---

#### PIM / Employee Management

##### Employee Search and Filtering

- Search employees using relevant employee information.
- Verify search results for matching and non-matching criteria.
- Verify filter behavior and reset functionality.

##### Add Employee

- Create a new employee with valid information.
- Verify successful employee creation.
- Verify required-field validation.
- Verify invalid Employee ID behavior.
- Verify employee data persistence after creation.

##### Edit Employee

- Update existing employee information.
- Verify successful update.
- Verify updated data persistence after saving.
- Verify validation behavior for invalid or empty input where applicable.

##### Delete Employee 

- Open the employee deletion confirmation dialog.
- Cancel employee deletion and verify that the employee remains available.
- Confirm employee deletion and verify successful deletion.
- Verify deletion-related notification behavior.

---

#### Leave

##### Apply Leave

- Submit a leave request with valid information.
- Verify required-field validation.
- Verify invalid date-range validation.
- Verify insufficient leave-balance behavior.

##### Leave List

- View leave records.
- Search and filter leave records.
- Verify relevant leave information and request status.

##### Assign Leave

- Assign leave to an employee with valid information.
- Verify required-field validation.
- Verify leave assignment behavior.

##### Leave Approval
- Approve a leave request.
- Reject a leave request.
- Verify corresponding request status changes.

---

### 4.2 Candidate Scope

The following workflows may be considered for future automation after the core MVP framework is stable.

#### PIM / Employee Management

- Advanced multi-criteria employee filtering using combinations of Job Title, Employment Status, and Sub Unit.
- Additional employee search and filter combinations.
- Additional edge-case validation scenarios identified during test implementation.

---

#### Admin

**User Management**
- Create a new system user.
- Validate required fields and user information.
- Explore role assignment behavior.
- Verify role-based access behavior using different user roles.

**Configuration**
- Explore selected administrative configuration workflows for potential automation candidates.

---

#### Dashboard

**Dashboard Smoke / Navigation**
- Verify Dashboard loads successfully after authentication.
- Verify selected Quick Launch shortcuts.
- Verify navigation from Quick Launch to the corresponding modules.

---

#### Time

**Timesheet / Attendance**
- Further explore Timesheet workflows.
- Further explore Punch In / Punch Out behavior.
- Identify validation and state-transition scenarios.
- Evaluate suitable workflows for future automation.

---

### 4.3 Out of MVP Scope

The following modules are explicitly excluded from the current automation MVP:

- Recruitment
- Performance
- Directory
- Buzz
- Claim

These modules may be reconsidered in future automation phases if project scope, exploration depth, and automation priorities change.

---

## 5. Scope Rationale

The automation scope is defined using a risk-based and value-driven approach rather than attempting to automate the entire application.

The objective of the MVP is to establish a maintainable automation framework and demonstrate meaningful regression coverage across high-value workflows.

### 5.1 Risk-Based Prioritization

Modules and workflows are prioritized based on three primary factors:

- Business Criticality — How important the functionality is to core application operations.
- Risk — The potential impact of incorrect behavior or regression.
- Automation Value — How suitable the workflow is for repeatable, reliable, and maintainable automated testing.

Higher-priority areas are selected when they provide a stronger combination of business importance, risk exposure, and automation suitability.

This approach prevents automation effort from being distributed evenly across the entire application without considering actual testing value.

### 5.2 Business Value and Regression Coverage

Authentication, PIM / Employee Management, and Leave were selected as the MVP scope because together they provide meaningful coverage across foundational and transactional workflows:

- Authentication covers application access, credential validation, logout, and session-related behavior.
- PIM / Employee Management covers core employee lifecycle operations, including search, creation, update, and deletion.
- Leave covers employee leave workflows, validation rules, request states, assignment, and approval behavior.

Together, these modules provide a practical foundation for demonstrating automated regression testing across multiple workflow types.

### 5.3 Automation Suitability

The MVP focuses on workflows that are:

- Repeatable.
- Deterministic.
- Associated with clear expected outcomes.
- Suitable for reliable assertions.
- Likely to provide recurring regression value.

The selected workflows also provide opportunities to demonstrate maintainable automation practices, including:

- Reusable Page Objects.
- Test data management.
- Stable locator strategies.
- Explicit assertions.
- Shared authentication handling.
- Positive and negative test scenarios.
- Workflow-level test organization.

The goal is therefore not to maximize the number of automated test cases, but to maximize the quality and maintainability of automation coverage.

### 5.4 MVP Boundary and Resource Constraints

The application contains a broader set of modules and workflows that may have business value. However, attempting to automate the entire system within the initial project scope would increase implementation complexity and reduce focus on the core framework.

Candidate and out-of-MVP modules are therefore deferred until:

- The core automation framework is stable.
- Additional system exploration has been completed.
- Relevant business rules and expected behaviors are sufficiently understood.
- The additional automation provides sufficient regression value relative to its implementation and maintenance cost.

This allows the project to maintain a clear and achievable MVP boundary while leaving room for future expansion.

## 6. Scope Risks and Assumptions

### 6.1 Assumptions

- The Dockerized OrangeHRM environment remains available and stable throughout automation development.
- The available Admin account can be used for MVP automation.
- The selected MVP workflows remain sufficiently stable during implementation.
- Required test data can be created, reused, or reset when necessary.
- The application behavior observed during system exploration remains representative of the target environment used for automation.

### 6.2 Risks and Limitations

- **RBAC Validation:** Role-based access behavior has not been fully validated because a regular Employee account is not currently available.
- **Exploration Depth:** Time, Recruitment, Performance, Directory, and other lower-priority modules have not been explored to the same depth as the MVP modules.
- **Unclear Business Rules:** Some business rules identified during exploration remain unclear and may require further investigation before automation coverage is expanded.
- **UI Stability:** Changes to the application's UI structure may affect locator stability and require test maintenance.
- **Test Data Dependency:** Some workflows may depend on specific employee, leave, user, or organizational data being available in the test environment.
- **Data Integrity:** The impact of employee deletion on related historical Time or Leave data requires further validation.
- **Scope Evolution:** Candidate workflows may be promoted into the automation scope, deferred further, or removed if subsequent exploration changes their assessed risk, business value, or automation suitability.

### 6.3 Scope Change Principle

Any significant scope change should be supported by new evidence from system exploration, test implementation, or risk assessment rather than being made solely to increase automation coverage.

The current scope should therefore be treated as a controlled baseline that can evolve when new evidence justifies the change.