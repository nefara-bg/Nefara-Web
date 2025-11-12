"use client"

import { Button, Snackbar, Stack, Typography } from "@mui/material"
import FormInputField from "../FormInputField/FormInputField"
import { useActionState, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { contactAction } from "@/actions/contact";
const Twemoji = dynamic(() => import("react-emoji-render").then(mod => mod.Twemoji), { ssr: false })

const ContactForm = () => {
    const t = useTranslations()

    const [toast, setToast] = useState(false)
    const [state, formAction, isPending] = useActionState(contactAction, { error: null })

    useEffect(() => {
        if(state?.success) setToast(true)
    }, [state])

    return (
        <>
            <Snackbar
                open={toast}
                onClose={() => setToast(false)}
                message={t( "contact.alert")}
                autoHideDuration={5000}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            />

            {state?.error && <Typography variant="body2" color="error" fontStyle={"italic"}>{state?.error}</Typography>}

            <form action={formAction}>
                <Stack gap={3} mt={1}>
                    <Stack width={"100%"} direction={"row"} gap={2}>
                        <FormInputField
                            label={t("contact.email")}
                            placeholder={t("contact.emailPlaceholder")}
                            name="email"
                        />
                        <FormInputField
                            label={t("contact.subject")}
                            placeholder={t("contact.subjectPlaceholder")}
                            name="subject"
                        />
                    </Stack>
                    <FormInputField
                        label={t("contact.message")}
                        placeholder={t("contact.messagePlaceholder")}
                        multiline={true}
                        rows={4}
                        name="message"
                    />
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isPending}
                    >
                        <Twemoji svg text={isPending ? t("contact.loading") : `${t("contact.button")} 🚀`} />
                    </Button>
                </Stack>
            </form>
        </>
    )
}

export default ContactForm