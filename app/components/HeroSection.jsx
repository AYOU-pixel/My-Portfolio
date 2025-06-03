"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Code,
  Briefcase,
  Send,
  Terminal,
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
  Zap,
  Sun,
  Moon,
  Linkedin, // Added this line
} from "lucide-react";
import { motion, useTransform, useScroll, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useTheme } from "next-themes";

// Static data
const ROLES = [
  "Senior Frontend Engineer",
  "React Specialist",
  "Next.js Expert",
  "UI/UX Engineer",
  "Performance Architect",
];

const TECH_STACK = [
  {
    name: "React",
    desc: "Built a dashboard serving 50K+ users with React and Redux",
    icon: <Code className="w-4 h-4 text-sky-400" />,
    years: "4+ years",
    expertise: "Expert",
    color: "sky",
  },
  {
    name: "Next.js",
    desc: "Optimized an e-commerce platform, reducing load times by 40%",
    icon: <Code className="w-4 h-4 text-indigo-400" />,
    years: "3+ years",
    expertise: "Advanced",
    color: "indigo",
  },
  {
    name: "TypeScript",
    desc: "Developed type-safe APIs for a SaaS application",
    icon: <Code className="w-4 h-4 text-blue-400" />,
    years: "3+ years",
    expertise: "Advanced",
    color: "blue",
  },
  {
    name: "Tailwind CSS",
    desc: "Designed responsive UI for a fintech app",
    icon: <Code className="w-4 h-4 text-teal-400" />,
    years: "3+ years",
    expertise: "Expert",
    color: "teal",
  },
  {
    name: "Node.js",
    desc: "Built RESTful APIs for a real-time analytics platform",
    icon: <Terminal className="w-4 h-4 text-green-400" />,
    years: "2+ years",
    expertise: "Proficient",
    color: "green",
  },
  {
    name: "AWS",
    desc: "Deployed serverless microservices on AWS Lambda",
    icon: <Sparkles className="w-4 h-4 text-orange-400" />,
    years: "2+ years",
    expertise: "Proficient",
    color: "orange",
  },
];

