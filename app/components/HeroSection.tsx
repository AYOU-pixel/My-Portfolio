"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { gsap } from "gsap";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiPrisma,
} from "react-icons/si";

const TECH_STACK = [
  { name: "React", icon: FaReact, color: "#61DAFB", glow: "rgba(97,218,251,0.4)" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", glow: "rgba(255,255,255,0.25)" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", glow: "rgba(49,120,198,0.4)" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8", glow: "rgba(56,189,248,0.4)" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933", glow: "rgba(51,153,51,0.4)" },
  { name: "Prisma", icon: SiPrisma, color: "#5A67D8", glow: "rgba(90,103,216,0.4)" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.9 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      tl.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          subheadingRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          imageRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1 },
          "-=0.8"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-[#0B0F19]" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-tight relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-sky-300 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
              </span>
              Available for freelance work
            </div>

            <h1
              ref={headingRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
              style={{ opacity: shouldReduceMotion ? 1 : 0 }}
            >
              Ayoub
              <br />
              <span className="text-gradient">Rachidi</span>
            </h1>

            <p
              ref={subheadingRef}
              className="text-lg md:text-xl text-[#94A3B8] max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
              style={{ opacity: shouldReduceMotion ? 1 : 0 }}
            >
              Frontend Engineer specializing in building exceptional digital
              experiences with React, Next.js, and modern web technologies.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              style={{ opacity: shouldReduceMotion ? 1 : 0 }}
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0B0F19] rounded-full font-medium hover:bg-[#E2E8F0] transition-colors duration-200"
              >
                View Projects
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a
                href="/RACHIDI-AYOUB-FlowCV-Resume-20260127.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full font-medium text-white hover:bg-white/5 transition-colors duration-200"
              >
                Download Resume
              </a>
            </div>

            {/* Animated Tech Stack */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-12"
            >
              <p className="text-xs font-medium text-[#475569] uppercase tracking-widest mb-4">
                Tech Stack
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                {TECH_STACK.map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.15,
                      y: -4,
                      transition: { type: "spring", stiffness: 400, damping: 15 },
                    }}
                    className="group relative"
                  >
                    <div
                      className="relative w-11 h-11 rounded-xl glass flex items-center justify-center cursor-pointer transition-all duration-300"
                      style={
                        {
                          "--glow-color": tech.glow,
                        } as React.CSSProperties
                      }
                    >
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--glow-color)] blur-lg" />
                      <tech.icon
                        className="relative z-10 w-5 h-5 transition-colors duration-300"
                        style={{ color: tech.color }}
                      />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1e293b] text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap border border-white/10 shadow-xl">
                      {tech.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6">
              <a
                href="https://github.com/AYOU-pixel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/ayoub-rchidi-0b344a322/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div
              ref={imageRef}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
              style={{ opacity: shouldReduceMotion ? 1 : 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative w-full h-full rounded-full overflow-hidden ring-1 ring-white/10">
                <Image
                  src="/ayoub.png"
                  alt="Ayoub Rachidi"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 256px, 384px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}