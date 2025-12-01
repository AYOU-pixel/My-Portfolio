// HeroSection.jsx - Enhanced Professional Design
"use client";
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
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiPrisma } from "react-icons/si";
import { clsx } from "clsx";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";

const cn = clsx;

// --- CONFIGURATION & DATA CONSTANTS ---
const PORTFOLIO_CONFIG = {
  name: "AYOUB",
  resumeUrl: "/RACHIDI-AYOUB-FlowCV-Resume-20251030.pdf",
  socials: {
    github: "https://github.com/AYOU-pixel",
    linkedin: "https://www.linkedin.com/in/ayoub-rchidi-0b344a322/",
  },
};

const ROLES = [
  "Full-Stack Developer",
  "React & Next.js Specialist",
  "UI/UX Enthusiast",
  "Creative Web Problem-Solver",
];

const HERO_DESCRIPTION =
  "A self-taught Full-Stack Developer crafting modern web applications with React, Next.js, Tailwind CSS, Node.js, Express, MongoDB & Prisma. I turn ideas into practical, high-quality solutions while constantly exploring new tech.";

const TECH_STACK = [
  { name: "React", icon: <FaReact size={18} />, color: "text-cyan-400" },
  { name: "Next.js", icon: <SiNextdotjs size={18} />, color: "text-white" },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={18} />, color: "text-cyan-400" },
  { name: "Node.js", icon: <FaNodeJs size={18} />, color: "text-emerald-400" },
  { name: "MongoDB", icon: <SiMongodb size={18} />, color: "text-emerald-400" },
  { name: "Express", icon: <SiExpress size={18} />, color: "text-gray-300" },
  { name: "Prisma", icon: <SiPrisma size={18} />, color: "text-indigo-400" },
];

const STATS = [
  { number: "1+", label: "Years of Experience", icon: <Clock className="w-4 h-4 text-cyan-400" /> },
  { number: "6+", label: "Projects Shipped", icon: <Briefcase className="w-4 h-4 text-cyan-400" /> },
  { number: "Open Source", label: "Contributor", icon: <Github className="w-4 h-4 text-cyan-400" /> },
  { number: "3+", label: "Happy Clients", icon: <Users className="w-4 h-4 text-cyan-400" /> },
];

const TESTIMONIALS = [
  {
    quote: "AYOUB built a responsive and intuitive frontend that elevated our user experience significantly.",
    author: "Alex Johnson",
    role: "CEO, InnovateTech",
    initials: "AJ",
    avatarColor: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white",
  },
  {
    quote: "His attention to detail and expertise in Next.js made our website faster and more engaging.",
    author: "Sara Lee",
    role: "Product Lead, DesignHub",
    initials: "SL",
    avatarColor: "bg-gradient-to-br from-purple-500 to-indigo-600 text-white",
  },
];

// --- ANIMATION VARIANTS ---
const FADE_IN_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
};

