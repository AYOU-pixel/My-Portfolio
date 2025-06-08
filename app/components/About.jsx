"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Briefcase,
  Download,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress } from "react-icons/si";

// Shared animation variants from HeroSection and ProjectsSection
const ANIMATION_VARIANTS = {
  floating: {
    y: [0, -12, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
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
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  skillFade: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const skills = [
  { name: "React", icon: <FaReact className="w-5 h-5 text-sky-400" />, color: "sky" },
  { name: "Next.js", icon: <SiNextdotjs className="w-5 h-5 text-indigo-400" />, color: "indigo" },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5 text-teal-400" />, color: "teal" },
  { name: "Node.js", icon: <FaNodeJs className="w-5 h-5 text-green-400" />, color: "green" },
  { name: "MongoDB", icon: <SiMongodb className="w-5 h-5 text-green-500" />, color: "green" },
  { name: "Express", icon: <SiExpress className="w-5 h-5 text-gray-400" />, color: "gray" },
];

const values = [
  "Writing scalable, maintainable codebases",
  "Designing UI that feels native and intuitive",
  "Optimizing for real performance, not just metrics",
  "Understanding the problem before writing code",
];

export default function AboutSection() {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const [state, setState] = useState({
    isMounted: false,
    isMobile: false,
    reduceMotionPref: false,
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

  const animationProps = useMemo(() => {
    const shouldAnimate = !state.isMobile && !state.reduceMotionPref;
    return {
      floating: shouldAnimate ? ANIMATION_VARIANTS.floating : {},
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
      id="about"
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden"
      role="region"
      aria-label="About Me Section"
    >
      {animationProps.showFloatingElements && (
        <>
          <motion.div
            className="absolute inset-0 bg-grid-slate-700/[0.05] bg-[length:60px_60px]"
            style={{ x, y }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-sky-500/30 to-indigo-600/30 rounded-full blur-3xl"
            animate={animationProps.backgroundFloat}
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-500/30 to-blue-600/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
              rotate: [0, -180, -360],
              transition: { duration: 25, repeat: Infinity, ease: "linear" },
            }}
            aria-hidden="true"
          />
        </>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div {...ANIMATION_VARIANTS.slideInLeft} className="text-center mb-16">
          <motion.h2
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 font-poppins"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
              Me
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base text-slate-300 leading-relaxed max-w-3xl mx-auto font-poppins"
          >
            A glimpse into my journey as a self-taught frontend developer, passionate about building scalable, user-focused web applications.
          </motion.p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.1 },
            },
          }}
        >
          {/* Left Column - Portrait */}
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            variants={ANIMATION_VARIANTS.fadeInUp}
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-sky-500/30 to-indigo-600/30 rounded-full blur-2xl shadow-[0_0_40px_rgba(14,165,233,0.2)]"
              animate={animationProps.glowPulse}
            />
            <div className="relative p-4 md:p-0">
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/ayoub.webp"
                  alt="Ayoub - Frontend Developer"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  quality={80}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xg"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm font-medium text-slate-300 font-poppins">
                      Available for projects
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          {/* Right Column - Content */}
          <motion.div
            className="space-y-6 md:space-y-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.3 },
              },
            }}
          >
            {/* Heading */}
            <motion.div variants={ANIMATION_VARIANTS.fadeInUp}>
              <div className="flex items-center mb-2">
                <div className="h-1 w-8 md:w-12 rounded bg-sky-500 mr-4" />
                <h2 className="text-xs md:text-sm uppercase tracking-wider font-semibold text-slate-400">
                  About Me
                </h2>
                <div className="h-1 w-8 md:w-12 rounded bg-sky-500 ml-4 hidden md:block" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white font-poppins">
                Ayoub
              </h1>
              <p className="text-lg mt-2 text-sky-400 font-medium font-poppins">
                UX-Focused Frontend Developer
              </p>
            </motion.div>
            {/* Introduction */}
            <motion.p
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="text-base md:text-lg text-slate-300 leading-relaxed font-poppins"
            >
              I’m Ayoub, a self-taught frontend developer specializing in React, Next.js, and Tailwind CSS. Since building my first website at 19, I’ve focused on creating fast, accessible, and user-centered web applications with clean architecture and reusable components.
            </motion.p>
            {/* Skills */}
            <motion.div variants={ANIMATION_VARIANTS.fadeInUp}>
              <h3 className="text-lg font-semibold text-white mb-3 font-poppins">
                Tech Stack
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    custom={index}
                    variants={ANIMATION_VARIANTS.skillFade}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl hover:border-sky-500/50 transition-all duration-300 font-poppins"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className={`text-lg ${skill.color}`}>{skill.icon}</span>
                    <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Values */}
            <motion.div variants={ANIMATION_VARIANTS.fadeInUp}>
              <h3 className="text-lg font-semibold text-white mb-3 font-poppins">
                What I Care About
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {values.map((value, index) => (
                  <motion.div
                    key={value}
                    custom={index}
                    variants={ANIMATION_VARIANTS.skillFade}
                    className="flex items-center justify-center text-center p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl hover:border-sky-500/50 transition-all duration-300 font-poppins"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className="text-xs md:text-sm font-medium text-slate-300">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* CTA Button */}
            <motion.div variants={ANIMATION_VARIANTS.fadeInUp} className="pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-sky-500 hover:bg-sky-600 rounded-xl text-white font-semibold text-sm shadow-lg shadow-sky-500/25 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all duration-300 font-poppins"
                >
                  <Briefcase className="w-4 h-4 stroke-2" />
                  <span>Let's work together</span>
                  <ArrowRight className="w-4 h-4 stroke-2 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.a>
                <motion.a
                  href="/front-end-developer-resume-ayoub-pdf.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-transparent border border-slate-600 hover:border-sky-500 rounded-xl text-slate-300 hover:text-sky-400 font-medium text-sm transition-all duration-300 font-poppins"
                >
                  <Download className="w-4 h-4 stroke-2" />
                  <span>Download Resume</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}