# Test Cases - Workforce Management System Automation Framework

## 1. Introduction

### 1.1 Purpose

The test cases translate each high-level test scenario into specific test conditions, input variations, execution steps, and expected results that can be manually executed and subsequently automated using Playwright.

Each test case is traceable to its parent Test Scenario through the `Scenario ID`.

### 1.2 Scope

The test cases cover the defined and finalized MVP automation scope:

- Authentication
- PIM / Employee Management
- Leave Management

The test cases are derived from the 11 defined and finalized test scenarios and are designed to support risk-based functional and regression testing.

## 2. Test Case Design Principles

The test cases are designed according to the following principles:

- **Scenario traceability** - Every test case references a valid `TS-*` identifier defined in `test-scenarios.md`.
- **Specific test conditions** - Each test case represents a concrete condition, input variation, business rule, or system behavior.
- **Positive and negative coverage** - Both expected successful behavior and invalid or unexpected conditions are considered where applicable.
- **Risk-based prioritization** - Test case priority reflects the potential business impact and testing value of the condition.
- **Test data isolation** - Test data requirements are explicitly defined to reduce test-order dependencies.
- **Independent execution** - Test cases should be executable independently whenever practical.
- **Expected-result clarity** - Expected results are defined as observable and objectively verifiable system behavior.
- **Automation readiness** - Test cases selected for automation should have deterministic outcomes and repeatable execution conditions.
- **Evidence-based design** - Test cases are based on observed system behavior, defined and finalized scope, and identified business or validation rules rather than unverified assumptions.

---

## 3. Test Case Structure

Each test case follows the structure below:

| Field | Description |
|---|---|
| Test Case ID | Unique identifier using the `TC-*` convention |
| Scenario ID | Parent Test Scenario identifier |
| Test Case Title | Specific condition or behavior being tested |
| Priority | Risk-based execution priority |
| Test Type | Functional classification of the test case |
| Precondition | Required system state before execution |
| Test Data | Input data required for execution |
| Steps | Detailed actions performed during the test |
| Expected Result | Observable expected system behavior |
| Automation Status | Current automation implementation status | 

### Test Case ID Convention

Test Case IDs follow the format:

`TC-[MODULE]-[NUMBER]`

### Automation Status

The following values are used:

- `Planned` - Test case is intended for automation but has not yet been implemented.
- `Automated` - Test case has corresponding automated coverage.
- `Manual` - Test case is currently executed manually.
- `Not Automated` - Test case is intentionally excluded from automation.

---

## 4. Detailed Test Cases

### 4.1 Authentication

#### TC-AUTH-001 - Login with valid credentials

| Field | Value |
|---|---|
| Test Case ID | TC-AUTH-001 |
| Scenario ID | TS-AUTH-001 |
| Priority | P0 |
| Test Type | Positive |
| Automation Status | Automated |

**Precondition**

- User is on the Login page.
- A valid test account is available.
- The OrangeHRM application is accessible.

**Test Data**

- Username: Valid test username
- Password: Valid test password

**Steps**

1. Enter a valid username in the Username field.
2. Enter a valid password in the Password field.
3. Click the Login button.

**Expected Result**

- The login request is accepted.
- The user is successfully authenticated.
- The user is redirected to the expected authenticated area of the application.
- The authenticated session is established successfully.

---

#### TC-AUTH-002 - Login with invalid username

| Field | Value |
|---|---|
| Test Case ID | TC-AUTH-002 |
| Scenario ID | TS-AUTH-001 |
| Priority | P0 |
| Test Type | Negative |
| Automation Status | Automated |

**Precondition**

- User is on the Login page.
- A valid password is available.

**Test Data**

- Username: Invalid username
- Password: Valid password

**Steps**

1. Enter an invalid username.
2. Enter a valid password.
3. Click the Login button.

**Expected Result**

- Authentication fails.
- The user remains on the Login page.
- An appropriate authentication error message is displayed.
- The user is not granted access to the authenticated area.

---

#### TC-AUTH-003 - Login with invalid password

| Field | Value |
|---|---|
| Test Case ID | TC-AUTH-003 |
| Scenario ID | TS-AUTH-001 |
| Priority | P0 |
| Test Type | Negative |
| Automation Status | Automated |

**Precondition**

- User is on the Login page.
- A valid username is available.

**Test Data**

- Username: Valid username
- Password: Invalid password

**Steps**

1. Enter a valid username.
2. Enter an invalid password.
3. Click the Login button.

**Expected Result**

- Authentication fails.
- The user remains on the Login page.
- An appropriate authentication error message is displayed.
- The user is not granted access to the authenticated area.

---

#### TC-AUTH-004 - Login with empty username

