"use server"

import { sendEmail } from "@/services/contact"

export const contactAction = async (previousState, formData) => {
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    const result = await sendEmail({ email, subject, message })

    return result
}