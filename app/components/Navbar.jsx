"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiBriefcase, FiMail, FiX, FiMenu, FiArrowUp } from "react-icons/fi";
import { clsx } from "clsx";

// --- UTILITY: Classname Merger (using clsx) ---
// Switched to clsx for a more robust and standard solution.
const cn = clsx;

// --- DATA CONSTANTS ---
const NAV_LINKS = [
  // Using a more descriptive name for the first link.
  { href: "#home", label: "Home", icon: FiUser },
  { href: "#about", label: "About", icon: FiUser },
  { href: "#projects", label: "Projects", icon: FiBriefcase },
  { href: "#contact", label: "Contact", icon: FiMail },
];

// --- CUSTOM HOOKS (Unchanged - Already well-implemented) ---
function useScrollInfo() {
  const [scrollInfo, setScrollInfo] = useState({
    direction: "up",
    isScrolled: false,
  });
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateScrollInfo = () => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 50;

      setScrollInfo({
        isScrolled,
        direction: currentScrollY > lastScrollY.current ? "down" : "up",
      });

      lastScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    window.addEventListener("scroll", updateScrollInfo, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollInfo);
  }, []);

  return scrollInfo;
}

function useActiveSection(sectionIds, rootMargin = "-25% 0px -75% 0px") {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "#home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id.substring(1));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return activeSection;
}

// --- SUB-COMPONENTS ---

const Logo = memo(({ onClick }) => (
  <Link href="#home" onClick={onClick} aria-label="Ayoub, Return to top of page" className="z-10 group rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-cyan-400">
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <Image
        src="/ayoub.webp"
        alt="Ayoub's Logo"
        width={48}
        height={48}
        className="rounded-full object-cover border-2 border-slate-700 group-hover:border-cyan-400 transition-colors duration-300"
        priority
      />
    </motion.div>
  </Link>
));
Logo.displayName = 'Logo';

const DesktopNav = memo(({ links, activeSection, onLinkClick }) => (
  <nav className="hidden md:flex items-center bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-full px-4 py-2 shadow-lg shadow-black/20">
    {links.map((link) => {
      const isActive = activeSection === link.href;
      return (
        <Link
          key={link.href}
          href={link.href}
          onClick={(e) => onLinkClick(e, link.href)}
          className={cn(
            "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 focus:outline-none",
            isActive ? "text-white" : "text-slate-300 hover:text-white",
            "focus-visible:text-white focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400"
          )}
          aria-current={isActive ? "page" : undefined}
        >
          {isActive && (
            <motion.div
              layoutId="desktop-nav-active-pill"
              className="absolute inset-0 bg-cyan-500/10 border border-cyan-400/30 rounded-full"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span className="relative z-[1]">{link.label}</span>
        </Link>
      );
    })}
  </nav>
));
DesktopNav.displayName = 'DesktopNav';

const MobileNav = memo(({ links, activeSection, onLinkClick, onClose }) => {
  const menuVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2, delay: 0.3 } },
  };

  const navContainerVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { type: "spring", stiffness: 400, damping: 40 } },
    exit: { x: "-100%", transition: { type: "spring", stiffness: 400, damping: 40, delay: 0.1 } },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
  };

  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-slate-900/70 backdrop-blur-lg z-40 md:hidden"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        variants={navContainerVariants}
        className="absolute top-0 left-0 h-full w-full max-w-xs bg-slate-900 shadow-2xl flex flex-col pt-24 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-cyan-400 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Close menu"
        >
          <FiX className="h-7 w-7" />
        </button>
        <motion.nav 
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
            className="flex flex-col gap-4"
        >
          {links.map((link) => {
            const isActive = activeSection === link.href;
            const Icon = link.icon;
            return (
              <motion.div key={link.href} variants={navItemVariants}>
                <Link
                  href={link.href}
                  onClick={(e) => onLinkClick(e, link.href)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg text-base font-semibold transition-colors duration-200 focus:outline-none",
                    isActive
                      ? "bg-slate-800 text-cyan-300"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white",
                    "focus-visible:bg-slate-800 focus-visible:text-white focus-visible:ring-2 focus-visible:ring-cyan-400"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>
      </motion.div>
    </motion.div>
  );
});
MobileNav.displayName = 'MobileNav';

const ScrollToTopButton = memo(({ isVisible, onClick }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.1, backgroundColor: "#0891B2", color: "#FFFFFF" }} /* Tweaked colors */
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        onClick={onClick}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-slate-800 text-cyan-400 border border-slate-700 shadow-lg z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-cyan-400"
        aria-label="Scroll back to top"
      >
        <FiArrowUp className="h-6 w-6" />
      </motion.button>
    )}
  </AnimatePresence>
));
ScrollToTopButton.displayName = 'ScrollToTopButton';

// --- MAIN NAVBAR COMPONENT ---
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isScrolled, direction: scrollDirection } = useScrollInfo();
  const activeSection = useActiveSection(NAV_LINKS.map(l => l.href));

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', mobileMenuOpen);
  }, [mobileMenuOpen]);

  // Use a single, memoized scroll handler
  const handleScrollTo = useCallback((e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false); // Close menu on navigation
  }, []);

  const scrollToTop = useCallback((e) => handleScrollTo(e, "#home"), [handleScrollTo]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 w-full z-30 transition-transform duration-300 ease-in-out",
          // Refined glassmorphism effect
          "bg-slate-900/80 backdrop-blur-lg",
          // Add border only when scrolled
          isScrolled ? "border-b border-slate-800" : "border-b border-transparent",
          // Hide on scroll down, show on scroll up
          scrollDirection === "down" && isScrolled ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo onClick={scrollToTop} />
            <DesktopNav links={NAV_LINKS} activeSection={activeSection} onLinkClick={handleScrollTo} />

            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleMobileMenu}
                className="p-2 rounded-full text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <FiMenu className="h-7 w-7" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileNav
            links={NAV_LINKS}
            activeSection={activeSection}
            onLinkClick={handleScrollTo}
            onClose={toggleMobileMenu}
          />
        )}
      </AnimatePresence>
      
      <ScrollToTopButton isVisible={isScrolled} onClick={scrollToTop} />
    </>
  );
}

export default memo(Navbar);