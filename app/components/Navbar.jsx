"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiCode, FiUser, FiMail, FiBriefcase, FiSun, FiMoon, FiX, FiMenu } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

// Navigation links configuration
const navLinks = [
  { id: 1, href: "#about", label: "About", icon: FiUser, ariaLabel: "Navigate to About section" },
  { id: 2, href: "#skills", label: "Skills", icon: FiCode, ariaLabel: "Navigate to Skills section" },
  { id: 3, href: "#projects", label: "Projects", icon: FiBriefcase, ariaLabel: "Navigate to Projects section" },
  { id: 4, href: "#contact", label: "Contact", icon: FiMail, ariaLabel: "Navigate to Contact section" },
];

// ErrorBoundary component for robust error handling
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Navbar Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-500 text-center">Something went wrong with the navigation.</div>;
    }
    return this.props.children;
  }
}

// Reusable NavLink component for desktop navigation
const NavLink = memo(({ link, isActive, isHovered, onHoverStart, onHoverEnd, handleScrollToSection, darkMode }) => {
  const Icon = link.icon;

  return (
    <motion.div
      onHoverStart={() => onHoverStart(link.id)}
      onHoverEnd={onHoverEnd}
      className="relative px-3 py-2"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute inset-0 ${darkMode ? "bg-cyan-500/20" : "bg-cyan-500/30"} rounded-full`}
            transition={{ type: "spring", stiffness: 400 }}
          />
        )}
      </AnimatePresence>
      <Link
        href={link.href}
        aria-label={link.ariaLabel}
        title={link.label}
        className="flex items-center gap-2 relative"
        onClick={handleScrollToSection(link.href)}
      >
        <motion.span
          variants={{
            rest: { y: 0, scale: 1 },
            hover: { y: -3, scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 15 } },
          }}
          animate={isHovered ? "hover" : "rest"}
          className={`text-${isActive ? "cyan-400" : darkMode ? "slate-400" : "slate-600"}`}
        >
          <Icon className="w-5 h-5" />
        </motion.span>
        <motion.span
          variants={{
            rest: { color: darkMode ? "#CBD5E1" : "#1E293B", opacity: 0.9 },
            hover: { color: "#06B6D4", opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
          }}
          animate={isHovered || isActive ? "hover" : "rest"}
          className={`font-medium ${isActive ? "font-semibold" : ""} text-sm md:text-base`}
        >
          {link.label}
        </motion.span>
        {isActive && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500"
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
        )}
      </Link>
    </motion.div>
  );
});

// Reusable MobileNavLink component for mobile menu
const MobileNavLink = memo(({ link, isActive, handleScrollToSection, darkMode, reduceMotion }) => {
  const Icon = link.icon;

  return (
    <motion.div
      variants={{
        closed: { x: -20, opacity: 0 },
        open: { x: 0, opacity: 1, transition: reduceMotion ? {} : { type: "spring", stiffness: 350 } },
      }}
      className="w-full relative"
      whileHover={reduceMotion ? {} : { x: 5 }}
      transition={reduceMotion ? {} : { type: "spring", stiffness: 350 }}
    >
      <Link
        href={link.href}
        className={`flex items-center gap-4 p-4 ${
          isActive ? "text-cyan-400 font-semibold" : darkMode ? "text-slate-300" : "text-slate-700"
        } transition-colors duration-200 text-lg`}
        onClick={handleScrollToSection(link.href)}
      >
        <motion.span
          animate={isActive ? "active" : "rest"}
          variants={{
            active: { scale: 1.2, rotate: -10, color: "#06B6D4" },
            rest: { scale: 1, rotate: 0, color: darkMode ? "#CBD5E1" : "#1E293B" },
          }}
        >
          <Icon className="w-6 h-6" />
        </motion.span>
        <span>{link.label}</span>
        {isActive && (
          <motion.div
            className="absolute left-0 h-full w-[3px] bg-cyan-400 rounded-r"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={reduceMotion ? {} : { type: "spring", stiffness: 500 }}
          />
        )}
      </Link>
    </motion.div>
  );
});

// Main Navbar component
const Navbar = memo(function Navbar() {
  const [activeSection, setActiveSection] = useState("#about");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const mobileMenuRef = useRef(null);
  const prevScrollY = useRef(0);
  const reduceMotion = useRef(false);
  const scrollPosition = useRef(0); // Add this ref for scroll position tracking

  // Initialize theme and reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedTheme = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme);

    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Sync theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Reduced motion listener
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion.current = mediaQuery.matches;
    const handler = (e) => (reduceMotion.current = e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Scroll to section
  const handleScrollToSection = useCallback(
    (href) => (e) => {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (typeof window === "undefined") return;
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          const navHeight = 80;
          const y = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: y, behavior: "smooth" });
          setActiveSection(href);
        }
      }, 100);
    },
    []
  );

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    let ticking = false;
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 300);
      if (currentScrollY > prevScrollY.current + 10) {
        setScrollDirection("down");
      } else if (currentScrollY < prevScrollY.current - 10) {
        setScrollDirection("up");
      }

      // Active section detection
      const sections = document.querySelectorAll("section");
      let maxVisibleSection = null;
      let maxVisibleAmount = 0;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        if (visibleHeight > 0 && visibleHeight > maxVisibleAmount) {
          maxVisibleAmount = visibleHeight;
          maxVisibleSection = section;
        }
      }

      if (maxVisibleSection) {
        setActiveSection(`#${maxVisibleSection.id}`);
      }

      prevScrollY.current = currentScrollY;
      ticking = false;
    };
    return () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };
  }, []);

  useEffect(() => {
    const optimizedScroll = handleScroll();
    window.addEventListener('scroll', optimizedScroll, { passive: true });
    return () => window.removeEventListener('scroll', optimizedScroll);
  }, [handleScroll]);

  // Fixed scroll lock useEffect
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mobileMenuOpen) {
      // Save current scroll position
      scrollPosition.current = window.scrollY;
      // Apply scroll lock styles
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
    } else {
      // Remove scroll lock styles
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      // Restore scroll position
      window.scrollTo(0, scrollPosition.current);
    }
    return () => {
      // Cleanup if component unmounts while menu is open
      if (mobileMenuOpen) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        window.scrollTo(0, scrollPosition.current);
      }
    };
  }, [mobileMenuOpen]);

  // Click outside mobile menu
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const bgOpacity = useTransform(scrollY, [0, 100], [0.1, 0.95]);
  const navBlur = useTransform(scrollY, [0, 50], [4, 12]);

  // Modified mobile menu animation with better performance
  const mobileMenuVariants = {
    open: {
      x: 0,
      transition: reduceMotion.current ? { duration: 0 } : {
        type: "tween",
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.2
      }
    },
    closed: {
      x: '-100%',
      transition: reduceMotion.current ? { duration: 0 } : {
        type: "tween",
        ease: [0.55, 0.06, 0.68, 0.19],
        duration: 0.2
      }
    }
  };

  return (
    <ErrorBoundary>
      <motion.nav
        style={{
          backgroundColor: darkMode ? `rgba(15, 23, 42, ${bgOpacity.get()})` : `rgba(241, 245, 249, ${bgOpacity.get()})`,
          backdropFilter: `blur(${navBlur.get()}px)`,
        }}
        className={`fixed top-0 w-full z-50 border-b dark:border-slate-800 border-slate-200 transition-transform duration-300 ${
          scrollDirection === "down" && isScrolled ? "-translate-y-full" : "translate-y-0"
        }`}
        initial={reduceMotion.current ? {} : { y: -100 }}
        animate={reduceMotion.current ? {} : { y: 0 }}
        transition={reduceMotion.current ? {} : { type: "spring", stiffness: 350, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.div
              whileHover={reduceMotion.current ? {} : { scale: 1.05 }}
              whileTap={reduceMotion.current ? {} : { scale: 0.95 }}
              onClick={scrollToTop}
              onKeyDown={(e) => e.key === "Enter" && scrollToTop()}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label="Return to top of page"
            >
              <Link href="#">
                <div className="relative group">
                  <Image
                    src="/logos.jpg"
                    alt="Logo"
                    width={48}
                    height={48}
                    className="rounded-full object-cover border-2 border-transparent group-hover:border-cyan-400 transition-all duration-300 sm:w-16 sm:h-16"
                    priority
                    loading="eager"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={reduceMotion.current ? {} : { scale: [1, 1.1, 1], opacity: [0, 0.3, 0] }}
                    transition={reduceMotion.current ? {} : { duration: 2, repeat: Infinity, repeatType: "loop" }}
                  />
                </div>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.id}
                  link={link}
                  isActive={activeSection === link.href}
                  isHovered={hoveredLink === link.id}
                  onHoverStart={() => setHoveredLink(link.id)}
                  onHoverEnd={() => setHoveredLink(null)}
                  handleScrollToSection={handleScrollToSection}
                  darkMode={darkMode}
                />
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              <motion.button
                whileHover={reduceMotion.current ? {} : { scale: 1.1, rotate: darkMode ? 12 : -12 }}
                whileTap={reduceMotion.current ? {} : { scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${
                  darkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-200 hover:bg-slate-300"
                } transition-colors duration-300`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <FiSun className="w-5 h-5 text-yellow-400" /> : <FiMoon className="w-5 h-5 text-slate-800" />}
              </motion.button>
              <motion.div
                whileHover={reduceMotion.current ? {} : { scale: 1.05, y: -2, boxShadow: darkMode ? "0 8px 32px rgba(6, 182, 212, 0.3)" : "0 8px 32px rgba(6, 182, 212, 0.4)" }}
                whileTap={reduceMotion.current ? {} : { scale: 0.95 }}
                transition={reduceMotion.current ? {} : { type: "spring", stiffness: 350 }}
              >
                <Link
                  href="#contact"
                  aria-label="Contact me for hiring"
                  onClick={handleScrollToSection("#contact")}
                  className={`px-4 py-2 lg:px-6 lg:py-3 ${
                    darkMode ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-gradient-to-r from-cyan-600 to-blue-600"
                  } text-white rounded-xl font-medium flex items-center gap-2 relative overflow-hidden shadow-lg group text-sm lg:text-base`}
                >
                  <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <span className="relative">Hire Me</span>
                </Link>
              </motion.div>
            </div>

            <div className="md:hidden flex items-center gap-3">
              <motion.button
                whileTap={reduceMotion.current ? {} : { scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${
                  darkMode ? "bg-slate-800/80 hover:bg-slate-700/80" : "bg-slate-200/80 hover:bg-slate-300/80"
                } transition-colors duration-300`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <FiSun className="w-5 h-5 text-yellow-400" /> : <FiMoon className="w-5 h-5 text-slate-800" />}
              </motion.button>
              <motion.button
                whileTap={reduceMotion.current ? {} : { scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "bg-slate-800/80 text-slate-100 hover:bg-slate-700/80 hover:text-cyan-400"
                    : "bg-slate-200/80 text-slate-800 hover:bg-slate-300/80 hover:text-cyan-600"
                } transition-colors duration-300`}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className={`fixed inset-0 ${darkMode ? "bg-slate-900/95" : "bg-slate-50/95"} z-40 md:hidden flex flex-col pt-16 pb-8 px-4 sm:pt-20`}
            style={{ touchAction: 'none' }} // touch scrolling
          >
            <div className="flex flex-col items-center gap-4 w-full px-4 mt-4 overflow-y-auto">
              {navLinks.map((link) => (
                <MobileNavLink
                  key={link.id}
                  link={link}
                  isActive={activeSection === link.href}
                  handleScrollToSection={handleScrollToSection}
                  darkMode={darkMode}
                  reduceMotion={reduceMotion.current}
                />
              ))}
              <motion.div
                variants={{
                  closed: { x: -20, opacity: 0 },
                  open: { x: 0, opacity: 1, transition: reduceMotion.current ? {} : { type: "spring", stiffness: 350 } },
                }}
                whileHover={reduceMotion.current ? {} : { scale: 1.05, y: -2, boxShadow: darkMode ? "0 8px 32px rgba(6, 182, 212, 0.3)" : "0 8px 32px rgba(6, 182, 212, 0.4)" }}
                className="w-full mt-4"
              >
                <Link
                  href="#contact"
                  onClick={handleScrollToSection("#contact")}
                  className={`block w-full py-4 px-6 ${
                    darkMode ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-gradient-to-r from-cyan-600 to-blue-600"
                  } text-white rounded-xl font-medium text-center shadow-lg relative overflow-hidden text-base`}
                >
                  <span className="absolute inset-0 bg-white/20 -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out" />
                  <span className="relative">Hire Me</span>
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  closed: { x: -20, opacity: 0 },
                  open: { x: 0, opacity: 1, transition: reduceMotion.current ? {} : { type: "spring", stiffness: 350 } },
                }}
                className="mt-6 w-full text-center"
              >
                <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  Press <kbd className={`px-2 py-1 rounded ${darkMode ? "bg-slate-800" : "bg-slate-200"}`}>ESC</kbd> to close menu
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={reduceMotion.current ? {} : { opacity: 0, y: 20 }}
            animate={reduceMotion.current ? {} : { opacity: 1, y: 0 }}
            exit={reduceMotion.current ? {} : { opacity: 0, y: 20 }}
            whileHover={reduceMotion.current ? {} : { scale: 1.1 }}
            whileTap={reduceMotion.current ? {} : { scale: 0.9 }}
            onClick={scrollToTop}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-2 sm:p-3 rounded-full ${
              darkMode ? "bg-slate-800 hover:bg-slate-700 text-cyan-400" : "bg-slate-200 hover:bg-slate-300 text-cyan-600"
            } shadow-lg z-30`}
            aria-label="Back to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
});

export default Navbar;