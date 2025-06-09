"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiCode, FiUser, FiMail, FiBriefcase, FiX, FiMenu } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { throttle } from "lodash";

const navLinks = [
  { id: 1, href: "#about", label: "About", icon: FiUser, ariaLabel: "Navigate to About section" },
  { id: 3, href: "#projects", label: "Projects", icon: FiBriefcase, ariaLabel: "Navigate to Projects section" },
  { id: 2, href: "#skills", label: "Skills", icon: FiCode, ariaLabel: "Navigate to Skills section" },
  { id: 4, href: "#contact", label: "Contact", icon: FiMail, ariaLabel: "Navigate to Contact section" },
];

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-500">Something went wrong with the navigation.</div>;
    }
    return this.props.children;
  }
}

function Navbar() {
  const [activeSection, setActiveSection] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const { scrollY } = useScroll();
  const mobileMenuRef = useRef(null);
  const observerRef = useRef(null);
  const sectionRefs = useRef({});

  // Initialize dark mode globally
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }, []);

  // Detect first scroll to enable active section tracking
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleFirstScroll = throttle(() => {
      window.removeEventListener("scroll", handleFirstScroll);
    }, 100);
    window.addEventListener("scroll", handleFirstScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleFirstScroll);
  }, []);

  // Active section detection with Intersection Observer
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        sectionRefs.current[entry.target.id] = entry;
      });

      const visibleSections = Object.values(sectionRefs.current).filter(
        (entry) => entry.isIntersecting
      );

      if (visibleSections.length > 0) {
        const mostVisible = visibleSections.reduce((prev, current) =>
          current.intersectionRatio > prev.intersectionRatio ? current : prev
        );
        setActiveSection(`#${mostVisible.target.id}`);
      }
    };

    observerRef.current = new window.IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px 0px -50% 0px",
      threshold: 0.1,
    });

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();
  }, []);

  // Scroll lock for mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    const html = document.documentElement;
    if (mobileMenuOpen) {
      html.style.overflow = 'hidden';
      html.style.touchAction = 'none';
    } else {
      html.style.overflow = '';
      html.style.touchAction = '';
    }
    return () => {
      html.style.overflow = '';
      html.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  // Scroll direction detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > prevScrollY ? "down" : "up");
      setPrevScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 300);
    }, 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  // Handle click outside mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, { passive: true });
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenuOpen]);

  // Hydration effect
  useEffect(() => {
    setHydrated(true);
  }, []);

  // ScrollToSection handler
  const handleScrollToSection = useCallback(
    (href) => (e) => {
      e.preventDefault();
      setMobileMenuOpen(false);
      setActiveSection(href);
      requestAnimationFrame(() => {
        const element = document.querySelector(href);
        if (element) {
          const navHeight = 80;
          const y = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      });
    },
    []
  );

  const scrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
      setActiveSection("#about");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const bgOpacity = useTransform(scrollY, [0, 100], [0.1, 0.95]);
  const navBlur = useTransform(scrollY, [0, 50], [4, 12]);

  const bgOpacityValue = hydrated ? bgOpacity.get() : 0.95;
  const navBlurValue = hydrated ? navBlur.get() : 8;

  const linkVariants = {
    rest: { color: "#CBD5E1", opacity: 0.9 },
    hover: { 
      color: "#06B6D4",
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const iconVariants = {
    rest: { y: 0, scale: 1 },
    hover: { y: -3, scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 20 } }
  };

  const mobileMenuVariants = {
    closed: { 
      x: "-100%", 
      opacity: 0,
      transition: { type: "spring", stiffness: 400, damping: 40, when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1 }
    },
    open: { 
      x: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 300, damping: 25, when: "beforeChildren", staggerChildren: 0.1 }
    }
  };

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  const memoizedNavLinks = React.useMemo(
    () =>
      navLinks.map((link) => {
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
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-cyan-500/20 rounded-full"
                  transition={{ type: "spring", stiffness: 300 }}
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
                variants={iconVariants}
                animate={isHovered ? "hover" : "rest"}
                className={`text-${isActive ? "cyan-400" : "slate-400"}`}
              >
                <Icon className="w-5 h-5" />
              </motion.span>
              <motion.span
                variants={linkVariants}
                animate={isHovered || isActive ? "hover" : "rest"}
                className={`font-medium ${isActive ? "font-semibold" : ""}`}
              >
                {link.label}
              </motion.span>
              {isActive && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500"
                  transition={{ type: "spring", stiffness: 400, damping: 20, mass: 0.3 }}
                />
              )}
            </Link>
          </motion.div>
        );
      }),
    [activeSection, hoveredLink, handleScrollToSection, iconVariants, linkVariants]
  );

  const logoImage = (
    <Image 
      src="/logos.webp" 
      alt="Logo" 
      width={64} 
      height={64}
      className="rounded-full object-cover border-2 border-transparent group-hover:border-cyan-400 transition-all duration-300"
      priority
      sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
      quality={80}
    />
  );

  const motionNav = (
    <motion.nav
      style={{ 
        backgroundColor: `rgba(15, 23, 42, ${bgOpacityValue})`,
        backdropFilter: `blur(${navBlurValue}px)`,
        willChange: 'transform, background-color, backdrop-filter'
      }}
      className={`fixed top-0 w-full z-50 border-b dark:border-slate-800 border-slate-200 transition-transform duration-300 ${
        scrollDirection === "down" && isScrolled ? "-translate-y-full" : "translate-y-0"
      }`}
      animate={{ y: 0 }}
      initial={{ y: -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                scrollToTop();
              }
            }}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Return to top of page"
          >
            <Link href="#">
              <div className="relative group">
                {logoImage}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ scale: [1, 1.1, 1], opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                />
              </div>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {memoizedNavLinks}
          </div>

          <div className="md:hidden flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-100 hover:bg-slate-700/80 hover:text-cyan-400 transition-colors duration-300"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );

  if (!hydrated) return null;

  return (
    <ErrorBoundary>
      {motionNav}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 bg-slate-900/95 z-40 md:hidden flex flex-col pt-20 pb-8 px-4"
          >
            <div className="flex flex-col items-center gap-6 w-full px-4 mt-4 overflow-y-auto">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href;

                return (
                  <motion.div
                    key={link.id}
                    variants={menuItemVariants}
                    className="w-full relative"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-4 p-4 ${
                        isActive 
                          ? "text-cyan-400 font-semibold"
                          : "text-slate-300"
                      } transition-colors duration-200`}
                      onClick={handleScrollToSection(link.href)}
                    >
                      <motion.span
                        animate={isActive ? "active" : "rest"}
                        variants={{
                          active: { scale: 1.2, rotate: -10, color: "#06B6D4" },
                          rest: { scale: 1, rotate: 0, color: "#CBD5E1" }
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.span>
                      
                      <span className="text-lg">{link.label}</span>

                      {isActive && (
                        <motion.div 
                          className="absolute left-0 h-full w-[3px] bg-cyan-400 rounded-r"
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                variants={menuItemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 8px 32px rgba(6, 182, 212, 0.3)"
                }}
                className="w-full mt-4"
              >
                <Link
                  href="#contact"
                  onClick={handleScrollToSection("#contact")}
                  className="block w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium text-center shadow-lg relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out" />
                  <span className="relative">Hire Me</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-400 shadow-lg z-30"
            aria-label="Back to top"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default memo(Navbar);