"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiCode, FiUser, FiMail, FiBriefcase } from "react-icons/fi";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { id: 1, href: "#about", label: "About", icon: FiUser },
  { id: 3, href: "#projects", label: "Projects", icon: FiBriefcase },
  { id: 2, href: "#skills", label: "Skills", icon: FiCode },
  { id: 4, href: "#contact", label: "Contact", icon: FiMail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("#about");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= 100 && bottom >= 100) {
          setActiveSection(`#${section.id}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Background animation
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);

  // Hover animation variants
  const linkVariants = {
    rest: { 
      color: "#CBD5E1",
      scale: 1 
    },
    hover: { 
      color: "#22D3EE",
      scale: 1.05,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const iconVariants = {
    rest: { y: 0, scale: 1 },
    hover: { y: -3, scale: 1.2 }
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      y: 20,
      pointerEvents: "none"
    },
    open: { 
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  return (
    <>
      <motion.nav
        style={{ backgroundColor: `rgba(15, 23, 42, ${bgOpacity.get()})` }}
        className="fixed w-full z-50 backdrop-blur-md border-b border-slate-800/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with gradient animation */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <img src="/logos.jpg" alt="Logo" className="w-16 h-16 rounded-full" />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href;
                const isHovered = hoveredLink === link.id;

                return (
                  <motion.div
                    key={link.id}
                    onHoverStart={() => setHoveredLink(link.id)}
                    onHoverEnd={() => setHoveredLink(null)}
                    className="relative px-4 py-2"
                  >
                    {/* Hover background effect */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 bg-cyan-500/10 rounded-full"
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                      )}
                    </AnimatePresence>

                    <Link
                      href={link.href}
                      className="flex items-center gap-2 relative"
                    >
                      <motion.span
                        variants={iconVariants}
                        animate={isHovered ? "hover" : "rest"}
                        className="text-cyan-400"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.span>

                      <motion.span
                        variants={linkVariants}
                        animate={isHovered || isActive ? "hover" : "rest"}
                        className="font-medium"
                      >
                        {link.label}
                      </motion.span>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button with animated gradient */}
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 32px rgba(34, 211, 238, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
            >
              <Link
                href="#contact"
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium flex items-center gap-2 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700" />
                Hire Me
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-800/80 text-slate-200 hover:text-cyan-400 transition-colors"
              >
                <span className="sr-only">Open menu</span>
                {/* Menu icon */}
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Navigation */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm rounded-full shadow-xl z-40">
        <div className="flex items-center px-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href;

            return (
              <motion.div
                key={link.id}
                whileTap={{ scale: 0.9 }}
                className="relative py-2 px-3"
              >
                <Link
                  href={link.href}
                  className="flex flex-col items-center"
                >
                  <div className={`relative p-2 ${isActive ? "bg-cyan-500/20 rounded-full" : ""}`}>
                    <Icon className={`w-5 h-5 ${isActive ? "text-cyan-400" : "text-slate-300"}`} />
                    
                    {/* Ripple effect on active */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                  
                  {/* Label below icon */}
                  <motion.span 
                    className={`text-xs font-medium mt-1 ${isActive ? "text-cyan-400" : "text-slate-400"}`}
                    animate={{ scale: isActive ? 1.05 : 1 }}
                  >
                    {link.label}
                  </motion.span>
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 bg-slate-900/95 z-40 md:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8 w-full px-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href;
                
                return (
                  <motion.div
                    key={link.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-xl ${
                        isActive 
                          ? "bg-cyan-500/10 text-cyan-400" 
                          : "text-slate-300 hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-lg font-medium">{link.label}</span>
                      
                      {isActive && (
                        <motion.div
                          className="ml-auto h-2 w-2 rounded-full bg-cyan-400"
                          layoutId="activeNavIndicator"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Mobile CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6"
              >
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium text-center"
                >
                  Hire Me
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}