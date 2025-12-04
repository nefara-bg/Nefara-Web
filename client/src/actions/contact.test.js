import { describe, it, expect, vi, beforeEach } from 'vitest';
import { contactAction } from './contact.js';
import * as contactService from '@/services/contact';

// Mock the service layer
vi.mock('@/services/contact', () => ({
    sendEmail: vi.fn(),
}));

describe('contact.js (Actions Layer) - contactAction', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Helper function to create mock FormData
    const createMockFormData = (fields) => {
        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });
        return formData;
    };

    describe('Happy Path Tests', () => {
        it('TC1: Should successfully handle form submission with valid data', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@example.com',
                subject: 'Test Subject',
                message: 'Test message content',
            });
            const previousState = null;
            contactService.sendEmail.mockResolvedValue({ success: true });

            // Act
            const result = await contactAction(previousState, formData);

            // Assert
            expect(result).toEqual({ success: true });
            expect(contactService.sendEmail).toHaveBeenCalledTimes(1);
            expect(contactService.sendEmail).toHaveBeenCalledWith(
                'test@example.com',
                'Test Subject',
                'Test message content'
            );
        });

        it('TC2: Should handle form with all valid fields', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'user@domain.com',
                subject: 'Website Inquiry',
                message: 'I would like to discuss a project.',
            });
            contactService.sendEmail.mockResolvedValue({ success: true });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({ success: true });
            expect(contactService.sendEmail).toHaveBeenCalledWith(
                'user@domain.com',
                'Website Inquiry',
                'I would like to discuss a project.'
            );
        });
    });

    describe('Form Data Extraction Tests', () => {
        it('TC3: Should extract email field correctly', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'specific@email.com',
                subject: 'Subject',
                message: 'Message',
            });
            contactService.sendEmail.mockResolvedValue({ success: true });

            // Act
            await contactAction(null, formData);

            // Assert
            expect(contactService.sendEmail).toHaveBeenCalledWith(
                'specific@email.com',
                expect.any(String),
                expect.any(String)
            );
        });

        it('TC4: Should extract subject field correctly', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@test.com',
                subject: 'Specific Subject',
                message: 'Message',
            });
            contactService.sendEmail.mockResolvedValue({ success: true });

            // Act
            await contactAction(null, formData);

            // Assert
            expect(contactService.sendEmail).toHaveBeenCalledWith(
                expect.any(String),
                'Specific Subject',
                expect.any(String)
            );
        });

        it('TC5: Should extract message field correctly', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@test.com',
                subject: 'Subject',
                message: 'Specific Message Content',
            });
            contactService.sendEmail.mockResolvedValue({ success: true });

            // Act
            await contactAction(null, formData);

            // Assert
            expect(contactService.sendEmail).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(String),
                'Specific Message Content'
            );
        });

        it('TC6: Should extract all fields together', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'all@fields.com',
                subject: 'All Fields',
                message: 'All fields present',
            });
            contactService.sendEmail.mockResolvedValue({ success: true });

            // Act
            await contactAction(null, formData);

            // Assert
            expect(contactService.sendEmail).toHaveBeenCalledWith(
                'all@fields.com',
                'All Fields',
                'All fields present'
            );
        });
    });

    describe('Missing Field Tests', () => {
        it('TC7: Should handle missing email field', async () => {
            // Arrange
            const formData = createMockFormData({
                subject: 'Subject',
                message: 'Message',
            });
            contactService.sendEmail.mockResolvedValue({
                success: false,
                error: 'Invalid email format.',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(contactService.sendEmail).toHaveBeenCalledWith(
                null,
                'Subject',
                'Message'
            );
        });

        it('TC8: Should handle missing subject field', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@test.com',
                message: 'Message',
            });
            contactService.sendEmail.mockResolvedValue({ success: true });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({ success: true });
            expect(contactService.sendEmail).toHaveBeenCalledWith(
                'test@test.com',
                null,
                'Message'
            );
        });

        it('TC9: Should handle missing message field', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@test.com',
                subject: 'Subject',
            });
            contactService.sendEmail.mockResolvedValue({
                success: false,
                error: 'Message cannot be empty.',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Message cannot be empty.',
            });
            expect(contactService.sendEmail).toHaveBeenCalledWith(
                'test@test.com',
                'Subject',
                null
            );
        });

        it('TC10: Should handle all fields missing', async () => {
            // Arrange
            const formData = new FormData(); // Empty FormData
            contactService.sendEmail.mockResolvedValue({
                success: false,
                error: 'Invalid email format.',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(contactService.sendEmail).toHaveBeenCalledWith(
                null,
                null,
                null
            );
        });
    });

    describe('Empty Field Tests', () => {
        it('TC11: Should handle empty string email', async () => {
            // Arrange
            const formData = createMockFormData({
                email: '',
                subject: 'Subject',
                message: 'Message',
            });
            contactService.sendEmail.mockResolvedValue({
                success: false,
                error: 'Invalid email format.',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
            expect(contactService.sendEmail).toHaveBeenCalledWith('', 'Subject', 'Message');
        });

        it('TC12: Should handle empty string subject', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@test.com',
                subject: '',
                message: 'Message',
            });
            contactService.sendEmail.mockResolvedValue({ success: true });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({ success: true });
            expect(contactService.sendEmail).toHaveBeenCalledWith('test@test.com', '', 'Message');
        });

        it('TC13: Should handle empty string message', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@test.com',
                subject: 'Subject',
                message: '',
            });
            contactService.sendEmail.mockResolvedValue({
                success: false,
                error: 'Message cannot be empty.',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Message cannot be empty.',
            });
            expect(contactService.sendEmail).toHaveBeenCalledWith('test@test.com', 'Subject', '');
        });
    });

    describe('Parameter Passing Tests', () => {
        it('TC14: Should pass email parameter correctly', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'exact@email.com',
                subject: 'Subject',
                message: 'Message',
            });
            contactService.sendEmail.mockResolvedValue({ success: true });

            // Act
            await contactAction(null, formData);

            // Assert
            const callArgs = contactService.sendEmail.mock.calls[0];
            expect(callArgs[0]).toBe('exact@email.com');
        });

        it('TC15: Should pass subject parameter correctly', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@test.com',
                subject: 'Exact Subject',
                message: 'Message',
            });
            contactService.sendEmail.mockResolvedValue({ success: true });

            // Act
            await contactAction(null, formData);

            // Assert
            const callArgs = contactService.sendEmail.mock.calls[0];
            expect(callArgs[1]).toBe('Exact Subject');
        });

        it('TC16: Should pass message parameter correctly', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@test.com',
                subject: 'Subject',
                message: 'Exact Message',
            });
            contactService.sendEmail.mockResolvedValue({ success: true });

            // Act
            await contactAction(null, formData);

            // Assert
            const callArgs = contactService.sendEmail.mock.calls[0];
            expect(callArgs[2]).toBe('Exact Message');
        });

        it('TC17: Should pass null values when fields are missing', async () => {
            // Arrange
            const formData = new FormData();
            contactService.sendEmail.mockResolvedValue({ success: false });

            // Act
            await contactAction(null, formData);

            // Assert
            expect(contactService.sendEmail).toHaveBeenCalledWith(null, null, null);
        });
    });

    describe('Return Value Tests', () => {
        it('TC18: Should return success result from service layer', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@test.com',
                subject: 'Subject',
                message: 'Message',
            });
            const serviceResponse = { success: true };
            contactService.sendEmail.mockResolvedValue(serviceResponse);

            // Act
            const result = await contactAction(null, formData);

            // Assert
            // Verify the action layer returns the service layer response
            expect(result).toEqual(serviceResponse);
            expect(result).toEqual({ success: true });
        });

        it('TC19: Should return error result from service layer', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@test.com',
                subject: 'Subject',
                message: 'Message',
            });
            const errorResponse = {
                success: false,
                error: 'Something went wrong. Please try again.',
            };
            contactService.sendEmail.mockResolvedValue(errorResponse);

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual(errorResponse);
        });

        it('TC20: Should return exact service layer response unchanged', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@test.com',
                subject: 'Subject',
                message: 'Message',
            });
            const serviceResponse = { success: true, customField: 'value' };
            contactService.sendEmail.mockResolvedValue(serviceResponse);

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toBe(serviceResponse);
            expect(result).toEqual(serviceResponse);
        });
    });

    describe('Edge Case Tests', () => {
        it('TC21: Should accept previousState parameter without using it', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@test.com',
                subject: 'Subject',
                message: 'Message',
            });
            const previousState = { error: 'Previous error', custom: 'data' };
            contactService.sendEmail.mockResolvedValue({ success: true });

            // Act
            const result = await contactAction(previousState, formData);

            // Assert
            expect(result).toEqual({ success: true });
            // previousState should not affect the result
        });

        it('TC22: Should extract only required fields, ignoring extra fields', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@test.com',
                subject: 'Subject',
                message: 'Message',
                extraField1: 'Extra Value 1',
                extraField2: 'Extra Value 2',
            });
            contactService.sendEmail.mockResolvedValue({ success: true });

            // Act
            await contactAction(null, formData);

            // Assert
            expect(contactService.sendEmail).toHaveBeenCalledWith(
                'test@test.com',
                'Subject',
                'Message'
            );
            // Extra fields should not be passed to service
        });

        it('TC23: Should pass whitespace values as-is to service layer', async () => {
            // Arrange
            const formData = createMockFormData({
                email: '  test@test.com  ',
                subject: '  Subject  ',
                message: '  Message  ',
            });
            contactService.sendEmail.mockResolvedValue({ success: true });

            // Act
            await contactAction(null, formData);

            // Assert
            expect(contactService.sendEmail).toHaveBeenCalledWith(
                '  test@test.com  ',
                '  Subject  ',
                '  Message  '
            );
        });

        it('TC24: Should pass special characters as-is to service layer', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@example.com',
                subject: '<script>alert("xss")</script>',
                message: 'Message with & special <chars>',
            });
            contactService.sendEmail.mockResolvedValue({ success: true });

            // Act
            await contactAction(null, formData);

            // Assert
            expect(contactService.sendEmail).toHaveBeenCalledWith(
                'test@example.com',
                '<script>alert("xss")</script>',
                'Message with & special <chars>'
            );
        });
    });

    describe('Error Propagation Tests', () => {
        it('TC25: Should propagate service layer exceptions', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'test@test.com',
                subject: 'Subject',
                message: 'Message',
            });
            const serviceError = new Error('Service layer error');
            contactService.sendEmail.mockRejectedValue(serviceError);

            // Act & Assert
            await expect(contactAction(null, formData)).rejects.toThrow('Service layer error');
        });

        it('TC26: Should return error response from service layer', async () => {
            // Arrange
            const formData = createMockFormData({
                email: 'invalid',
                subject: 'Subject',
                message: 'Message',
            });
            contactService.sendEmail.mockResolvedValue({
                success: false,
                error: 'Invalid email format.',
            });

            // Act
            const result = await contactAction(null, formData);

            // Assert
            expect(result).toEqual({
                success: false,
                error: 'Invalid email format.',
            });
        });
    });
});

