export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function addDays(baseDate: Date, days: number): Date {
    const result = new Date(baseDate);
    result.setDate(result.getDate() + days);
    return result;
}

export function dateFromToday(daysFromToday: number): string {
    return formatDate(addDays(new Date(), daysFromToday));
}

export function nextWorkingDate(date: Date): Date {
    const result = new Date(date);

    while (result.getDay() === 0 || result.getDay() === 6) {
        result.setDate(result.getDate() + 1);
    }

    return result;
}

export function workingDateFromToday(daysFromToday: number): string {
    return formatDate(nextWorkingDate(addDays(new Date(), daysFromToday)));
}

export function buildWorkingDayRange(
    startDaysFromToday: number,
    workingDays: number,
): { fromDate: string; toDate: string } {
    if (!Number.isInteger(workingDays) || workingDays <= 0) {
        throw new Error(`workingDays must be a positive integer. Received: ${workingDays}.`);
    }

    const start = nextWorkingDate(addDays(new Date(), startDaysFromToday));
    let end = new Date(start);
    let counted = 1;

    while (counted < workingDays) {
        end = addDays(end, 1);
        if (end.getDay() !== 0 && end.getDay() !== 6) {
            counted++;
        }
    }

    return {
        fromDate: formatDate(start),
        toDate: formatDate(end),
    };
}