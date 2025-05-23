"use client";

import Link from "next/link";
import Image from "next/image";
import { Code, Briefcase, Send, Terminal, ChevronDown, Sparkles, ArrowUpRight } from "lucide-react"; // Removed Zap, LineChart as they were used inline and might be what was referred to as "emojis"
import { motion, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Typewriter from "typewriter-effect";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [isMounted, setIsMounted] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);
  const [activeStack, setActiveStack] = useState(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const [reduceMotionPref, setReduceMotionPref] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotionPref(mediaQuery.matches);
    const handler = (e) => setReduceMotionPref(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  }, [isMounted]);

  const floatingAnimation = useMemo(() => (
    isMobile || reduceMotionPref ? {} : {
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    }
  ), [isMobile, reduceMotionPref]);

  const rotateAnimation = useMemo(() => (
    isMobile || reduceMotionPref ? {} : {
      rotate: [0, 10, -10, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    }
  ), [isMobile, reduceMotionPref]);

  const waveAnimation = useMemo(() => (
    isMobile || reduceMotionPref ? {} : {
      y: [0, -20, 0],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
    }
  ), [isMobile, reduceMotionPref]);

  const techStack = useMemo(() => [
    { name: "React", desc: "Built 5+ projects for startups", icon: <Code className="w-4 h-4 text-cyan-400" />, years: "3+ years" },
    { name: "Next.js", desc: "SEO-optimized web apps", icon: <Code className="w-4 h-4 text-cyan-400" />, years: "2+ years" },
    { name: "TypeScript", desc: "Type-safe development", icon: <Code className="w-4 h-4 text-cyan-400" />, years: "2+ years" },
    { name: "Node.js", desc: "Backend APIs and services", icon: <Code className="w-4 h-4 text-cyan-400" />, years: "3+ years" },
    // Consider adding Tailwind CSS if it's a core part of your stack, as mentioned in suggestions
    // { name: "TailwindCSS", desc: "Rapid UI development", icon: <Code className="w-4 h-4 text-teal-400" />, years: "2+ years" },
  ], []);

  const handleScrollToProjects = useCallback(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (!isMounted) return null;

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 via-slate-900 to-indigo-400 overflow-hidden border-b border-slate-700/30"
      role="banner"
      aria-label="Hero Section"
    >
      {/* Animated Background Elements */}
      {!isMobile && !reduceMotionPref && (
        <motion.div
          className="absolute inset-0 bg-grid-slate-700/10 bg-[length:40px_40px]"
          style={{ x }}
          aria-hidden="true"
        />
      )}
      {/* Animated waves */}
      {!isMobile && !reduceMotionPref && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-64 opacity-10"
          animate={waveAnimation}
        >
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full">
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              className="fill-cyan-500/30"
            />
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              className="fill-indigo-500/20" 
              transform="translate(0, 5)"
            />
          </svg>
        </motion.div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-900/90" />
      {/* Enhanced Soft Circles with subtle animation */}
      {!isMobile && !reduceMotionPref && (
        <motion.div 
          className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {!isMobile && !reduceMotionPref && (
        <motion.div 
          className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 py-24 z-10">
        <div className="flex flex-col items-center gap-10 text-center">
          {/* Enhanced Headline with improved visual hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6" // Increased vertical spacing for better readability
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2"
            >
              <motion.span 
                className="flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-lg"
                whileHover={{ 
                  rotate: [0, 10, -10, 0],
                  scale: 1.1,
                  transition: { duration: 0.5 }
                }}
              >
                A
              </motion.span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#F5F5F5]">
                Hi, I'm{" "} {/* UPDATED */}
                <motion.span 
                  className="text-amber-400 relative inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  Ayoub
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/70"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  />
                </motion.span>
              </h1>
            </motion.div>
            
            {/* Professional Title with improved visibility */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }} // Adjusted delay
              className="text-base sm:text-lg text-slate-200 font-medium tracking-wider drop-shadow"
            >
              {/* UPDATED */}
              Frontend Developer | UX-Focused Engineer | React & Next.js Expert
            </motion.p>

            {/* Enhanced Value Proposition */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }} // Adjusted delay
              className="text-lg sm:text-xl md:text-2xl text-[#F5F5F5] font-semibold max-w-2xl mx-auto leading-relaxed"
            >
              {/* UPDATED - Stronger, clearer value proposition */}
              I craft fast, scalable, and SEO-ready web interfaces that drive real results.
            </motion.h2>
            
            {/* Personal Story / Deeper Value Proposition with Typewriter effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }} // Adjusted delay
              className="text-sm sm:text-base text-slate-300 font-medium tracking-wider drop-shadow-md max-w-xl mx-auto"
            >
              <Typewriter
                options={{
                  strings: [
                    // UPDATED - More focused on value and client needs
                    "Helping startups launch clean, high-performance web applications.",
                    "Specializing in React, Next.js, and modern frontend tooling.",
                    "Building user experiences that are both beautiful and effective."
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </motion.div>


            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }} // Adjusted delay
              className="text-sm md:text-base text-slate-300 mt-2 font-medium max-w-lg mx-auto" // Added max-width
            >
              {/* UPDATED - "Trusted by" statement */}
              Trusted by early-stage startups to deliver fast, SEO-optimized web platforms that drive growth.
            </motion.p>

            {/* Achievement with badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }} // Adjusted delay
              className="flex justify-center mt-1"
            >
              <span className="text-xs bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded-full border border-emerald-800/50 inline-flex items-center gap-1.5">
                <span>✓</span>
                {/* UPDATED - More specific achievement */}
                Achieved 30% faster load times for a SaaS client via Next.js & Tailwind CSS optimization.
              </span>
            </motion.div>

             {/* Closing call to action statement */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="text-md text-slate-200 font-medium pt-2" // Added padding top
            >
              Let’s build something that looks great and performs even better.
            </motion.p>
          </motion.div>

          {/* Enhanced CTA Buttons with improved animations */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }} // Adjusted delay to follow text
          >
            <motion.a
              href="#projects"
              onClick={handleScrollToProjects} // Added for smooth scroll if #projects is on same page
              className="group flex items-center gap-2 px-6 py-3 bg-amber-400 rounded-lg text-slate-900 font-semibold hover:shadow-lg focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all text-base sm:text-lg w-full sm:w-auto justify-center shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(251, 191, 36, 0.4)" 
              }}
              whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 300 } }}
            >
              <Briefcase className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              View Portfolio
            </motion.a>

            <motion.div
              onHoverStart={() => setHoverButton(true)}
              onHoverEnd={() => setHoverButton(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 300 } }}
            >
              <Link
                href="#contact"
                scroll={true}
                className="flex items-center gap-2 px-6 py-3 border border-sky-300 bg-transparent rounded-lg text-sky-300 font-medium hover:border-cyan-400 hover:text-cyan-400 hover:ring-1 hover:ring-cyan-500/50 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all text-base sm:text-lg w-full sm:w-auto justify-center shadow-lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Start a Project
                <motion.div
                  animate={hoverButton ? { x: 3, y: -3, opacity: 1 } : { x: 0, y: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced Tech Stack with badges and tooltips */}
          <motion.div
            className="flex flex-col items-center gap-2 mt-6" // Reduced top margin slightly
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }} // Adjusted delay
          >
            <p className="text-xs text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <span className="h-px w-4 bg-slate-600"></span>
              My Tech Stack
              <span className="h-px w-4 bg-slate-600"></span>
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.1 }} // Adjusted delay
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                  onHoverStart={() => setActiveStack(tech.name)}
                  onHoverEnd={() => setActiveStack(null)}
                >
                  <div className="group px-3 py-1.5 bg-slate-800 backdrop-blur-md text-slate-200 rounded-full text-xs border border-slate-700 hover:border-cyan-400 flex items-center gap-1 shadow-md">
                    {tech.icon}
                    {tech.name}
                  </div>
                  
                  <AnimatePresence>
                    {activeStack === tech.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-16 left-1/2 -translate-x-1/2 w-36 bg-slate-800 text-xs text-slate-200 px-3 py-2 rounded-md border border-slate-700/50 shadow-xl z-10"
                      >
                        <div className="font-medium text-cyan-400 mb-1">{tech.years}</div>
                        <div className="text-slate-300">{tech.desc}</div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-r border-b border-slate-700/50 transform rotate-45"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Profile Picture with improved animation and shadow */}
          <motion.div
            className="relative mt-8 group" // Maintained margin
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 }} // Adjusted delay
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 rounded-2xl blur-xl"
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl p-1 bg-gradient-to-tr from-cyan-400/20 to-indigo-500/20 backdrop-blur-md">
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-700/40 bg-slate-900/80 shadow-xl">
                <Image
                  src="/ayoub.webp" // Make sure this path is correct
                  alt="Ayoub — Frontend Developer & UX Engineer" // Updated alt text
                  fill
                  className="object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                  quality={isMobile ? 60 : 95}
                  priority
                  sizes={isMobile ? "128px" : "(max-width: 640px) 192px, 224px"}
                />
                {!isMobile && !reduceMotionPref && (
                  <motion.div
                    className="absolute -top-3 -right-3 p-2 rounded-full border border-slate-700/50 bg-slate-900/70 shadow-lg"
                    animate={rotateAnimation}
                  >
                    <Terminal className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                )}
                {!isMobile && !reduceMotionPref && (
                  <motion.div
                    className="absolute -bottom-3 -left-3 p-2 rounded-full border border-slate-700/50 bg-slate-900/70 shadow-lg"
                    animate={floatingAnimation}
                  >
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Divider */}
          <motion.div
            className="w-24 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent my-4"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.5 }} // Adjusted delay
          />

          {/* Enhanced Scroll Indicator with improved animation */}
          <motion.div
            className="mt-6" // Maintained margin
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }} // Adjusted delay
          >
            <motion.p 
              className="text-sm text-slate-400 mb-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              See my projects below
            </motion.p>
            <motion.div
              animate={{ 
                y: [0, 10, 0], 
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="cursor-pointer"
              onClick={handleScrollToProjects}
            >
              <ChevronDown className="w-7 h-7 text-cyan-400/80 mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}