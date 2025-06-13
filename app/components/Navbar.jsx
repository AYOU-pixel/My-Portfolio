"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiUser, FiBriefcase, FiMail, FiX, FiMenu, FiArrowUp } from "react-icons/fi";

// --- UTILITY: Classname Merger (Unchanged) ---
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// --- DATA CONSTANTS (Slightly adjusted for clarity) ---
const NAV_LINKS = [
  { href: "#home", label: "Home", icon: FiUser },
  { href: "#about", label: "About", icon: FiUser },
  { href: "#projects", label: "Projects", icon: FiBriefcase },
  { href: "#contact", label: "Contact", icon: FiMail },
];

// --- CUSTOM HOOKS ---

// IMPROVEMENT: Simplified scroll direction logic
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

// IMPROVEMENT: More intuitive active section highlighting
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
      { rootMargin } // Highlights when a section is in the top 25% of the viewport
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
  <Link href="#home" onClick={onClick} aria-label="Return to top of page" className="z-10">
    <motion.div
      className="relative group w-12 h-12"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <Image
        src="/ayoub.webp"
        alt="Ayoub's Logo"
        fill
        className="rounded-full object-cover border-2 border-slate-700 group-hover:border-cyan-400 transition-colors duration-300"
        priority
        sizes="48px"
      />
    </motion.div>
  </Link>
));
Logo.displayName = 'Logo';

const DesktopNav = memo(({ links, activeSection, onLinkClick }) => (
  <nav className="hidden md:flex items-center bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-full px-3 py-1.5 shadow-md">
    {links.map((link) => {
      const isActive = activeSection === link.href;
      return (
        <Link
          key={link.href}
          href={link.href}
          onClick={(e) => onLinkClick(e, link.href)}
          className={cn(
            "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
            isActive ? "text-cyan-300" : "text-slate-300 hover:text-white"
          )}
          aria-current={isActive ? "page" : undefined}
        >
          {isActive && (
            <motion.div
              layoutId="desktop-nav-active-pill"
              className="absolute inset-0 bg-cyan-500/10 rounded-full"
              style={{ originY: "0px" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
            />
          )}
          <span className="relative z-[1]">{link.label}</span>
        </Link>
      );
    })}
  </nav>
));
DesktopNav.displayName = 'DesktopNav';

const MobileNav = memo(({ links, activeSection, onLinkClick, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 bg-slate-900/80 backdrop-blur-lg z-40 md:hidden"
    onClick={onClose}
    aria-modal="true"
    role="dialog"
  >
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="absolute top-0 left-0 h-full w-full max-w-xs bg-slate-900 shadow-2xl flex flex-col pt-28 p-8"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-7 right-6 p-2 text-slate-400 hover:text-cyan-400"
        aria-label="Close menu"
      >
        <FiX className="h-7 w-7" />
      </button>
      <nav className="flex flex-col gap-5">
        {links.map((link) => {
          const isActive = activeSection === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => onLinkClick(e, link.href)}
              className={cn(
                "flex items-center gap-4 p-3 rounded-xl text-lg font-semibold transition-all duration-300 transform",
                isActive
                  ? "bg-slate-800 text-cyan-400"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-6 h-6" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </motion.div>
  </motion.div>
));
MobileNav.displayName = 'MobileNav';


const ScrollToTopButton = memo(({ isVisible, onClick }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        whileHover={{ scale: 1.1, backgroundColor: "#06B6D4", color: "#FFFFFF" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={onClick}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-slate-800 text-cyan-400 border border-slate-700 shadow-lg z-50"
        aria-label="Back to top"
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

  // IMPROVEMENT: Body scroll lock logic is cleaner.
  useEffect(() => {
    document.body.classList.toggle('no-scroll', mobileMenuOpen);
  }, [mobileMenuOpen]);

  // IMPROVEMENT: Simplified scroll handler thanks to global CSS.
  const handleScrollTo = useCallback((e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false); // Always close menu on navigation
  }, []);

  const scrollToTop = useCallback((e) => handleScrollTo(e, "#home"), [handleScrollTo]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 w-full z-50 transition-transform duration-500 ease-in-out",
          "bg-slate-900/60 backdrop-blur-lg border-b border-transparent",
          isScrolled && "border-slate-800/50",
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
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg text-slate-300 hover:text-cyan-400 transition-colors"
                aria-label="Open menu"
                aria-expanded="false"
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
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <ScrollToTopButton isVisible={isScrolled} onClick={scrollToTop} />
    </>
  );
}

export default memo(Navbar);