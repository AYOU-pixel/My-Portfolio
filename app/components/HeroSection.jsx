"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Code, 
  Briefcase, 
  Send, 
  Terminal, 
  ChevronDown, 
  Sparkles, 
  MapPin, 
  Clock,
  Github,
  ExternalLink,
  Download,
  Star,
  Trophy,
  Users,
  ArrowRight,
  Zap
} from "lucide-react";
import { motion, useTransform, useScroll, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

// Enhanced static data with more professional structure
const ROLES = [
  "Senior Frontend Developer",
  "React.js Specialist", 
  "Next.js Expert",
  "UI/UX Engineer",
  "Performance Architect"
];

const TECH_STACK = [
  { 
    name: "React", 
    desc: "Advanced component architecture & state management", 
    icon: <Code className="w-4 h-4 text-cyan-400" />, 
    years: "4+ years",
    expertise: "Expert",
    color: "cyan"
  },
  { 
    name: "Next.js", 
    desc: "Full-stack React framework with SSR/SSG", 
    icon: <Code className="w-4 h-4 text-blue-400" />, 
    years: "3+ years",
    expertise: "Advanced",
    color: "blue"
  },
  { 
    name: "TypeScript", 
    desc: "Type-safe development & enterprise applications", 
    icon: <Code className="w-4 h-4 text-indigo-400" />, 
    years: "3+ years",
    expertise: "Advanced",
    color: "indigo"
  },
  { 
    name: "Tailwind CSS", 
    desc: "Utility-first CSS framework & design systems", 
    icon: <Code className="w-4 h-4 text-teal-400" />, 
    years: "3+ years",
    expertise: "Expert",
    color: "teal"
  },
  { 
    name: "Node.js", 
    desc: "Backend development & API integration", 
    icon: <Terminal className="w-4 h-4 text-green-400" />, 
    years: "2+ years",
    expertise: "Proficient",
    color: "green"
  },
  { 
    name: "AWS", 
    desc: "Cloud deployment & serverless architecture", 
    icon: <Sparkles className="w-4 h-4 text-orange-400" />, 
    years: "2+ years",
    expertise: "Proficient",
    color: "orange"
  }
];

const ACHIEVEMENTS = [
  { 
    icon: <Zap className="w-4 h-4" />, 
    text: "40% faster load times", 
    desc: "Performance optimization"
  },
  { 
    icon: <Trophy className="w-4 h-4" />, 
    text: "15+ projects delivered", 
    desc: "Production applications"
  },
  { 
    icon: <Users className="w-4 h-4" />, 
    text: "50K+ users served", 
    desc: "Monthly active users"
  },
  { 
    icon: <Star className="w-4 h-4" />, 
    text: "98% client satisfaction", 
    desc: "Quality deliverables"
  }
];

const STATS = [
  { number: "4+", label: "Years Experience", icon: <Clock className="w-5 h-5" /> },
  { number: "15+", label: "Projects Completed", icon: <Briefcase className="w-5 h-5" /> },
  { number: "98%", label: "Client Satisfaction", icon: <Star className="w-5 h-5" /> },
  { number: "50K+", label: "Users Impacted", icon: <Users className="w-5 h-5" /> }
];

// Enhanced animation variants
const ANIMATION_VARIANTS = {
  floating: {
    y: [0, -12, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
  rotating: {
    rotate: [0, 5, -5, 0],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
  },
  glowPulse: {
    scale: [1, 1.02, 1],
    opacity: [0.8, 1, 0.8],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  },
  backgroundFloat: {
    scale: [1, 1.1, 1],
    opacity: [0.4, 0.6, 0.4],
    rotate: [0, 180, 360],
    transition: { duration: 20, repeat: Infinity, ease: "linear" }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -60, y: 20 },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  slideInRight: {
    initial: { opacity: 0, x: 60, y: 20 },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function HeroSection() {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Enhanced state management
  const [state, setState] = useState({
    isMounted: false,
    activeStack: null,
    currentRole: 0,
    isMobile: false,
    reduceMotionPref: false,
    isTyping: true
  });

  // Initialize component
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

  // Enhanced role rotation with typing effect
  useEffect(() => {
    if (!state.isMounted) return;
    
    const interval = setInterval(() => {
      setState(prev => ({ 
        ...prev, 
        isTyping: false 
      }));
      
      setTimeout(() => {
        setState(prev => ({ 
          ...prev, 
          currentRole: (prev.currentRole + 1) % ROLES.length,
          isTyping: true 
        }));
      }, 200);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [state.isMounted]);

  // Memoized scroll handlers
  const handleScrollToProjects = useCallback(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleScrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Enhanced animation props
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

  // Loading state
  if (!state.isMounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-16 bg-slate-800 rounded mb-4 w-3/4 mx-auto"></div>
              <div className="h-8 bg-slate-800 rounded mb-6 w-1/2 mx-auto"></div>
              <div className="h-6 bg-slate-800 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden pt-20"
      role="banner"
      aria-label="Ayoub - Senior Frontend Developer Portfolio"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 bg-grid-slate-700/[0.05] bg-[length:60px_60px]"
          style={{ x, y: y }}
          aria-hidden="true"
        />
        {animationProps.showFloatingElements && (
          <>
            <motion.div 
              className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-full blur-3xl"
              animate={animationProps.backgroundFloat}
            />
            <motion.div 
              className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-500/15 to-purple-600/15 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
                rotate: [0, -180, -360],
                transition: { duration: 25, repeat: Infinity, ease: "linear" }
              }}
            />
          </>
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Main Content */}
            <motion.div
              {...ANIMATION_VARIANTS.slideInLeft}
              className="lg:col-span-7 space-y-8"
            >
              {/* Main Heading with Enhanced Typography */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight"
                >
                  <span className="block">Hi, I'm</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 animate-gradient-x">
                    Ayoub
                  </span>
                </motion.h1>

                {/* Enhanced Dynamic Role Title */}
                <div className="h-16 flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={state.currentRole}
                      initial={{ opacity: 0, y: 20, rotateX: 90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: -20, rotateX: -90 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex items-center gap-3"
                    >
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-200">
                        {ROLES[state.currentRole]}
                      </h2>
                      {state.isTyping && (
                        <motion.div
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="w-1 h-8 bg-cyan-400 rounded"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Enhanced Value Proposition */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-4"
              >
                <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed font-light max-w-2xl">
                  I craft <span className="font-semibold text-white">high-performance</span> web applications 
                  that drive business growth and deliver exceptional user experiences.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                  Specializing in React ecosystem with a focus on scalability, performance, and modern development practices.
                </p>
              </motion.div>

              {/* Statistics Cards */}
              <motion.div
                ref={statsRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {STATS.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                    className="group p-4 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={isStatsInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                        className="text-2xl font-bold text-white"
                      >
                        {stat.number}
                      </motion.span>
                    </div>
                    <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.button
                  onClick={handleScrollToProjects}
                  className="group relative overflow-hidden flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-semibold text-lg shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Briefcase className="w-5 h-5 z-10" />
                  <span className="z-10">View My Work</span>
                  <ArrowRight className="w-5 h-5 z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>

                <motion.button
                  onClick={handleScrollToContact}
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-600 hover:border-cyan-500 rounded-xl text-slate-200 hover:text-white font-semibold text-lg shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  <span>Let's Connect</span>
                </motion.button>

                <motion.a
                  href="/front-end-developer-resume-ayoub-pdf.pdf" // Updated path
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-6 py-4 bg-transparent border border-slate-600 hover:border-slate-500 rounded-xl text-slate-300 hover:text-white font-medium transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-5 h-5" />
                  <span>Resume</span>
                  <ExternalLink className="w-4 h-4 opacity-60" />
                </motion.a>
              </motion.div>

              {/* Location & Availability Enhanced */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap items-center gap-6 text-sm text-slate-400 pt-4"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>Rabat, Morocco</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>GMT+1 • Available Mon-Fri</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Open to remote work</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Enhanced Profile & Tech Stack */}
            <motion.div
              {...ANIMATION_VARIANTS.slideInRight}
              className="lg:col-span-5 space-y-8"
            >
              {/* Enhanced Profile Image */}
              <div className="relative mx-auto w-fit">
                {/* Animated background layers */}
                <motion.div 
                  className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-3xl blur-2xl"
                  animate={animationProps.glowPulse}
                />
                <motion.div 
                  className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-3xl blur-xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0],
                    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                
                {/* Profile container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl p-[2px]">
                    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-slate-900/80 backdrop-blur-sm border border-slate-700/50">
                      <Image
                        src="/ayoub.webp"
                        alt="Ayoub - Senior Frontend Developer"
                        fill
                        className="object-cover filter brightness-110 contrast-105 hover:scale-105 transition-transform duration-700"
                        quality={90}
                        priority
                      />
                      
                      {/* Floating icons */}
                      {animationProps.showFloatingElements && (
                        <>
                          <motion.div
                            className="absolute top-4 right-4 p-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-2xl"
                            animate={animationProps.rotating}
                          >
                            <Terminal className="w-6 h-6 text-cyan-400" />
                          </motion.div>
                          <motion.div
                            className="absolute bottom-4 left-4 p-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-2xl"
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

              {/* Enhanced Tech Stack */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">Tech Stack & Expertise</h3>
                  <p className="text-sm text-slate-400">Technologies I use to build amazing products</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {TECH_STACK.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                      className="relative group"
                      onHoverStart={() => setState(prev => ({ ...prev, activeStack: tech.name }))}
                      onHoverEnd={() => setState(prev => ({ ...prev, activeStack: null }))}
                    >
                      <div
                        className={`flex items-center gap-3 p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/40 hover:border-${tech.color}-400/50 rounded-xl transition-all duration-300 cursor-pointer group-hover:bg-slate-800/70 group-hover:scale-105`}
                      >
                        <div className="flex-shrink-0">{tech.icon}</div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-white truncate">{tech.name}</span>
                            <span
                              className={`text-xs px-2 py-0.5 bg-${tech.color}-500/20 text-${tech.color}-300 rounded-full font-medium`}
                            >
                              {tech.expertise}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{tech.years}</p>
                        </div>
                      </div>

                      <AnimatePresence>
                        {state.activeStack === tech.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full mt-2 left-0 right-0 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-lg p-3 shadow-2xl z-20"
                          >
                            <div className="text-xs text-cyan-400 font-semibold mb-1">
                              {tech.expertise} Level • {tech.years}
                            </div>
                            <div className="text-xs text-slate-300 leading-relaxed">{tech.desc}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}