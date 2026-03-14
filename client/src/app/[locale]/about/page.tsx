import React from 'react'
import SectionContainer from '@/components/SectionContainer/SectionContainer'
import TeamSection from '@/components/Team/TeamSection'
import * as motion from 'motion/react-client'
import { notFound } from 'next/navigation'

export default function AboutPage() {
    return notFound()
    // return (
    //     <main className="min-h-screen bg-background pt-32 pb-20 overflow-hidden">
    //         <SectionContainer className="flex flex-col items-center text-center mb-24 relative z-10">
    //             <motion.div
    //                 initial={{ opacity: 0, y: 20 }}
    //                 animate={{ opacity: 1, y: 0 }}
    //                 transition={{ duration: 0.5 }}
    //             >
    //                 <span className="text-sm font-bold tracking-[0.2em] text-muted-foreground uppercase mb-8 block">
    //                     ABOUT
    //                 </span>
    //             </motion.div>

    //             <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 text-foreground max-w-5xl leading-[1.15]">
    //                 <motion.span
    //                     initial={{ opacity: 0, y: 20 }}
    //                     animate={{ opacity: 1, y: 0 }}
    //                     transition={{ delay: 0.1, duration: 0.5 }}
    //                     className="block mb-2"
    //                 >
    //                     The dream team of
    //                 </motion.span>
    //                 <motion.span
    //                     initial={{ opacity: 0, y: 20 }}
    //                     animate={{ opacity: 1, y: 0 }}
    //                     transition={{ delay: 0.2, duration: 0.5 }}
    //                     className="block"
    //                 >
    //                     digital marketing.
    //                 </motion.span>
    //             </h1>

    //             <motion.p
    //                 initial={{ opacity: 0 }}
    //                 animate={{ opacity: 1 }}
    //                 transition={{ delay: 0.4, duration: 0.8 }}
    //                 className="text-muted-foreground text-lg sm:text-lg font-medium tracking-wide mt-4"
    //             >
    //                 We Grow Businesses Online. Period.
    //             </motion.p>
    //         </SectionContainer>

    //         <motion.div
    //             initial={{ opacity: 0, y: 40 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             transition={{ delay: 0.5, duration: 0.8 }}
    //             className="relative z-10"
    //         >
    //             <TeamSection />
    //         </motion.div>

    //         {/* Background decorative elements to match 'premium' feel */}
    //         <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
    //             <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
    //             <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
    //         </div>
    //     </main>
    // )
}
