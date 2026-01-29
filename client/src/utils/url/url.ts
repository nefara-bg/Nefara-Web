export const encodeEmailForMailto = (email?: string | null): string => {
    if (email === null || email === undefined) {
        return '';
    }
    const emailStr = String(email);
    const trimmed = emailStr.trim();
    if (trimmed === '') {
        return '';
    }
    return encodeURIComponent(trimmed);
};

export const encodePhoneForTel = (phone?: string | null): string => {
    if (phone === null || phone === undefined) {
        return '';
    }
    const phoneStr = String(phone);
    const trimmed = phoneStr.trim();
    if (trimmed === '') {
        return '';
    }
    return encodeURIComponent(trimmed);
};
