"use client"

import React, { useActionState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import FormInputField from '../FormInputField/FormInputField'
import { useTranslations } from 'next-intl'
import { contactAction } from '@/actions/contact'
import { toast } from 'sonner'
import { Send, Loader2 } from 'lucide-react'

const ContactForm: React.FC = () => {
    const t = useTranslations()

    const [state, formAction, isPending] = useActionState(contactAction, { error: null })

    useEffect(() => {
        if (state?.success) {
            toast.success(t("contact.alert"))
        }
    }, [state, t])

    return (
        <>
            {state?.error && (
                <p className="text-sm text-destructive italic mb-2">
                    {state?.error}
                </p>
            )}

            <form action={formAction}>
                <div className="flex flex-col gap-6 mt-2">
                    <div className="w-full flex flex-row gap-4">
                        <FormInputField
                            label={t("contact.email")}
                            placeholder={t("contact.emailPlaceholder")}
                            name="email"
                            type="email"
                        />
                        <FormInputField
                            label={t("contact.subject")}
                            placeholder={t("contact.subjectPlaceholder")}
                            name="subject"
                        />
                    </div>
                    <FormInputField
                        label={t("contact.message")}
                        placeholder={t("contact.messagePlaceholder")}
                        multiline={true}
                        rows={4}
                        name="message"
                    />
                    <Button
                        size="lg"
                        type="submit"
                        disabled={isPending}
                        className="gap-2"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {t("contact.loading")}
                            </>
                        ) : (
                            <>
                                {t("contact.button")}
                                <Send className="w-4 h-4" />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default ContactForm
