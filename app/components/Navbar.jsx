"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiUser, FiCode, FiBriefcase, FiMail, FiX, FiMenu, FiArrowUp } from "react-icons/fi";

// --- UTILITY: Classname Merger ---
// A lightweight utility to merge class names, avoiding an external dependency.
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// --- DATA CONSTANTS ---
const NAV_LINKS = [
  { href: "#home", label: "Home", icon: FiUser },
  { href: "#about", label: "About", icon: FiUser },
  { href: "#projects", label: "Projects", icon: FiBriefcase },
  { href: "#contact", label: "Contact", icon: FiMail },
];

// --- CUSTOM HOOKS for cleaner logic ---

// Detects scroll direction and if the page has been scrolled
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY.current) {
          setScrollDirection("down");
        } else {
          setScrollDirection("up");
        }
      } else {
        setIsScrolled(false);
        setScrollDirection("up");
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return { scrollDirection, isScrolled };
}

// Manages active section highlighting with IntersectionObserver
function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" } // Highlights the section in the middle 30% of the viewport
    );

    sectionIds.forEach((id) => {
      const element = document.querySelector(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}


// --- SUB-COMPONENTS for better modularity ---

const Logo = memo(({ onClick }) => (
  <Link href="#home" onClick={onClick} aria-label="Return to top of page">
    <motion.div
      className="relative group w-12 h-12"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image
        src="/ayoub.webp" // Assuming this is your logo/profile image
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

const DesktopNav = memo(({ links, activeSection, onLinkClick }) => {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <nav className="hidden md:flex items-center bg-slate-800/60 border border-slate-700 rounded-full px-4 py-2">
      {links.map((link) => {
        const isActive = activeSection === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={(e) => onLinkClick(e, link.href)}
            onMouseEnter={() => setHoveredLink(link.href)}
            onMouseLeave={() => setHoveredLink(null)}
            className={cn(
              "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300",
              isActive ? "text-white" : "text-slate-400 hover:text-white"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {link.label}
            {(isActive || hoveredLink === link.href) && (
              <motion.div
                layoutId="desktop-nav-pill"
                className="absolute inset-0 bg-cyan-500/20 rounded-full z-[-1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
});
DesktopNav.displayName = 'DesktopNav';


const MobileNav = memo(({ links, activeSection, onLinkClick, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/70 backdrop-blur-lg z-40 md:hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute top-0 left-0 h-full w-full max-w-xs bg-slate-900 shadow-2xl flex flex-col pt-24 p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
      >
        <nav className="flex flex-col gap-4">
          {links.map((link) => {
            const isActive = activeSection === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => onLinkClick(e, link.href)}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-lg text-lg font-medium transition-colors duration-300",
                  isActive ? "bg-slate-800 text-cyan-400" : "text-slate-300 hover:bg-slate-800/50"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </motion.div>
    </motion.div>
  );
});
MobileNav.displayName = 'MobileNav';

const ScrollToTopButton = memo(({ isVisible, onClick }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        whileHover={{ scale: 1.1, backgroundColor: "#06B6D4", color: "#FFFFFF" }}
        whileTap={{ scale: 0.9 }}
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
  const [hydrated, setHydrated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const { scrollDirection, isScrolled } = useScrollDirection();
  const activeSection = useActiveSection(NAV_LINKS.map(l => l.href));

  const navBgOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const navShadowOpacity = useTransform(scrollY, [0, 50], [0, 0.1]);

  useEffect(() => {
    setHydrated(true);
    document.documentElement.classList.add("dark");
  }, []);
  
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  const handleScrollTo = useCallback((e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);
  
  const scrollToTop = (e) => handleScrollTo(e, "#home");

  if (!hydrated) {
    // Render a minimal placeholder or null on the server to prevent hydration mismatch
    return <header className="fixed top-0 w-full h-20 z-50" />;
  }
  
  return (
    <>
      <motion.header
        style={{
          backgroundColor: `rgba(15, 23, 42, ${navBgOpacity.get()})`, // slate-900
          boxShadow: `0 10px 30px -10px rgba(2, 12, 27, ${navShadowOpacity.get()})`,
        }}
        className={cn(
          "fixed top-0 w-full z-50 transition-transform duration-300 backdrop-blur-lg border-b border-slate-800/50",
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
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-cyan-400 transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
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