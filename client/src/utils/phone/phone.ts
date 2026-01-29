export function parseBgPhone(number?: string | null): string {
    if (!number || typeof number !== 'string' || number === '') {
        return '';
    }

    const sanitizedNumber = number.replace(/[^\d+]/g, "");
    const match = sanitizedNumber.match(/^\+359(\d{2})(\d{3})(\d{4})$/);

    if (!match) {
        return '';
    }

    const [, prefix, middle, last] = match;
    return `+359 ${prefix} ${middle} ${last}`;
}
