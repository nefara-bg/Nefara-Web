"use server"

import { sendEmail } from "@/services/contact"

export type ContactState = {
    success?: boolean;
    error?: string | null;
}

export const contactAction = async (previousState: ContactState, formData: FormData): Promise<ContactState> => {
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const result = await sendEmail(email, subject, message);

    return result;
}
