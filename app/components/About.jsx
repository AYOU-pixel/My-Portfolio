"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress } from "react-icons/si";

export default function AboutSection() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false); // New state to check if rendering on client

  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
    setIsClient(true); // Set to true after component mounts

    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener("change", handleChange);
    return () => darkModeQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const skillVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    }),
  };

  const skills = [
    { name: "React", icon: <FaReact />, color: "text-blue-500" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "text-black dark:text-white" },
    { name: "Tailwind", icon: <SiTailwindcss />, color: "text-cyan-500" },
    { name: "Node.js", icon: <FaNodeJs />, color: "text-green-600" },
    { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500" },
    { name: "Express", icon: <SiExpress />, color: "text-gray-700 dark:text-gray-300" },
  ];

  const values = [
    "Writing scalable, maintainable codebases",
    "Designing UI that feels native and intuitive",
    "Optimizing for real performance, not just metrics",
    "Understanding the problem before writing code",
  ];

  return (
    <section
      id="about"
      ref={ref}
      className={`py-12 md:py-24 px-2 sm:px-4 lg:px-8 ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-white text-gray-800"
      } transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Left Column - Portrait */}
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            variants={itemVariants}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                isDarkMode ? "from-indigo-500 to-purple-700" : "from-blue-500 to-purple-600"
              } opacity-20 rounded-2xl`}
            />
            <div className="relative p-4 md:p-0">
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/ayoub.webp"
                  alt="Ayoub - Front-end Developer"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                  onError={(e) => {
                    e.target.src = "/api/placeholder/600/600";
                  }}
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 p-4 ${
                    isDarkMode ? "bg-slate-900/80" : "bg-white/80"
                  } backdrop-blur-sm`}
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${
                        isDarkMode ? "bg-green-400" : "bg-green-500"
                      } animate-pulse`}
                    />
                    <span className="text-sm font-medium">Available for projects</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          {/* Right Column - Content */}
          <motion.div
            className="space-y-6 md:space-y-8"
            variants={containerVariants}
          >
            {/* Heading */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-2">
                <div
                  className={`h-1 w-8 md:w-12 rounded ${
                    isDarkMode ? "bg-indigo-500" : "bg-blue-500"
                  } mr-4`}
                />
                <h2 className="text-xs md:text-sm uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                  About Me
                </h2>
                <div className="h-1 w-8 md:w-12 rounded bg-blue-500 ml-4 hidden md:block" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Ayoub
              </h1>
              <p
                className={`text-lg mt-2 ${
                  isDarkMode ? "text-indigo-400" : "text-blue-600"
                } font-medium`}
              >
                UX-Focused Frontend Developer
              </p>
            </motion.div>
            {/* Introduction */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg leading-relaxed"
            >
              I’m Ayoub, a self-taught front-end developer focused on building fast, accessible, and user-centered web applications using React, Next.js, and Tailwind CSS. I built my first website at 19 and have since honed my skills to create clean architecture, reusable components, and intuitive designs.
            </motion.p>
            {/* Skills */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    custom={index}
                    variants={skillVariants}
                    className={`flex items-center gap-2 px-2 py-1 md:px-3 md:py-2 rounded-lg ${
                      isDarkMode ? "bg-slate-800" : "bg-gray-100"
                    } hover:shadow-md transition-shadow`}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <span className={`text-lg md:text-xl ${skill.color}`}>{skill.icon}</span>
                    <span className="text-xs md:text-sm font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Values */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-3">What I Care About</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {values.map((value, index) => (
                  <motion.div
                    key={value}
                    custom={index}
                    variants={skillVariants}
                    className={`flex items-center justify-center text-center p-2 md:p-3 rounded-lg ${
                      isDarkMode ? "bg-slate-800" : "bg-gray-100"
                    } hover:shadow-md transition-shadow`}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: isDarkMode
                        ? "rgba(99, 102, 241, 0.2)"
                        : "rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    <span className="text-xs md:text-sm font-medium">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* CTA Button */}
            <motion.div variants={itemVariants} className="pt-2 md:pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium text-white ${
                    isDarkMode
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                      : "bg-gradient-to-r from-blue-500 to-purple-600"
                  } shadow-md flex items-center justify-center group relative overflow-hidden`}
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                  <span className="relative">Let's work together</span>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="ml-2"
                  >
                    →
                  </motion.span>
                </motion.a>
                <motion.a
                  href="/front-end-developer-resume-ayoub-pdf.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium border-2 ${
                    isDarkMode
                      ? "border-indigo-500 text-indigo-400 hover:bg-indigo-500/10"
                      : "border-blue-500 text-blue-600 hover:bg-blue-50"
                  } flex items-center justify-center transition-colors`}
                >
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}