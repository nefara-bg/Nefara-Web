import React from 'react'
import { useTranslations } from 'next-intl'
import InfoFeature from '@/components/InfoFeature/InfoFeature'
import * as motion from 'motion/react-client'
import ContactForm from '@/components/ContactForm/ContactForm'
import { Twemoji } from 'react-emoji-render'
import { encodePhoneForTel } from '@/utils/url/url'
import { cn } from '@/lib/utils'

interface ContactFormCardProps {
    phone?: string;
    phoneLabel?: string;
}

const ContactFormCard: React.FC<ContactFormCardProps> = ({ phone = "", phoneLabel = "" }) => {
    const t = useTranslations()

    const infoFeatures = [
        {
            title: t("contact.time.title"),
            content: t("contact.time.content")
        },
        {
            title: t("contact.consultation.title"),
            content: t("contact.consultation.content")
        },
        {
            title: t("contact.proposals.title"),
            content: t("contact.proposals.content")
        }
    ]

    return (
        <motion.div
            initial={{
                scale: 0
            }}
            whileInView={{
                scale: 1,
                transition: {
                    duration: 1.5,
                    type: "spring"
                }
            }}
            viewport={{ once: true }}
        >
            <div className="border rounded-lg grid grid-cols-1 lg:grid-cols-12 w-full text-left overflow-hidden">
                <div className="lg:col-span-8 p-6 sm:p-12 flex flex-col justify-center">
                    <div className="flex flex-col gap-2 mb-8">
                        <h5 className="text-2xl text-primary font-bold">
                            {t("contact.formTitle")}
                        </h5>
                        <p className="text-sm text-muted-foreground">
                            {t("contact.formText")}
                        </p>
                    </div>

                    <ContactForm />
                </div>

                <div className={cn(
                    "lg:col-span-4",
                    "bg-gradient-to-br from-primary via-gray-700 to-gray-900",
                    "flex flex-col justify-center",
                    "p-8 sm:p-12"
                )}>
                    <h5 className="text-2xl mb-4 text-background font-bold">
                        {t("contact.infoTitle")}
                    </h5>

                    <div className="flex flex-col gap-4 mb-8">
                        {infoFeatures.map((feature, i) => (
                            <InfoFeature
                                featureObject={feature}
                                key={i}
                            />
                        ))}
                    </div>

                    <div className="h-px bg-gray-500" />

                    <div className="mt-8 flex flex-col gap-4">
                        <p className="text-sm text-background font-semibold">
                            {t("contact.call")}
                        </p>
                        <a
                            href={`tel:${encodePhoneForTel(phone)}`}
                            className="text-sm text-background"
                        >
                            <Twemoji svg text={`☎️ ${phoneLabel}`} />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ContactFormCard