// --- MODULAR SUB-COMPONENTS ---
const RoleSwitcher = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % ROLES.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h2
          key={ROLES[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 text-lg font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          {ROLES[index]}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ stat, index, reduceMotion }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.1, ease: "easeOut" }}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.98 }}
  >
    <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-xl backdrop-blur-md shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="p-2 bg-cyan-500/10 rounded-lg">
          {stat.icon}
        </div>
        <div>
          <p className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{stat.number}</p>
          <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const BackgroundAurora = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true">
    <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-[aurora_20s_infinite_alternate] top-1/4 left-1/4"></div>
    <div className="absolute w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-3xl animate-[aurora_25s_infinite_alternate_reverse] bottom-1/4 right-1/4"></div>
    <div className="absolute w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-3xl animate-[aurora_30s_infinite_alternate] top-1/2 right-1/3"></div>
    <style jsx>{`
      @keyframes aurora {
        0% { transform: translate(0, 0); }
        50% { transform: translate(80px, 60px); }
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

    const handler = (e) => {
      setReduceMotion(e.matches);
    };
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
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden"
      aria-label={`${PORTFOLIO_CONFIG.name}'s Portfolio Hero Section`}
    >
      <BackgroundAurora />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)] opacity-20" aria-hidden="true" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-20 sm:pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div {...animationProps(0)}>
              <div className="inline-flex items-center gap-2 mb-6 py-2 px-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm shadow-lg shadow-cyan-500/5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 shadow-lg shadow-cyan-500/50"></span>
                </span>
                <span className="text-sm text-cyan-300 font-semibold tracking-wide">Available for Projects</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-1">
                Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {PORTFOLIO_CONFIG.name}
                </span>
              </h1>

              <div className="mt-4 mb-6"><RoleSwitcher /></div>

              <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-slate-300 leading-relaxed text-lg">
                {HERO_DESCRIPTION}
              </p>
            </motion.div>

            <motion.div {...animationProps(0.2)} className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
              <Button
                onClick={() => handleScrollTo('projects')}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
              >
                <Briefcase className="w-5 h-5" />
                View My Work
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800/50 border-2 border-slate-700/50 text-slate-200 font-semibold rounded-xl hover:bg-slate-700/50 hover:border-cyan-500/50 hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 backdrop-blur-sm hover:scale-105"
                asChild
              >
                <a
                  href={PORTFOLIO_CONFIG.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Image & Socials */}
          <motion.div {...animationProps(0.1)} className="lg:col-span-5 mt-16 lg:mt-0">
            <div className="relative mx-auto w-fit">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-64 h-64 sm:w-72 sm:h-72 group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full opacity-30 blur-2xl transition-all duration-1000 group-hover:opacity-50 group-hover:blur-3xl animate-pulse"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-700/50 shadow-2xl shadow-cyan-500/20 ring-4 ring-cyan-500/10">
                  <Image
                    src="/ayoub.png"
                    alt="Headshot of AYOUB, React & Next.js Full-Stack Developer"
                    fill
                    sizes="(max-width: 768px) 16rem, 18rem"
                    className="object-cover scale-105"
                    quality={95}
                    priority
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.8, duration: 0.5 }}
                className="mt-8 flex justify-center gap-4"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={PORTFOLIO_CONFIG.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                        className="group w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center border border-slate-700/50 cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-slate-700 hover:to-slate-800 hover:scale-110 hover:border-cyan-500/50 shadow-lg hover:shadow-cyan-500/20"
                      >
                        <Github className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-800 border-slate-700">
                      <p>GitHub Profile</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={PORTFOLIO_CONFIG.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile"
                        className="group w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center border border-slate-700/50 cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-slate-700 hover:to-slate-800 hover:scale-110 hover:border-cyan-500/50 shadow-lg hover:shadow-cyan-500/20"
                      >
                        <Linkedin className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-800 border-slate-700">
                      <p>LinkedIn Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div {...animationProps(0.4)} className="mt-24 sm:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 gap-x-8 items-start">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center lg:text-left bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Career Snapshot</h3>
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((stat, index) => (
                  <StatCard key={stat.label} stat={stat} index={index} reduceMotion={reduceMotion} />
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed text-center lg:text-left">
                As a self-taught full-stack specialist, I translate complex challenges into high-performance applications, bringing ideas to life with precision and passion.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center lg:text-left bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Core Tech Stack</h3>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {TECH_STACK.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.05, ease: "easeOut" }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-slate-700/40 rounded-xl hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
                  >
                    <span className={skill.color}>{skill.icon}</span>
                    <span className="text-sm font-semibold text-slate-200">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center lg:text-left bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">What Clients Say</h3>
              <div className="grid gap-4">
                {TESTIMONIALS.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.1, ease: "easeOut" }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/40 rounded-xl backdrop-blur-md shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
                      <CardContent className="p-5">
                        <p className="text-sm text-slate-300 italic mb-4 leading-relaxed">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${testimonial.avatarColor} font-bold text-sm shadow-lg`}>
                            {testimonial.initials}
                          </div>
                          <div>
                            <div className="font-semibold text-white text-sm">{testimonial.author}</div>
                            <div className="text-slate-400 text-xs">{testimonial.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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