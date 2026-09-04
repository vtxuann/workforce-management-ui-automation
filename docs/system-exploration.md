# System Exploration - Workforce Management System

## 1. System Under Test

- **Application:** OrangeHRM
- **Environment:** Local Docker
- **URL:**  http://localhost:8080
- **Browser:**  Chromium 
- **Version:** OrangeHRM OS 5.9
- **Database:** MariaDB
- **Test Account:** Admin test account
- **Credentials:** Stored in `.env`
---

## 2. Application Modules

| Module          | Available | Explored  | Notes |
|-----------------|-----------|-----------|-------| 
| Authentication  | Yes       | Yes       | Login form, input validation, invalid credentials, logout, and post-logout browser behavior were explored.|
| Dashboard       | Yes       | Yes       | Contains Quick Launch widgets and employee-related statistics.|
| Admin           | Yes       | Yes       | Includes User Management, Job, Organization, and system configuration features.|
| PIM             | Yes       | Yes       | Core employee management module covering Employee List, Add, Edit, and Delete workflows.|
| Leave           | Yes       | Yes       | Includes leave configuration, leave application, leave assignment, and approval workflows.|
| Time            | Yes       | Partially | Includes attendance and timesheet-related functionality; only a high-level survey was performed.|
| Recruitment     | Yes       | Partially | Includes Vacancies and Candidates; no dedicated test data was created during exploration.|
| Performance     | Yes       | Partially | Includes KPIs and employee trackers; no dedicated test data was created during exploration.|
| Directory       | Yes       | Partially | Provides a searchable directory of employee contact information.|
| Other           | Yes       | Partially | Claim, Buzz, and other system configuration features.|

---

## 3. Authentication

### Login
- **Username field:** Text input with the `Username` placeholder. The field is required.
- **Password field:** Password input with character masking. No show/hide password control is provided.
- **Login button:** The login action can be triggered by clicking the `Login` button or pressing `Enter`.
- **Client-side validation:** Submission is blocked when a required field is empty. The affected input is highlighted and a `Required` validation message is displayed below the field.
- **Invalid credentials message:** A red error banner displaying `Invalid credentials` appears above the login form when invalid credentials are submitted.
- **Remember Me:** No `Remember Me` checkbox is displayed in the default interface.
- **Username case sensitivity:** The username appears to be case-insensitive based on the observed behavior (`admin` and `Admin` were both accepted).
- **Password case sensitivity:** Password input is case-sensitive based on the observed behavior.
- **Post-login URL:** Successful authentication redirects the user to `/web/index.php/dashboard/index`.

#### Login - Valid Credentials 

**Observed:**

- Login completed successfully without noticeable response latency.
- The user was redirected to the Dashboard.
- The left sidebar displayed the available navigation options for the Admin account.
- The user's display name and avatar were visible in the top-right user menu.

### Login - Invalid Username / Valid Password

**Observed:**

- Login failed.
- A red `Invalid credentials` banner was displayed.
- The entered credentials were cleared from the input fields.

### Login - Valid Username / Invalid Password

**Observed:**

- Login failed.
- A red `Invalid credentials` banner was displayed.
- The entered credentials were cleared from the input fields.

### Login - Invalid Username / Invalid Password

**Observed:**

- Login failed.
- A red `Invalid credentials` banner was displayed.
- The entered credentials were cleared from the input fields.

### Login - Empty Username / Valid Password

**Observed:**

- Form submission was blocked.
- The Username field was highlighted.
- A `Required` validation message was displayed below the Username field.
- No `Invalid credentials` banner was displayed.

### Login - Valid Username / Empty Password

**Observed:**

- Form submission was blocked.
- The Password field was highlighted.
- A `Required` validation message was displayed below the Password field.
- No `Invalid credentials` banner was displayed.

### Login - Empty Username / Empty Password

**Observed:**

- Form submission was blocked.
- Both Username and Password fields were highlighted.
- A `Required` validation message was displayed below each field.

### Logout

- **Logout location:** Available from the user dropdown menu in the top-right corner.
- **Logout behavior:** Selecting `Logout` redirects the user to the Login page at `/web/index.php/auth/login`.

### Browser Back After Logout

**Observed:**

- After logout, using the browser Back button displayed the previously visited Dashboard interface.
- The displayed page appeared to be loaded from the browser cache.
- Subsequent user interactions redirected the user back to the Login page.
- No authenticated interaction could be performed after logout.

**Initial assessment:**

- Further verification would be required to determine whether sensitive information remains accessible through browser cache after logout.
- No authenticated action was successfully performed after the session was terminated.

---

## 4. PIM / Employee Management

