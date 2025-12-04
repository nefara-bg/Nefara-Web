import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { contactAction } from '@/actions/contact';

// Mock nodemailer at the boundary (external dependency)
// We'll use a test transport that captures emails
// Use vi.hoisted() to define variables accessible in hoisted mocks
const { capturedEmails, mockCreateTransport, createTestTransport } = vi.hoisted(() => {
    const capturedEmails = [];
    
    // Create a test transport that captures emails instead of sending
    const createTestTransport = () => {
        return {
            sendMail: vi.fn().mockImplementation((mailOptions) => {
                capturedEmails.push(mailOptions);
                return Promise.resolve({ messageId: `test-${Date.now()}` });
            }),
        };
    };
    
    // Create the mock function
    const mockCreateTransport = vi.fn((config) => {
        // Validate config matches what utils layer creates
        return createTestTransport();
    });
    
    return { capturedEmails, mockCreateTransport, createTestTransport };
});

// Mock nodemailer.createTransport to return our test transport
// This is the ONLY mock - all internal layers use real implementations
vi.mock('nodemailer', async () => {
    const actual = await vi.importActual('nodemailer');
    return {
        default: {
            ...actual.default,
            createTransport: mockCreateTransport,
        },
    };
});

describe('Contact Form - Integration Tests', () => {
    let originalEnv;

    beforeEach(() => {
        // Save original environment
        originalEnv = { ...process.env };
        
        // Set valid test environment variables
        process.env.SMTP_HOST = 'smtp.test.com';
        process.env.SMTP_PORT = '587';
        process.env.SMTP_USER = 'test@example.com';
        process.env.SMTP_PASS = 'testpassword';
        
        // Clear captured emails (can't reassign const, so clear array)
        capturedEmails.length = 0;
        
        // Reset nodemailer mock call history (but keep implementation)
        mockCreateTransport.mockClear();
    });

    afterEach(() => {
        // Restore original environment
        process.env = originalEnv;
    });

    // Helper to create FormData
    const createFormData = (fields) => {
        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });
        return formData;
    };

    describe('Success Path Tests', () => {
        it('IT1: Should successfully submit form and send email', async () => {
            // Arrange
            const formData = createFormData({
                email: 'user@example.com',
                subject: 'Test Subject',
                message: 'Test message content',
            });
            const previousState = null;

            // Act
            const result = await contactAction(previousState, formData);

            // Assert
            expect(result).toEqual({ success: true });
            expect(capturedEmails).toHaveLength(1);
            
            const sentEmail = capturedEmails[0];
            expect(sentEmail.from).toBe('Contact Us from Nefara! <test@example.com>');
            expect(sentEmail.to).toBe('test@example.com');
            expect(sentEmail.replyTo).toBe('user@example.com');
            expect(sentEmail.subject).toBe('Test Subject');
            expect(sentEmail.html).toContain('user@example.com');
            expect(sentEmail.html).toContain('Test message content');
            expect(sentEmail.html).toContain('<h4>This message was sent by: user@example.com</h4>');
            expect(sentEmail.html).toContain('<p>Test message content</p>');
        });

        it('IT2: Should handle form with all valid fields', async () => {
            // Arrange
            const formData = createFormData({
                email: 'customer@domain.com',
                subject: 'Website Inquiry',
                message: 'I would like to discuss a project.',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({ success: true });
            expect(capturedEmails).toHaveLength(1);
            
            const sentEmail = capturedEmails[0];
            expect(sentEmail.replyTo).toBe('customer@domain.com');
            expect(sentEmail.subject).toBe('Website Inquiry');
            expect(sentEmail.html).toContain('I would like to discuss a project.');
        });

        it('IT3: Should handle form with empty subject', async () => {
            // Arrange
            const formData = createFormData({
                email: 'user@example.com',
                subject: '',
                message: 'Message without subject',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({ success: true });
            expect(capturedEmails).toHaveLength(1);
            expect(capturedEmails[0].subject).toBe('');
        });
    });

    describe('Validation Error Tests', () => {
        it('IT4: Should reject invalid email format', async () => {
            // Arrange
            const formData = createFormData({
                email: 'not-an-email',
                subject: 'Subject',
                message: 'Message',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(capturedEmails).toHaveLength(0); // No email sent
        });

        it('IT5: Should reject empty message', async () => {
            // Arrange
            const formData = createFormData({
                email: 'user@example.com',
                subject: 'Subject',
                message: '',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Message cannot be empty.',
            });
            expect(capturedEmails).toHaveLength(0); // No email sent
        });

        it('IT6: Should reject missing email field', async () => {
            // Arrange
            const formData = createFormData({
                subject: 'Subject',
                message: 'Message',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(capturedEmails).toHaveLength(0);
        });

        it('IT7: Should reject missing message field', async () => {
            // Arrange
            const formData = createFormData({
                email: 'user@example.com',
                subject: 'Subject',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Message cannot be empty.',
            });
            expect(capturedEmails).toHaveLength(0);
        });

        it('IT8: Should reject null email value', async () => {
            // Arrange
            const formData = new FormData();
            formData.append('email', '');
            formData.append('subject', 'Subject');
            formData.append('message', 'Message');
            // When get() is called on non-existent field, it returns null
            // But if we append empty string, it's still a string
            // Let's test with actually missing field (already tested in IT6)
            // Or test with whitespace-only email
            formData.delete('email');

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(capturedEmails).toHaveLength(0);
        });

        it('IT9: Should reject null message value', async () => {
            // Arrange
            const formData = createFormData({
                email: 'user@example.com',
                subject: 'Subject',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Message cannot be empty.',
            });
            expect(capturedEmails).toHaveLength(0);
        });

        it('Should reject whitespace-only message', async () => {
            // Arrange
            const formData = createFormData({
                email: 'user@example.com',
                subject: 'Subject',
                message: '   ',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Message cannot be empty.',
            });
            expect(capturedEmails).toHaveLength(0);
        });
    });

    describe('Environment Error Tests', () => {
        it('IT10: Should handle missing SMTP_HOST', async () => {
            // Arrange
            delete process.env.SMTP_HOST;
            const formData = createFormData({
                email: 'user@example.com',
                subject: 'Subject',
                message: 'Message',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Something went wrong. Please try again.',
            });
            expect(capturedEmails).toHaveLength(0);
        });

        it('IT11: Should handle missing SMTP_PORT', async () => {
            // Arrange
            delete process.env.SMTP_PORT;
            const formData = createFormData({
                email: 'user@example.com',
                subject: 'Subject',
                message: 'Message',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Something went wrong. Please try again.',
            });
            expect(capturedEmails).toHaveLength(0);
        });

        it('IT12: Should handle missing SMTP_USER', async () => {
            // Arrange
            delete process.env.SMTP_USER;
            const formData = createFormData({
                email: 'user@example.com',
                subject: 'Subject',
                message: 'Message',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Something went wrong. Please try again.',
            });
            expect(capturedEmails).toHaveLength(0);
        });

        it('IT13: Should handle missing SMTP_PASS', async () => {
            // Arrange
            delete process.env.SMTP_PASS;
            const formData = createFormData({
                email: 'user@example.com',
                subject: 'Subject',
                message: 'Message',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Something went wrong. Please try again.',
            });
            expect(capturedEmails).toHaveLength(0);
        });

        it('IT14: Should handle invalid SMTP_PORT (non-numeric)', async () => {
            // Arrange
            process.env.SMTP_PORT = 'not-a-number';
            const formData = createFormData({
                email: 'user@example.com',
                subject: 'Subject',
                message: 'Message',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Something went wrong. Please try again.',
            });
            expect(capturedEmails).toHaveLength(0);
        });

        it('IT15: Should handle empty SMTP_PORT', async () => {
            // Arrange
            process.env.SMTP_PORT = '';
            const formData = createFormData({
                email: 'user@example.com',
                subject: 'Subject',
                message: 'Message',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Something went wrong. Please try again.',
            });
            expect(capturedEmails).toHaveLength(0);
        });
    });

    describe('SMTP Error Tests', () => {
        it('IT16: Should handle SMTP send failure', async () => {
            // Arrange
            const formData = createFormData({
                email: 'user@example.com',
                subject: 'Subject',
                message: 'Message',
            });

            // Mock transport to reject
            const mockTransport = {
                sendMail: vi.fn().mockRejectedValue(new Error('SMTP send failed')),
            };
            mockCreateTransport.mockReturnValueOnce(mockTransport);

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Something went wrong. Please try again.',
            });
        });

        it('IT17: Should handle SMTP connection timeout', async () => {
            // Arrange
            const formData = createFormData({
                email: 'user@example.com',
                subject: 'Subject',
                message: 'Message',
            });

            // Mock transport to timeout
            const timeoutError = new Error('Connection timeout');
            timeoutError.code = 'ETIMEDOUT';
            const mockTransport = {
                sendMail: vi.fn().mockRejectedValue(timeoutError),
            };
            mockCreateTransport.mockReturnValueOnce(mockTransport);

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Something went wrong. Please try again.',
            });
        });
    });

    describe('Integration Flow Tests', () => {
        it('IT18: Should execute end-to-end success flow through all layers', async () => {
            // Arrange
            const formData = createFormData({
                email: 'integration@test.com',
                subject: 'Integration Test',
                message: 'Testing full flow',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert - Verify all layers executed correctly
            expect(result).toEqual({ success: true });
            
            // Verify transport was created with correct config
            expect(mockCreateTransport).toHaveBeenCalledWith(
                expect.objectContaining({
                    host: 'smtp.test.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: 'test@example.com',
                        pass: 'testpassword',
                    },
                    connectionTimeout: 5000,
                    socketTimeout: 5000,
                    greetingTimeout: 5000,
                })
            );
            
            // Verify email was sent
            expect(capturedEmails).toHaveLength(1);
            expect(capturedEmails[0].replyTo).toBe('integration@test.com');
        });

        it('IT19: Should propagate errors correctly through all layers', async () => {
            // Arrange
            const formData = createFormData({
                email: 'invalid-email',
                subject: 'Subject',
                message: 'Message',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert - Error should propagate from service layer
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            
            // Verify no transport was created (validation failed before)
            // Actually, we can't easily verify this without more complex mocking
            // But we can verify no email was sent
            expect(capturedEmails).toHaveLength(0);
        });

        it('IT20: Should verify email content format and structure', async () => {
            // Arrange
            const formData = createFormData({
                email: 'content@test.com',
                subject: 'Content Test',
                message: 'This is a test message with <special> characters & symbols',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({ success: true });
            expect(capturedEmails).toHaveLength(1);
            
            const email = capturedEmails[0];
            
            // Verify email structure
            expect(email.html).toContain('<div>');
            expect(email.html).toContain('<h4>This message was sent by: content@test.com</h4>');
            expect(email.html).toContain('<p>This is a test message with <special> characters & symbols</p>');
            
            // Verify all required fields
            expect(email.from).toBe('Contact Us from Nefara! <test@example.com>');
            expect(email.to).toBe('test@example.com');
            expect(email.replyTo).toBe('content@test.com');
            expect(email.subject).toBe('Content Test');
        });

        it('Should handle secure port (465) configuration', async () => {
            // Arrange
            process.env.SMTP_PORT = '465';
            const formData = createFormData({
                email: 'user@example.com',
                subject: 'Subject',
                message: 'Message',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({ success: true });
            expect(mockCreateTransport).toHaveBeenCalledWith(
                expect.objectContaining({
                    port: 465,
                    secure: true,
                    requireTLS: false,
                })
            );
        });

        it('Should handle non-secure port (587) configuration', async () => {
            // Arrange
            process.env.SMTP_PORT = '587';
            const formData = createFormData({
                email: 'user@example.com',
                subject: 'Subject',
                message: 'Message',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({ success: true });
            expect(mockCreateTransport).toHaveBeenCalledWith(
                expect.objectContaining({
                    port: 587,
                    secure: false,
                    requireTLS: true,
                })
            );
        });
    });
});

