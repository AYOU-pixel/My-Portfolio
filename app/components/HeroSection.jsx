"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Clock,
  Github,
  ExternalLink,
  Download,
  Users,
  ArrowRight,
  Linkedin
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress } from "react-icons/si";

// --- CONFIGURATION & DATA CONSTANTS ---
// KEY IMPROVEMENT: Centralized configuration for easier updates.
const PORTFOLIO_CONFIG = {
  name: "Ayoub",
  resumeUrl: "/resume-ayoub-frontend-developer.pdf",
  socials: {
    github: "https://github.com/AYOU-pixel",
    linkedin: "https://www.linkedin.com/in/ayoub-rachd-0b344a322/",
  }
};

const ROLES = [
  "Frontend Developer",
  "React & Next.js Expert",
  "UI/UX Enthusiast",
  "Creative Web Developer",
];

const TECH_STACK = [
  { name: "React", icon: <FaReact size={20} />, color: "text-sky-400" },
  { name: "Next.js", icon: <SiNextdotjs size={20} />, color: "text-white" },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={20} />, color: "text-teal-400" },
  { name: "Node.js", icon: <FaNodeJs size={20} />, color: "text-green-400" },
  { name: "MongoDB", icon: <SiMongodb size={20} />, color: "text-green-500" },
  { name: "Express", icon: <SiExpress size={20} />, color: "text-gray-400" },
];

const STATS = [
  { number: "1+", label: "Year of Experience", icon: <Clock className="w-5 h-5 text-sky-400" /> },
  { number: "10+", label: "Projects Shipped", icon: <Briefcase className="w-5 h-5 text-sky-400" /> },
  { number: "500+", label: "GitHub Commits", icon: <Github className="w-5 h-5 text-sky-400" /> },
  { number: "3+", label: "Happy Clients", icon: <Users className="w-5 h-5 text-sky-400" /> },
];

// --- ANIMATION VARIANTS ---
const FADE_IN_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeInOut" },
};

// --- MODULAR SUB-COMPONENTS ---

const RoleSwitcher = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-10 sm:h-12 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h2
          key={ROLES[currentRoleIndex]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 text-xl sm:text-2xl font-bold text-slate-200"
        >
          {ROLES[currentRoleIndex]}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};

// KEY IMPROVEMENT: Stats are now rendered using this self-animating component.
const StatCard = ({ stat, index, reduceMotion }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.5,
      delay: reduceMotion ? 0 : index * 0.1,
      ease: "easeOut"
    }}
    className="flex items-center gap-4 p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg"
  >
    {stat.icon}
    <div>
      <p className="text-xl sm:text-2xl font-bold text-white">{stat.number}</p>
      <p className="text-xs sm:text-sm text-slate-400">{stat.label}</p>
    </div>
  </motion.div>
);

const TechPill = ({ skill, index, reduceMotion }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.5,
      delay: reduceMotion ? 0 : index * 0.1,
      ease: "easeOut"
    }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl hover:border-sky-500/50 transition-all duration-300"
  >
    <span className={skill.color}>{skill.icon}</span>
    <span className="text-sm font-medium text-slate-300">{skill.name}</span>
  </motion.div>
);

// --- MAIN HERO COMPONENT ---
export default function HeroSection() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // No need for isMounted state, Next.js handles this well.
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleScrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  
  // KEY IMPROVEMENT: Simplified animation helper for cleaner JSX.
  const animationProps = (delay = 0) => ({
    ...FADE_IN_UP,
    transition: { ...FADE_IN_UP.transition, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white overflow-hidden"
      aria-label={`${PORTFOLIO_CONFIG.name} - Frontend Developer Portfolio Hero`}
    >
      {/* Background Styling */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/50"></div>
        <div
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-24 sm:pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div {...animationProps(0)}>
              <div className="inline-flex items-center gap-3 mb-4 py-1 px-3 bg-green-500/10 border border-green-500/30 rounded-full">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-sm text-green-300 font-medium">Available for Projects</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tighter">
                Hi, I'm {PORTFOLIO_CONFIG.name} — <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
                  Creative Frontend Developer
                </span>
              </h1>

              <div className="mt-4">
                <RoleSwitcher />
              </div>

              <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg text-slate-300 leading-relaxed">
                I build fast, responsive, and beautiful web applications that provide exceptional user experiences. Turning complex problems into elegant, modern solutions is my passion.
              </p>
            </motion.div>

            <motion.div {...animationProps(0.2)} className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
              <button
                onClick={() => handleScrollTo('projects')}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105"
              >
                <Briefcase className="w-5 h-5" />
                View My Work
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="/front-end-developer-resume-ayoub-pdf.pdf"
                download="front-end-developer-resume-ayoub-pdf.pdf"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800/70 border border-slate-700 text-slate-300 font-medium rounded-lg hover:bg-slate-700/80 hover:text-white transition-colors duration-300"
              >
                <Download className="w-5 h-5" />
                Download Resume
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Image & Socials */}
          <motion.div {...animationProps(0.1)} className="lg:col-span-5 mt-16 lg:mt-0">
            <div className="relative mx-auto w-fit">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 group"
              >
                <div className="absolute -inset-2.5 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full opacity-30 blur-xl transition-all duration-1000 group-hover:opacity-50 group-hover:blur-2xl animate-pulse group-hover:animate-none"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-700/50 shadow-2xl">
                  <Image
                    src="/ayoub.webp"
                    alt={`${PORTFOLIO_CONFIG.name} - Frontend Developer`}
                    fill
                    sizes="(max-width: 768px) 16rem, 20rem"
                    className="object-cover scale-105"
                    quality={95}
                    priority
                  />
                </div>
              </motion.div>
              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.8, duration: 0.5 }}
                className="mt-6 flex justify-center gap-4"
              >
                <a href={PORTFOLIO_CONFIG.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="p-3 bg-slate-800/70 border border-slate-700/50 rounded-full hover:bg-sky-500/10 hover:border-sky-500/50 transition-all duration-300">
                  <Github className="w-5 h-5 text-slate-300" />
                </a>
                <a href={PORTFOLIO_CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="p-3 bg-slate-800/70 border border-slate-700/50 rounded-full hover:bg-sky-500/10 hover:border-sky-500/50 transition-all duration-300">
                  <Linkedin className="w-5 h-5 text-slate-300" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* --- KEY IMPROVEMENT: Career Snapshot Section --- */}
        {/* This section now logically flows from the intro and effectively uses the STATS constant */}
        <motion.div {...animationProps(0.4)} className="mt-24 sm:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-16 items-start">
            
            {/* Left Column: Stats & Narrative */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-center lg:text-left text-white">
                Career Snapshot
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((stat, index) => (
                  <StatCard key={stat.label} stat={stat} index={index} reduceMotion={reduceMotion} />
                ))}
              </div>
               <p className="text-slate-300 leading-relaxed text-center lg:text-left pt-4">
                I architect digital experiences, not just websites. As a React and Next.js specialist, I focus on the details that create an unforgettable user journey. In just over a year, I've transformed complex problems into elegant, high-performance front-end interfaces, shipping over 10 projects and bringing ideas to life with precision and passion.
              </p>
            </div>

            {/* Right Column: Tech Stack */}
            <div className="space-y-8">
                <h3 className="text-2xl font-bold text-center lg:text-left text-white">Core Tech Stack</h3>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {TECH_STACK.map((skill, index) => (
                    <TechPill
                      key={skill.name}
                      skill={skill}
                      index={index}
                      reduceMotion={reduceMotion}
                    />
                  ))}
                </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}