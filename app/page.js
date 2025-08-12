"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const LandingPage = () => {
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Scroll-based animations
  const { scrollYProgress: statsScroll } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"],
  });
  const statsOpacity = useTransform(statsScroll, [0, 0.5], [0.3, 1]);

  const { scrollYProgress: featuresScroll } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"],
  });
  const featuresOpacity = useTransform(featuresScroll, [0, 0.5], [0.3, 1]);

  const { scrollYProgress: howItWorksScroll } = useScroll({
    target: howItWorksRef,
    offset: ["start end", "end start"],
  });
  const howItWorksOpacity = useTransform(howItWorksScroll, [0, 0.5], [0.3, 1]);

  const { scrollYProgress: testimonialsScroll } = useScroll({
    target: testimonialsRef,
    offset: ["start end", "end start"],
  });
  const testimonialsOpacity = useTransform(testimonialsScroll, [0, 0.5], [0.3, 1]);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.1,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
    hover: {
      scale: 1.03,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-orange-900/30 dark:to-gray-900/95">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        style={{ opacity: statsOpacity }}
        className="py-12 sm:py-16 md:py-20 bg-orange-50/50 dark:bg-orange-900/20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-orange-800 dark:text-orange-400 mb-8 sm:mb-10 md:mb-12"
          >
            Our Impact in Numbers
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        ref={featuresRef}
        style={{ opacity: featuresOpacity }}
        className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-orange-800 dark:text-orange-400 mb-8 sm:mb-10 md:mb-12"
          >
            Tools to Master Your Finances
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {featuresData.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <Card className="p-4 sm:p-6 bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-600 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                  <CardContent className="space-y-4 pt-4">
                    <div className="flex justify-center">{feature.icon}</div>
                    <h3 className="text-lg sm:text-xl font-semibold text-orange-800 dark:text-orange-400 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        ref={howItWorksRef}
        style={{ opacity: howItWorksOpacity }}
        className="py-12 sm:py-16 md:py-20 bg-orange-50/50 dark:bg-orange-900/20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          <motion.h2
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-orange-800 dark:text-orange-400 mb-8 sm:mb-12 md:mb-16"
          >
            Get Started in Three Simple Steps
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {howItWorksData.map((step, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  {step.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-orange-800 dark:text-orange-400 mb-2 sm:mb-4">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        ref={testimonialsRef}
        style={{ opacity: testimonialsOpacity }}
        className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-orange-800 dark:text-orange-400 mb-8 sm:mb-12 md:mb-16"
          >
            Voices from Our Community
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <Card className="p-4 sm:p-6 bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-600 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                  <CardContent className="pt-4">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <div className="font-semibold text-orange-800 dark:text-orange-400">{testimonial.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 italic">{testimonial.quote}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6"
          >
            Take Control of Your Finances Today
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-base sm:text-lg text-orange-100 dark:text-orange-200 mb-6 sm:mb-8 max-w-2xl mx-auto"
          >
            Join thousands of Users managing their money smarter, from Lagos to Miami.
          </motion.p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:text-orange-700 dark:hover:text-orange-500 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
            >
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;