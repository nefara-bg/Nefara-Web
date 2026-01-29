import { describe, it, expect } from 'vitest';
import { validateClientUrl, validateContactEmail, validateContactPhone } from './env';

describe('env.ts - validateClientUrl', () => {
    describe('Happy Path Tests', () => {
        it('TC1: Should validate valid HTTPS URL', () => {
            const url = 'https://example.com';
            const result = validateClientUrl(url);
            expect(result).toBe('https://example.com');
        });

        it('TC2: Should validate valid HTTP URL', () => {
            const url = 'http://example.com';
            const result = validateClientUrl(url);
            expect(result).toBe('http://example.com');
        });

        it('TC3: Should validate URL with port', () => {
            const url = 'https://example.com:3000';
            const result = validateClientUrl(url);
            expect(result).toBe('https://example.com:3000');
        });
    });

    describe('Validation Error Tests', () => {
        it('TC8: Should return default for invalid URL - not a URL', () => {
            const url = 'not-a-url';
            const result = validateClientUrl(url);
            expect(result).toBe('http://localhost:3000');
        });

        it('TC9: Should return default for invalid URL - FTP protocol', () => {
            const url = 'ftp://example.com';
            const result = validateClientUrl(url);
            expect(result).toBe('http://localhost:3000');
        });

        it('TC10: Should return default for invalid URL - javascript protocol', () => {
            const url = 'javascript:alert(1)';
            const result = validateClientUrl(url);
            expect(result).toBe('http://localhost:3000');
        });
    });

    describe('Edge Case Tests', () => {
        it('TC16: Should return default for null URL input', () => {
            const url = null;
            const result = validateClientUrl(url);
            expect(result).toBe('http://localhost:3000');
        });

        it('TC17: Should return default for undefined URL input', () => {
            const url = undefined;
            const result = validateClientUrl(url);
            expect(result).toBe('http://localhost:3000');
        });

        it('TC18: Should return default for empty string URL', () => {
            const url = '';
            const result = validateClientUrl(url);
            expect(result).toBe('http://localhost:3000');
        });

        it('TC19: Should return default for whitespace-only URL', () => {
            const url = '   ';
            const result = validateClientUrl(url);
            expect(result).toBe('http://localhost:3000');
        });
    });

    describe('Security Tests', () => {
        it('TC30: Should handle URL with script in query string', () => {
            const url = 'https://example.com?<script>';
            const result = validateClientUrl(url);
            expect(result).toBe('https://example.com?<script>');
            expect(result).toMatch(/^https?:\/\//);
        });
    });
});

describe('env.ts - validateContactEmail', () => {
    describe('Happy Path Tests', () => {
        it('TC4: Should validate valid email', () => {
            const email = 'contact@example.com';
            const result = validateContactEmail(email);
            expect(result).toBe('contact@example.com');
        });

        it('TC5: Should validate email with plus sign', () => {
            const email = 'user+test@example.com';
            const result = validateContactEmail(email);
            expect(result).toBe('user+test@example.com');
        });
    });

    describe('Validation Error Tests', () => {
        it('TC11: Should return empty string for invalid email - no @', () => {
            const email = 'not-an-email';
            const result = validateContactEmail(email);
            expect(result).toBe('');
        });

        it('TC12: Should return empty string for invalid email - no domain', () => {
            const email = 'user@';
            const result = validateContactEmail(email);
            expect(result).toBe('');
        });

        it('TC13: Should return empty string for invalid email - no TLD', () => {
            const email = 'user@domain';
            const result = validateContactEmail(email);
            expect(result).toBe('');
        });
    });

    describe('Edge Case Tests', () => {
        it('TC20: Should return empty string for null email input', () => {
            const email = null;
            const result = validateContactEmail(email);
            expect(result).toBe('');
        });

        it('TC21: Should return empty string for undefined email input', () => {
            const email = undefined;
            const result = validateContactEmail(email);
            expect(result).toBe('');
        });

        it('TC22: Should return empty string for empty string email', () => {
            const email = '';
            const result = validateContactEmail(email);
            expect(result).toBe('');
        });

        it('TC23: Should return empty string for whitespace-only email', () => {
            const email = '   ';
            const result = validateContactEmail(email);
            expect(result).toBe('');
        });
    });

    describe('Security Tests', () => {
        it('TC31: Should handle email with script in local part', () => {
            const email = 'user<script>@example.com';
            const result = validateContactEmail(email);
            expect(result).toBe('user<script>@example.com');
            expect(result).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        });
    });
});

describe('env.ts - validateContactPhone', () => {
    describe('Happy Path Tests', () => {
        it('TC6: Should validate valid phone', () => {
            const phone = '+359123456789';
            const result = validateContactPhone(phone);
            expect(result).toBe('+359123456789');
        });

        it('TC7: Should validate phone with spaces', () => {
            const phone = '+359 12 345 6789';
            const result = validateContactPhone(phone);
            expect(result).toBe('+359 12 345 6789');
        });

        it('Should validate phone with dashes', () => {
            const phone = '+359-12-345-6789';
            const result = validateContactPhone(phone);
            expect(result).toBe('+359-12-345-6789');
        });

        it('Should validate phone with parentheses', () => {
            const phone = '+359 (12) 345 6789';
            const result = validateContactPhone(phone);
            expect(result).toBe('+359 (12) 345 6789');
        });
    });

    describe('Validation Error Tests', () => {
        it('TC14: Should return empty string for empty phone', () => {
            const phone = '';
            const result = validateContactPhone(phone);
            expect(result).toBe('');
        });

        it('TC15: Should return empty string for non-phone string', () => {
            const phone = 'not-a-phone';
            const result = validateContactPhone(phone);
            expect(result).toBe('');
        });

        it('Should return empty string for phone too short', () => {
            const phone = '12345'; // Less than 7 characters
            const result = validateContactPhone(phone);
            expect(result).toBe('');
        });

        it('Should return empty string for phone too long', () => {
            const phone = '1'.repeat(21); // More than 20 characters
            const result = validateContactPhone(phone);
            expect(result).toBe('');
        });

        it('Should return empty string for phone with no digits', () => {
            const phone = '+++++++'; // No digits
            const result = validateContactPhone(phone);
            expect(result).toBe('');
        });
    });

    describe('Edge Case Tests', () => {
        it('TC24: Should return empty string for null phone input', () => {
            const phone = null;
            const result = validateContactPhone(phone);
            expect(result).toBe('');
        });

        it('TC25: Should return empty string for undefined phone input', () => {
            const phone = undefined;
            const result = validateContactPhone(phone);
            expect(result).toBe('');
        });

        it('TC26: Should return empty string for whitespace-only phone', () => {
            const phone = '   ';
            const result = validateContactPhone(phone);
            expect(result).toBe('');
        });
    });

    describe('Security Tests', () => {
        it('TC32: Should reject phone with injection attempt', () => {
            const phone = "123456;alert('xss')";
            const result = validateContactPhone(phone);
            expect(result).toBe('');
        });
    });
});
