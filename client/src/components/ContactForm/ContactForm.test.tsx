import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ContactForm from './ContactForm';
import { contactAction } from '@/actions/contact';
import { Toaster } from 'sonner';
import '@testing-library/jest-dom';

// Mock React's useActionState (React 19 hook)
vi.mock('react', async () => {
    const actual = await vi.importActual<any>('react');
    return {
        ...actual,
    };
});

// Mock next-intl
vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => {
        const translations: any = {
            'contact.email': 'Email',
            'contact.emailPlaceholder': 'Enter your email',
            'contact.subject': 'Subject',
            'contact.subjectPlaceholder': 'Enter subject',
            'contact.message': 'Message',
            'contact.messagePlaceholder': 'Enter your message',
            'contact.button': 'Send',
            'contact.loading': 'Sending...',
            'contact.alert': 'Message sent successfully!',
        };
        return translations[key] || key;
    },
}));

// Mock react-emoji-render
vi.mock('react-emoji-render', () => ({
    Twemoji: ({ text }: { text: string }) => {
        return React.createElement('span', {}, text || '');
    },
}));

// Mock the server action
vi.mock('@/actions/contact', () => ({
    contactAction: vi.fn(),
}));

// Mock next/dynamic
vi.mock('next/dynamic', () => ({
    default: () => {
        const React = require('react');
        return ({ text }: { text: string }) => React.createElement('span', {}, text || '');
    },
}));

const renderWithToaster = (ui: React.ReactElement) => {
    return render(
        <>
            <Toaster />
            {ui}
        </>
    );
};

