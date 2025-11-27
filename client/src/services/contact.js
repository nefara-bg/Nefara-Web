import { createPrivateEmailTransport } from "@/utils/email/transporter";

export const sendEmail = async (body) => {
    try {
        const transporter = await createPrivateEmailTransport()

        await transporter.sendMail({
            from: `Contact Us from Nefara! <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            subject: body.subject, 
            replyTo: body.email,
            html: `
                <div>
                    <h4>This message was sent by: ${body.email}</h4>
                    <p>${body.message}</p>
                </div>
            `,
        });

        return {
            success: true
        }
    } catch(e) {
        console.log(e)
        return {
            success: false,
            error: "Something went wrong. Please try again."
        }
    }
}