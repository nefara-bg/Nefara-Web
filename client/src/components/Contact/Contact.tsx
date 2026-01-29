import React from 'react'
import FadeInSection from '@/components/FadeInSection/FadeInSection'
import ContactFormCard from '@/components/ContactFormCard/ContactFormCard'
import OurContacts from '@/components/OurContacts/OurContacts'
import { parseBgPhone } from '@/utils/phone/phone'
import { validateContactEmail, validateContactPhone } from '@/utils/env/env'
import { cn } from '@/lib/utils'

const Contact: React.FC = () => {
    const phone = validateContactPhone(process.env.NEXT_PUBLIC_CONTACT_PHONE)
    const phoneLabel = phone ? parseBgPhone(phone) : ''
    const email = validateContactEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL)

    return (
        <FadeInSection>
            <section
                id="contact"
                className={cn(
                    "py-16 sm:py-20 md:py-24",
                    "px-4 sm:px-12 md:px-16 lg:px-20 xl:px-24",
                    "flex items-center",
                    "bg-background",
                    "min-h-[min(100vh,60rem)]"
                )}
            >
                <div className="max-w-4xl text-center flex flex-col items-center mx-auto">
                    <OurContacts
                        email={email}
                        phone={phone}
                        phoneLabel={phoneLabel}
                    />

                    <ContactFormCard
                        phone={phone}
                        phoneLabel={phoneLabel}
                    />
                </div>
            </section>
        </FadeInSection>
    )
}

export default Contact
