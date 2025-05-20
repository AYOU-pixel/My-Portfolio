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
      className="relative px-2 md:px-3 lg:px-4 py-2"
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
            hover: { y: -2, scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 15 } },
          }}
          animate={isHovered ? "hover" : "rest"}
          className={`text-${isActive ? "cyan-400" : darkMode ? "slate-400" : "slate-600"}`}
        >
          <Icon className="w-4 h-4 md:w-5 md:h-5" />
        </motion.span>
        <motion.span
          variants={{
            rest: { color: darkMode ? "#CBD5E1" : "#1E293B", opacity: 0.9 },
            hover: { color: "#06B6D4", opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
          }}
          animate={isHovered || isActive ? "hover" : "rest"}
          className={`font-medium ${isActive ? "font-semibold" : ""} hidden sm:block text-sm md:text-base`}
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
        className={`flex items-center gap-3 p-3 ${
          isActive ? "text-cyan-400 font-semibold" : darkMode ? "text-slate-300" : "text-slate-700"
        } transition-colors duration-200 text-base`}
        onClick={handleScrollToSection(link.href)}
      >
        <motion.span
          animate={isActive ? "active" : "rest"}
          variants={{
            active: { scale: 1.2, rotate: -10, color: "#06B6D4" },
            rest: { scale: 1, rotate: 0, color: darkMode ? "#CBD5E1" : "#1E293B" },
          }}
        >
          <Icon className="w-5 h-5" />
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
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const { scrollY } = useScroll();
  const mobileMenuRef = useRef(null);
  const prevScrollY = useRef(0);
  const reduceMotion = useRef(false);
  const scrollTimeout = useRef(null);
  
  // Get viewport width for responsive adjustments
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
      setIsMediumScreen(window.innerWidth >= 640 && window.innerWidth < 1024);
      
      // Close mobile menu on resize to desktop
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

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

  // Scroll to top with debounce
  const scrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: reduceMotion.current ? "auto" : "smooth" });
    }
  }, []);

  // Scroll to section with better offsets
  const handleScrollToSection = useCallback(
    (href) => (e) => {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (typeof window === "undefined") return;
      
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        const element = document.querySelector(href);
        if (element) {
          // Dynamic navbar height based on screen size
          const navHeight = isSmallScreen ? 56 : isMediumScreen ? 64 : 72;
          const y = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ 
            top: y, 
            behavior: reduceMotion.current ? "auto" : "smooth" 
          });
          setActiveSection(href);
        }
      });
    },
    [isSmallScreen, isMediumScreen]
  );

  // Improved scroll handling with better performance
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    let lastScrollTime = 0;
    const scrollThreshold = 50; // ms between scroll events to process
    
    const handleScroll = () => {
      const now = Date.now();
      
      // Throttle scroll events
      if (now - lastScrollTime < scrollThreshold) return;
      lastScrollTime = now;
      
      const currentScrollY = window.scrollY;
      
      // Only update state if there's a significant change
      if (currentScrollY > 20 && !isScrolled) {
        setIsScrolled(true);
      } else if (currentScrollY <= 20 && isScrolled) {
        setIsScrolled(false);
      }
      
      // Determine scroll direction with a threshold to prevent flickering
      if (currentScrollY > prevScrollY.current + 10) {
        if (scrollDirection !== "down") setScrollDirection("down");
      } else if (currentScrollY < prevScrollY.current - 10) {
        if (scrollDirection !== "up") setScrollDirection("up");
      }

      // Active section detection using IntersectionObserver pattern but inline
      // Get all sections
      const sections = document.querySelectorAll("section[id]");
      let currentSection = null;
      let maxVisibility = 0;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how much of the section is visible
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(windowHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        // Add weight to sections near the top of the viewport
        const topProximity = 1 - (visibleTop / windowHeight) * 0.5;
        const weightedVisibility = visibleHeight * topProximity;
        
        if (weightedVisibility > maxVisibility) {
          maxVisibility = weightedVisibility;
          currentSection = section;
        }
      });

      if (currentSection && currentSection.id) {
        const newActive = `#${currentSection.id}`;
        if (activeSection !== newActive) {
          setActiveSection(newActive);
        }
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection, isScrolled, scrollDirection]);

  // Mobile menu effect - body scroll lock
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Click outside mobile menu handler
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

  // Keyboard navigation for accessibility
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

  // Dynamic background properties based on scroll
  const bgOpacity = useTransform(scrollY, [0, 100], [0.6, 0.95]);
  const navBlur = useTransform(scrollY, [0, 50], [4, 8]);

  return (
    <ErrorBoundary>
      <motion.nav
        style={{
          backgroundColor: darkMode ? `rgba(15, 23, 42, ${bgOpacity.get()})` : `rgba(241, 245, 249, ${bgOpacity.get()})`,
          backdropFilter: `blur(${navBlur.get()}px)`,
        }}
        className={`fixed top-0 w-full z-50 border-b ${darkMode ? "border-slate-800/70" : "border-slate-200/70"} transition-transform duration-300 ${
          scrollDirection === "down" && isScrolled && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
        initial={reduceMotion.current ? {} : { y: -100 }}
        animate={reduceMotion.current ? {} : { y: 0 }}
        transition={reduceMotion.current ? {} : { type: "spring", stiffness: 350, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
            {/* Logo/Home button */}
            <motion.div
              whileHover={reduceMotion.current ? {} : { scale: 1.05 }}
              whileTap={reduceMotion.current ? {} : { scale: 0.95 }}
              onClick={scrollToTop}
              onKeyDown={(e) => e.key === "Enter" && scrollToTop()}
              className="cursor-pointer flex-shrink-0"
              role="button"
              tabIndex={0}
              aria-label="Return to top of page"
            >
              <Link href="#">
                <div className="relative group">
                  <Image
                    src="/logos.jpg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full object-cover border-2 border-transparent group-hover:border-cyan-400 transition-all duration-300"
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

            {/* Desktop Navigation - only show on larger screens */}
            <div className="hidden lg:flex items-center space-x-1">
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

            {/* Tablet Navigation - Show icons only on medium screens */}
            <div className="hidden sm:flex lg:hidden items-center space-x-1">
              {navLinks.map((link) => (
                <motion.div
                  key={link.id}
                  className="relative p-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={link.href}
                    aria-label={link.ariaLabel}
                    title={link.label}
                    className="flex items-center justify-center"
                    onClick={handleScrollToSection(link.href)}
                  >
                    <span className={activeSection === link.href ? "text-cyan-400" : darkMode ? "text-slate-300" : "text-slate-600"}>
                      <link.icon className="w-5 h-5" />
                    </span>
                    {activeSection === link.href && (
                      <motion.div
                        className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-cyan-400"
                        layoutId="activeTabIndicator"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop & Tablet Call-to-action */}
            <div className="hidden sm:flex items-center gap-2">
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
                whileHover={reduceMotion.current ? {} : { scale: 1.05, y: -2 }}
                whileTap={reduceMotion.current ? {} : { scale: 0.95 }}
                transition={reduceMotion.current ? {} : { type: "spring", stiffness: 350 }}
              >
                <Link
                  href="#contact"
                  aria-label="Contact me for hiring"
                  onClick={handleScrollToSection("#contact")}
                  className={`px-3 py-2 ${
                    darkMode ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-gradient-to-r from-cyan-600 to-blue-600"
                  } text-white rounded-xl font-medium flex items-center gap-2 relative overflow-hidden shadow-lg group text-sm`}
                >
                  <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <span className="relative">Hire Me</span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="sm:hidden flex items-center gap-2">
              <motion.button
                whileTap={reduceMotion.current ? {} : { scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${
                  darkMode ? "bg-slate-800/80 hover:bg-slate-700/80" : "bg-slate-200/80 hover:bg-slate-300/80"
                } transition-colors duration-300`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <FiSun className="w-4 h-4 text-yellow-400" /> : <FiMoon className="w-4 h-4 text-slate-800" />}
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
                {mobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
              </motion.button>
            </div>
            
            {/* Mobile Menu Toggle (Burger) for tablets */}
            <div className="hidden sm:flex lg:hidden items-center">
              <motion.button
                whileTap={reduceMotion.current ? {} : { scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 ml-2 rounded-lg ${
                  darkMode
                    ? "bg-slate-800/80 text-slate-100 hover:bg-slate-700/80 hover:text-cyan-400"
                    : "bg-slate-200/80 text-slate-800 hover:bg-slate-300/80 hover:text-cyan-600"
                } transition-colors duration-300`}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Improved styling and animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              closed: {
                x: "-100%",
                opacity: 0,
                transition: reduceMotion.current
                  ? { duration: 0.2 }
                  : { type: "spring", stiffness: 400, damping: 40, when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1 },
              },
              open: {
                x: 0,
                opacity: 1,
                transition: reduceMotion.current
                  ? { duration: 0.2 }
                  : { type: "spring", stiffness: 350, damping: 30, when: "beforeChildren", staggerChildren: 0.1 },
              },
            }}
            className={`fixed inset-0 ${darkMode ? "bg-slate-900/95" : "bg-slate-50/95"} z-40 lg:hidden flex flex-col pt-16 pb-8 px-4`}
          >
            <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto px-3 mt-4 overflow-y-auto">
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
                whileHover={reduceMotion.current ? {} : { scale: 1.05, y: -2 }}
                className="w-full mt-4"
              >
                <Link
                  href="#contact"
                  onClick={handleScrollToSection("#contact")}
                  className={`block w-full py-3 px-4 ${
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
                <p className={`text-xs sm:text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  Press <kbd className={`px-2 py-1 rounded ${darkMode ? "bg-slate-800" : "bg-slate-200"}`}>ESC</kbd> to close menu
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button - Improved visibility and positioning */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={reduceMotion.current ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={reduceMotion.current ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion.current ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileHover={reduceMotion.current ? {} : { scale: 1.1 }}
            whileTap={reduceMotion.current ? {} : { scale: 0.9 }}
            onClick={scrollToTop}
            className={`fixed bottom-4 right-4 p-3 rounded-full ${
              darkMode ? "bg-slate-800 hover:bg-slate-700 text-cyan-400" : "bg-white hover:bg-slate-100 text-cyan-600"
            } shadow-lg z-30`}
            aria-label="Back to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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