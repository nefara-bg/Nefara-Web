const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^https?:\/\/.+/i;

export const validateClientUrl = (url?: string | null): string => {
    const defaultUrl = 'http://localhost:3000';

    if (url === null || url === undefined) {
        return defaultUrl;
    }

    const urlStr = String(url).trim();

    if (urlStr === '') {
        return defaultUrl;
    }

    if (!URL_REGEX.test(urlStr)) {
        return defaultUrl;
    }

    try {
        const urlObj = new URL(urlStr);
        if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
            return defaultUrl;
        }
        return urlStr;
    } catch (e) {
        return defaultUrl;
    }
};

export const validateContactEmail = (email?: string | null): string => {
    if (email === null || email === undefined) {
        return '';
    }

    const emailStr = String(email).trim();

    if (emailStr === '') {
        return '';
    }

    if (!EMAIL_REGEX.test(emailStr)) {
        return '';
    }

    return emailStr;
};

export const validateContactPhone = (phone?: string | null): string => {
    if (phone === null || phone === undefined) {
        return '';
    }

    const phoneStr = String(phone).trim();

    if (phoneStr === '') {
        return '';
    }

    const phonePattern = /^[\d\s+\-()]+$/;

    if (!phonePattern.test(phoneStr)) {
        return '';
    }

    const hasDigits = /\d/.test(phoneStr);
    if (!hasDigits) {
        return '';
    }

    if (phoneStr.length < 7 || phoneStr.length > 20) {
        return '';
    }

    return phoneStr;
};
