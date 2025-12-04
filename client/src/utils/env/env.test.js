import { describe, it, expect } from 'vitest';
import { validateClientUrl, validateContactEmail, validateContactPhone } from './env';

describe('env.js - validateClientUrl', () => {
    describe('Happy Path Tests', () => {
        it('TC1: Should validate valid HTTPS URL', () => {
            // Arrange
            const url = 'https://example.com';

            // Act
            const result = validateClientUrl(url);

            // Assert
            expect(result).toBe('https://example.com');
        });

        it('TC2: Should validate valid HTTP URL', () => {
            // Arrange
            const url = 'http://example.com';

            // Act
            const result = validateClientUrl(url);

            // Assert
            expect(result).toBe('http://example.com');
        });

        it('TC3: Should validate URL with port', () => {
            // Arrange
            const url = 'https://example.com:3000';

            // Act
            const result = validateClientUrl(url);

            // Assert
            expect(result).toBe('https://example.com:3000');
        });
    });

    describe('Validation Error Tests', () => {
        it('TC8: Should return default for invalid URL - not a URL', () => {
            // Arrange
            const url = 'not-a-url';

            // Act
            const result = validateClientUrl(url);

            // Assert
            expect(result).toBe('http://localhost:3000');
        });

        it('TC9: Should return default for invalid URL - FTP protocol', () => {
            // Arrange
            const url = 'ftp://example.com';

            // Act
            const result = validateClientUrl(url);

            // Assert
            expect(result).toBe('http://localhost:3000');
        });

        it('TC10: Should return default for invalid URL - javascript protocol', () => {
            // Arrange
            const url = 'javascript:alert(1)';

            // Act
            const result = validateClientUrl(url);

            // Assert
            expect(result).toBe('http://localhost:3000');
        });
    });

    describe('Edge Case Tests', () => {
        it('TC16: Should return default for null URL input', () => {
            // Arrange
            const url = null;

            // Act
            const result = validateClientUrl(url);

            // Assert
            expect(result).toBe('http://localhost:3000');
        });

        it('TC17: Should return default for undefined URL input', () => {
            // Arrange
            const url = undefined;

            // Act
            const result = validateClientUrl(url);

            // Assert
            expect(result).toBe('http://localhost:3000');
        });

        it('TC18: Should return default for empty string URL', () => {
            // Arrange
            const url = '';

            // Act
            const result = validateClientUrl(url);

            // Assert
            expect(result).toBe('http://localhost:3000');
        });

        it('TC19: Should return default for whitespace-only URL', () => {
            // Arrange
            const url = '   ';

            // Act
            const result = validateClientUrl(url);

            // Assert
            expect(result).toBe('http://localhost:3000');
        });

        it('TC27: Should return default for non-string URL (number)', () => {
            // Arrange
            const url = 123;

            // Act
            const result = validateClientUrl(url);

            // Assert
            expect(result).toBe('http://localhost:3000');
        });
    });

    describe('Security Tests', () => {
        it('TC30: Should handle URL with script in query string', () => {
            // Arrange
            const url = 'https://example.com?<script>';

            // Act
            const result = validateClientUrl(url);

            // Assert
            // URL constructor accepts this as valid URL format
            // The script tag will be URL-encoded when used, so it's safe
            // Protocol check ensures it's HTTP/HTTPS
            expect(result).toBe('https://example.com?<script>');
            // The important thing is protocol validation (HTTP/HTTPS only)
            expect(result).toMatch(/^https?:\/\//);
        });
    });
});

describe('env.js - validateContactEmail', () => {
    describe('Happy Path Tests', () => {
        it('TC4: Should validate valid email', () => {
            // Arrange
            const email = 'contact@example.com';

            // Act
            const result = validateContactEmail(email);

            // Assert
            expect(result).toBe('contact@example.com');
        });

        it('TC5: Should validate email with plus sign', () => {
            // Arrange
            const email = 'user+test@example.com';

            // Act
            const result = validateContactEmail(email);

            // Assert
            expect(result).toBe('user+test@example.com');
        });
    });

    describe('Validation Error Tests', () => {
        it('TC11: Should return empty string for invalid email - no @', () => {
            // Arrange
            const email = 'not-an-email';

            // Act
            const result = validateContactEmail(email);

            // Assert
            expect(result).toBe('');
        });

        it('TC12: Should return empty string for invalid email - no domain', () => {
            // Arrange
            const email = 'user@';

            // Act
            const result = validateContactEmail(email);

            // Assert
            expect(result).toBe('');
        });

        it('TC13: Should return empty string for invalid email - no TLD', () => {
            // Arrange
            const email = 'user@domain';

            // Act
            const result = validateContactEmail(email);

            // Assert
            expect(result).toBe('');
        });
    });

    describe('Edge Case Tests', () => {
        it('TC20: Should return empty string for null email input', () => {
            // Arrange
            const email = null;

            // Act
            const result = validateContactEmail(email);

            // Assert
            expect(result).toBe('');
        });

        it('TC21: Should return empty string for undefined email input', () => {
            // Arrange
            const email = undefined;

            // Act
            const result = validateContactEmail(email);

            // Assert
            expect(result).toBe('');
        });

        it('TC22: Should return empty string for empty string email', () => {
            // Arrange
            const email = '';

            // Act
            const result = validateContactEmail(email);

            // Assert
            expect(result).toBe('');
        });

        it('TC23: Should return empty string for whitespace-only email', () => {
            // Arrange
            const email = '   ';

            // Act
            const result = validateContactEmail(email);

            // Assert
            expect(result).toBe('');
        });

        it('TC28: Should return empty string for non-string email (number)', () => {
            // Arrange
            const email = 123;

            // Act
            const result = validateContactEmail(email);

            // Assert
            expect(result).toBe('');
        });
    });

    describe('Security Tests', () => {
        it('TC31: Should handle email with script in local part', () => {
            // Arrange
            const email = 'user<script>@example.com';

            // Act
            const result = validateContactEmail(email);

            // Assert
            // Email regex allows <script> before @ (it's not whitespace or @)
            // However, this will be URL-encoded when used in mailto: links
            // The email format is technically valid (though unusual)
            // In practice, this will be encoded by encodeEmailForMailto() when used
            expect(result).toBe('user<script>@example.com');
            // The important thing is that it matches email format
            expect(result).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        });
    });
});

describe('env.js - validateContactPhone', () => {
    describe('Happy Path Tests', () => {
        it('TC6: Should validate valid phone', () => {
            // Arrange
            const phone = '+359123456789';

            // Act
            const result = validateContactPhone(phone);

            // Assert
            expect(result).toBe('+359123456789');
        });

        it('TC7: Should validate phone with spaces', () => {
            // Arrange
            const phone = '+359 12 345 6789';

            // Act
            const result = validateContactPhone(phone);

            // Assert
            expect(result).toBe('+359 12 345 6789');
        });

        it('Should validate phone with dashes', () => {
            // Arrange
            const phone = '+359-12-345-6789';

            // Act
            const result = validateContactPhone(phone);

            // Assert
            expect(result).toBe('+359-12-345-6789');
        });

        it('Should validate phone with parentheses', () => {
            // Arrange
            const phone = '+359 (12) 345 6789';

            // Act
            const result = validateContactPhone(phone);

            // Assert
            expect(result).toBe('+359 (12) 345 6789');
        });
    });

    describe('Validation Error Tests', () => {
        it('TC14: Should return empty string for empty phone', () => {
            // Arrange
            const phone = '';

            // Act
            const result = validateContactPhone(phone);

            // Assert
            expect(result).toBe('');
        });

        it('TC15: Should return empty string for non-phone string', () => {
            // Arrange
            const phone = 'not-a-phone';

            // Act
            const result = validateContactPhone(phone);

            // Assert
            expect(result).toBe('');
        });

        it('Should return empty string for phone too short', () => {
            // Arrange
            const phone = '12345'; // Less than 7 characters

            // Act
            const result = validateContactPhone(phone);

            // Assert
            expect(result).toBe('');
        });

        it('Should return empty string for phone too long', () => {
            // Arrange
            const phone = '1'.repeat(21); // More than 20 characters

            // Act
            const result = validateContactPhone(phone);

            // Assert
            expect(result).toBe('');
        });

        it('Should return empty string for phone with no digits', () => {
            // Arrange
            const phone = '+++++++'; // No digits

            // Act
            const result = validateContactPhone(phone);

            // Assert
            expect(result).toBe('');
        });
    });

    describe('Edge Case Tests', () => {
        it('TC24: Should return empty string for null phone input', () => {
            // Arrange
            const phone = null;

            // Act
            const result = validateContactPhone(phone);

            // Assert
            expect(result).toBe('');
        });

        it('TC25: Should return empty string for undefined phone input', () => {
            // Arrange
            const phone = undefined;

            // Act
            const result = validateContactPhone(phone);

            // Assert
            expect(result).toBe('');
        });

        it('TC26: Should return empty string for whitespace-only phone', () => {
            // Arrange
            const phone = '   ';

            // Act
            const result = validateContactPhone(phone);

            // Assert
            expect(result).toBe('');
        });

        it('TC29: Should convert non-string phone to string and validate', () => {
            // Arrange
            const phone = 123456789;

            // Act
            const result = validateContactPhone(phone);

            // Assert
            expect(result).toBe('123456789');
        });
    });

    describe('Security Tests', () => {
        it('TC32: Should reject phone with injection attempt', () => {
            // Arrange
            const phone = "123456;alert('xss')";

            // Act
            const result = validateContactPhone(phone);

            // Assert
            // Semicolon and quotes are not allowed in phone pattern
            expect(result).toBe('');
        });
    });
});

