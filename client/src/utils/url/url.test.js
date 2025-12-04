import { describe, it, expect } from 'vitest';
import { encodeEmailForMailto, encodePhoneForTel } from './url';

describe('url.js - encodeEmailForMailto', () => {
    describe('Happy Path Tests', () => {
        it('TC1: Should encode valid email address', () => {
            // Arrange
            const email = 'user@example.com';

            // Act
            const result = encodeEmailForMailto(email);

            // Assert
            expect(result).toBe('user%40example.com');
            expect(result).not.toContain('@');
        });

        it('TC2: Should encode email with plus sign', () => {
            // Arrange
            const email = 'user+test@example.com';

            // Act
            const result = encodeEmailForMailto(email);

            // Assert
            expect(result).toBe('user%2Btest%40example.com');
            expect(result).not.toContain('+');
            expect(result).not.toContain('@');
        });
    });

    describe('Security Tests', () => {
        it('TC5: Should encode email with query injection attempt', () => {
            // Arrange
            const email = 'user@example.com?subject=<script>alert("xss")</script>';

            // Act
            const result = encodeEmailForMailto(email);

            // Assert
            // Special characters should be encoded (not present as raw)
            expect(result).not.toContain('<script>');
            expect(result).not.toContain('?');
            expect(result).not.toContain('=');
            // All special characters should be encoded
            expect(result).toContain('%3F'); // ?
            expect(result).toContain('%3D'); // =
            expect(result).toContain('%3C'); // <
            expect(result).toContain('%3E'); // >
            // Note: "alert" text will still be visible in encoded form, but special chars are encoded
            // This is safe because the encoding prevents script execution
        });

        it('TC6: Should encode email with special characters', () => {
            // Arrange
            const email = 'user&test@example.com';

            // Act
            const result = encodeEmailForMailto(email);

            // Assert
            expect(result).not.toContain('&');
            expect(result).toContain('%26'); // &
            expect(result).not.toContain('@');
            expect(result).toContain('%40'); // @
        });
    });

    describe('Edge Case Tests', () => {
        it('TC9: Should return empty string for null email', () => {
            // Arrange
            const email = null;

            // Act
            const result = encodeEmailForMailto(email);

            // Assert
            expect(result).toBe('');
        });

        it('TC10: Should return empty string for undefined email', () => {
            // Arrange
            const email = undefined;

            // Act
            const result = encodeEmailForMailto(email);

            // Assert
            expect(result).toBe('');
        });

        it('TC11: Should return empty string for empty string email', () => {
            // Arrange
            const email = '';

            // Act
            const result = encodeEmailForMailto(email);

            // Assert
            expect(result).toBe('');
        });

        it('TC15: Should return empty string for whitespace-only email', () => {
            // Arrange
            const email = '   ';

            // Act
            const result = encodeEmailForMailto(email);

            // Assert
            expect(result).toBe('');
        });

        it('TC17: Should convert non-string email to string and encode', () => {
            // Arrange
            const email = 123;

            // Act
            const result = encodeEmailForMailto(email);

            // Assert
            expect(result).toBe('123');
            expect(typeof result).toBe('string');
        });
    });
});

describe('url.js - encodePhoneForTel', () => {
    describe('Happy Path Tests', () => {
        it('TC3: Should encode valid phone number', () => {
            // Arrange
            const phone = '+359123456789';

            // Act
            const result = encodePhoneForTel(phone);

            // Assert
            expect(result).toBe('%2B359123456789');
            expect(result).not.toContain('+');
        });

        it('TC4: Should encode phone with spaces', () => {
            // Arrange
            const phone = '+359 12 345 6789';

            // Act
            const result = encodePhoneForTel(phone);

            // Assert
            expect(result).toBe('%2B359%2012%20345%206789');
            expect(result).not.toContain(' ');
            expect(result).not.toContain('+');
        });
    });

    describe('Security Tests', () => {
        it('TC7: Should encode phone with injection attempt', () => {
            // Arrange
            const phone = "123456;alert('xss')";

            // Act
            const result = encodePhoneForTel(phone);

            // Assert
            // Special characters that could break tel: links should be encoded
            expect(result).not.toContain(';');
            // All special characters that need encoding should be encoded
            expect(result).toContain('%3B'); // ;
            // Note: Single quotes (') may not be encoded by encodeURIComponent as they're safe in URLs
            // The important thing is that ; (semicolon) is encoded, which prevents command injection
            // "alert" text will still be visible in encoded form, but special chars that matter are encoded
            // This is safe because the encoding prevents script execution in tel: links
        });

        it('TC8: Should encode phone with special characters', () => {
            // Arrange
            const phone = '+359-12-345-6789';

            // Act
            const result = encodePhoneForTel(phone);

            // Assert
            // Note: encodeURIComponent doesn't encode - (dash) as it's safe in URLs
            // But + should be encoded
            expect(result).not.toContain('+');
            expect(result).toContain('%2B'); // +
            // Dash is safe and may or may not be encoded depending on context
            // The important thing is that + is encoded
        });
    });

    describe('Edge Case Tests', () => {
        it('TC12: Should return empty string for null phone', () => {
            // Arrange
            const phone = null;

            // Act
            const result = encodePhoneForTel(phone);

            // Assert
            expect(result).toBe('');
        });

        it('TC13: Should return empty string for undefined phone', () => {
            // Arrange
            const phone = undefined;

            // Act
            const result = encodePhoneForTel(phone);

            // Assert
            expect(result).toBe('');
        });

        it('TC14: Should return empty string for empty string phone', () => {
            // Arrange
            const phone = '';

            // Act
            const result = encodePhoneForTel(phone);

            // Assert
            expect(result).toBe('');
        });

        it('TC16: Should return empty string for whitespace-only phone', () => {
            // Arrange
            const phone = '   ';

            // Act
            const result = encodePhoneForTel(phone);

            // Assert
            expect(result).toBe('');
        });

        it('TC18: Should convert non-string phone to string and encode', () => {
            // Arrange
            const phone = 123456789;

            // Act
            const result = encodePhoneForTel(phone);

            // Assert
            expect(result).toBe('123456789');
            expect(typeof result).toBe('string');
        });
    });
});

