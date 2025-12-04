// Email validation regex pattern (same as contact service)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// URL validation regex pattern (HTTP/HTTPS only)
const URL_REGEX = /^https?:\/\/.+/i;

/**
 * Validates and sanitizes the NEXT_PUBLIC_CLIENT_URL environment variable
 * @param {string | undefined} url - The client URL from environment
 * @returns {string} - Validated URL or safe default
 */
export const validateClientUrl = (url) => {
    const defaultUrl = 'http://localhost:3000';
    
    if (url === null || url === undefined) {
        return defaultUrl;
    }
    
    const urlStr = String(url).trim();
    
    if (urlStr === '') {
        return defaultUrl;
    }
    
    // Validate URL format (must be HTTP/HTTPS)
    if (!URL_REGEX.test(urlStr)) {
        return defaultUrl;
    }
    
    // Additional validation: try to create URL object
    try {
        const urlObj = new URL(urlStr);
        // Only allow http and https protocols
        if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
            return defaultUrl;
        }
        return urlStr;
    } catch (e) {
        // Invalid URL format
        return defaultUrl;
    }
};

/**
 * Validates and sanitizes the NEXT_PUBLIC_CONTACT_EMAIL environment variable
 * @param {string | undefined} email - The contact email from environment
 * @returns {string} - Validated email or empty string
 */
export const validateContactEmail = (email) => {
    if (email === null || email === undefined) {
        return '';
    }
    
    const emailStr = String(email).trim();
    
    if (emailStr === '') {
        return '';
    }
    
    // Validate email format
    if (!EMAIL_REGEX.test(emailStr)) {
        return '';
    }
    
    return emailStr;
};

/**
 * Validates and sanitizes the NEXT_PUBLIC_CONTACT_PHONE environment variable
 * @param {string | undefined} phone - The contact phone from environment
 * @returns {string} - Validated phone or empty string
 */
export const validateContactPhone = (phone) => {
    if (phone === null || phone === undefined) {
        return '';
    }
    
    const phoneStr = String(phone).trim();
    
    if (phoneStr === '') {
        return '';
    }
    
    // Basic validation: phone should have reasonable length and contain digits
    // Allow +, spaces, dashes, parentheses (common phone formats)
    const phonePattern = /^[\d\s+\-()]+$/;
    
    if (!phonePattern.test(phoneStr)) {
        return '';
    }
    
    // Should have at least some digits
    const hasDigits = /\d/.test(phoneStr);
    if (!hasDigits) {
        return '';
    }
    
    // Reasonable length check (between 7 and 20 characters)
    if (phoneStr.length < 7 || phoneStr.length > 20) {
        return '';
    }
    
    return phoneStr;
};

