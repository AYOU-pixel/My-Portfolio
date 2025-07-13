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
  Linkedin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress } from "react-icons/si";
import { clsx } from "clsx";

const cn = clsx;

// --- CONFIGURATION & DATA CONSTANTS ---
const PORTFOLIO_CONFIG = {
  name: "Ayoub",
  resumeUrl: "/front-end-developer-resume-ayoub-pdf.pdf", // Ensure this path is correct
  socials: {
    github: "https://github.com/AYOU-pixel",
    linkedin: "https://www.linkedin.com/in/ayoub-rachd-0b344a322/",
  },
};

// REFINED: Changed "Expert" to "Specialist" for a more professional tone.
const ROLES = [
  "Frontend Developer",
  "React & Next.js Specialist",
  "UI/UX Enthusiast",
  "Creative Web Problem-Solver",
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
  animate: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeInOut" },
};

// --- MODULAR SUB-COMPONENTS ---

const RoleSwitcher = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % ROLES.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-10 sm:h-12 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h2
          key={ROLES[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 text-xl sm:text-2xl font-bold text-slate-200"
        >
          {ROLES[index]}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};

// IMPROVEMENT: Added subtle hover/tap animations for more interactivity.
const StatCard = ({ stat, index, reduceMotion }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.1, ease: "easeOut" }}
    whileHover={{ scale: 1.05, backgroundColor: "rgb(30 41 59 / 0.8)" }} // slate-800/80
    whileTap={{ scale: 0.98 }}
    className="flex items-center gap-4 p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg transition-colors"
  >
    {stat.icon}
    <div>
      <p className="text-xl sm:text-2xl font-bold text-white">{stat.number}</p>
      <p className="text-xs sm:text-sm text-slate-400">{stat.label}</p>
    </div>
  </motion.div>
);

// KEY IMPROVEMENT: New component for a dynamic, modern background effect.
const BackgroundAurora = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true">
    <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl animate-[aurora_20s_infinite_alternate] top-1/4 left-1/4"></div>
    <div className="absolute w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-3xl animate-[aurora_25s_infinite_alternate_reverse] bottom-1/4 right-1/4"></div>
    <style jsx>{`
      @keyframes aurora {
        0% { transform: translate(0, 0); }
        50% { transform: translate(100px, 80px); }
        100% { transform: translate(0, 0); }
      }
    `}</style>
  </div>
);

// --- MAIN HERO COMPONENT ---
export default function HeroSection() {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleScrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const animationProps = (delay = 0) => ({
    ...FADE_IN_UP,
    transition: { ...FADE_IN_UP.transition, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white overflow-hidden"
      aria-label={`${PORTFOLIO_CONFIG.name}'s Portfolio Hero Section`}
    >
      <BackgroundAurora />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)] opacity-40" aria-hidden="true" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-24 sm:pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div variants={animationProps(0)} initial="initial" whileInView="animate" viewport={{ once: true }}>
              {/* REFINED: Badge has a more subtle, premium glow */}
              <div className="inline-flex items-center gap-3 mb-4 py-1.5 px-4 bg-green-500/10 border border-green-500/30 rounded-full shadow-md shadow-green-500/10">
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

              <div className="mt-4"><RoleSwitcher /></div>

              {/* REFINED: Copywriting is more active and benefit-focused. */}
              <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg text-slate-300 leading-relaxed">
                I craft fast, responsive, and beautiful web applications, transforming complex ideas into elegant digital experiences that users love.
              </p>
            </motion.div>

            <motion.div variants={animationProps(0.2)} initial="initial" whileInView="animate" viewport={{ once: true }} className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
              {/* IMPROVEMENT: Primary CTA has stronger visual feedback */}
              <button
                onClick={() => handleScrollTo('projects')}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-sky-400"
              >
                <Briefcase className="w-5 h-5 transition-transform group-hover:rotate-[-5deg]" />
                View My Work
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
              {/* ACCESSIBILITY: Added target blank and improved focus states */}
              <a
                href={PORTFOLIO_CONFIG.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800/70 border border-slate-700 text-slate-300 font-medium rounded-lg hover:bg-slate-700/80 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-slate-500"
              >
                <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                Download Resume
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Image & Socials */}
          <motion.div variants={animationProps(0.1)} initial="initial" whileInView="animate" viewport={{ once: true }} className="lg:col-span-5 mt-16 lg:mt-0">
            <div className="relative mx-auto w-fit">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 group"
              >
                {/* IMPROVEMENT: Added a slow spin for a more dynamic feel */}
                <div className="absolute -inset-2.5 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full opacity-30 blur-xl transition-all duration-1000 group-hover:opacity-50 group-hover:blur-2xl animate-[spin_20s_linear_infinite]"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-700/50 shadow-2xl">
                  <Image
                    src="/ayoub.webp"
                    alt="Headshot of Ayoub, the portfolio owner"
                    fill
                    sizes="(max-width: 768px) 16rem, 20rem"
                    className="object-cover scale-105"
                    quality={95}
                    priority
                  />
                </div>
              </motion.div>
              
              {/* IMPROVEMENT: Social links have hover tooltips and better focus states */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.8, duration: 0.5 }}
                className="mt-6 flex justify-center gap-4"
              >
                {/* Squircle SVG clip-path definition */}
                <svg width="0" height="0" style={{ position: "absolute" }}>
                  <defs>
                    <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
                      <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5"></path>
                    </clipPath>
                  </defs>
                </svg>

                {/* GitHub */}
                <a
                  href={PORTFOLIO_CONFIG.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="group relative"
                >
                  <div
                    style={{ clipPath: "url(#squircleClip)" }}
                    className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg border border-gray-600/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {/* GitHub SVG */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  className="group relative"
                >
                  <div
                    style={{ clipPath: "url(#squircleClip)" }}
                    className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg border border-red-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {/* YouTube SVG */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={PORTFOLIO_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="group relative"
                >
                  <div
                    style={{ clipPath: "url(#squircleClip)" }}
                    className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg border border-blue-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {/* LinkedIn SVG */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                </a>

                {/* Discord */}
                <a
                  href="https://discord.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord Server"
                  className="group relative"
                >
                  <div
                    style={{ clipPath: "url(#squircleClip)" }}
                    className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg border border-indigo-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {/* Discord SVG */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                    </svg>
                  </div>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={animationProps(0.4)} initial="initial" whileInView="animate" viewport={{ once: true }} className="mt-24 sm:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-16 items-start">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-center lg:text-left text-white">Career Snapshot</h3>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((stat, index) => (
                  <StatCard key={stat.label} stat={stat} index={index} reduceMotion={reduceMotion} />
                ))}
              </div>
              {/* REFINED: Sharper, more impactful copywriting */}
              <p className="text-slate-300 leading-relaxed text-center lg:text-left pt-4">
                I don't just build websites; I architect digital experiences. As a front-end specialist, I translate complex challenges into high-performance interfaces, bringing ideas to life with precision and passion.
              </p>
            </div>
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-center lg:text-left text-white">Core Tech Stack</h3>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {TECH_STACK.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.05, ease: "easeOut" }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl hover:border-sky-500/50 transition-all duration-300"
                  >
                    <span className={skill.color}>{skill.icon}</span>
                    <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}