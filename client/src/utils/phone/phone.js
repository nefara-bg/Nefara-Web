export function parseBgPhone(number) {
    // Ensure only digits and + remain
    number = number.replace(/[^\d+]/g, "");

    // Must start with +359 and have 12 digits total (+359 + 9 digits)
    const match = number.match(/^\+359(\d{2})(\d{3})(\d{4})$/);

    if (!match) {
        throw new Error("Invalid Bulgarian phone format");
    }

    const [, prefix, middle, last] = match;
    return `+359 ${prefix} ${middle} ${last}`;
}