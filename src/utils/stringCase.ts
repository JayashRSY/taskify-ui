/**
 * Converts a given string to title case.
 * @param str - The input string to be converted.
 * @returns The title-cased string.
 */
export function toTitleCase(str: string): string {
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Converts a given string to lowercase.
 * @param str - The input string to be converted.
 * @returns The lowercase string.
 */
export function toLowerCase(str: string): string {
    return str.toLowerCase();
}

/**
 * Converts a given string to uppercase.
 * @param str - The input string to be converted.
 * @returns The uppercase string.
 */
export function toUpperCase(str: string): string {
    return str.toUpperCase();
}

/**
 * Converts a given string to kebab case.
 * Kebab case means words are separated by hyphens.
 * @param str - The input string to be converted.
 * @returns The kebab-cased string.
 */
export function toKebabCase(str: string): string {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/\s+/g, '-')
        .toLowerCase();
}

/**
 * Converts a given string to camel case.
 * Camel case means the first letter of each word is capitalized except the first word.
 * @param str - The input string to be converted.
 * @returns The camel-cased string.
 */
export function toCamelCase(str: string): string {
    return str
        .toLowerCase()
        .split(' ')
        .map((word, index) =>
            index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join('');
}

/**
 * Converts a given string to snake case.
 * Snake case means words are separated by underscores.
 * @param str - The input string to be converted.
 * @returns The snake-cased string.
 */
export function toSnakeCase(str: string): string {
    return str
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/\s+/g, '_')
        .toLowerCase();
}

/**
 * Converts a given string to pascal case.
 * Pascal case means the first letter of each word is capitalized with no spaces.
 * @param str - The input string to be converted.
 * @returns The pascal-cased string.
 */
export function toPascalCase(str: string): string {
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}