const STATS = [
  { number: "4+", label: "Years Experience", icon: <Clock className="w-5 h-5" /> },
  { number: "15+", label: "Projects Completed", icon: <Briefcase className="w-5 h-5" /> },
  { number: "98%", label: "Client Satisfaction", icon: <Star className="w-5 h-5" /> },
  { number: "50K+", label: "Users Impacted", icon: <Users className="w-5 h-5" /> },
];

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
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  backgroundFloat: {
    scale: [1, 1.1, 1],
    opacity: [0.4, 0.6, 0.4],
    rotate: [0, 180, 360],
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -60, y: 20 },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  slideInRight: {
    initial: { opacity: 0, x: 60, y: 20 },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HeroSection() {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const { theme, setTheme } = useTheme();

  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const [state, setState] = useState({
    isMounted: false,
    activeStack: null,
    currentRole: 0,
    isMobile: false,
    reduceMotionPref: false,
    isTyping: true,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth <= 768;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    setState((prev) => ({
      ...prev,
      isMounted: true,
      isMobile,
      reduceMotionPref: mediaQuery.matches,
    }));

    const handler = (e) => setState((prev) => ({ ...prev, reduceMotionPref: e.matches }));
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!state.isMounted) return;

    const interval = setInterval(() => {
      setState((prev) => ({ ...prev, isTyping: false }));
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          currentRole: (prev.currentRole + 1) % ROLES.length,
          isTyping: true,
        }));
      }, 200);
    }, 4000);

    return () => clearInterval(interval);
  }, [state.isMounted]);

  const handleScrollToProjects = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleScrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const animationProps = useMemo(() => {
    const shouldAnimate = !state.isMobile && !state.reduceMotionPref;
    return {
      floating: shouldAnimate ? ANIMATION_VARIANTS.floating : {},
      rotating: shouldAnimate ? ANIMATION_VARIANTS.rotating : {},
      glowPulse: shouldAnimate ? ANIMATION_VARIANTS.glowPulse : {},
      backgroundFloat: shouldAnimate ? ANIMATION_VARIANTS.backgroundFloat : {},
      showFloatingElements: shouldAnimate,
    };
  }, [state.isMobile, state.reduceMotionPref]);

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
      aria-label="Ayoub - Senior Frontend Engineer Portfolio"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-grid-slate-700/[0.05] bg-[length:60px_60px]"
          style={{ x, y }}
          aria-hidden="true"
        />
        {animationProps.showFloatingElements && (
          <>
            <motion.div
              className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-sky-500/30 to-indigo-600/30 rounded-full blur-3xl"
              animate={animationProps.backgroundFloat}
            />
            <motion.div
              className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-500/30 to-blue-600/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
                rotate: [0, -180, -360],
                transition: { duration: 25, repeat: Infinity, ease: "linear" },
              }}
            />
          </>
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div {...ANIMATION_VARIANTS.slideInLeft} className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white leading-[0.9] tracking-tight font-poppins"
                >
                  <span className="block">Ayoub</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 animate-gradient-x">
                    Senior Frontend Engineer
                  </span>
                </motion.h1>

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
                          className="w-1 h-8 bg-sky-400 rounded"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-4"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  Building Scalable Web Solutions
                </h3>
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                  I build high-performance, scalable web applications that empower businesses to achieve measurable results. With over 4 years of experience in the React ecosystem, I’ve delivered 15+ production-grade projects, including dashboards serving 50K+ monthly users and e-commerce platforms with 40% faster load times.
                </p>
                <p className="text-base text-slate-400 leading-relaxed max-w-xl">
                  Using React, Next.js, and Tailwind CSS, I create intuitive, maintainable, and modern interfaces that align with business goals and user needs.
                </p>
              </motion.div>

              <hr className="border-t border-slate-700/50 my-8" />

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
                    className="group p-4 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl hover:border-sky-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-sky-400 group-hover:scale-110 transition-transform duration-300">
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.button
                  onClick={handleScrollToProjects}
                  className="group relative overflow-hidden flex items-center justify-center gap-3 px-8 py-4 bg-sky-500 hover:bg-sky-600 rounded-xl text-white font-semibold text-lg shadow-2xl shadow-sky-500/25 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Briefcase className="w-5 h-5 stroke-2 z-10" />
                  <span className="z-10">View My Work</span>
                  <ArrowRight className="w-5 h-5 stroke-2 z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>

                <motion.button
                  onClick={handleScrollToContact}
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-semibold text-lg shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5 stroke-2" />
                  <span>Let's Connect</span>
                </motion.button>

                <motion.a
                  href="/front-end-developer-resume-ayoub-pdf.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-6 py-4 bg-transparent border border-slate-600 hover:border-yellow-400 rounded-xl text-slate-300 hover:text-yellow-400 font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5 stroke-2" />
                  <span>Resume</span>
                  <ExternalLink className="w-4 h-4 stroke-2 opacity-60" />
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap items-center gap-6 text-sm text-slate-400 pt-4"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span>Rabat, Morocco</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>GMT+1 • Available Mon-Fri</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Open to remote work</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div {...ANIMATION_VARIANTS.slideInRight} className="lg:col-span-5 space-y-8">
              <div className="relative mx-auto w-fit">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-sky-500/30 to-indigo-600/30 rounded-full blur-2xl shadow-[0_0_40px_rgba(14,165,233,0.2)]"
                  animate={animationProps.glowPulse}
                />
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-indigo-600/20 rounded-full p-[2px] shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900/80 backdrop-blur-sm border border-slate-700/50">
                      <Image
                        src="/ayoub.webp"
                        alt="Ayoub - Senior Frontend Engineer"
                        fill
                        className="object-cover filter brightness-110 contrast-105 hover:scale-105 transition-transform duration-700"
                        quality={90}
                        priority
                      />
                      {animationProps.showFloatingElements && (
                        <>
                          <motion.div
                            className="absolute top-4 right-4 p-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-2xl"
                            animate={animationProps.rotating}
                          >
                            <Terminal className="w-6 h-6 text-sky-400" />
                          </motion.div>
                          <motion.div
                            className="absolute bottom-4 left-4 p-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-2xl"
                            animate={animationProps.floating}
                          >
                            <Sparkles className="w-6 h-6 text-indigo-400" />
                          </motion.div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex justify-center gap-4 mt-4"
              >
                <motion.a
                  href="https://github.com/AYOU-pixel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800/50 border border-slate-700/50 rounded-full hover:bg-sky-500/20 hover:border-sky-500 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <Github className="w-5 h-5 text-slate-300" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/ayoub-rachd-0b344a322/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800/50 border border-slate-700/50 rounded-full hover:bg-indigo-500/20 hover:border-indigo-500 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <Linkedin className="w-5 h-5 text-slate-300" />
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">Technical Expertise</h3>
                  <p className="text-sm text-slate-400">
                    Building modern, scalable web applications
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {TECH_STACK.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                      className="relative group"
                      onHoverStart={() => setState((prev) => ({ ...prev, activeStack: tech.name }))}
                      onHoverEnd={() => setState((prev) => ({ ...prev, activeStack: null }))}
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
                            <div className="text-xs text-sky-400 font-semibold mb-1">
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

      <motion.button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700"
        whileHover={{ scale: 1.1 }}
      >
        {theme === "dark" ? <Sun className="w-5 h-5 text-slate-300" /> : <Moon className="w-5 h-5 text-slate-300" />}
      </motion.button>
    </section>
  );
}