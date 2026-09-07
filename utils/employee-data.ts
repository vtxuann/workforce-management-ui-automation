export type EmployeeData = {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId: string;
};

export function generateEmployeeData(): EmployeeData {
  const timestamp = Date.now().toString().slice(-5);

  const randomPart = Math.random()
    .toString(36)
    .slice(2, 5)
    .toUpperCase();

  return {
    firstName: `Auto${randomPart}`,
    middleName: 'QA',
    lastName: 'Tester',
    employeeId: `QA${timestamp}${randomPart}`,
  };
}