| Field | Value |
|---|---|
| Test Case ID | TC-AUTH-004 |
| Scenario ID | TS-AUTH-001 |
| Priority | P1 |
| Test Type | Validation |
| Automation Status | Automated |

**Precondition**

- User is on the Login page.

**Test Data**

- Username: Empty
- Password: Valid password

**Steps**

1. Leave the Username field empty.
2. Enter a valid password.
3. Click the Login button.

**Expected Result**

- The login request is not accepted.
- The Username field displays the appropriate required-field validation.
- The user remains on the Login page.
- The user is not authenticated.

---

#### TC-AUTH-005 - Login with empty password

| Field | Value |
|---|---|
| Test Case ID | TC-AUTH-005 |
| Scenario ID | TS-AUTH-001 |
| Priority | P1 |
| Test Type | Validation |
| Automation Status | Automated |

**Precondition**

- User is on the Login page.

**Test Data**

- Username: Valid username
- Password: Empty

**Steps**

1. Enter a valid username.
2. Leave the Password field empty.
3. Click the Login button.

**Expected Result**

- The login request is not accepted.
- The Password field displays the appropriate required-field validation.
- The user remains on the Login page.
- The user is not authenticated.

---

#### TC-AUTH-006 - Login with both username and password empty

| Field | Value |
|---|---|
| Test Case ID | TC-AUTH-006 |
| Scenario ID | TS-AUTH-001 |
| Priority | P2 |
| Test Type | Validation |
| Automation Status | Automated |

**Precondition**

- User is on the Login page.

**Test Data**

- Username: Empty
- Password: Empty

**Steps**

1. Leave the Username field empty.
2. Leave the Password field empty.
3. Click the Login button.

**Expected Result**

- The login request is not accepted.
- Required-field validation is displayed for the applicable fields.
- The user remains on the Login page.
- The user is not authenticated.

---

#### TC-AUTH-007 - Logout from an authenticated session

| Field | Value |
|---|---|
| Test Case ID | TC-AUTH-007 |
| Scenario ID | TS-AUTH-002 |
| Priority | P0 |
| Test Type | Positive / State Transition |
| Automation Status | Automated |

**Precondition**

- User is successfully authenticated.
- User is on an authenticated page.

**Test Data**

- Valid authenticated test session.

**Steps**

1. Open the user account menu.
2. Select the Logout option.

**Expected Result**

- The authenticated session is terminated.
- The user is redirected to the Login page.
- The user can no longer access the authenticated session through the previous session state.

---

#### TC-AUTH-008 - Browser Back after logout

| Field | Value |
|---|---|
| Test Case ID | TC-AUTH-008 |
| Scenario ID | TS-AUTH-003 |
| Priority | P0 |
| Test Type | Session / Security |
| Automation Status | Automated |

**Precondition**

- User has successfully authenticated.
- User has accessed an authenticated page.
- User has logged out successfully.

**Test Data**

- Existing authenticated session that has been terminated through logout.

**Steps**

1. Complete the logout operation.
2. Use the browser Back action.
3. Attempt to interact with the previously authenticated page.

**Expected Result**

- The system does not allow the user to resume the authenticated session.
- Access to protected functionality is prevented.
- The user is redirected to or required to return to the Login page before accessing protected resources.
- The previously authenticated session is not restored.

---

#### TC-AUTH-009 - Direct navigation to a protected resource after logout

| Field | Value |
|---|---|
| Test Case ID | TC-AUTH-009 |
| Scenario ID | TS-AUTH-003 |
| Priority | P0 |
| Test Type | Session / Security |
| Automation Status | Automated |

**Precondition**

- User has successfully authenticated.
- User has accessed a protected resource.
- User has logged out successfully.
- The URL of a protected resource is known.

**Test Data**

- URL of an authenticated/protected resource.

**Steps**

1. Complete the logout operation.
2. Navigate directly to the protected resource URL.
3. Observe the resulting application state.

**Expected Result**

- The protected resource is not accessible to the logged-out user.
- The system redirects the user to the Login page or otherwise requires authentication.
- The previously authenticated session is not restored.

---

### 4.2 PIM / Employee Management

#### TC-PIM-001 - Search employees using valid employee information

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-001 |
| Scenario ID | TS-PIM-001 |
| Priority | P1 |
| Test Type | Positive |
| Automation Status | Automated |

**Precondition**

- User is authenticated.
- User has access to PIM / Employee Management.
- At least one existing employee record is available.

**Test Data**

- Valid employee information matching an existing employee.

**Steps**

1. Navigate to the PIM / Employee Management module.
2. Enter valid employee information into the applicable search field.
3. Execute the search.

**Expected Result**

- The search is executed successfully.
- Matching employee records are displayed.
- The returned employee information corresponds to the search criteria.

