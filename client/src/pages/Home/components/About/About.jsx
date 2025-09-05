import { Grid, Stack, Typography } from "@mui/material"
import AboutCard from "./components/AboutCard/AboutCard"
import { useTranslation } from "react-i18next"
import { AboutSection, HomeContainer } from "../../styling"
import FadeInSection from "../../../../components/FadeInSection/FadeInSection"
import { motion } from "motion/react"
import TextGradient from "../../../../components/TextGradient/TextGradient"
import SectionTag from "../../../../components/SectionTag/SectionTag"
import FeatureCard from "./components/FeatureCard/FeatureCard"
import SectionContainer from "../../../../components/SectionContainer/SectionContainer"

const About = () => {
    const { t } = useTranslation()



    const stats = [
        { number: "3+", label: t("about.experience"), icon: "📅" },
        { number: "24/7", label: t("about.support"), icon: "💬" },
        { number: "100%", label: t("about.client"), icon: "⭐" }
    ]



     const features = [
        {
            title: "Agile Development",
            description: "Fast, iterative development cycles that adapt to your changing needs",
            icon: "⚡"
        },
        {
            title: "Modern Tech Stack", 
            description: "Latest technologies and best practices for optimal performance",
            icon: "💻"
        },
        {
            title: "24/7 Support",
            description: "Round-the-clock assistance to keep your applications running smoothly", 
            icon: "🛟"
        },
        {
            title: "Quality Assurance",
            description: "Rigorous testing processes to ensure bug-free, reliable software",
            icon: "🔍"
        }
    ];



    const gridVariants = {
        initial: {},
        animate: {
            transition: {
                transition: 0.1,
                staggerChildren: 0.2,
                when: "beforeChildren"
            }
        }
    }



    return (
        <FadeInSection>
            <AboutSection id="about">
                <SectionContainer props={{ component: Stack, alignItems: "center" }}>
                    <Stack mb={10}>
                        <Stack maxWidth={"60rem"} mb={10} textAlign={"center"}>
                            <Typography mb={3} variant="h3" color="neutral.main">{t("about.title")} <TextGradient props={{ variant: "span" }}>Nefara</TextGradient></Typography>
                            <Typography variant="body1">{t("about.content")}</Typography>
                        </Stack>
                        <Grid
                            component={motion.div}
                            container
                            spacing={3}
                            variants={gridVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        > 
                            {
                                stats.map((stat, i) => (
                                    <AboutCard cardContent={stat} key={i} />
                                ))
                            }
                        </Grid>
                    </Stack>


                    <Grid container width={"100%"} spacing={{ xs: 6, lg: 10 }}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <SectionTag
                                content={`🎯 ${t("about.tag")}`}
                                props={{ mb: 4 }}
                            />

                            <Stack gap={4}>
                                <Typography variant="h4">
                                    {t("about.subtitle")} <Typography variant="span" sx={{ color: "neutral.600" }}>{t("about.subtitle2")}</Typography>
                                </Typography>

                                <Typography variant="body1">{t("about.paragraph1")}</Typography>
                                <Typography variant="body1">{t("about.paragraph2")}</Typography>
                            </Stack>
                        </Grid>

                        <Grid size="grow">
                            <Stack gap={3}>
                                {
                                    features.map((feature, i) => (
                                        <FeatureCard
                                            key={i}
                                            feature={feature}
                                        />
                                    ))
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                </SectionContainer>
            </AboutSection>
        </FadeInSection>
    )
}

export default About