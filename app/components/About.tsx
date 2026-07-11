"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AnimatedText } from "./ui/AnimatedUnderline";
import { FlipCard, type FlipCardData } from "./ui/flip-card";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PROFILE: FlipCardData = {
  image: "/a2.png",
  name: "Ayoub Rachidi",
  role: "frontend developer",
  location: "Morocco",
  availability: "Open to remote",
  summary:
    "I build fast, scalable, conversion-focused digital products with React, Next.js, and TypeScript — combining strong frontend performance with product thinking, so every interface supports real business goals, not just good looks.",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-[#0B0F19] relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] md:w-[800px] md:h-[400px] bg-indigo-500/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-tight relative z-10">
        {/* Section header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <AnimatedText
            text="About Me"
            textClassName="text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight text-white leading-[1.1] text-center"
            underlineClassName="text-sky-400"
            className="items-center justify-center mb-4 md:mb-6"
          />
          <p className="text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed text-balance text-pretty">
            Frontend Engineer based in Morocco, specialized in building
            high-performance web experiences that combine modern UI
            engineering with business-focused thinking.
          </p>
        </motion.div>

        {/* Flip card */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center"
        >
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-80 h-80 bg-gradient-to-tr from-sky-500/10 to-indigo-500/10 rounded-full blur-3xl" />
          </div>
          <FlipCard data={PROFILE} />
        </motion.div>
      </div>
    </section>
  );
}