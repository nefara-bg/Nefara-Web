import React from 'react'
import SectionTag from '@/components/SectionTag/SectionTag'
import TextGradient from '@/components/TextGradient/TextGradient'
import ContactCard from '@/components/ContactCard/ContactCard'
import { useTranslations } from 'next-intl'
import * as motion from 'motion/react-client'
import { Mail, Phone, Sparkles } from 'lucide-react'
import { encodeEmailForMailto, encodePhoneForTel } from '@/utils/url/url'

interface OurContactsProps {
    email?: string;
    phone?: string;
    phoneLabel?: string;
}

const OurContacts: React.FC<OurContactsProps> = ({
    email = "",
    phone = "",
    phoneLabel = ""
}) => {
    const t = useTranslations()

    const variants = {
        initial: { scale: 0 },
        animate: {
            scale: 1,
            transition: {
                duration: 0,
                when: "beforeChildren",
                staggerChildren: 0.2
            } as const
        }
    } as const

    return (
        <>
            <div className="flex flex-col items-center mb-16">
                <SectionTag
                    className="mb-6"
                    content={
                        <>
                            <Sparkles className="w-3.5 h-3.5" />
                            {t("contact.tag")}
                        </>
                    }
                />

                <div className="flex flex-col mb-6">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
                        {t("contact.title")}
                    </h3>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
                        <TextGradient>{t("contact.subtitle")}</TextGradient>
                    </h3>
                </div>

                <p className="text-base text-muted-foreground text-center">
                    {t("contact.content")}
                </p>
            </div>

            <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="flex flex-wrap w-full items-stretch -mx-3 mb-16"
            >
                <ContactCard
                    icon={<Mail className="w-8 h-8" />}
                    title={t("contact.emailTitle")}
                    content={t("contact.emailContent")}
                    contact={email}
                    href={`mailto:${encodeEmailForMailto(email)}`}
                />
                <ContactCard
                    icon={<Phone className="w-8 h-8" />}
                    title={t("contact.phoneTitle")}
                    content={t("contact.phoneContent")}
                    contact={phoneLabel}
                    href={`tel:${encodePhoneForTel(phone)}`}
                />
            </motion.div>
        </>
    )
}

export default OurContacts
