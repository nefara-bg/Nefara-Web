import { createPrivateEmailTransport } from "@/utils/email/transporter";

// Email validation regex pattern
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Escapes HTML special characters to prevent XSS/injection attacks
 * @param {string} text - Text to escape
 * @returns {string} - Escaped HTML-safe text
 */
const escapeHtml = (text: string): string => {
    const htmlEscapeMap: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
    };
    return text.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char]);
};

export interface SendEmailResult {
    success: boolean;
    error?: string;
}

export const sendEmail = async (email: string, subject: string, message: string): Promise<SendEmailResult> => {
    try {
        // Validate email format
        if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
            return {
                success: false,
                error: "Invalid email format."
            }
        }

        // Validate that message is not empty
        if (!message || (typeof message === 'string' && message.trim() === '')) {
            return {
                success: false,
                error: "Message cannot be empty."
            }
        }

        const transporter = await createPrivateEmailTransport()

        // Escape user input to prevent HTML injection/XSS attacks
        const escapedEmail = escapeHtml(email);
        const escapedMessage = escapeHtml(message);
        // Subject is handled by nodemailer, but we should still escape it for safety
        const safeSubject = subject ? escapeHtml(subject) : '';

        await transporter.sendMail({
            from: `Contact Us from Nefara! <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            subject: safeSubject,
            replyTo: email, // replyTo uses original email (nodemailer handles email format validation)
            html: `
                <div>
                    <h4>This message was sent by: ${escapedEmail}</h4>
                    <p>${escapedMessage}</p>
                </div>
            `,
        });

        return {
            success: true
        }
    } catch (e) {
        console.error("Failed to send email:", e);
        return {
            success: false,
            error: "Something went wrong. Please try again."
        }
    }
}
