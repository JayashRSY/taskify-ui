/**
 * Converts a Date object to a string in the format "YYYY-MM-DD".
 * @param date - The Date object to be converted.
 * @returns The date string in "YYYY-MM-DD" format.
 */
export function toYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Converts a Date object to a string in the format "DD-MM-YYYY".
 * @param date - The Date object to be converted.
 * @returns The date string in "DD-MM-YYYY" format.
 */
export function toDDMMYYYY(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
}

/**
 * Converts a Date object to a string in the format "MM/DD/YYYY".
 * @param date - The Date object to be converted.
 * @returns The date string in "MM/DD/YYYY" format.
 */
export function toMMDDYYYY(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
}

/**
 * Converts a Date object to a string in the format "MMMM DD, YYYY".
 * @param date - The Date object to be converted.
 * @param locale - Optional locale for month name (default is 'en-US').
 * @returns The date string in "MMMM DD, YYYY" format.
 */
export function toFullMonthDDYYYY(date: Date, locale: string = 'en-US'): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(locale, options);
}

/**
 * Converts a Date object to a string in the format "DD/MM/YYYY HH:MM".
 * @param date - The Date object to be converted.
 * @returns The date string in "DD/MM/YYYY HH:MM" format.
 */
export function toDDMMYYYYHHMM(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}
