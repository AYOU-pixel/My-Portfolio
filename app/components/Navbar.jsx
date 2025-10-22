// Navbar.jsx - Unified Design
"use client";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiBriefcase, FiMail, FiX, FiMenu, FiArrowUp } from "react-icons/fi";
import { clsx } from "clsx";

const cn = clsx;

const NAV_LINKS = [
  { href: "#home", label: "Home", icon: FiUser },
  { href: "#projects", label: "Projects", icon: FiBriefcase },
  { href: "#about", label: "About", icon: FiUser },
  { href: "#contact", label: "Contact", icon: FiMail },
];

// Hook to track scroll
function useScrollInfo() {
  const [scrollInfo, setScrollInfo] = useState({ direction: "up", isScrolled: false });
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateScrollInfo = () => {
      const currentScrollY = window.scrollY;
      setScrollInfo({
        isScrolled: currentScrollY > 50,
        direction: currentScrollY > lastScrollY.current ? "down" : "up",
      });
      lastScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY;
    };
    window.addEventListener("scroll", updateScrollInfo, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollInfo);
  }, []);

  return scrollInfo;
}

// Hook to get active section
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
      const el = document.getElementById(id.substring(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return activeSection;
}

// Logo component
const Logo = memo(({ onClick }) => (
  <Link
    href="#home"
    onClick={onClick}
    aria-label="Return to top"
    className="z-10 group rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <Image
        src="/logo.png"
        alt="Ayoub's Logo"
        width={44}
        height={44}
        className="rounded-full object-cover border border-slate-600 group-hover:border-sky-400 transition-colors duration-300"
        priority
      />
    </motion.div>
  </Link>
));
Logo.displayName = "Logo";

// Desktop Nav
const DesktopNav = memo(({ links, activeSection, onLinkClick }) => (
  <nav className="hidden md:flex items-center bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-full px-3 py-1.5 shadow-lg">
    {links.map((link) => {
      const isActive = activeSection === link.href;
      return (
        <Link
          key={link.href}
          href={link.href}
          onClick={(e) => onLinkClick(e, link.href)}
          className={cn(
            "relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400",
            isActive ? "text-white" : "text-slate-300 hover:text-white"
          )}
          aria-current={isActive ? "page" : undefined}
        >
          {isActive && (
            <motion.div
              layoutId="desktop-nav-active-pill"
              className="absolute inset-0 z-0 bg-slate-700/50 rounded-full border border-slate-500/30"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span className="relative z-10">{link.label}</span>
        </Link>
      );
    })}
  </nav>
));
DesktopNav.displayName = "DesktopNav";

// Mobile Nav
const MobileNav = memo(({ links, activeSection, onLinkClick, onClose }) => {
  const menuVariants = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1 }, 
    exit: { opacity: 0 } 
  };
  const navContainerVariants = { 
    hidden: { x: "-100%" }, 
    visible: { x: 0 }, 
    exit: { x: "-100%" } 
  };
  const navItemVariants = { 
    hidden: { opacity: 0, x: -20 }, 
    visible: { opacity: 1, x: 0 } 
  };

  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-40 md:hidden"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        variants={navContainerVariants}
        className="absolute top-0 left-0 h-full w-full max-w-xs bg-slate-900 shadow-xl flex flex-col pt-20 p-6 border-r border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-slate-400 hover:text-sky-400 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          aria-label="Close menu"
        >
          <FiX className="h-6 w-6" />
        </button>
        <motion.nav
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          className="flex flex-col gap-2"
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
                    "flex items-center gap-3 p-3 rounded-lg text-base font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                    isActive
                      ? "bg-slate-800 text-sky-300 border border-slate-700"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
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
MobileNav.displayName = "MobileNav";

// Scroll to top
const ScrollToTopButton = memo(({ isVisible, onClick }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.05, backgroundColor: "#0ea5e9" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        onClick={onClick}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-slate-800 text-sky-400 border border-slate-700 shadow-lg z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-sky-400"
        aria-label="Scroll back to top"
      >
        <FiArrowUp className="h-5 w-5" />
      </motion.button>
    )}
  </AnimatePresence>
));
ScrollToTopButton.displayName = "ScrollToTopButton";

// Main Navbar
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isScrolled, direction: scrollDirection } = useScrollInfo();
  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.href));

  useEffect(() => {
    document.body.classList.toggle("no-scroll", mobileMenuOpen);
  }, [mobileMenuOpen]);

  const handleScrollTo = useCallback((e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }, []);

  const scrollToTop = useCallback((e) => handleScrollTo(e, "#home"), [handleScrollTo]);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((prev) => !prev), []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 w-full z-30 transition-all duration-300 ease-in-out bg-slate-900/90 backdrop-blur-md border-b",
          isScrolled ? "border-slate-800" : "border-transparent",
          scrollDirection === "down" && isScrolled ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo onClick={scrollToTop} />
            <DesktopNav links={NAV_LINKS} activeSection={activeSection} onLinkClick={handleScrollTo} />
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileMenu}
                className="p-2 rounded-full text-slate-300 hover:text-sky-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <FiMenu className="h-6 w-6" />
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
