"use client";

import Link from "next/link";
import Image from "next/image";
import { Code, Briefcase, Send, Terminal, ChevronDown, Sparkles, ArrowUpRight, MapPin, Clock } from "lucide-react";
import { motion, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [isMounted, setIsMounted] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);
  const [activeStack, setActiveStack] = useState(null);
  const [currentRole, setCurrentRole] = useState(0);

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

  // Rotating role titles
  const roles = [
    "Frontend Developer",
    "React Specialist", 
    "UX Engineer",
    "Performance Expert"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

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
    { 
      name: "React", 
      desc: "Building scalable UIs for 5+ production apps", 
      icon: <Code className="w-4 h-4 text-cyan-400" />, 
      years: "3+ years",
      expertise: "Advanced"
    },
    { 
      name: "Next.js", 
      desc: "SEO-optimized, server-rendered applications", 
      icon: <Code className="w-4 h-4 text-blue-400" />, 
      years: "2+ years",
      expertise: "Advanced"
    },
    { 
      name: "TypeScript", 
      desc: "Type-safe development & better DX", 
      icon: <Code className="w-4 h-4 text-indigo-400" />, 
      years: "2+ years",
      expertise: "Proficient"
    },
    { 
      name: "Tailwind", 
      desc: "Rapid, responsive UI development", 
      icon: <Code className="w-4 h-4 text-teal-400" />, 
      years: "2+ years",
      expertise: "Advanced"
    },
  ], []);

  const achievements = [
    "30% faster load times achieved",
    "5+ startup projects delivered", 
    "SEO scores 95+ consistently"
  ];

  const handleScrollToProjects = useCallback(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleScrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (!isMounted) return null;

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden pt-16" // Added pt-16 for padding
      role="banner"
      aria-label="Ayoub - Frontend Developer Portfolio Hero"
    >
      {/* Enhanced Background Elements */}
      {!isMobile && !reduceMotionPref && (
        <>
          <motion.div
            className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[length:50px_50px]"
            style={{ x }}
            aria-hidden="true"
          />
          <motion.div 
            className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-tr from-indigo-500/10 to-purple-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >

              {/* Main Heading */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                >
                  Hi, I'm{" "}
                  <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    Ayoub
                  </motion.span>
                </motion.h1>

                {/* Dynamic Role Title */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="h-12 flex items-center justify-center lg:justify-start"
                >
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={currentRole}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-xl sm:text-2xl text-slate-300 font-medium"
                    >
                      {roles[currentRole]}
                    </motion.h2>
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Value Proposition */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                I build fast, scalable web applications that deliver exceptional user experiences and drive business results.
              </motion.p>

              {/* Key Achievements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700/30 rounded-lg"
                  >
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm text-slate-300">{achievement}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Location & Availability */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-6 text-sm text-slate-400 justify-center lg:justify-start"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Based in Morocco</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>GMT+1 Timezone</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                {/* View My Work Button */}
                <motion.a
                  href="#projects"
                  onClick={handleScrollToProjects}
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-md transition-transform duration-200"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Briefcase className="w-5 h-5" />
                  <span>View My Work</span>
                </motion.a>

                {/* Let's Talk Button */}
                <motion.a
                  href="#contact"
                  onClick={handleScrollToContact}
                  className="group flex items-center justify-center gap-3 px-8 py-4 border-2 border-cyan-500 rounded-full text-cyan-500 font-semibold text-lg hover:bg-cyan-500 hover:text-white shadow-lg hover:shadow-md transition-transform duration-200"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Send className="w-5 h-5" />
                  <span>Let's Talk</span>
                </motion.a>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="pt-8 border-t border-slate-800"
              >
                <p className="text-sm text-slate-500 mb-4 uppercase tracking-wider text-center lg:text-left">
                  Technologies I work with
                </p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                      className="relative group"
                      onHoverStart={() => setActiveStack(tech.name)}
                      onHoverEnd={() => setActiveStack(null)}
                    >
                      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/30 hover:border-cyan-400/50 rounded-lg transition-all duration-300 cursor-pointer">
                        {tech.icon}
                        <span className="text-sm font-medium text-slate-300">{tech.name}</span>
                      </div>

                      <AnimatePresence>
                        {activeStack === tech.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-xl z-10"
                          >
                            <div className="text-xs text-cyan-400 font-medium mb-1">
                              {tech.expertise} • {tech.years}
                            </div>
                            <div className="text-xs text-slate-300">{tech.desc}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Profile */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Animated background glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-3xl blur-2xl"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Profile container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-3xl p-1">
                    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-slate-900/50 backdrop-blur-sm border border-slate-700/30">
                      <Image
                        src="/ayoub.webp"
                        alt="Ayoub - Frontend Developer specializing in React and Next.js"
                        fill
                        className="object-cover filter brightness-110 contrast-105"
                        quality={90}
                        priority
                        sizes="(max-width: 768px) 320px, 384px"
                      />
                      
                      {/* Floating tech icons */}
                      {!isMobile && !reduceMotionPref && (
                        <>
                          <motion.div
                            className="absolute top-6 right-6 p-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg"
                            animate={rotateAnimation}
                          >
                            <Terminal className="w-6 h-6 text-cyan-400" />
                          </motion.div>
                          <motion.div
                            className="absolute bottom-6 left-6 p-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg"
                            animate={floatingAnimation}
                          >
                            <Sparkles className="w-6 h-6 text-blue-400" />
                          </motion.div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-center mt-16 lg:mt-20"
          >
            <motion.p 
              className="text-sm text-slate-500 mb-3"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Explore my portfolio
            </motion.p>
            <motion.button
              onClick={handleScrollToProjects}
              animate={{ 
                y: [0, 8, 0], 
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="p-2 rounded-full border border-slate-700/50 hover:border-cyan-400/50 transition-colors duration-300"
            >
              <ChevronDown className="w-6 h-6 text-cyan-400" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}