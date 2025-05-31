"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt, FaFigma } from "react-icons/fa";
import { 
  SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, 
  SiTypescript, SiJest, SiGraphql, SiRedux 
} from "react-icons/si";

export default function SkillsSection() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
    setIsClient(true);
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: { duration: 1.2, ease: "easeInOut", delay: 0.3 }
    })
  };

  const skills = [
    { name: "React", icon: <FaReact />, color: "text-blue-500", level: 95 },
    { name: "Next.js", icon: <SiNextdotjs />, color: "text-black dark:text-white", level: 90 },
    { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-600", level: 85 },
    { name: "Tailwind", icon: <SiTailwindcss />, color: "text-cyan-500", level: 92 },
    { name: "Node.js", icon: <FaNodeJs />, color: "text-green-600", level: 88 },
    { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500", level: 85 },
    { name: "Express", icon: <SiExpress />, color: "text-gray-700 dark:text-gray-300", level: 87 },
    { name: "Redux", icon: <SiRedux />, color: "text-purple-600", level: 82 },
    { name: "GraphQL", icon: <SiGraphql />, color: "text-pink-500", level: 78 },
    { name: "Jest", icon: <SiJest />, color: "text-red-500", level: 80 },
    { name: "Git", icon: <FaGitAlt />, color: "text-orange-500", level: 90 },
    { name: "Figma", icon: <FaFigma />, color: "text-purple-500", level: 85 },
  ];

  const softSkills = [
    "Problem Solving",
    "Team Collaboration", 
    "Code Reviews",
    "Performance Optimization",
    "UI/UX Design",
    "Agile Development"
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className={`py-12 md:py-24 px-2 sm:px-4 lg:px-8 ${
        isDarkMode ? "bg-slate-800 text-white" : "bg-gray-50 text-gray-800"
      } transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12 md:mb-16"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center mb-4">
              <div
                className={`h-1 w-8 md:w-12 rounded ${
                  isDarkMode ? "bg-indigo-500" : "bg-blue-500"
                } mr-4`}
              />
              <h2 className="text-xs md:text-sm uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                Technical Skills
              </h2>
              <div
                className={`h-1 w-8 md:w-12 rounded ${
                  isDarkMode ? "bg-indigo-500" : "bg-blue-500"
                } ml-4`}
              />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              My Expertise
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Technologies and tools I use to craft exceptional digital experiences
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            variants={containerVariants}
          >
            {/* Technical Skills */}
            <motion.div
              className={`p-6 md:p-8 rounded-2xl ${
                isDarkMode ? "bg-slate-900/50" : "bg-white"
              } shadow-xl border ${
                isDarkMode ? "border-slate-700" : "border-gray-200"
              }`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`p-3 rounded-xl ${
                    isDarkMode ? "bg-indigo-500/20" : "bg-blue-50"
                  }`}
                >
                  <FaReact className={`text-xl ${isDarkMode ? "text-indigo-400" : "text-blue-500"}`} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold ml-4">
                  Technical Stack
                </h3>
              </div>

              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    custom={index}
                    variants={skillVariants}
                    className="group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div
                          className={`p-2 rounded-lg ${
                            isDarkMode ? "bg-slate-800" : "bg-gray-100"
                          } group-hover:scale-110 transition-transform`}
                        >
                          <span className={`text-lg ${skill.color}`}>
                            {skill.icon}
                          </span>
                        </div>
                        <span className="ml-3 font-medium text-sm md:text-base">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs md:text-sm font-mono text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className={`h-2 ${
                        isDarkMode ? "bg-slate-700" : "bg-gray-200"
                      } rounded-full overflow-hidden`}
                    >
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${
                          isDarkMode
                            ? "from-indigo-500 to-purple-600"
                            : "from-blue-500 to-purple-600"
                        }`}
                        variants={progressVariants}
                        custom={skill.level}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Soft Skills */}
            <motion.div
              className={`p-6 md:p-8 rounded-2xl ${
                isDarkMode ? "bg-slate-900/50" : "bg-white"
              } shadow-xl border ${
                isDarkMode ? "border-slate-700" : "border-gray-200"
              }`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`p-3 rounded-xl ${
                    isDarkMode ? "bg-purple-500/20" : "bg-purple-50"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${
                    isDarkMode 
                      ? "from-purple-400 to-pink-400" 
                      : "from-purple-500 to-pink-500"
                  }`} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold ml-4">
                  Core Strengths
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    custom={index}
                    variants={skillVariants}
                    className={`p-4 rounded-xl ${
                      isDarkMode ? "bg-slate-800" : "bg-gray-50"
                    } hover:shadow-md transition-shadow group`}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: isDarkMode
                        ? "rgba(139, 92, 246, 0.1)"
                        : "rgba(59, 130, 246, 0.05)",
                    }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isDarkMode ? "bg-purple-400" : "bg-purple-500"
                        } mr-3 group-hover:scale-150 transition-transform`}
                      />
                      <span className="font-medium text-sm md:text-base">
                        {skill}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Achievement Stats */}
              <motion.div 
                className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700"
                variants={itemVariants}
              >
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <motion.div
                      className={`text-2xl md:text-3xl font-bold ${
                        isDarkMode ? "text-indigo-400" : "text-blue-600"
                      }`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      3+
                    </motion.div>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Years Experience
                    </div>
                  </div>
                  <div>
                    <motion.div
                      className={`text-2xl md:text-3xl font-bold ${
                        isDarkMode ? "text-purple-400" : "text-purple-600"
                      }`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.7, type: "spring" }}
                    >
                      20+
                    </motion.div>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Projects Built
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}