---

#### TC-PIM-002 - Search with information that has no matching employee

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-002 |
| Scenario ID | TS-PIM-001 |
| Priority | P2 |
| Test Type | Negative |
| Automation Status | Planned |

**Precondition**

- User is authenticated.
- User has access to PIM / Employee Management.

**Test Data**

- Employee information that does not correspond to an existing employee.

**Steps**

1. Navigate to the PIM / Employee Management module.
2. Enter non-matching employee information.
3. Execute the search.

**Expected Result**

- The search is executed successfully.
- No employee record matching the search criteria is returned.
- The application displays the appropriate no-result state.

---

#### TC-PIM-003 - Apply available employee filters

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-003 |
| Scenario ID | TS-PIM-001 |
| Priority | P1 |
| Test Type | Functional |
| Automation Status | Automated |

**Precondition**

- User is authenticated.
- User has access to PIM / Employee Management.
- Employee records exist for the selected filter criteria.

**Test Data**

- Valid values for the available employee filters.

**Steps**

1. Navigate to the PIM / Employee Management module.
2. Select valid filter criteria.
3. Execute the search/filter operation.

**Expected Result**

- The filter operation is executed successfully.
- The displayed employee records satisfy the selected filter criteria.
- Records that do not satisfy the criteria are excluded from the filtered result.

---

#### TC-PIM-004 - Apply multiple search and filter criteria

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-004 |
| Scenario ID | TS-PIM-001 |
| Priority | P2 |
| Test Type | Business / Functional |
| Automation Status | Planned |

**Precondition**

- User is authenticated.
- User has access to PIM / Employee Management.
- Suitable employee data exists for the selected criteria.

**Test Data**

- A valid combination of employee search and filter criteria.

**Steps**

1. Navigate to the PIM / Employee Management module.
2. Enter the applicable employee search information.
3. Select additional filter criteria.
4. Execute the search/filter operation.

**Expected Result**

- The search/filter operation is executed successfully.
- The resulting employee list satisfies the combined criteria.
- Employees that do not satisfy the combined criteria are not returned.

---

#### TC-PIM-005 - Reset search and filter criteria

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-005 |
| Scenario ID | TS-PIM-001 |
| Priority | P2 |
| Test Type | Functional |
| Automation Status | Planned |

**Precondition**

- User is authenticated.
- User is on the PIM / Employee Management page.
- Search or filter criteria have been applied.

**Test Data**

- Previously entered search and filter criteria.

**Steps**

1. Apply search or filter criteria.
2. Execute the search/filter operation.
3. Select the Reset option.

**Expected Result**

- Search and filter fields are reset to their default state.
- The filtered/search result is cleared.
- The employee list returns to its default unfiltered state.

---

#### TC-PIM-006 - Create an employee with valid required information

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-006 |
| Scenario ID | TS-PIM-002 |
| Priority | P0 |
| Test Type | Positive |
| Automation Status | Automated |

**Precondition**

- User is authenticated.
- User has permission to create employees.
- A unique Employee ID is available.

**Test Data**

- Valid employee first name.
- Valid employee last name.
- Valid unique Employee ID.
- Other required employee information.

**Steps**

1. Navigate to the Add Employee page.
2. Enter valid employee information.
3. Enter a valid unique Employee ID.
4. Submit the employee creation form.

**Expected Result**

- The employee is created successfully.
- The application displays the appropriate success feedback.
- The employee record is available for subsequent retrieval.

---

#### TC-PIM-007 - Submit employee creation with required name fields empty

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-007 |
| Scenario ID | TS-PIM-002 |
| Priority | P1 |
| Test Type | Negative / Validation |
| Automation Status | Automated |

**Precondition**

- User is authenticated.
- User has permission to create employees.
- User is on the Add Employee page.

**Test Data**

- First Name: Empty
- Last Name: Empty
- Employee ID: Valid unique Employee ID

**Steps**

1. Leave the First Name field empty.
2. Leave the Last Name field empty.
3. Keep or enter a valid unique Employee ID.
4. Click the Save button.

**Expected Result**

- Employee creation is not completed.
- The validation message `Required` is displayed for the First Name field.
- The validation message `Required` is displayed for the Last Name field.
- Both invalid fields are visually highlighted with validation styling.
- No employee record is created.

---

#### TC-PIM-008 - Validate Employee ID behavior with alphabetic and special characters

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-008 |
| Scenario ID | TS-PIM-002 |
| Priority | P1 |
| Test Type | Functional / Requirement Clarification |
| Automation Status | Manual |

**Precondition**

- User is authenticated.
- User has permission to create employees.
- User is on the Add Employee page.

**Test Data**

- Valid employee information.
- Employee ID containing alphabetic and/or special characters.