### PIM - Employee list

**Observed:**

- Employee List is available at `/web/index.php/pim/viewEmployeeList`.
- Employees are displayed in a data table containing columns such as:
  - ID
  - First & Middle Name
  - Last Name
  - Job Title
  - Employment Status
  - Sub Unit
  - Supervisor
  - Actions
- The filter panel is located above the table and can be expanded or collapsed.
- Search and filtering support:
  - Employee Name
  - Employee ID
  - Employment Status
  - Include
  - Supervisor Name
  - Job Title
  - Sub Unit
- The Supervisor Name field provides autocomplete/typeahead suggestions. A value must be selected from the suggestion list.
- The `Reset` button clears the applied filters and restores the default employee list.
- Pagination is displayed below the table when the number of records requires multiple pages.

**Potential test areas:**

- Exact employee search by ID.
- Employee search using the autocomplete list.
- Search using non-existing characters or special characters.
- Reset behavior when multiple filters are applied.
- Pagination when the number of records exceeds the page limit.
- Navigation from the employee list to employee details.

---

### PIM - Add Employee

**Observed:**

- The Add Employee workflow can be accessed through the `+ Add` button or the `Add Employee` navigation tab.
- Basic employee information includes:
  - First Name - Required
  - Middle Name - Optional
  - Last Name - Required
  - Employee ID - Automatically generated and manually editable
- The form provides a profile photo upload area supporting image formats such as JPG and PNG.
- The `Create Login Details` toggle displays additional account-related fields:
  - Username
  - Password
  - Confirm Password
  - Status
- After successfully completing the required fields and selecting `Save`, the system redirects to the Personal Details page of the newly created employee.

### Add Employee - Validation

**Observed:**

- Empty First Name or Last Name fields display a `Required` validation message.
- A username shorter than the minimum length displays:
  `Should be at least 5 characters`.
- A password mismatch between Password and Confirm Password displays:
  `Passwords do not match`.

---

#### PIM - Edit Employee

**Observed:**

- An employee can be opened from the Employee List by clicking the employee name or the Edit icon.
- The employee details page contains multiple sub-sections, including:
  - Personal Details
  - Contact Details
  - Emergency Contacts
  - Dependents
  - Immigration
  - Job
  - Salary
  - Report-to
  - and other employee-related sections.
- Employee information can be modified and saved using the `Save` button.
- A green success toast displaying `Successfully Updated` is shown after a successful update.

### Data Persistence Check

**Observed:**

1. Update an employee's Last Name.
2. Select `Save`.
3. Return to the Employee List.
4. Search for the updated employee.
5. The updated Last Name is displayed correctly in the employee list.

This confirms that the updated employee data persisted and was reflected in the employee list during exploration.

---

### PIM - Delete Employee

**Observed:**

- An employee can be deleted using the Delete icon on the corresponding employee row.
- Multiple employees can also be selected using checkboxes and deleted using `Delete Selected`.
- The system displays a confirmation modal containing:
  `Are you sure - The selected record will be permanently deleted. Are you sure you want to continue?`

#### Cancel Delete

**Observed:**

- Selecting `Cancel` closes the confirmation modal.
- The employee record remains in the employee list.

#### Confirm Delete

**Observed:**

- Selecting `Yes, Delete` displays a green success toast:
  `Successfully Deleted`.
- The deleted employee is removed from the table.
- The employee list is refreshed automatically.

---

## 5. Leave Management

### Leave List

**Observed:**

- Displays employee leave requests.
- Filtering is available by:
  - From Date
  - To Date
  - Leave Status
  - Employee Name
  - Leave Type

### Apply Leave

**Observed:**

- Employees can submit leave requests using the Apply Leave form.
- Available fields include:
  - Leave Type
  - From Date
  - To Date
  - Duration
  - Comments

### Leave Types

- Leave types are configured by an Admin.
- Examples observed include:
  - Casual Leave
  - Medical Leave
  - Bereavement Leave

### Leave Balance

**Observed:**

- The remaining leave balance for the selected leave type is displayed on the Apply Leave form.
- Example:
  `Leave Balance: 10.00 Days`

### Leave Approval

**Observed:**

- Admin or Supervisor users can review leave requests.
- Leave requests can be approved or rejected directly from the Leave List.
- The status is updated accordingly to `Approved` or `Rejected`.

### Search / Filter

**Observed:**

- Leave search and filtering are available.
- Filter state may be retained temporarily when navigating between tabs.

---

### Apply Leave - Insufficient Balance

**Observed:**

- When the requested leave duration exceeds the available leave balance, the system displays:
  `Balance not sufficient`.
