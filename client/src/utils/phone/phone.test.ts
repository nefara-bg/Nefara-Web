import { describe, it, expect } from 'vitest';
import { parseBgPhone } from './phone';

describe('phone.ts - parseBgPhone', () => {
    describe('Happy Path Tests', () => {
        it('TC1: Should format valid phone number with no formatting', () => {
            const input = '+359123456789';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 12 345 6789');
        });

        it('TC2: Should format valid phone number with spaces', () => {
            const input = '+359 123 456 789';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 12 345 6789');
        });

        it('TC3: Should format valid phone number with dashes', () => {
            const input = '+359-123-456-789';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 12 345 6789');
        });

        it('TC4: Should format valid phone number with parentheses', () => {
            const input = '+359 (123) 456-789';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 12 345 6789');
        });

        it('TC5: Should format valid phone number with prefix 10', () => {
            const input = '+359101234567';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 10 123 4567');
        });

        it('TC6: Should format valid phone number with prefix 99', () => {
            const input = '+359991234567';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 99 123 4567');
        });

        it('TC7: Should format valid phone number with prefix 88', () => {
            const input = '+359881234567';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 88 123 4567');
        });
    });

    describe('Invalid Input Type Tests', () => {
        it('TC9: Should return empty string for null input', () => {
            const input = null;
            const result = parseBgPhone(input);
            expect(result).toBe('');
        });

        it('TC10: Should return empty string for undefined input', () => {
            const input = undefined;
            const result = parseBgPhone(input);
            expect(result).toBe('');
        });

        it('TC16: Should return empty string for empty string input', () => {
            const input = '';
            const result = parseBgPhone(input);
            expect(result).toBe('');
        });
    });

    describe('Invalid Format Tests', () => {
        it('TC17: Should return empty string for missing country code', () => {
            const input = '123456789';
            const result = parseBgPhone(input);
            expect(result).toBe('');
        });

        it('TC18: Should return empty string for wrong country code', () => {
            const input = '+123456789012';
            const result = parseBgPhone(input);
            expect(result).toBe('');
        });

        it('TC19: Should return empty string for too short phone (8 digits)', () => {
            const input = '+35912345678';
            const result = parseBgPhone(input);
            expect(result).toBe('');
        });

        it('TC20: Should return empty string for too long phone (10 digits)', () => {
            const input = '+3591234567890';
            const result = parseBgPhone(input);
            expect(result).toBe('');
        });

        it('TC21: Should return empty string for only plus sign', () => {
            const input = '+';
            const result = parseBgPhone(input);
            expect(result).toBe('');
        });

        it('TC22: Should return empty string for no plus sign', () => {
            const input = '359123456789';
            const result = parseBgPhone(input);
            expect(result).toBe('');
        });

        it('TC23: Should return empty string for whitespace only', () => {
            const input = '   ';
            const result = parseBgPhone(input);
            expect(result).toBe('');
        });

        it('TC24: Should return empty string for special characters only', () => {
            const input = '---()[]';
            const result = parseBgPhone(input);
            expect(result).toBe('');
        });

        it('TC25: Should return empty string for phone with letters (after stripping)', () => {
            const input = '+359abc123456';
            const result = parseBgPhone(input);
            expect(result).toBe('');
        });

        it('TC26: Should return empty string for mixed formatting with extra text', () => {
            const input = '+359 (123) 456-789 ext. 123';
            const result = parseBgPhone(input);
            expect(result).toBe('');
        });

        it('TC27: Should format phone with prefix 00 (if regex allows)', () => {
            const input = '+359001234567';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 00 123 4567');
        });
    });

    describe('Sanitization Tests', () => {
        it('TC28: Should handle multiple spaces', () => {
            const input = '+359  123  456  789';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 12 345 6789');
        });

        it('TC29: Should handle mixed special characters', () => {
            const input = '+359-123.456_789';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 12 345 6789');
        });

        it('TC30: Should strip letters from phone number', () => {
            const input = '+359a1b2c3d4e5f6g7h8i9';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 12 345 6789');
        });

        it('TC31: Should handle various special characters', () => {
            const input = '+359@123#456$789%';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 12 345 6789');
        });
    });

    describe('Format Validation Edge Cases', () => {
        it('Should correctly format phone with prefix starting with 0', () => {
            const input = '+359012345678';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 01 234 5678');
        });

        it('Should correctly format phone with prefix 87', () => {
            const input = '+359871234567';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 87 123 4567');
        });

        it('Should handle phone with tabs and newlines', () => {
            const input = '+359\t123\n456\r789';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 12 345 6789');
        });

        it('Should handle phone with only digits after stripping invalid chars', () => {
            const input = 'abc+359123456789def';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 12 345 6789');
        });
    });

    describe('Invalid Format Return Value Verification', () => {
        it('Should return empty string for invalid format', () => {
            const input = 'invalid';
            const result = parseBgPhone(input);
            expect(result).toBe('');
            expect(typeof result).toBe('string');
        });
    });

    describe('Output Format Verification', () => {
        it('Should always return format "+359 XX XXX XXXX" for valid inputs', () => {
            const inputs = [
                '+359123456789',
                '+359 123 456 789',
                '+359-123-456-789',
                '+359(123)456789',
            ];

            inputs.forEach(input => {
                const result = parseBgPhone(input);
                expect(result).toMatch(/^\+359 \d{2} \d{3} \d{4}$/);
                expect(result).toBe('+359 12 345 6789');
            });
        });

        it('Should preserve correct digit grouping in output', () => {
            const input = '+359987654321';
            const result = parseBgPhone(input);
            expect(result).toBe('+359 98 765 4321');
            const parts = result.split(' ');
            expect(parts[0]).toBe('+359');
            expect(parts[1]).toHaveLength(2); // prefix
            expect(parts[2]).toHaveLength(3); // middle
            expect(parts[3]).toHaveLength(4); // last
        });
    });
});