**Steps**

1. Enter valid employee information.
2. Manually enter an Employee ID containing alphabetic and/or special characters.
3. Submit the employee creation form.
4. Open or search for the created employee if creation succeeds.

**Expected Result**

- The submitted Employee ID is handled consistently with the application's currently observed behavior or documented business rule, if one is available.
- If no Employee ID format restriction is defined, the observed acceptance behavior should be documented rather than treated as a test failure.

**Observed Baseline**

- The system currently accepts alphabetic and/or special characters in Employee ID and allows employee creation.

**Notes**

- The accepted Employee ID format requires business-rule clarification.
- This test should not be used as a pass/fail automated assertion against a presumed numeric-only format until the requirement is clarified.

---

#### TC-PIM-009 - Validate leading and trailing whitespace handling in employee name fields

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-009 |
| Scenario ID | TS-PIM-002 |
| Priority | P1 |
| Test Type | Data Validation / Data Quality |
| Automation Status | Planned |

**Precondition**

- User is authenticated.
- User has permission to create employees.
- User is on the Add Employee page.

**Test Data**

- First Name: `"    Mi"` (leading whitespace)
- Middle Name: `"La   "` (trailing whitespace)
- Last Name: `"Sol"`

**Steps**

1. Enter the employee name values containing leading and trailing whitespace.
2. Enter the remaining required employee information.
3. Submit the employee creation form.
4. Open the created employee's Personal Details.

**Expected Result**

- Employee creation completes according to the application's current input-handling behavior.
- The stored name values are handled consistently across creation and subsequent employee details.
- Any preserved or normalized whitespace behavior is observable and can be compared with the displayed employee data.

**Observed Baseline**

- The employee can currently be created successfully.
- Leading and trailing whitespace is preserved in the employee's Personal Details.

**Notes**

- No trimming requirement has been confirmed.
- The test validates consistency of whitespace handling rather than assuming that whitespace must be rejected or automatically trimmed.

---

#### TC-PIM-010 - Verify employee search behavior for name values containing whitespace

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-010 |
| Scenario ID | TS-PIM-002 |
| Priority | P1 |
| Test Type | Data Consistency / Functional |
| Automation Status | Planned |

**Precondition**

- An employee has been created with known leading and/or trailing whitespace in the name fields.
- The employee's stored name values are known.
- User has access to the Employee List.

**Test Data**

Example employee:

- First Name: `"    Mi"`
- Middle Name: `"La   "`
- Last Name: `"Sol"`

Search variations:

- Search value matching the stored whitespace pattern.
- Search value using a different number of leading/trailing spaces.

**Steps**

1. Navigate to the Employee List.
2. Search for the employee using a value that matches the stored name/whitespace pattern.
3. Record the search result.
4. Modify the search input by changing the number of leading or trailing spaces.
5. Execute the search again.
6. Compare the returned results.

**Expected Result**

- Search behavior is consistent with the application's stored and displayed employee name data.
- Equivalent employee-name searches should not produce unexpected inconsistencies caused solely by invisible whitespace handling.

**Observed Baseline**

- The employee can be found when the search input corresponds to the stored leading whitespace.
- Increasing the number of leading spaces beyond the stored value may cause the employee not to be returned.
- The Employee List does not visually expose the preserved whitespace, while Personal Details does.

**Notes**

- This behavior may create a data consistency or usability risk.
- Further requirement clarification is needed before classifying the behavior as a confirmed defect.

---

#### TC-PIM-011 - Create an employee with a duplicate Employee ID

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-011 |
| Scenario ID | TS-PIM-002 |
| Priority | P1 |
| Test Type | Negative / Validation / Business Rule |
| Automation Status | Automated |

**Precondition**

- User is authenticated.
- User has permission to create employees.
- User is on the Add Employee page.
- An existing employee with a known Employee ID is available.

**Test Data**

- Valid employee First Name.
- Valid employee Last Name.
- Employee ID already assigned to an existing employee.

**Steps**

1. Navigate to the Add Employee page.
2. Enter valid required employee information.
3. Replace the generated Employee ID with an Employee ID already assigned to an existing employee.
4. Observe the Employee ID field validation.
5. Attempt to save the employee record.

**Expected Result**

- The Employee ID field displays the validation message `Employee Id already exists`.
- The duplicate Employee ID is identified before employee creation is completed.
- The employee is not created using an Employee ID that already exists.

---

#### TC-PIM-012 - Verify newly created employee can be retrieved

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-012 |
| Scenario ID | TS-PIM-002 |
| Priority | P1 |
| Test Type | Data Persistence |
| Automation Status | Automated |

**Precondition**

- A new employee has been successfully created.
- The created employee's identifying information is available.

**Test Data**