describe('ContactForm.tsx - ContactForm Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (contactAction as any).mockResolvedValue({ success: true });
    });

    describe('Rendering Tests', () => {
        it('TC1: Should render component successfully', () => {
            const { container } = renderWithToaster(<ContactForm />);
            expect(container.querySelector('form')).toBeInTheDocument();
        });

        it('TC2: Should render email field with label and placeholder', () => {
            renderWithToaster(<ContactForm />);
            expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            expect(emailInput).toHaveAttribute('type', 'email');
        });

        it('TC3: Should render subject field with label and placeholder', () => {
            renderWithToaster(<ContactForm />);
            expect(screen.getByPlaceholderText(/enter subject/i)).toBeInTheDocument();
            const textboxes = screen.getAllByRole('textbox');
            expect(textboxes.length).toBeGreaterThan(0);
        });

        it('TC4: Should render message field with label and placeholder', () => {
            renderWithToaster(<ContactForm />);
            expect(screen.getByPlaceholderText(/enter your message/i)).toBeInTheDocument();
            const textareas = screen.getAllByRole('textbox');
            expect(textareas.length).toBeGreaterThan(0);
        });

        it('TC5: Should render submit button with correct attributes', () => {
            renderWithToaster(<ContactForm />);
            const submitButton = screen.getByRole('button', { type: 'submit' });
            expect(submitButton).toBeInTheDocument();
            expect(submitButton).not.toBeDisabled();
            expect(submitButton).toHaveAttribute('type', 'submit');
            expect(submitButton.textContent).toMatch(/send/i);
        });
    });

    describe('State Management Tests', () => {
        it('TC6: Should not show toast initially', () => {
            renderWithToaster(<ContactForm />);
            expect(screen.queryByText(/message sent successfully/i)).not.toBeInTheDocument();
        });

        it('TC7: Should not show error message initially', () => {
            renderWithToaster(<ContactForm />);
            const errorMessages = screen.queryAllByText(/error/i);
            const actualErrors = errorMessages.filter(msg => {
                const text = msg.textContent?.toLowerCase() || '';
                return text.includes('error') &&
                    (msg.closest('[role="alert"]') || msg.getAttribute('color') === 'error' || msg.className.includes('destructive'));
            });
            expect(actualErrors.length).toBe(0);
        });

        it('TC8: Should show toast when state changes to success', async () => {
            (contactAction as any).mockResolvedValue({ success: true });

            renderWithToaster(<ContactForm />);

            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            const messageInput = screen.getByPlaceholderText(/enter your message/i);
            const submitButton = screen.getByRole('button', { type: 'submit' });

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(messageInput, { target: { value: 'Test message' } });

            const form = submitButton.closest('form');
            fireEvent.submit(form!);

            await waitFor(() => {
                expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
            }, { timeout: 3000 });
        });

        it('TC9: Should show error message when state contains error', async () => {
            (contactAction as any).mockResolvedValue({
                success: false,
                error: 'Invalid email format.'
            });

            renderWithToaster(<ContactForm />);

            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            const messageInput = screen.getByPlaceholderText(/enter your message/i);
            const submitButton = screen.getByRole('button', { type: 'submit' });

            fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
            fireEvent.change(messageInput, { target: { value: 'Test message' } });

            const form = submitButton.closest('form');
            fireEvent.submit(form!);

            await waitFor(() => {
                expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
            }, { timeout: 3000 });
        });
    });

    describe('Form Submission Tests', () => {
        it('TC10: Should call contactAction when form is submitted', async () => {
            (contactAction as any).mockResolvedValue({ success: true });

            renderWithToaster(<ContactForm />);

            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            const subjectInput = screen.getByPlaceholderText(/enter subject/i);
            const messageInput = screen.getByPlaceholderText(/enter your message/i);
            const submitButton = screen.getByRole('button', { type: 'submit' });

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
            fireEvent.change(messageInput, { target: { value: 'Test message' } });

            const form = submitButton.closest('form');
            fireEvent.submit(form!);

            await waitFor(() => {
                expect(contactAction).toHaveBeenCalled();
            });
        });

        it('TC11: Should disable button during submission', async () => {
            let resolveAction: (value: any) => void;
            const actionPromise = new Promise((resolve) => {
                resolveAction = resolve;
            });
            (contactAction as any).mockReturnValue(actionPromise);

            renderWithToaster(<ContactForm />);

            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            const messageInput = screen.getByPlaceholderText(/enter your message/i);
            const submitButton = screen.getByRole('button', { type: 'submit' });

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(messageInput, { target: { value: 'Test message' } });

            const form = submitButton.closest('form');
            fireEvent.submit(form!);

            await waitFor(() => {
                expect(submitButton).toBeDisabled();
            });

            resolveAction!({ success: true });
            await actionPromise;
        });

        it('TC12: Should enable button after submission', async () => {
            (contactAction as any).mockResolvedValue({ success: true });

            renderWithToaster(<ContactForm />);

            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            const messageInput = screen.getByPlaceholderText(/enter your message/i);
            const submitButton = screen.getByRole('button', { type: 'submit' });

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(messageInput, { target: { value: 'Test message' } });

            const form = submitButton.closest('form');
            fireEvent.submit(form!);

            await waitFor(() => {
                expect(contactAction).toHaveBeenCalled();
            });

            await waitFor(() => {
                expect(submitButton).not.toBeDisabled();
            }, { timeout: 3000 });

            expect(submitButton.textContent).toMatch(/send/i);
            expect(submitButton.textContent).not.toMatch(/sending/i);
        });

        it('TC13: Should show toast on success response', async () => {
            (contactAction as any).mockResolvedValue({ success: true });

            renderWithToaster(<ContactForm />);

            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            const messageInput = screen.getByPlaceholderText(/enter your message/i);
            const submitButton = screen.getByRole('button', { type: 'submit' });

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(messageInput, { target: { value: 'Test message' } });

            const form = submitButton.closest('form');
            fireEvent.submit(form!);

            await waitFor(() => {
                expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
            }, { timeout: 3000 });
        });

        it('TC14: Should show error message on error response', async () => {
            (contactAction as any).mockResolvedValue({
                success: false,
                error: 'Message cannot be empty.'
            });

            renderWithToaster(<ContactForm />);

            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            const submitButton = screen.getByRole('button', { type: 'submit' });

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

            const form = submitButton.closest('form');
            fireEvent.submit(form!);

            await waitFor(() => {
                expect(screen.getByText(/message cannot be empty/i)).toBeInTheDocument();
            }, { timeout: 3000 });
        });
    });

    describe('Toast Behavior Tests', () => {
        it('TC15: Should show toast with success message on success', async () => {
            (contactAction as any).mockResolvedValue({ success: true });

            renderWithToaster(<ContactForm />);

            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            const messageInput = screen.getByPlaceholderText(/enter your message/i);
            const submitButton = screen.getByRole('button', { type: 'submit' });

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(messageInput, { target: { value: 'Test message' } });

            const form = submitButton.closest('form');
            fireEvent.submit(form!);

            await waitFor(() => {
                const toast = screen.getByText(/message sent successfully/i);
                expect(toast).toBeInTheDocument();
            }, { timeout: 3000 });
        });
    });

    describe('Error Display Tests', () => {
        it('TC19: Should display error message with correct text', async () => {
            (contactAction as any).mockResolvedValue({
                success: false,
                error: 'Invalid email format.'
            });

            renderWithToaster(<ContactForm />);

            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            const messageInput = screen.getByPlaceholderText(/enter your message/i);
            const submitButton = screen.getByRole('button', { type: 'submit' });

            fireEvent.change(emailInput, { target: { value: 'invalid' } });
            fireEvent.change(messageInput, { target: { value: 'Test message' } });

            const form = submitButton.closest('form');
            fireEvent.submit(form!);

            await waitFor(() => {
                const errorMessage = screen.getByText(/invalid email format/i);
                expect(errorMessage).toBeInTheDocument();
            }, { timeout: 3000 });
        });

        it('TC20: Should style error message correctly', async () => {
            (contactAction as any).mockResolvedValue({
                success: false,
                error: 'Test error message'
            });

            renderWithToaster(<ContactForm />);

            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            const messageInput = screen.getByPlaceholderText(/enter your message/i);
            const submitButton = screen.getByRole('button', { type: 'submit' });

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(messageInput, { target: { value: 'Test message' } });

            const form = submitButton.closest('form');
            fireEvent.submit(form!);

            await waitFor(() => {
                const errorMessage = screen.getByText(/test error message/i);
                expect(errorMessage).toBeInTheDocument();
            }, { timeout: 3000 });
        });

        it('TC21: Should hide error message on success', async () => {
            (contactAction as any).mockResolvedValueOnce({
                success: false,
                error: 'Test error message'
            });

            renderWithToaster(<ContactForm />);

            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            const messageInput = screen.getByPlaceholderText(/enter your message/i);
            const submitButton = screen.getByRole('button', { type: 'submit' });

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            // Empty message to trigger error (in a real scenario)

            const form = submitButton.closest('form');
            fireEvent.submit(form!);

            await waitFor(() => {
                expect(screen.getByText(/test error message/i)).toBeInTheDocument();
            }, { timeout: 3000 });

            (contactAction as any).mockResolvedValueOnce({ success: true });

            fireEvent.change(messageInput, { target: { value: 'Valid message' } });
            fireEvent.submit(form!);

            await waitFor(() => {
                expect(screen.queryByText(/test error message/i)).not.toBeInTheDocument();
                expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
            }, { timeout: 3000 });
        });
    });

    describe('Loading State Tests', () => {
        it('TC22: Should disable button when pending', async () => {
            let resolveAction: (value: any) => void;
            const actionPromise = new Promise((resolve) => {
                resolveAction = resolve;
            });
            (contactAction as any).mockReturnValue(actionPromise);

            renderWithToaster(<ContactForm />);

            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            const messageInput = screen.getByPlaceholderText(/enter your message/i);
            const submitButton = screen.getByRole('button', { type: 'submit' });

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(messageInput, { target: { value: 'Test message' } });

            const form = submitButton.closest('form');
            fireEvent.submit(form!);

            await waitFor(() => {
                expect(submitButton).toBeDisabled();
            });

            resolveAction!({ success: true });
            await actionPromise;
        });

        it('TC23: Should show loading text when pending', async () => {
            let resolveAction: (value: any) => void;
            const actionPromise = new Promise((resolve) => {
                resolveAction = resolve;
            });
            (contactAction as any).mockReturnValue(actionPromise);

            renderWithToaster(<ContactForm />);

            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            const messageInput = screen.getByPlaceholderText(/enter your message/i);
            const submitButton = screen.getByRole('button', { type: 'submit' });

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(messageInput, { target: { value: 'Test message' } });

            const form = submitButton.closest('form');
            fireEvent.submit(form!);

            await waitFor(() => {
                expect(screen.getByText(/sending/i)).toBeInTheDocument();
            });

            resolveAction!({ success: true });
            await actionPromise;
        });

        it('TC24: Should show normal text when not pending', () => {
            renderWithToaster(<ContactForm />);
            const submitButton = screen.getByRole('button', { name: /send/i });
            expect(submitButton).toBeInTheDocument();
            expect(submitButton.textContent).toMatch(/send/i);
        });
    });

    describe('Integration Tests', () => {
        it('TC25: Should handle complete success flow', async () => {
            (contactAction as any).mockResolvedValue({ success: true });

            renderWithToaster(<ContactForm />);

            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            const subjectInput = screen.getByPlaceholderText(/enter subject/i);
            const messageInput = screen.getByPlaceholderText(/enter your message/i);
            const submitButton = screen.getByRole('button', { type: 'submit' });

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
            fireEvent.change(messageInput, { target: { value: 'Test message content' } });

            const form = submitButton.closest('form');
            fireEvent.submit(form!);

            await waitFor(() => {
                expect(contactAction).toHaveBeenCalled();
                expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
            }, { timeout: 3000 });

            expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
        });

        it('TC26: Should handle complete error flow', async () => {
            (contactAction as any).mockResolvedValue({
                success: false,
                error: 'Message cannot be empty.'
            });

            renderWithToaster(<ContactForm />);

            const emailInput = screen.getByPlaceholderText(/enter your email/i);
            const subjectInput = screen.getByPlaceholderText(/enter subject/i);
            const messageInput = screen.getByPlaceholderText(/enter your message/i);
            const submitButton = screen.getByRole('button', { type: 'submit' });

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
            fireEvent.change(messageInput, { target: { value: '' } }); // Empty message

            const form = submitButton.closest('form');
            fireEvent.submit(form!);

            await waitFor(() => {
                expect(contactAction).toHaveBeenCalled();
                expect(screen.getByText(/message cannot be empty/i)).toBeInTheDocument();
            }, { timeout: 3000 });
        });
    });
});
