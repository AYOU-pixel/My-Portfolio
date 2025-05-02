"use client";

import Link from "next/link";
import Image from "next/image";
import { Code, Rocket, Send, Terminal, ChevronDown, Sparkles } from "lucide-react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  };

  const rotateAnimation = {
    rotate: [0, 10, -10, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  };

  if (!isMounted) return null;

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900 overflow-hidden border-b border-slate-700/30"
      role="banner"
      aria-label="Hero Section"
    >
      {/* Moving Grid */}
      <motion.div className="absolute inset-0 bg-grid-slate-700/20" style={{ x }} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-900/90" />

      {/* Soft Circles */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 py-24 z-10">
        <div className="flex flex-col items-center gap-10 text-center">

          {/* Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Hey 👋 I'm Ayoub
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto"
            >
              I craft immersive websites with code, creativity, and a touch of magic ✨
            </motion.h2>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-semibold hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Rocket className="w-5 h-5" />
              See My Work
            </motion.a>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#contact"
                scroll={true}
                className="flex items-center gap-2 px-6 py-3 border border-slate-700 bg-slate-800/60 rounded-lg text-cyan-400 font-semibold backdrop-blur-md hover:border-cyan-400 transition-all"
              >
                <Send className="w-5 h-5" />
                Let's Connect
              </Link>
            </motion.div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div 
            className="flex flex-col items-center gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Tech Stack
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {['React', 'Next.js', 'TypeScript', 'Node.js'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="px-3 py-1.5 bg-slate-800/50 backdrop-blur-md text-slate-200 rounded-full text-xs border border-slate-700 hover:border-cyan-400 flex items-center gap-1"
                >
                  <Code className="w-4 h-4 text-cyan-400" />
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Profile Picture */}
          <motion.div 
            className="relative mt-10 group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl p-1 bg-gradient-to-tr from-cyan-400/20 to-indigo-500/20 backdrop-blur-md">
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-700/40 bg-slate-900/80">
                <Image
                  src="/ayoub.webp"
                  alt="Ayoub — Front-End Developer"
                  fill
                  className="object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                  quality={95}
                  priority
                />

                {/* Floating Icons */}
                <motion.div
                  className="absolute -top-3 -right-3 p-2 rounded-full border border-slate-700/50 bg-slate-900/70"
                  animate={rotateAnimation}
                >
                  <Terminal className="w-5 h-5 text-cyan-400" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-3 -left-3 p-2 rounded-full border border-slate-700/50 bg-slate-900/70"
                  animate={floatingAnimation}
                >
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <ChevronDown className="w-7 h-7 text-cyan-400/80" />
      </motion.div>
    </section>
  );
}