- Identifying information of the newly created employee.

**Steps**

1. Navigate to the employee search/list page.
2. Search for the newly created employee using identifying information.
3. Execute the search.

**Expected Result**

- The newly created employee is returned in the search results.
- The employee information matches the data submitted during creation.
- The created employee record persists after the creation operation.

---

#### TC-PIM-013 - Update an existing employee with valid information

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-013 |
| Scenario ID | TS-PIM-003 |
| Priority | P0 |
| Test Type | Positive |
| Automation Status | Automated |

**Precondition**

- User is authenticated.
- User has permission to edit employees.
- An existing employee record is available.

**Test Data**

- Valid updated employee information.

**Steps**

1. Search for and open an existing employee.
2. Modify applicable employee information.
3. Save the changes.

**Expected Result**

- The employee information is updated successfully.
- The application displays the appropriate success feedback.
- The updated employee information is available after saving.

---

#### TC-PIM-014 - Validate required name fields when updating an employee

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-014 |
| Scenario ID | TS-PIM-003 |
| Priority | P1 |
| Test Type | Negative / Validation |
| Automation Status | Automated |

**Precondition**

- User is authenticated.
- User has permission to edit employees.
- An existing employee record is available.
- User is on the employee's Personal Details page.

**Test Data**

- First Name: Empty
- Last Name: Empty

**Steps**

1. Clear the First Name field.
2. Observe the First Name field validation.
3. Restore the First Name to a valid value.
4. Clear the Last Name field.
5. Observe the Last Name field validation.
6. Attempt to save the employee record while a required name field is empty.

**Expected Result**

- The validation message `Required` is displayed when the First Name field is empty.
- The First Name field is visually highlighted with validation styling.
- The validation message `Required` is displayed when the Last Name field is empty.
- The Last Name field is visually highlighted with validation styling.
- The employee update is not completed while a required name field is empty.
- The validation state remains visible after the Save action is attempted.

---

#### TC-PIM-015 - Update an employee with an empty Employee ID

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-015 |
| Scenario ID | TS-PIM-003 |
| Priority | P1 |
| Test Type | Functional / Data Validation |
| Automation Status | Planned |

**Precondition**

- User is authenticated.
- User has permission to edit employees.
- An existing employee record with a known Employee ID is available.
- User is on the employee's Personal Details page.

**Test Data**

- Employee ID: Empty
- First Name: Existing valid value
- Last Name: Existing valid value

**Steps**

1. Clear the Employee ID field.
2. Keep the required First Name and Last Name fields valid.
3. Save the employee record.
4. Observe the update result.
5. Navigate away from the employee record.
6. Reopen the updated employee.

**Expected Result**

- No required-field validation is displayed for the empty Employee ID.
- The employee update is completed successfully.
- The success notification `Successfully Updated` is displayed.
- The Employee ID remains empty after the employee record is reopened.

---

#### TC-PIM-016 - Verify updated employee information persists after saving

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-016 |
| Scenario ID | TS-PIM-003 |
| Priority | P0 |
| Test Type | Data Persistence |
| Automation Status | Automated |

**Precondition**

- An existing employee has been successfully updated.
- The updated employee information is known.

**Test Data**

- Updated employee information.

**Steps**

1. Save the employee changes.
2. Navigate away from the employee record.
3. Search for and reopen the updated employee.

**Expected Result**

- The updated values remain unchanged after navigation.
- The employee record contains the newly saved information.
- The update has been persisted successfully.

---

#### TC-PIM-017 - Cancel employee deletion

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-017 |
| Scenario ID | TS-PIM-004 |
| Priority | P1 |
| Test Type | Negative / State |
| Automation Status | Planned |

**Precondition**

- User is authenticated.
- User has permission to delete employees.
- An existing employee record is available.

**Test Data**

- Existing employee selected for deletion.

**Steps**

1. Open the employee deletion action.
2. Select the option to cancel the deletion.

**Expected Result**

- The deletion operation is cancelled.
- The employee remains available in the system.
- No employee data is removed.

---

#### TC-PIM-018 - Confirm employee deletion

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-018 |
| Scenario ID | TS-PIM-004 |
| Priority | P0 |
| Test Type | Positive |
| Automation Status | Automated |

**Precondition**

- User is authenticated.
- User has permission to delete employees.
- An existing employee record is available.

**Test Data**

- Existing employee selected for deletion.

**Steps**

1. Open the employee deletion action.
2. Confirm the deletion operation.

**Expected Result**

- The employee is deleted successfully.
- The system displays the appropriate deletion notification.
- The deletion operation completes without error.

---

#### TC-PIM-019 - Verify deleted employee is no longer available

