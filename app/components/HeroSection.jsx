"use client";

import Link from "next/link";
import Image from "next/image";
import { Code, Briefcase, Send, Terminal, ChevronDown, Sparkles, MapPin, Clock } from "lucide-react";
import { motion, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

// Move static data outside component to prevent recreating on each render
const ROLES = [
  "Frontend Developer",
  "React Specialist", 
  "UX Engineer",
  "Performance Expert"
];

const TECH_STACK = [
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
];

const ACHIEVEMENTS = [
  "30% faster load times achieved",
  "5+ startup projects delivered", 
  "SEO scores 95+ consistently"
];

// Memoized animation variants to prevent recreation
const ANIMATION_VARIANTS = {
  floating: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  rotating: {
    rotate: [0, 10, -10, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
  glowPulse: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  },
  backgroundFloat: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: { duration: 12, repeat: Infinity, ease: "easeInOut" }
  }
};

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Combine related state
  const [state, setState] = useState({
    isMounted: false,
    activeStack: null,
    currentRole: 0,
    isMobile: false,
    reduceMotionPref: false
  });

  // Optimize media query handling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const isMobile = window.innerWidth <= 768;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    setState(prev => ({
      ...prev,
      isMounted: true,
      isMobile,
      reduceMotionPref: mediaQuery.matches
    }));

    const handler = (e) => setState(prev => ({ ...prev, reduceMotionPref: e.matches }));
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Optimize role rotation with useCallback
  useEffect(() => {
    if (!state.isMounted) return;
    
    const interval = setInterval(() => {
      setState(prev => ({ ...prev, currentRole: (prev.currentRole + 1) % ROLES.length }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [state.isMounted]);

  // Memoize scroll handlers
  const handleScrollToProjects = useCallback(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleScrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Memoize animation props based on preferences
  const animationProps = useMemo(() => {
    const shouldAnimate = !state.isMobile && !state.reduceMotionPref;
    return {
      floating: shouldAnimate ? ANIMATION_VARIANTS.floating : {},
      rotating: shouldAnimate ? ANIMATION_VARIANTS.rotating : {},
      glowPulse: shouldAnimate ? ANIMATION_VARIANTS.glowPulse : {},
      backgroundFloat: shouldAnimate ? ANIMATION_VARIANTS.backgroundFloat : {},
      showFloatingElements: shouldAnimate
    };
  }, [state.isMobile, state.reduceMotionPref]);

  // Early return for SSR
  if (!state.isMounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Ayoub</span>
            </h1>
            <h2 className="text-xl sm:text-2xl text-slate-300 font-medium mb-6">Frontend Developer</h2>
            <p className="text-lg text-slate-400 mb-8">
              I build fast, scalable web applications that deliver exceptional user experiences.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden pt-16"
      role="banner"
      aria-label="Ayoub - Frontend Developer Portfolio Hero"
    >
      {/* Background Elements - Only render if animations are enabled */}
      {animationProps.showFloatingElements && (
        <>
          <motion.div
            className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[length:50px_50px]"
            style={{ x }}
            aria-hidden="true"
          />
          <motion.div 
            className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl"
            animate={animationProps.backgroundFloat}
          />
          <motion.div 
            className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-tr from-indigo-500/10 to-purple-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.4, 0.3],
              transition: { duration: 15, repeat: Infinity, ease: "easeInOut" }
            }}
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
              transition={{ duration: 0.6 }}
              className="space-y-8 text-center lg:text-left"
            >
              {/* Main Heading */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                >
                  Hi, I'm{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Ayoub
                  </span>
                </motion.h1>

                {/* Dynamic Role Title */}
                <div className="h-12 flex items-center justify-center lg:justify-start">
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={state.currentRole}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl sm:text-2xl text-slate-300 font-medium"
                    >
                      {ROLES[state.currentRole]}
                    </motion.h2>
                  </AnimatePresence>
                </div>
              </div>

              {/* Value Proposition */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                I build fast, scalable web applications that deliver exceptional user experiences and drive business results.
              </motion.p>

              {/* Key Achievements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                {ACHIEVEMENTS.map((achievement, index) => (
                  <motion.div
                    key={achievement}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700/30 rounded-lg"
                  >
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    <span className="text-sm text-slate-300">{achievement}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Location & Availability */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.button
                  onClick={handleScrollToProjects}
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-md transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Briefcase className="w-5 h-5" />
                  <span>View My Work</span>
                </motion.button>

                <motion.button
                  onClick={handleScrollToContact}
                  className="group flex items-center justify-center gap-3 px-8 py-4 border-2 border-cyan-500 rounded-full text-cyan-500 font-semibold text-lg hover:bg-cyan-500 hover:text-white shadow-lg hover:shadow-md transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  <span>Let's Talk</span>
                </motion.button>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="pt-8 border-t border-slate-800"
              >
                <p className="text-sm text-slate-500 mb-4 uppercase tracking-wider text-center lg:text-left">
                  Technologies I work with
                </p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {TECH_STACK.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.05, duration: 0.4 }}
                      className="relative group"
                      onHoverStart={() => setState(prev => ({ ...prev, activeStack: tech.name }))}
                      onHoverEnd={() => setState(prev => ({ ...prev, activeStack: null }))}
                    >
                      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/30 hover:border-cyan-400/50 rounded-lg transition-all duration-300 cursor-pointer">
                        {tech.icon}
                        <span className="text-sm font-medium text-slate-300">{tech.name}</span>
                      </div>

                      <AnimatePresence>
                        {state.activeStack === tech.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2 }}
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
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Animated background glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-3xl blur-2xl"
                  animate={animationProps.glowPulse}
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
                        quality={80} // Adjust quality for performance
                        priority
                        sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 480px" // Define responsive sizes
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xg"
                      />
                      
                      {/* Floating tech icons - only if animations enabled */}
                      {animationProps.showFloatingElements && (
                        <>
                          <motion.div
                            className="absolute top-6 right-6 p-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg"
                            animate={animationProps.rotating}
                          >
                            <Terminal className="w-6 h-6 text-cyan-400" />
                          </motion.div>
                          <motion.div
                            className="absolute bottom-6 left-6 p-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg"
                            animate={animationProps.floating}
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
            transition={{ delay: 0.8, duration: 0.6 }}
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
              animate={animationProps.showFloatingElements ? { 
                y: [0, 8, 0], 
                opacity: [0.7, 1, 0.7],
              } : {}}
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