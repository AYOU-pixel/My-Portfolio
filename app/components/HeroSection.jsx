// HeroSection.jsx - Unified Design
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
    linkedin: "https:www.linkedin.com/in/ayoub-rchidi-0b344a322",
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
  { name: "React", icon: <FaReact size={18} />, color: "text-sky-400" },
  { name: "Next.js", icon: <SiNextdotjs size={18} />, color: "text-sky-400" },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={18} />, color: "text-sky-400" },
  { name: "Node.js", icon: <FaNodeJs size={18} />, color: "text-sky-400" },
  { name: "MongoDB", icon: <SiMongodb size={18} />, color: "text-sky-400" },
  { name: "Express", icon: <SiExpress size={18} />, color: "text-sky-400" },
  { name: "Prisma", icon: <SiPrisma size={18} />, color: "text-sky-400" },
];

const STATS = [
  { number: "1+", label: "Years of Experience", icon: <Clock className="w-4 h-4 text-sky-400" /> },
  { number: "6+", label: "Projects Shipped", icon: <Briefcase className="w-4 h-4 text-sky-400" /> },
  { number: "Open Source", label: "Contributor", icon: <Github className="w-4 h-4 text-sky-400" /> },
  { number: "3+", label: "Happy Clients", icon: <Users className="w-4 h-4 text-sky-400" /> },
];

const TESTIMONIALS = [
  {
    quote: "AYOUB built a responsive and intuitive frontend that elevated our user experience significantly.",
    author: "Alex Johnson",
    role: "CEO, InnovateTech",
    initials: "AJ",
    avatarColor: "bg-slate-800 text-sky-300 border border-slate-700",
  },
  {
    quote: "His attention to detail and expertise in Next.js made our website faster and more engaging.",
    author: "Sara Lee",
    role: "Product Lead, DesignHub",
    initials: "SL",
    avatarColor: "bg-slate-800 text-sky-300 border border-slate-700",
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
          className="absolute inset-0 text-lg font-semibold text-sky-400"
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
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Card className="bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm">
      <CardContent className="flex items-center gap-3 p-3">
        {stat.icon}
        <div>
          <p className="text-lg font-semibold text-white">{stat.number}</p>
          <p className="text-xs text-slate-400">{stat.label}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const BackgroundAurora = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true">
    <div className="absolute w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-3xl animate-[aurora_20s_infinite_alternate] top-1/4 left-1/4"></div>
    <div className="absolute w-[300px] h-[300px] bg-sky-400/5 rounded-full blur-3xl animate-[aurora_25s_infinite_alternate_reverse] bottom-1/4 right-1/4"></div>
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
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden"
      aria-label={`${PORTFOLIO_CONFIG.name}'s Portfolio Hero Section`}
    >
      <BackgroundAurora />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)] opacity-10" aria-hidden="true" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-20 sm:pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div {...animationProps(0)}>
              <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 bg-slate-800/50 border border-slate-700 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                <span className="text-sm text-sky-300 font-medium">Available for Projects</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Hi, I'm <span className="text-sky-400">{PORTFOLIO_CONFIG.name}</span>
              </h1>

              <div className="mt-3 mb-4"><RoleSwitcher /></div>

              <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-slate-300 leading-relaxed">
                {HERO_DESCRIPTION}
              </p>
            </motion.div>

            <motion.div {...animationProps(0.2)} className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              <Button
                onClick={() => handleScrollTo('projects')}
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-sky-500 text-white font-medium rounded-lg hover:bg-sky-600 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <Briefcase className="w-4 h-4" />
                View My Work
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800/50 border border-slate-700 text-slate-300 font-medium rounded-lg hover:bg-slate-700/50 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
                asChild
              >
                <a
                  href={PORTFOLIO_CONFIG.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Image & Socials */}
          <motion.div {...animationProps(0.1)} className="lg:col-span-5 mt-12 lg:mt-0">
            <div className="relative mx-auto w-fit">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-56 h-56 sm:w-64 sm:h-64 group"
              >
                <div className="absolute -inset-2 bg-sky-500/20 rounded-full opacity-30 blur-lg transition-all duration-1000 group-hover:opacity-40 group-hover:blur-xl"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border border-slate-700/50 shadow-xl">
                  <Image
                    src="/ayoub.png"
                    alt="Headshot of AYOUB, React & Next.js Full-Stack Developer"
                    fill
                    sizes="(max-width: 768px) 14rem, 16rem"
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
                className="mt-6 flex justify-center gap-3"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={PORTFOLIO_CONFIG.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                        className="group w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 cursor-pointer transition-all duration-300 hover:bg-slate-700 hover:scale-110"
                      >
                        <Github className="h-5 w-5 text-slate-300 group-hover:text-white" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
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
                        className="group w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 cursor-pointer transition-all duration-300 hover:bg-slate-700 hover:scale-110"
                      >
                        <Linkedin className="h-5 w-5 text-slate-300 group-hover:text-white" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>LinkedIn Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div {...animationProps(0.4)} className="mt-20 sm:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-8 gap-x-6 items-start">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-center lg:text-left text-white">Career Snapshot</h3>
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((stat, index) => (
                  <StatCard key={stat.label} stat={stat} index={index} reduceMotion={reduceMotion} />
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed text-center lg:text-left text-sm">
                As a self-taught full-stack specialist, I translate complex challenges into high-performance applications, bringing ideas to life with precision and passion.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-center lg:text-left text-white">Core Tech Stack</h3>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {TECH_STACK.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.05, ease: "easeOut" }}
                    whileHover={{ scale: 1.03, y: -1 }}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-lg hover:border-sky-500/30 transition-all duration-300"
                  >
                    <span className={skill.color}>{skill.icon}</span>
                    <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-center lg:text-left text-white">What Clients Say</h3>
              <div className="grid gap-3">
                {TESTIMONIALS.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.1, ease: "easeOut" }}
                  >
                    <Card className="bg-slate-800/50 border border-slate-700/30 rounded-lg">
                      <CardContent className="p-3">
                        <p className="text-sm text-slate-300 italic mb-3">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${testimonial.avatarColor} font-medium text-sm`}>
                            {testimonial.initials}
                          </div>
                          <div>
                            <span className="font-medium text-white text-sm">{testimonial.author}</span>
                            <span className="text-slate-400 text-xs"> - {testimonial.role}</span>
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