| Field | Value |
|---|---|
| Test Case ID | TC-PIM-019 |
| Scenario ID | TS-PIM-004 |
| Priority | P0 |
| Test Type | Data Integrity |
| Automation Status | Automated |

**Precondition**

- An employee has been successfully deleted.
- The deleted employee's identifying information is known.

**Test Data**

- Identifying information of the deleted employee.

**Steps**

1. Navigate to the employee search/list page.
2. Search for the deleted employee.
3. Execute the search.

**Expected Result**

- The deleted employee is not returned as an active employee record.
- The system reflects the completed deletion.
- No stale employee record is displayed as available.

---

### 4.3 Leave

#### TC-LEAVE-001 - Submit a leave request with valid information

| Field | Value |
|---|---|
| Test Case ID | TC-LEAVE-001 |
| Scenario ID | TS-LEAVE-001 |
| Priority | P0 |
| Test Type | Positive |
| Automation Status | Planned |

**Precondition**

- User is authenticated.
- User has access to Leave Management.
- The employee has sufficient leave balance.
- Valid leave dates are available.

**Test Data**

- Valid leave type.
- Valid leave date range.
- Any other required leave information.

**Steps**

1. Navigate to the Apply Leave page.
2. Select a valid leave type.
3. Enter a valid leave date range.
4. Enter any other required information.
5. Submit the leave request.

**Expected Result**

- The leave request is submitted successfully.
- The request is recorded by the system.
- The request receives the appropriate initial status.

---

#### TC-LEAVE-002 - Submit leave request with required fields missing

| Field | Value |
|---|---|
| Test Case ID | TC-LEAVE-002 |
| Scenario ID | TS-LEAVE-001 |
| Priority | P1 |
| Test Type | Validation |
| Automation Status | Planned |

**Precondition**

- User is authenticated.
- User has access to Leave Management.
- User is on the Apply Leave page.

**Test Data**

- One or more required leave fields left empty.

**Steps**

1. Leave an applicable required field empty.
2. Enter valid values into other required fields where applicable.
3. Submit the leave request.

**Expected Result**

- The leave request is not submitted successfully.
- Required-field validation is displayed for the applicable field.
- No incomplete leave request is created.

---

#### TC-LEAVE-003 - Submit leave request with an invalid date range

| Field | Value |
|---|---|
| Test Case ID | TC-LEAVE-003 |
| Scenario ID | TS-LEAVE-001 |
| Priority | P1 |
| Test Type | Negative / Business Rule |
| Automation Status | Automated |

**Precondition**

- User is authenticated.
- User has access to Leave Management.
- User is on the Apply Leave page.

**Test Data**

- Leave date range that violates the observed date-range validation rule.

**Steps**

1. Select a valid leave type.
2. Enter an invalid leave date range.
3. Submit the leave request.

**Expected Result**

- The system rejects the invalid date range.
- Appropriate validation feedback is displayed.
- The invalid leave request is not submitted.

---

#### TC-LEAVE-004 - Submit leave request with insufficient leave balance

| Field | Value |
|---|---|
| Test Case ID | TC-LEAVE-004 |
| Scenario ID | TS-LEAVE-001 |
| Priority | P0 |
| Test Type | Negative / Business Rule |
| Automation Status | Automated |

**Precondition**

- User is authenticated.
- User has access to Leave Management.
- The selected leave type has insufficient available balance for the requested leave.

**Test Data**

- Valid leave type.
- Leave period that exceeds the available leave balance.

**Steps**

1. Navigate to the Apply Leave page.
2. Select the applicable leave type.
3. Enter a leave period exceeding the available balance.
4. Submit the leave request.

**Expected Result**

- The system prevents the invalid leave request from being submitted.
- Appropriate leave-balance validation or error feedback is displayed.
- No invalid leave transaction is created.

---

#### TC-LEAVE-005 - View available leave records

| Field | Value |
|---|---|
| Test Case ID | TC-LEAVE-005 |
| Scenario ID | TS-LEAVE-002 |
| Priority | P2 |
| Test Type | Positive |
| Automation Status | Planned |

**Precondition**

- User is authenticated.
- User has access to Leave Management.
- Leave records are available.

**Test Data**

- Existing leave records.

**Steps**

1. Navigate to the Leave List page.
2. Open or load the available leave records.

**Expected Result**

- Leave records are displayed successfully.
- The displayed records contain the relevant information available to the user.

---

#### TC-LEAVE-006 - Search leave records using relevant criteria

| Field | Value |
|---|---|
| Test Case ID | TC-LEAVE-006 |
| Scenario ID | TS-LEAVE-002 |
| Priority | P2 |
| Test Type | Functional |
| Automation Status | Planned |

**Precondition**

- User is authenticated.
- User has access to the Leave List.
- Matching leave records are available.

**Test Data**

