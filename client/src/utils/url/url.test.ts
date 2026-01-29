import { describe, it, expect } from 'vitest';
import { encodeEmailForMailto, encodePhoneForTel } from './url';

describe('url.ts - encodeEmailForMailto', () => {
    describe('Happy Path Tests', () => {
        it('TC1: Should encode valid email address', () => {
            const email = 'user@example.com';
            const result = encodeEmailForMailto(email);
            expect(result).toBe('user%40example.com');
            expect(result).not.toContain('@');
        });

        it('TC2: Should encode email with plus sign', () => {
            const email = 'user+test@example.com';
            const result = encodeEmailForMailto(email);
            expect(result).toBe('user%2Btest%40example.com');
            expect(result).not.toContain('+');
            expect(result).not.toContain('@');
        });
    });

    describe('Security Tests', () => {
        it('TC5: Should encode email with query injection attempt', () => {
            const email = 'user@example.com?subject=<script>alert("xss")</script>';
            const result = encodeEmailForMailto(email);
            expect(result).not.toContain('<script>');
            expect(result).not.toContain('?');
            expect(result).not.toContain('=');
            expect(result).toContain('%3F');
            expect(result).toContain('%3D');
            expect(result).toContain('%3C');
            expect(result).toContain('%3E');
        });

        it('TC6: Should encode email with special characters', () => {
            const email = 'user&test@example.com';
            const result = encodeEmailForMailto(email);
            expect(result).not.toContain('&');
            expect(result).toContain('%26');
            expect(result).not.toContain('@');
            expect(result).toContain('%40');
        });
    });

    describe('Edge Case Tests', () => {
        it('TC9: Should return empty string for null email', () => {
            const email = null;
            const result = encodeEmailForMailto(email);
            expect(result).toBe('');
        });

        it('TC10: Should return empty string for undefined email', () => {
            const email = undefined;
            const result = encodeEmailForMailto(email);
            expect(result).toBe('');
        });

        it('TC11: Should return empty string for empty string email', () => {
            const email = '';
            const result = encodeEmailForMailto(email);
            expect(result).toBe('');
        });

        it('TC15: Should return empty string for whitespace-only email', () => {
            const email = '   ';
            const result = encodeEmailForMailto(email);
            expect(result).toBe('');
        });
    });
});

describe('url.ts - encodePhoneForTel', () => {
    describe('Happy Path Tests', () => {
        it('TC3: Should encode valid phone number', () => {
            const phone = '+359123456789';
            const result = encodePhoneForTel(phone);
            expect(result).toBe('%2B359123456789');
            expect(result).not.toContain('+');
        });

        it('TC4: Should encode phone with spaces', () => {
            const phone = '+359 12 345 6789';
            const result = encodePhoneForTel(phone);
            expect(result).toBe('%2B359%2012%20345%206789');
            expect(result).not.toContain(' ');
            expect(result).not.toContain('+');
        });
    });

    describe('Security Tests', () => {
        it('TC7: Should encode phone with injection attempt', () => {
            const phone = "123456;alert('xss')";
            const result = encodePhoneForTel(phone);
            expect(result).not.toContain(';');
            expect(result).toContain('%3B');
        });

        it('TC8: Should encode phone with special characters', () => {
            const phone = '+359-12-345-6789';
            const result = encodePhoneForTel(phone);
            expect(result).not.toContain('+');
            expect(result).toContain('%2B');
        });
    });

    describe('Edge Case Tests', () => {
        it('TC12: Should return empty string for null phone', () => {
            const phone = null;
            const result = encodePhoneForTel(phone);
            expect(result).toBe('');
        });

        it('TC13: Should return empty string for undefined phone', () => {
            const phone = undefined;
            const result = encodePhoneForTel(phone);
            expect(result).toBe('');
        });

        it('TC14: Should return empty string for empty string phone', () => {
            const phone = '';
            const result = encodePhoneForTel(phone);
            expect(result).toBe('');
        });

        it('TC16: Should return empty string for whitespace-only phone', () => {
            const phone = '   ';
            const result = encodePhoneForTel(phone);
            expect(result).toBe('');
        });
    });
});
