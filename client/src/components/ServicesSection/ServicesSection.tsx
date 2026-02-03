"use client"

import * as motion from "motion/react-client";
import { Globe, Monitor, Smartphone, Check } from "lucide-react";

// Assuming we can use these images directly. If they fail (CORS or hotlinking protection), we should download them.
// Likely they are public.
const services = [
    {
        title: "Web Development",
        description:
            "Modern, responsive websites and web applications built with cutting-edge technologies that deliver exceptional user experiences.",
        icon: Globe,
        features: ["Responsive design", "Pure code", "AI integrated"],
        image: "https://nefara.org/_next/image?url=%2FwebDev.webp&w=3840&q=75",
    },
    {
        title: "Desktop Apps",
        description:
            "Powerful desktop software solutions for Windows, macOS, and Linux with native performance and intuitive interfaces.",
        icon: Monitor,
        features: ["Cross platform for all operating systems", "High performance", "AI integrated"],
        image: "https://nefara.org/_next/image?url=%2FdesktopDev.webp&w=3840&q=75",
    },
    {
        title: "Mobile Apps",
        description:
            "Native and cross-platform mobile applications that provide seamless experiences across iOS and Android devices.",
        icon: Smartphone,
        features: ["Cross platform for all operating systems", "Secure applications", "AI integrated"],
        image: "https://nefara.org/_next/image?url=%2FmobileDev.webp&w=3840&q=75",
    },
];

export function ServicesSection() {
    return (
        <section id="services" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-label mb-4">What We Build</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                        Our Services
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Comprehensive software development services designed to transform your
                        ideas into powerful digital solutions that scale with your business.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="space-y-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Image */}
                            <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                                <div className="relative overflow-hidden rounded-2xl bg-secondary/30">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-64 md:h-80 object-cover"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <service.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                                </div>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-2">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                                            <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-muted-foreground mb-4">
                        Don't see exactly what you need? We create custom solutions for unique challenges.
                    </p>
                    <button
                        onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                        className="text-foreground font-medium hover:underline"
                    >
                        Discuss Your Project →
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
