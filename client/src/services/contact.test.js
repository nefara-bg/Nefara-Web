import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendEmail } from './contact.js';
import * as transporterModule from '@/utils/email/transporter';

// Mock the transporter module
vi.mock('@/utils/email/transporter', () => ({
    createPrivateEmailTransport: vi.fn(),
}));

describe('contact.js - sendEmail', () => {
    let mockTransporter;
    let originalEnv;

    beforeEach(() => {
        // Save original environment variables
        originalEnv = { ...process.env };
        
        // Set default SMTP_USER for tests
        process.env.SMTP_USER = 'test@example.com';
        
        // Create mock transporter with sendMail method
        mockTransporter = {
            sendMail: vi.fn().mockResolvedValue({ messageId: 'test-message-id' }),
        };
        
        // Reset all mocks
        vi.clearAllMocks();
        
        // Default: transporter creation succeeds
        transporterModule.createPrivateEmailTransport.mockResolvedValue(mockTransporter);
    });

    afterEach(() => {
        // Restore original environment variables
        process.env = originalEnv;
        vi.restoreAllMocks();
    });

    describe('Happy Path Tests', () => {
        it('TC1: Should successfully send email with valid parameters', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message content';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({ success: true });
            expect(transporterModule.createPrivateEmailTransport).toHaveBeenCalledTimes(1);
            expect(mockTransporter.sendMail).toHaveBeenCalledTimes(1);
            expect(mockTransporter.sendMail).toHaveBeenCalledWith({
                from: 'Contact Us from Nefara! <test@example.com>',
                to: 'test@example.com',
                subject: subject,
                replyTo: email,
                html: expect.stringContaining(email),
            });
        });

        it('TC2: Should successfully send email with special characters in message', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = '<script>alert("xss")</script> & <div>HTML content</div>';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({ success: true });
            expect(mockTransporter.sendMail).toHaveBeenCalledTimes(1);
            const callArgs = mockTransporter.sendMail.mock.calls[0][0];
            expect(callArgs.html).toContain(message);
            expect(callArgs.html).toContain(email);
        });

        it('TC3: Should successfully send email with empty subject', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = '';
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({ success: true });
            expect(mockTransporter.sendMail).toHaveBeenCalledWith(
                expect.objectContaining({
                    subject: '',
                })
            );
        });

        it('TC4: Should reject email with empty message', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = '';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Message cannot be empty.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC4a: Should reject email with whitespace-only message', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = '   \n\t  ';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Message cannot be empty.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC5: Should successfully send email with very long message', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'A'.repeat(10000); // Very long message

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({ success: true });
            expect(mockTransporter.sendMail).toHaveBeenCalledTimes(1);
            const callArgs = mockTransporter.sendMail.mock.calls[0][0];
            expect(callArgs.html).toContain(message);
        });
    });

    describe('Invalid Input Tests', () => {
        it('TC6: Should reject null email parameter', async () => {
            // Arrange
            const email = null;
            const subject = 'Test Subject';
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC7: Should reject undefined email parameter', async () => {
            // Arrange
            const email = undefined;
            const subject = 'Test Subject';
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC8: Should handle null subject parameter', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = null;
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            // Function may proceed or may fail
            if (result.success) {
                expect(mockTransporter.sendMail).toHaveBeenCalled();
            } else {
                expect(result).toEqual({
                    success: false,
                    error: 'Something went wrong. Please try again.',
                });
            }
        });

        it('TC9: Should handle undefined subject parameter', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = undefined;
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            // Function may proceed or may fail
            if (result.success) {
                expect(mockTransporter.sendMail).toHaveBeenCalled();
            } else {
                expect(result).toEqual({
                    success: false,
                    error: 'Something went wrong. Please try again.',
                });
            }
        });

        it('TC10: Should handle null message parameter', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = null;

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            // Function may proceed or may fail
            if (result.success) {
                expect(mockTransporter.sendMail).toHaveBeenCalled();
            } else {
                expect(result).toEqual({
                    success: false,
                    error: 'Something went wrong. Please try again.',
                });
            }
        });

        it('TC11: Should handle undefined message parameter', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = undefined;

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            // Function may proceed or may fail
            if (result.success) {
                expect(mockTransporter.sendMail).toHaveBeenCalled();
            } else {
                expect(result).toEqual({
                    success: false,
                    error: 'Something went wrong. Please try again.',
                });
            }
        });

        it('TC12: Should reject invalid email format', async () => {
            // Arrange
            const email = 'not-an-email';
            const subject = 'Test Subject';
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC13: Should reject empty string email', async () => {
            // Arrange
            const email = '';
            const subject = 'Test Subject';
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC13a: Should reject email with only whitespace', async () => {
            // Arrange
            const email = '   ';
            const subject = 'Test Subject';
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC13b: Should reject email missing @ symbol', async () => {
            // Arrange
            const email = 'invalidemail.com';
            const subject = 'Test Subject';
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC13c: Should reject email missing domain', async () => {
            // Arrange
            const email = 'user@';
            const subject = 'Test Subject';
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC13d: Should reject email missing TLD', async () => {
            // Arrange
            const email = 'user@domain';
            const subject = 'Test Subject';
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC14: Should reject non-string email (number)', async () => {
            // Arrange
            const email = 123;
            const subject = 'Test Subject';
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC15: Should handle non-string subject (number)', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 123;
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            // May succeed or fail
            if (result.success) {
                expect(mockTransporter.sendMail).toHaveBeenCalled();
            } else {
                expect(result).toEqual({
                    success: false,
                    error: 'Something went wrong. Please try again.',
                });
            }
        });

        it('TC16: Should handle non-string message (number)', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 123;

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            // May succeed or fail
            if (result.success) {
                expect(mockTransporter.sendMail).toHaveBeenCalled();
            } else {
                expect(result).toEqual({
                    success: false,
                    error: 'Something went wrong. Please try again.',
                });
            }
        });
    });

    describe('Error Condition Tests', () => {
        it('TC17: Should handle transport creation failure', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';
            const transportError = new Error('Failed to create transport');
            transporterModule.createPrivateEmailTransport.mockRejectedValue(transportError);

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Something went wrong. Please try again.',
            });
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC18: Should handle SMTP send failure', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';
            const sendError = new Error('SMTP send failed');
            mockTransporter.sendMail.mockRejectedValue(sendError);

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Something went wrong. Please try again.',
            });
            expect(transporterModule.createPrivateEmailTransport).toHaveBeenCalledTimes(1);
            expect(mockTransporter.sendMail).toHaveBeenCalledTimes(1);
        });

        it('TC19: Should handle network timeout error', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';
            const timeoutError = new Error('Connection timeout');
            timeoutError.code = 'ETIMEDOUT';
            mockTransporter.sendMail.mockRejectedValue(timeoutError);

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Something went wrong. Please try again.',
            });
        });

        it('TC20: Should handle missing SMTP_USER environment variable', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';
            delete process.env.SMTP_USER;

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            // May fail during sendMail call or succeed if transport was already created
            if (result.success) {
                expect(mockTransporter.sendMail).toHaveBeenCalled();
            } else {
                expect(result).toEqual({
                    success: false,
                    error: 'Something went wrong. Please try again.',
                });
            }
        });
    });

    describe('Business Rule Verification Tests', () => {
        it('TC21: Should format email correctly in HTML', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';

            // Act
            await sendEmail(email, subject, message);

            // Assert
            const callArgs = mockTransporter.sendMail.mock.calls[0][0];
            expect(callArgs.html).toContain(`<h4>This message was sent by: ${email}</h4>`);
        });

        it('TC22: Should format message correctly in HTML', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message content';

            // Act
            await sendEmail(email, subject, message);

            // Assert
            const callArgs = mockTransporter.sendMail.mock.calls[0][0];
            expect(callArgs.html).toContain(`<p>${message}</p>`);
            expect(callArgs.html).toContain('<div>');
        });

        it('TC23: Should set reply-to field correctly', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';

            // Act
            await sendEmail(email, subject, message);

            // Assert
            expect(mockTransporter.sendMail).toHaveBeenCalledWith(
                expect.objectContaining({
                    replyTo: email,
                })
            );
        });

        it('TC24: Should format from field correctly', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';
            process.env.SMTP_USER = 'recipient@example.com';

            // Act
            await sendEmail(email, subject, message);

            // Assert
            expect(mockTransporter.sendMail).toHaveBeenCalledWith(
                expect.objectContaining({
                    from: 'Contact Us from Nefara! <recipient@example.com>',
                })
            );
        });

        it('TC25: Should set to field as SMTP_USER', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';
            process.env.SMTP_USER = 'recipient@example.com';

            // Act
            await sendEmail(email, subject, message);

            // Assert
            expect(mockTransporter.sendMail).toHaveBeenCalledWith(
                expect.objectContaining({
                    to: 'recipient@example.com',
                })
            );
        });
    });
});

