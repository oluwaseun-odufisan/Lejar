"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Parallax effect for image
    const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);

    // Animation variants for the image
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.98, y: 100 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.4, 0, 0.2, 1],
            },
        },
        hover: {
            scale: 1.03,
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    // Animation variants for text elements
    const textVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                delay: i * 0.25,
                ease: [0.4, 0, 0.2, 1],
            },
        }),
    };

    // Animation for background elements
    const bgElementVariants = {
        hidden: { opacity: 0, scale: 0.7 },
        visible: {
            opacity: 0.1,
            scale: 1,
            transition: {
                duration: 2.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-orange-50 to-orange-100">
            <div className="container mx-auto text-center max-w-7xl relative z-10">
                <motion.h1
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-orange-800 mb-6 sm:mb-8 mt-19"
                >
                    Finance Management <br /> Made Intelligent
                </motion.h1>
                <motion.p
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto font-medium"
                >
                    Automate your financial tracking, gain AI-powered insights, and optimize your earnings with precision and ease.
                </motion.p>
                <motion.div
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20"
                >
                    <Link href="/dashboard">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl font-semibold bg-orange-600 text-white hover:bg-orange-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg"
                        >
                            Get Started
                        </Button>
                    </Link>
                    <Link href="https://www.youtube.com">
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl font-semibold border-2 border-orange-600 text-orange-600 hover:bg-orange-50 hover:border-orange-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg"
                        >
                            Watch Demo
                        </Button>
                    </Link>
                </motion.div>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                    whileHover="hover"
                    style={{ y: imageY, opacity: imageOpacity }}
                    className="relative rounded-2xl shadow-2xl border border-orange-200 overflow-hidden mx-auto w-full max-w-8xl"
                >
                    <Image
                        src="/banner.png"
                        layout="responsive"
                        width={1920}
                        height={720}
                        alt="Banner Preview"
                        className="w-full h-auto"
                        priority
                    />
                </motion.div>
            </div>
            {/* Subtle background elements for depth with orange gradients */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={bgElementVariants}
                    className="absolute top-1/4 left-1/6 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gradient-radial from-orange-300 to-transparent rounded-full filter blur-3xl"
                ></motion.div>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={bgElementVariants}
                    transition={{ duration: 2.5, delay: 0.4 }}
                    className="absolute bottom-1/4 right-1/6 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gradient-radial from-orange-400 to-transparent rounded-full filter blur-3xl"
                ></motion.div>
            </div>
        </section>
    );
};

export default HeroSection;