- Valid leave search criteria.

**Steps**

1. Navigate to the Leave List page.
2. Enter valid search criteria.
3. Execute the search.

**Expected Result**

- The search is executed successfully.
- Matching leave records are displayed.
- Records that do not satisfy the search criteria are excluded from the result.

---

#### TC-LEAVE-007 - Filter leave records

| Field | Value |
|---|---|
| Test Case ID | TC-LEAVE-007 |
| Scenario ID | TS-LEAVE-002 |
| Priority | P2 |
| Test Type | Functional |
| Automation Status | Planned |

**Precondition**

- User is authenticated.
- User has access to the Leave List.
- Leave records are available for the selected filter.

**Test Data**

- Valid leave filter criteria.

**Steps**

1. Navigate to the Leave List page.
2. Select the applicable filter criteria.
3. Execute the filter operation.

**Expected Result**

- The filter is applied successfully.
- The displayed leave records satisfy the selected filter criteria.

---

#### TC-LEAVE-008 - Verify relevant leave information and request status

| Field | Value |
|---|---|
| Test Case ID | TC-LEAVE-008 |
| Scenario ID | TS-LEAVE-002 |
| Priority | P2 |
| Test Type | Data Validation |
| Automation Status | Planned |

**Precondition**

- User is authenticated.
- At least one leave record is available.
- The expected information and status of the selected record are known.

**Test Data**

- Existing leave record with known information and status.

**Steps**

1. Open the Leave List page.
2. Locate the target leave record.
3. Review the displayed leave information and request status.

**Expected Result**

- The relevant leave information is displayed correctly.
- The request status corresponds to the current state of the leave request.

---

#### TC-LEAVE-009 - Assign leave to an employee with valid information

| Field | Value |
|---|---|
| Test Case ID | TC-LEAVE-009 |
| Scenario ID | TS-LEAVE-003 |
| Priority | P1 |
| Test Type | Positive |
| Automation Status | Planned |

**Precondition**

- User is authenticated.
- User has permission to assign leave.
- A valid employee is available.
- Valid leave information is available.

**Test Data**

- Valid employee.
- Valid leave type.
- Valid leave date range.
- Other required assignment information.

**Steps**

1. Navigate to the Assign Leave page.
2. Select the target employee.
3. Enter valid leave information.
4. Submit the leave assignment.

**Expected Result**

- The leave is assigned successfully.
- The system records the leave assignment.
- Appropriate success feedback is displayed.

---

#### TC-LEAVE-010 - Submit leave assignment with required information missing

| Field | Value |
|---|---|
| Test Case ID | TC-LEAVE-010 |
| Scenario ID | TS-LEAVE-003 |
| Priority | P1 |
| Test Type | Validation |
| Automation Status | Planned |

**Precondition**

- User is authenticated.
- User has permission to assign leave.
- User is on the Assign Leave page.

**Test Data**

- One or more required assignment fields left empty.

**Steps**

1. Leave an applicable required field empty.
2. Enter valid values into other required fields where applicable.
3. Submit the leave assignment.

**Expected Result**

- The assignment is not completed.
- Required-field validation is displayed.
- No incomplete leave assignment is created.

---

#### TC-LEAVE-011 - Assign leave when employee has insufficient leave balance

| Field | Value |
|---|---|
| Test Case ID | TC-LEAVE-011 |
| Scenario ID | TS-LEAVE-003 |
| Priority | P0 |
| Test Type | Business Rule / Override |
| Automation Status | Automated |

**Precondition**

- User is authenticated.
- User has permission to assign leave.
- A valid employee is available.
- The employee has insufficient leave balance for the requested duration.

**Test Data**

- Valid employee.
- Valid leave type.
- Leave duration exceeding the employee's available balance.

**Steps**

1. Navigate to the Assign Leave page.
2. Select the target employee.
3. Select a valid leave type.
4. Enter a leave duration exceeding the employee's available balance.
5. Verify that the insufficient-balance indication is displayed.
6. Click the Assign button.
7. Verify that the confirmation dialog is displayed.
8. Confirm the leave assignment.

**Expected Result**

- The system displays the insufficient-balance indication.
- A confirmation dialog is displayed when the assignment is attempted.
- The dialog warns that the employee does not have sufficient leave balance.
- After the user confirms the assignment, the leave assignment is accepted.
- The system displays the `Successfully Saved` success feedback.

---

#### TC-LEAVE-012 - Approve a pending leave request

| Field | Value |
|---|---|
| Test Case ID | TC-LEAVE-012 |
| Scenario ID | TS-LEAVE-004 |
| Priority | P0 |
| Test Type | Positive / State Transition |
| Automation Status | Automated |

**Precondition**

