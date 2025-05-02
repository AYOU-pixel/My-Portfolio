"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from "framer-motion";
import { FiCode, FiZap, FiLayers, FiTool, FiArrowRight } from "react-icons/fi";
import { SiTypescript, SiJavascript, SiRedux, SiFigma } from "react-icons/si";

const frontendSkills = [
  {
    category: "Core Technologies",
    icon: <FiCode />,
    items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5/CSS3"],
    color: "text-cyan-400",
    iconComponent: <SiTypescript className="text-cyan-400" />,
  },
  {
    category: "Styling & UI",
    icon: <FiLayers />,
    items: ["Tailwind CSS", "Styled Components", "CSS Modules", "SASS/SCSS", "Responsive Design"],
    color: "text-purple-400",
    iconComponent: <SiFigma className="text-purple-400" />,
  },
  {
    category: "State Management",
    icon: <FiZap />,
    items: ["Redux", "Context API", "React Query", "Zustand", "Recoil"],
    color: "text-blue-400",
    iconComponent: <SiRedux className="text-blue-400" />,
  },
  {
    category: "Tools & Workflow",
    icon: <FiTool />,
    items: ["Webpack", "Vite", "Jest", "React Testing Library", "Git/GitHub"],
    color: "text-green-400",
    iconComponent: <SiJavascript className="text-green-400" />,
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      backgroundColor: "rgba(30, 41, 59, 0.5)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="mb-16 text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="h-1 w-12 rounded bg-gradient-to-r from-cyan-500 to-blue-500 mr-4" />
              <h2 className="text-sm uppercase tracking-wider font-semibold text-cyan-400">
                Technical Expertise
              </h2>
              <div className="h-1 w-12 rounded bg-gradient-to-r from-blue-500 to-cyan-500 ml-4" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frontend <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Skills</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Combining cutting-edge technologies with proven development practices
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
          >
            {frontendSkills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className="group relative"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className="p-8 rounded-2xl bg-slate-800/20 backdrop-blur-sm border border-slate-700 hover:border-cyan-500/30 transition-all h-full"
                >
                  <div className="flex items-start mb-6">
                    <div className="p-3 rounded-lg bg-slate-700/50 mr-4">
                      {skill.iconComponent}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {skill.category}
                      </h3>
                      <div className="h-1 w-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                    </div>
                  </div>

                  <ul className="space-y-3 pl-4">
                    {skill.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center text-slate-400 group-hover:text-slate-300 transition-colors"
                      >
                        <span className={`w-2 h-2 rounded-full mr-3 ${skill.color}`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Skills */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50 mb-16"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Complementary Skills</h3>
            <div className="flex flex-wrap gap-3">
              {["Framer Motion", "GraphQL", "Storybook", "Web Accessibility", "Jest", "Webpack"].map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-slate-700/30 rounded-full text-slate-300 hover:text-cyan-400 border border-slate-600/50 hover:border-cyan-400/30 transition-all"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-8 border border-cyan-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to Elevate Your Project?</h2>
              <p className="text-slate-400 mb-6 max-w-xl mx-auto">
                Let's combine technical excellence with user-centered design to create something remarkable.
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium text-white shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                Start a Conversation
                <FiArrowRight className="ml-2" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}