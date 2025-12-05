export function parseBgPhone(number) {
    // Handle undefined/null values
    if (!number || typeof number !== 'string' || number === '') {
        return '';
    }

    // Ensure only digits and + remain
    number = number.replace(/[^\d+]/g, "");

    // Must start with +359 and have 12 digits total (+359 + 9 digits)
    const match = number.match(/^\+359(\d{2})(\d{3})(\d{4})$/);

    if (!match) {
        return '';
    }

    const [, prefix, middle, last] = match;
    return `+359 ${prefix} ${middle} ${last}`;
}