import { createPrivateEmailTransport } from "@/utils/email/transporter";

// Email validation regex pattern
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sendEmail = async (email, subject, message) => {
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

        await transporter.sendMail({
            from: `Contact Us from Nefara! <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            subject: subject, 
            replyTo: email,
            html: `
                <div>
                    <h4>This message was sent by: ${email}</h4>
                    <p>${message}</p>
                </div>
            `,
        });

        return {
            success: true
        }
    } catch(e) {
        return {
            success: false,
            error: "Something went wrong. Please try again."
        }
    }
}