"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion, motion, type Variants } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { gsap } from "gsap";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiPrisma,
} from "react-icons/si";
import type { IconType } from "react-icons";
import TextThree from "./ui/typwriter";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TechStackItem {
  name: string;
  icon: IconType;
  color: string;
  glow: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TECH_STACK: TechStackItem[] = [
  { name: "React",       icon: FaReact,       color: "#61DAFB", glow: "rgba(97,218,251,0.4)"  },
  { name: "Next.js",     icon: SiNextdotjs,   color: "#ffffff", glow: "rgba(255,255,255,0.25)"},
  { name: "TypeScript",  icon: SiTypescript,  color: "#3178C6", glow: "rgba(49,120,198,0.4)"  },
  { name: "Tailwind CSS",icon: SiTailwindcss, color: "#38BDF8", glow: "rgba(56,189,248,0.4)"  },
  { name: "Node.js",     icon: FaNodeJs,      color: "#339933", glow: "rgba(51,153,51,0.4)"   },
  { name: "Prisma",      icon: SiPrisma,      color: "#5A67D8", glow: "rgba(90,103,216,0.4)"  },
];

// ---------------------------------------------------------------------------
// Typed Framer Motion variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.6 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 350, damping: 22 },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroSection() {
  const sectionRef     = useRef<HTMLElement>(null);
  const headingRef     = useRef<HTMLHeadingElement>(null);
  const subheadingRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef         = useRef<HTMLDivElement>(null);
  const imageRef       = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" }, delay: 0.15 })
        .fromTo(headingRef.current,    { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
        .fromTo(subheadingRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.65")
        .fromTo(ctaRef.current,        { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(imageRef.current,      { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, "-=0.7");
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0B0F19]" aria-hidden="true" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-sky-500/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-indigo-500/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="container-tight relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Text column ── */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-sky-300 mb-6 md:mb-8"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
              </span>
              Available for freelance work
            </motion.div>

            <h1
              ref={headingRef}
              className="text-[clamp(2.5rem,8vw,5rem)] lg:text-[clamp(3rem,6vw,5.5rem)] font-bold tracking-tight text-white mb-5 md:mb-6 leading-[1.05]"
              style={{ opacity: shouldReduceMotion ? 1 : 0 }}
            >
              <TextThree text="Ayoub" reducedMotion={shouldReduceMotion ?? false} />
              <br />
              <span className="text-gradient">
                <TextThree text="Rachidi" delay={600} reducedMotion={shouldReduceMotion ?? false} />
              </span>
            </h1>

<div
  ref={subheadingRef}
  className="max-w-md md:max-w-lg mx-auto lg:mx-0 mb-7 md:mb-8"
  style={{ opacity: shouldReduceMotion ? 1 : 0 }}
>
  <p className="text-base md:text-lg lg:text-xl text-[#94A3B8] leading-relaxed">
    Frontend Developer specializing in landing pages and modern websites
    designed to generate more leads and convert more visitors.
  </p>

  <p className="text-base md:text-lg lg:text-xl text-[#94A3B8] leading-relaxed mt-4">
    Building fast, responsive experiences with React and Next.js that combine
    clean design, strong performance, and business-focused execution.
  </p>
</div>

            {/* CTA buttons */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4"
              style={{ opacity: shouldReduceMotion ? 1 : 0 }}
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0B0F19] rounded-full font-semibold text-sm hover:bg-[#E2E8F0] active:scale-95 transition-all duration-200 w-full sm:w-auto"
              >
                View Projects
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
              </a>
              <a
                href="/MYCVFORDEV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 glass rounded-full font-semibold text-sm text-white hover:bg-white/5 active:scale-95 transition-all duration-200 w-full sm:w-auto"
              >
                Download Resume
              </a>
            </div>

            {/* Animated Tech Stack */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-10 md:mt-12"
            >
              <p className="text-[11px] font-semibold text-[#475569] uppercase tracking-[0.15em] mb-4">
                Tech Stack
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2.5 md:gap-3" role="list" aria-label="Tech stack">
                {TECH_STACK.map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.12,
                      y: -3,
                      transition: { type: "spring", stiffness: 400, damping: 15 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative"
                    role="listitem"
                  >
                    <div
                      className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl glass flex items-center justify-center cursor-pointer transition-all duration-300"
                      style={{ "--glow-color": tech.glow } as React.CSSProperties}
                    >
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--glow-color)] blur-lg"
                        aria-hidden="true"
                      />
                      <tech.icon
                        className="relative z-10 w-[18px] h-[18px] md:w-5 md:h-5 transition-colors duration-300"
                        style={{ color: tech.color }}
                        aria-hidden="true"
                      />
                    </div>
                    {/* Tooltip */}
                    <div
                      className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1e293b] text-white text-[11px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap border border-white/10 shadow-xl"
                      role="tooltip"
                    >
                      {tech.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social links */}
            <div className="mt-8 md:mt-10 flex items-center justify-center lg:justify-start gap-5">
              <motion.a
                href="https://github.com/AYOU-pixel"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="text-[#94A3B8] hover:text-white transition-colors duration-200 p-2 -m-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
                aria-label="GitHub profile"
              >
                <Github size={20} aria-hidden="true" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/ayoub-rachidi-0b344a322/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="text-[#94A3B8] hover:text-white transition-colors duration-200 p-2 -m-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={20} aria-hidden="true" />
              </motion.a>
            </div>
          </div>

          {/* ── Image column ── */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              ref={imageRef}
              className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96"
              style={{ opacity: shouldReduceMotion ? 1 : 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl shadow-black/20">
                <Image
                  src="/ayoub.png"
                  alt="Ayoub Rachidi — Frontend Engineer"
                  fill
                  className="object-cover scale-[1.18] object-center"
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 384px"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}