"use server"

import { sendEmail } from "@/services/contact"

export type ContactState = {
    success?: boolean;
    error?: string | null;
}

export const contactAction = async (previousState: ContactState, formData: FormData): Promise<ContactState> => {
    const name    = (formData.get("name")    as string) || ""
    const email   = (formData.get("email")   as string) || ""
    const company = (formData.get("company") as string) || ""
    const service = (formData.get("service") as string) || ""
    const message = (formData.get("message") as string) || ""

    const subject = [service && `[${service}]`, `Inquiry from ${name || email}`].filter(Boolean).join(" ")

    const fullMessage = [
        name    && `Name: ${name}`,
        company && `Company: ${company}`,
        service && `Service: ${service}`,
        "",
        message,
    ].filter((l) => l !== undefined).join("\n")

    return await sendEmail(email, subject, fullMessage)
}
