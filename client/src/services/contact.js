import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (body) => {
    try {
        const { error } = await resend.emails.send({
            from: "Contact Us from Nefara! <contacts@nefara.org>",
            to: [process.env.CONTACT_EMAIL],
            subject: body.subject,
            text: body.message,
            replyTo: body.email
        })

        if(error) return {
            success: false,
            error: "Something went wrong. Please try again."
        }
        else return {
            success: true
        }
    } catch(e) {
        return {
            success: true
        }
    }
}