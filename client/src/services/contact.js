import { createPrivateEmailTransport } from "@/utils/email/transporter";

export const sendEmail = async (email, subject, message) => {
    try {
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