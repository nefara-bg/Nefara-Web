import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPrivateEmailTransport } from './transporter.js';

// Mock nodemailer
const mockCreateTransport = vi.fn();
vi.mock('nodemailer', () => ({
    default: {
        createTransport: (config) => mockCreateTransport(config),
    },
}));

describe('transporter.js - createPrivateEmailTransport', () => {
    let originalEnv;
    let mockTransporter;

    beforeEach(() => {
        // Save original environment variables
        originalEnv = { ...process.env };
        
        // Create mock transporter
        mockTransporter = {
            sendMail: vi.fn(),
            verify: vi.fn(),
        };
        
        // Reset mocks
        vi.clearAllMocks();
        mockCreateTransport.mockReturnValue(mockTransporter);
        
        // Set default valid environment variables
        process.env.SMTP_HOST = 'smtp.example.com';
        process.env.SMTP_PORT = '587';
        process.env.SMTP_USER = 'user@example.com';
        process.env.SMTP_PASS = 'password123';
    });

    afterEach(() => {
        // Restore original environment variables
        process.env = originalEnv;
        vi.restoreAllMocks();
    });

    describe('Happy Path Tests', () => {
        it('TC1: Should successfully create transport with standard port', async () => {
            // Arrange
            process.env.SMTP_PORT = '587';

            // Act
            const result = await createPrivateEmailTransport();

            // Assert
            expect(result).toBe(mockTransporter);
            expect(mockCreateTransport).toHaveBeenCalledTimes(1);
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.secure).toBe(false);
            expect(config.requireTLS).toBe(true);
            expect(config.host).toBe('smtp.example.com');
            expect(config.port).toBe(587);
        });

        it('TC2: Should create transport with secure port (465)', async () => {
            // Arrange
            process.env.SMTP_PORT = '465';

            // Act
            const result = await createPrivateEmailTransport();

            // Assert
            expect(result).toBe(mockTransporter);
            expect(mockCreateTransport).toHaveBeenCalledTimes(1);
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.secure).toBe(true);
            expect(config.requireTLS).toBe(false);
            expect(config.port).toBe(465);
        });

        it('TC3: Should create transport with standard port (587)', async () => {
            // Arrange
            process.env.SMTP_PORT = '587';

            // Act
            const result = await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.secure).toBe(false);
            expect(config.requireTLS).toBe(true);
            expect(config.port).toBe(587);
        });

        it('TC4: Should create transport with port 25', async () => {
            // Arrange
            process.env.SMTP_PORT = '25';

            // Act
            const result = await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.secure).toBe(false);
            expect(config.requireTLS).toBe(true);
            expect(config.port).toBe(25);
        });

        it('TC5: Should create transport with custom port (2525)', async () => {
            // Arrange
            process.env.SMTP_PORT = '2525';

            // Act
            const result = await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.secure).toBe(false);
            expect(config.requireTLS).toBe(true);
            expect(config.port).toBe(2525);
        });
    });

    describe('Configuration Verification Tests', () => {
        it('TC6: Should set host correctly from environment', async () => {
            // Arrange
            process.env.SMTP_HOST = 'smtp.custom.com';

            // Act
            await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.host).toBe('smtp.custom.com');
        });

        it('TC7: Should convert port string to number', async () => {
            // Arrange
            process.env.SMTP_PORT = '587';

            // Act
            await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.port).toBe(587);
            expect(typeof config.port).toBe('number');
        });

        it('TC8: Should set auth.user correctly from environment', async () => {
            // Arrange
            process.env.SMTP_USER = 'custom@example.com';

            // Act
            await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.auth.user).toBe('custom@example.com');
        });

        it('TC9: Should set auth.pass correctly from environment', async () => {
            // Arrange
            process.env.SMTP_PASS = 'custompassword';

            // Act
            await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.auth.pass).toBe('custompassword');
        });

        it('TC10: Should set all timeouts to 5000ms', async () => {
            // Arrange
            // Using default env vars

            // Act
            await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.connectionTimeout).toBe(5000);
            expect(config.socketTimeout).toBe(5000);
            expect(config.greetingTimeout).toBe(5000);
        });

        it('TC11: Should set requireTLS to false when secure is true (port 465)', async () => {
            // Arrange
            process.env.SMTP_PORT = '465';

            // Act
            await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.secure).toBe(true);
            expect(config.requireTLS).toBe(false);
        });

        it('TC12: Should set requireTLS to true when secure is false (port 587)', async () => {
            // Arrange
            process.env.SMTP_PORT = '587';

            // Act
            await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.secure).toBe(false);
            expect(config.requireTLS).toBe(true);
        });
    });

    describe('Edge Case Tests (Validation Failures)', () => {
        it('TC13: Should throw error when SMTP_PORT is missing', async () => {
            // Arrange
            delete process.env.SMTP_PORT;

            // Act & Assert
            await expect(createPrivateEmailTransport()).rejects.toThrow(
                'SMTP_PORT environment variable is required'
            );
            expect(mockCreateTransport).not.toHaveBeenCalled();
        });

        it('TC14: Should throw error when SMTP_HOST is missing', async () => {
            // Arrange
            delete process.env.SMTP_HOST;

            // Act & Assert
            await expect(createPrivateEmailTransport()).rejects.toThrow(
                'SMTP_HOST environment variable is required'
            );
            expect(mockCreateTransport).not.toHaveBeenCalled();
        });

        it('TC15: Should throw error when SMTP_USER is missing', async () => {
            // Arrange
            delete process.env.SMTP_USER;

            // Act & Assert
            await expect(createPrivateEmailTransport()).rejects.toThrow(
                'SMTP_USER environment variable is required'
            );
            expect(mockCreateTransport).not.toHaveBeenCalled();
        });

        it('TC16: Should throw error when SMTP_PASS is missing', async () => {
            // Arrange
            delete process.env.SMTP_PASS;

            // Act & Assert
            await expect(createPrivateEmailTransport()).rejects.toThrow(
                'SMTP_PASS environment variable is required'
            );
            expect(mockCreateTransport).not.toHaveBeenCalled();
        });

        it('TC17: Should throw error when SMTP_PORT is non-numeric string', async () => {
            // Arrange
            process.env.SMTP_PORT = 'not-a-number';

            // Act & Assert
            await expect(createPrivateEmailTransport()).rejects.toThrow(
                'SMTP_PORT must be a valid number'
            );
            expect(mockCreateTransport).not.toHaveBeenCalled();
        });

        it('TC18: Should throw error when SMTP_PORT is empty string', async () => {
            // Arrange
            process.env.SMTP_PORT = '';

            // Act & Assert
            await expect(createPrivateEmailTransport()).rejects.toThrow(
                'SMTP_PORT environment variable is required'
            );
            expect(mockCreateTransport).not.toHaveBeenCalled();
        });

        it('TC19: Should handle SMTP_PORT as zero', async () => {
            // Arrange
            process.env.SMTP_PORT = '0';

            // Act
            await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.port).toBe(0);
            expect(config.secure).toBe(false); // 0 === 465 is false
            expect(config.requireTLS).toBe(true);
        });

        it('TC20: Should handle SMTP_PORT as negative number', async () => {
            // Arrange
            process.env.SMTP_PORT = '-1';

            // Act
            await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.port).toBe(-1);
            expect(config.secure).toBe(false); // -1 === 465 is false
            expect(config.requireTLS).toBe(true);
        });

        it('TC21: Should handle SMTP_PORT as very large number', async () => {
            // Arrange
            process.env.SMTP_PORT = '99999';

            // Act
            await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.port).toBe(99999);
            expect(config.secure).toBe(false); // 99999 === 465 is false
            expect(config.requireTLS).toBe(true);
        });

        it('TC22: Should handle SMTP_PORT as float', async () => {
            // Arrange
            process.env.SMTP_PORT = '465.5';

            // Act
            await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.port).toBe(465.5);
            expect(config.secure).toBe(false); // 465.5 === 465 is false (strict equality)
            expect(config.requireTLS).toBe(true);
        });

        it('TC23: Should throw error when all environment variables are missing', async () => {
            // Arrange
            delete process.env.SMTP_HOST;
            delete process.env.SMTP_PORT;
            delete process.env.SMTP_USER;
            delete process.env.SMTP_PASS;

            // Act & Assert
            // Should fail on first missing variable (SMTP_HOST)
            await expect(createPrivateEmailTransport()).rejects.toThrow(
                'SMTP_HOST environment variable is required'
            );
            expect(mockCreateTransport).not.toHaveBeenCalled();
        });

        it('TC24: Should throw error when environment variables are empty strings', async () => {
            // Arrange
            process.env.SMTP_HOST = '';
            process.env.SMTP_PORT = '';
            process.env.SMTP_USER = '';
            process.env.SMTP_PASS = '';

            // Act & Assert
            // Should fail on first empty variable (SMTP_HOST)
            await expect(createPrivateEmailTransport()).rejects.toThrow(
                'SMTP_HOST environment variable is required'
            );
            expect(mockCreateTransport).not.toHaveBeenCalled();
        });
    });

    describe('Complete Configuration Structure Tests', () => {
        it('Should create transport with complete configuration structure', async () => {
            // Arrange
            process.env.SMTP_HOST = 'smtp.test.com';
            process.env.SMTP_PORT = '587';
            process.env.SMTP_USER = 'test@test.com';
            process.env.SMTP_PASS = 'testpass';

            // Act
            await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config).toEqual({
                host: 'smtp.test.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: 'test@test.com',
                    pass: 'testpass',
                },
                connectionTimeout: 5000,
                socketTimeout: 5000,
                greetingTimeout: 5000,
            });
        });

        it('Should create transport with secure configuration (port 465)', async () => {
            // Arrange
            process.env.SMTP_PORT = '465';

            // Act
            await createPrivateEmailTransport();

            // Assert
            const config = mockCreateTransport.mock.calls[0][0];
            expect(config.secure).toBe(true);
            expect(config.requireTLS).toBe(false);
        });
    });
});