- If the user continues with the submission, a red toast message is displayed:
  `Leave Balance Exceeded`.

---

### Assign Leave

**Observed:**

- Admin users can assign leave on behalf of an employee.
- Available fields include:
  - Employee Name
  - Leave Type
  - From Date
  - To Date
  - Duration
  - Comments
- When the requested duration exceeds the employee's leave balance, the system displays:
  `Balance not sufficient`.

If the user selects `Assign`, a confirmation modal is displayed:

> `Employee does not have sufficient leave balance for leave request. Click OK to confirm leave assignment.`

#### Cancel Confirmation

**Observed:**

- Selecting `Cancel` closes the modal.
- The Assign Leave form remains unchanged.
- The request is not submitted.

#### Confirm Assignment

**Observed:**

- Selecting `OK` closes the modal.
- An orange toast message is displayed:
  `Warning Failed to Submit`.
- The Assign Leave form remains unchanged.
- The request is not submitted.

---

### Apply Leave - Invalid Date Range

**Observed:**

- The system prevents submission when `From Date` is later than `To Date`.
- The following validation message is displayed below the To Date field:
  `To date should be after from date`.

---

## 6. Other Important Features

### Dashboard

**Observed:**

The Dashboard contains multiple widgets, including:

- Time at Work
- My Actions
- Quick Launch
- Buzz Latest Posts
- Employees on Leave Today
- Employee Distribution by Sub Unit
- Employee Distribution by Location

The Quick Launch section provides shortcuts to commonly used workflows, including:

- Assign Leave
- Leave List
- Timesheets
- Apply Leave
- My Leave
- My Timesheet

---

### Admin

The Admin module provides system configuration and administration features, including:

- User Management
- Job
- Organization
- Nationalities
- Corporate Branding
- Configuration

User Management supports the creation and management of system accounts.

---

### Time

The Time module provides employee attendance and timesheet functionality, including:

- Timesheets
- Punch In / Punch Out
- Customer management
- Project management
- Activity management

Timesheets can be configured and maintained for employee work records.

---

### Recruitment

The Recruitment module supports recruitment workflows, including:

- Vacancy management
- Candidate management
- Candidate status tracking

Observed candidate statuses include:

- Shortlisted
- Interview Scheduled
- Passed
- Rejected

---

### Performance

The Performance module supports employee performance management, including:

- KPI configuration
- Performance Reviews
- Employee Trackers

The module was surveyed at a high level during exploration.

---

### Other

#### Buzz

Buzz provides an internal social feed where employees can:

- Create posts
- Share images
- Like posts
- Comment on posts

#### Claim

Claim supports employee expense reimbursement workflows, such as:

- Business travel expenses
- Client entertainment expenses
- Project-related purchases

---

## 7. Initial Risks / Observations

| ID | Area | Observation | Potential Risk / Assessment |
|---|---|---|---|
| OBS-001 | Authentication | The Password field does not provide a show/hide password control. | Usability consideration. No functional defect has been confirmed. |
| OBS-002 | PIM - Employee | Employee ID is automatically generated but can be manually overridden with alphabetic or special characters. | Potential data integrity risk. The intended Employee ID business rule requires clarification. |
| OBS-003 | PIM - Add Employee | First Name, Middle Name, and Last Name fields accept leading and trailing whitespace and allow the record to be saved. | Potential data quality and normalization risk. This may affect display consistency, search behavior, reporting, or downstream integrations. Further validation is required before classifying it as a defect. |

---

## 8. Questions / Unknowns

### RBAC / Authorization

- How do permissions differ between Admin and regular Employee accounts across the PIM and Leave modules?
- A regular Employee test account should be created to compare accessible features and authorization behavior.

### File Upload Validation

- Are there server-side file size restrictions for attachments submitted through Leave workflows or profile images uploaded through Add Employee?
- Which file extensions are permitted?
- How does the system handle unsupported or potentially dangerous file types?

### Employee Deletion and Data Integrity

- When an employee is deleted from PIM, what happens to related historical data such as:
  - Time records
  - Leave records
  - Salary information
- Are related records hard-deleted, soft-deleted, retained, or otherwise handled through referential integrity rules?

---

## 9. Exploration Summary

The exploration identified Authentication, PIM / Employee Management, and Leave Management as the primary functional areas for further test analysis.

PIM contains several high-value end-to-end workflows, including employee creation, validation, data modification, persistence verification, and deletion.

Authentication provides important positive, negative, validation, and session-related test opportunities.

Leave Management contains business-rule-driven scenarios involving leave balance, date validation, assignment, and approval workflows.

Further exploration and risk analysis are required before finalizing the automation scope and test strategy.