- User is authenticated with permission to approve leave requests.
- A pending leave request is available.

**Test Data**

- Pending leave request.

**Steps**

1. Navigate to the leave requests available for approval.
2. Locate a pending leave request.
3. Select the Approve action.

**Expected Result**

- The leave request is approved successfully.
- The request status changes from pending to the appropriate approved state.
- Appropriate system feedback is displayed.

---

#### TC-LEAVE-013 - Reject a pending leave request

| Field | Value |
|---|---|
| Test Case ID | TC-LEAVE-013 |
| Scenario ID | TS-LEAVE-004 |
| Priority | P0 |
| Test Type | Negative / State Transition |
| Automation Status | Automated |

**Precondition**

- User is authenticated with permission to reject leave requests.
- A pending leave request is available.

**Test Data**

- Pending leave request.

**Steps**

1. Navigate to the leave requests available for approval.
2. Locate a pending leave request.
3. Select the Reject action.

**Expected Result**

- The leave request is rejected successfully.
- The request status changes from pending to the appropriate rejected state.
- Appropriate system feedback is displayed.

---

#### TC-LEAVE-014 - Verify leave request status after approval or rejection

| Field | Value |
|---|---|
| Test Case ID | TC-LEAVE-014 |
| Scenario ID | TS-LEAVE-004 |
| Priority | P0 |
| Test Type | State / Data Validation |
| Automation Status | Planned |

**Precondition**

- A leave request has been successfully approved or rejected.
- The target leave request can be retrieved.

**Test Data**

- Approved or rejected leave request.

**Steps**

1. Navigate to the Leave List or relevant leave record view.
2. Locate the processed leave request.
3. Review its current request status.

**Expected Result**

- The leave request displays the expected final status.
- The status corresponds to the action previously performed.
- The state change persists after navigation or refresh.

---

## 5. Test Case Summary

### 5.1 Test Case Distribution by Module

| Module | Test Scenarios | Test Cases |
|---|---|---|
| Authentication | 3 | 9 |
| PIM / Employee Management | 4 | 19 |
| Leave Management | 4 | 14 |
| **Total** | **11** | **42** |

---

### 5.2 Test Case Distribution by Priority

| Priority | Test Cases | Percentage |
|---|---|---|
| P0 | 17 | 40.5% |
| P1 | 17 | 40.5% |
| P2 | 8 | 19.0% |
| **Total** | **42** | **100%** |

The distribution reflects the risk-based prioritization defined during test scenario and test case design.

Critical business and security-related conditions are concentrated in P0, while supporting workflows and lower-risk verification activities are assigned P1 or P2 according to their relative business impact and regression value.

---

### 5.3 Test Case Distribution by Test Type

| Test Type | Description |
|---|---|
| Positive | Valid input or expected successful workflow |
| Negative | Invalid input or rejected workflow |
| Validation | Required-field or input validation behavior |
| Business / Functional | Business rule or functional behavior |
| Data Persistence | Verification that data changes are correctly stored |
| Data Integrity | Verification that system data remains consistent after an operation |
| State Transition | Verification of behavior when an entity changes state |
| Session / Security | Verification of authentication and protected-resource behavior |

A test case may use more than one conceptual testing characteristic where appropriate.

---

## 6. Traceability

Each Test Case is mapped to a defined and finalized Test Scenario.

| Scenario ID | Scenario | Test Cases |
|---|---|---|
| TS-AUTH-001 | Authenticate a user using login credentials | TC-AUTH-001 – TC-AUTH-006 |
| TS-AUTH-002 | Log out an authenticated user | TC-AUTH-007 |
| TS-AUTH-003 | Prevent access to protected resources after logout | TC-AUTH-008 – TC-AUTH-009 |
| TS-PIM-001 | Search and filter employees | TC-PIM-001 – TC-PIM-005 |
| TS-PIM-002 | Create a new employee | TC-PIM-006 – TC-PIM-012 |
| TS-PIM-003 | Update an existing employee | TC-PIM-013 – TC-PIM-016 |
| TS-PIM-004 | Delete an existing employee | TC-PIM-017 – TC-PIM-019 |
| TS-LEAVE-001 | Apply for leave | TC-LEAVE-001 – TC-LEAVE-004 |
| TS-LEAVE-002 | View and manage leave records | TC-LEAVE-005 – TC-LEAVE-008 |
| TS-LEAVE-003 | Assign leave to an employee | TC-LEAVE-009 – TC-LEAVE-011 |
| TS-LEAVE-004 | Approve or reject a leave request | TC-LEAVE-012 – TC-LEAVE-014 |

The resulting traceability chain is:

`Test Scenario → Test Case → Automated Test`

Automated Test identifiers for the implemented MVP coverage are maintained in `traceability-matrix.md`.