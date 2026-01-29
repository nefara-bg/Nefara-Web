import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendEmail } from './contact';
import * as transporterModule from '@/utils/email/transporter';

// Mock the transporter module
vi.mock('@/utils/email/transporter', () => ({
    createPrivateEmailTransport: vi.fn(),
}));

describe('contact.ts - sendEmail', () => {
    let mockTransporter: any;
    let originalEnv: NodeJS.ProcessEnv;

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
        (transporterModule.createPrivateEmailTransport as any).mockResolvedValue(mockTransporter);
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

        it('TC2: Should successfully send email with special characters in message (HTML escaped)', async () => {
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
            // Verify HTML is escaped (not raw HTML)
            // Note: / is escaped as &#x2F;
            expect(callArgs.html).toContain('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
            expect(callArgs.html).toContain('&amp;');
            expect(callArgs.html).toContain('&lt;div&gt;HTML content&lt;&#x2F;div&gt;');
            // Verify email is escaped
            expect(callArgs.html).toContain('sender@example.com');
            // Verify original HTML is NOT present (security check)
            expect(callArgs.html).not.toContain('<script>');
            expect(callArgs.html).not.toContain('alert("xss")');
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
            const email = null as any;
            const subject = 'Test Subject';
            const message = 'Test message';

            const result = await sendEmail(email, subject, message);

            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC7: Should reject undefined email parameter', async () => {
            const email = undefined as any;
            const subject = 'Test Subject';
            const message = 'Test message';

            const result = await sendEmail(email, subject, message);

            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC8: Should handle null subject parameter', async () => {
            const email = 'sender@example.com';
            const subject = null as any;
            const message = 'Test message';

            const result = await sendEmail(email, subject, message);

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
            const email = 'sender@example.com';
            const subject = undefined as any;
            const message = 'Test message';

            const result = await sendEmail(email, subject, message);

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
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = null as any;

            const result = await sendEmail(email, subject, message);

            if (result.success) {
                expect(mockTransporter.sendMail).toHaveBeenCalled();
            } else {
                expect(result).toEqual({
                    success: false,
                    error: 'Message cannot be empty.',
                });
            }
        });

        it('TC11: Should handle undefined message parameter', async () => {
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = undefined as any;

            const result = await sendEmail(email, subject, message);

            if (result.success) {
                expect(mockTransporter.sendMail).toHaveBeenCalled();
            } else {
                expect(result).toEqual({
                    success: false,
                    error: 'Message cannot be empty.',
                });
            }
        });

        it('TC12: Should reject invalid email format', async () => {
            const email = 'not-an-email';
            const subject = 'Test Subject';
            const message = 'Test message';

            const result = await sendEmail(email, subject, message);

            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC13: Should reject empty string email', async () => {
            const email = '';
            const subject = 'Test Subject';
            const message = 'Test message';

            const result = await sendEmail(email, subject, message);

            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC13a: Should reject email with only whitespace', async () => {
            const email = '   ';
            const subject = 'Test Subject';
            const message = 'Test message';

            const result = await sendEmail(email, subject, message);

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
            const email = 123 as any;
            const subject = 'Test Subject';
            const message = 'Test message';

            const result = await sendEmail(email, subject, message);

            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(transporterModule.createPrivateEmailTransport).not.toHaveBeenCalled();
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC15: Should handle non-string subject (number)', async () => {
            const email = 'sender@example.com';
            const subject = 123 as any;
            const message = 'Test message';

            const result = await sendEmail(email, subject, message);

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
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 123 as any;

            const result = await sendEmail(email, subject, message);

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
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';
            const transportError = new Error('Failed to create transport');
            (transporterModule.createPrivateEmailTransport as any).mockRejectedValue(transportError);

            const result = await sendEmail(email, subject, message);

            expect(result).toEqual({
                success: false,
                error: 'Something went wrong. Please try again.',
            });
            expect(mockTransporter.sendMail).not.toHaveBeenCalled();
        });

        it('TC18: Should handle SMTP send failure', async () => {
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';
            const sendError = new Error('SMTP send failed');
            mockTransporter.sendMail.mockRejectedValue(sendError);

            const result = await sendEmail(email, subject, message);

            expect(result).toEqual({
                success: false,
                error: 'Something went wrong. Please try again.',
            });
            expect(transporterModule.createPrivateEmailTransport).toHaveBeenCalledTimes(1);
            expect(mockTransporter.sendMail).toHaveBeenCalledTimes(1);
        });

        it('TC19: Should handle network timeout error', async () => {
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';
            const timeoutError: any = new Error('Connection timeout');
            timeoutError.code = 'ETIMEDOUT';
            mockTransporter.sendMail.mockRejectedValue(timeoutError);

            const result = await sendEmail(email, subject, message);

            expect(result).toEqual({
                success: false,
                error: 'Something went wrong. Please try again.',
            });
        });

        it('TC20: Should handle missing SMTP_USER environment variable', async () => {
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';
            delete process.env.SMTP_USER;

            const result = await sendEmail(email, subject, message);

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
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';

            await sendEmail(email, subject, message);

            const callArgs = mockTransporter.sendMail.mock.calls[0][0];
            expect(callArgs.html).toContain(`<h4>This message was sent by: ${email}</h4>`);
        });

        it('TC22: Should format message correctly in HTML', async () => {
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message content';

            await sendEmail(email, subject, message);

            const callArgs = mockTransporter.sendMail.mock.calls[0][0];
            expect(callArgs.html).toContain(`<p>${message}</p>`);
            expect(callArgs.html).toContain('<div>');
        });

        it('TC23: Should set reply-to field correctly', async () => {
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';

            await sendEmail(email, subject, message);

            expect(mockTransporter.sendMail).toHaveBeenCalledWith(
                expect.objectContaining({
                    replyTo: email,
                })
            );
        });

        it('TC24: Should format from field correctly', async () => {
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';
            process.env.SMTP_USER = 'recipient@example.com';

            await sendEmail(email, subject, message);

            expect(mockTransporter.sendMail).toHaveBeenCalledWith(
                expect.objectContaining({
                    from: 'Contact Us from Nefara! <recipient@example.com>',
                })
            );
        });

        it('TC25: Should set to field as SMTP_USER', async () => {
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';
            process.env.SMTP_USER = 'recipient@example.com';

            await sendEmail(email, subject, message);

            expect(mockTransporter.sendMail).toHaveBeenCalledWith(
                expect.objectContaining({
                    to: 'recipient@example.com',
                })
            );
        });
    });

    describe('Security Tests (HTML Escaping / XSS Prevention)', () => {
        it('TC26: Should escape XSS in email field - special characters', async () => {
            // Arrange
            // Note: Email must pass regex validation, so we test with valid email format
            // but with special characters that could be used in HTML injection
            const email = 'user&test@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({ success: true });
            const callArgs = mockTransporter.sendMail.mock.calls[0][0];
            // Verify email is escaped in HTML (ampersand becomes &amp;)
            expect(callArgs.html).toContain('&amp;');
            // Verify original ampersand is NOT present as raw character
            expect(callArgs.html).not.toContain('user&test@example.com');
            // But the email should still be readable (escaped)
            expect(callArgs.html).toContain('user&amp;test@example.com');
        });

        it('TC27: Should escape XSS in message - script tags', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = '<script>alert("xss")</script>';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({ success: true });
            const callArgs = mockTransporter.sendMail.mock.calls[0][0];
            // Verify message is escaped
            // Note: / is escaped as &#x2F;
            expect(callArgs.html).toContain('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
            // Verify original script is NOT present
            expect(callArgs.html).not.toContain('<script>alert("xss")</script>');
        });

        it('TC28: Should escape XSS in subject - script tags', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = '<script>alert("xss")</script>';
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({ success: true });
            const callArgs = mockTransporter.sendMail.mock.calls[0][0];
            // Verify subject is escaped
            // Note: / is escaped as &#x2F;
            expect(callArgs.subject).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
            // Verify original script is NOT present
            expect(callArgs.subject).not.toContain('<script>');
        });

        it('TC29: Should escape HTML injection in email - special characters', async () => {
            // Arrange
            // Note: Email must pass regex validation, so we use valid format with special chars
            const email = 'user<test>@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({ success: true });
            const callArgs = mockTransporter.sendMail.mock.calls[0][0];
            // Verify HTML is escaped
            expect(callArgs.html).toContain('&lt;test&gt;');
            // Verify original HTML is NOT present
            expect(callArgs.html).not.toContain('<test>');
        });

        it('TC30: Should escape HTML injection in message - img tag', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = '<img src=x onerror="alert(1)">';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({ success: true });
            const callArgs = mockTransporter.sendMail.mock.calls[0][0];
            // Verify message is escaped
            expect(callArgs.html).toContain('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
            // Verify original HTML is NOT present
            expect(callArgs.html).not.toContain('<img src=x onerror="alert(1)">');
        });

        it('TC31: Should escape special characters in email', async () => {
            // Arrange
            const email = 'user&<>"\'/@example.com';
            const subject = 'Test Subject';
            const message = 'Test message';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({ success: true });
            const callArgs = mockTransporter.sendMail.mock.calls[0][0];
            // Verify all special characters are escaped
            expect(callArgs.html).toContain('&amp;');
            expect(callArgs.html).toContain('&lt;');
            expect(callArgs.html).toContain('&gt;');
            expect(callArgs.html).toContain('&quot;');
            expect(callArgs.html).toContain('&#x27;');
            expect(callArgs.html).toContain('&#x2F;');
            // Verify original special characters are NOT present
            expect(callArgs.html).not.toContain('&<>"\'/');
        });

        it('TC32: Should escape special characters in message', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Message with &<>"\'/ characters';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({ success: true });
            const callArgs = mockTransporter.sendMail.mock.calls[0][0];
            // Verify all special characters are escaped
            expect(callArgs.html).toContain('&amp;');
            expect(callArgs.html).toContain('&lt;');
            expect(callArgs.html).toContain('&gt;');
            expect(callArgs.html).toContain('&quot;');
            expect(callArgs.html).toContain('&#x27;');
            expect(callArgs.html).toContain('&#x2F;');
            // Verify original special characters are NOT present
            expect(callArgs.html).not.toContain('&<>"\'/');
        });

        it('TC33: Should escape special characters in subject', async () => {
            const email = 'sender@example.com';
            const subject = 'Subject with &<>"\'/ characters';
            const message = 'Test message';

            await sendEmail(email, subject, message);

            // Assert
            const callArgs = mockTransporter.sendMail.mock.calls[0][0];
            expect(callArgs.subject).toContain('&amp;');
            expect(callArgs.subject).toContain('&lt;');
            expect(callArgs.subject).toContain('&gt;');
            expect(callArgs.subject).toContain('&quot;');
            expect(callArgs.subject).toContain('&#x27;');
            expect(callArgs.subject).toContain('&#x2F;');
        });

        it('TC34: Should verify HTML escaping works for all HTML entities', async () => {
            // Arrange
            const email = 'sender@example.com';
            const subject = 'Test Subject';
            const message = 'Test & < > " \' /';

            // Act
            const result = await sendEmail(email, subject, message);

            // Assert
            expect(result).toEqual({ success: true });
            const callArgs = mockTransporter.sendMail.mock.calls[0][0];
            // Verify HTML entities are present
            expect(callArgs.html).toContain('&amp;');  // &
            expect(callArgs.html).toContain('&lt;');    // <
            expect(callArgs.html).toContain('&gt;');    // >
            expect(callArgs.html).toContain('&quot;');  // "
            expect(callArgs.html).toContain('&#x27;'); // '
            expect(callArgs.html).toContain('&#x2F;'); // /
        });
    });
});
