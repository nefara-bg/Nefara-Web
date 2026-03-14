import React from 'react'
import TeamCard from './TeamCard'
import SectionContainer from '@/components/SectionContainer/SectionContainer'

const TeamSection: React.FC = () => {
    const team = [
        {
            name: "Ahmad Subarjo",
            role: "SEO Specialist",
            image: "/team/member1.png",
            title: "Custom SEO Services",
            description: "Custom, organic SEO services that include technical audits, on-page search engine optimization.",
            linkedin: "https://www.linkedin.com/in/ahmad-subarjo"
        },
        {
            name: "Andrew Silabus",
            role: "Marketing Director",
            image: "/team/member2.png",
            title: "SEO Website Design",
            description: "1st on the List provides highly effective PPC advertising for every budget including Google PPC Ads, Bing PPC, and ad retargeting strategies.",
            linkedin: "https://www.linkedin.com/in/andrew-silabus"
        },
        {
            name: "Zahra Agustin",
            role: "Content Strategist",
            image: "/team/member3.png",
            title: "SEO Consulting",
            description: "B2B SEO is the process of generating valuable inbound leads from other businesses.",
            linkedin: "https://www.linkedin.com/in/zahra-agustin"
        }
    ]

    return (
        <section className="py-12 sm:py-24 w-full">
            <SectionContainer>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 items-start">
                    {team.map((member, i) => (
                        <TeamCard
                            key={i}
                            index={i}
                            {...member}
                        />
                    ))}
                </div>
            </SectionContainer>
        </section>
    )
}

export default TeamSection
