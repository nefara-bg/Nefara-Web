/**
 * Safely encodes an email address for use in mailto: links
 * Prevents injection attacks by URL-encoding special characters
 * @param {string} email - Email address to encode
 * @returns {string} - URL-encoded email address
 */
export const encodeEmailForMailto = (email) => {
    if (email === null || email === undefined) {
        return '';
    }
    // Convert to string if not already
    const emailStr = String(email);
    // Trim and check if empty
    const trimmed = emailStr.trim();
    if (trimmed === '') {
        return '';
    }
    // For mailto: links, we need to encode the email address
    // encodeURIComponent handles all special characters safely
    return encodeURIComponent(trimmed);
};

/**
 * Safely encodes a phone number for use in tel: links
 * Prevents injection attacks by URL-encoding special characters
 * @param {string} phone - Phone number to encode
 * @returns {string} - URL-encoded phone number
 */
export const encodePhoneForTel = (phone) => {
    if (phone === null || phone === undefined) {
        return '';
    }
    // Convert to string if not already
    const phoneStr = String(phone);
    // Trim and check if empty
    const trimmed = phoneStr.trim();
    if (trimmed === '') {
        return '';
    }
    // For tel: links, we need to encode the phone number
    // encodeURIComponent handles all special characters safely
    return encodeURIComponent(trimmed);
};

