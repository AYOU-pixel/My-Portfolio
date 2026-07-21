"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, type Variants, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

const mobileMenuVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -8, 
    scale: 0.98,
    transition: { duration: 0.15, ease: "easeIn" }
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.25, 
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.04,
      delayChildren: 0.05
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  }),
};

const hamburgerVariants: Variants = {
  initial: { rotate: -45, opacity: 0, scale: 0.8 },
  animate: { rotate: 0, opacity: 1, scale: 1 },
  exit: { rotate: 45, opacity: 0, scale: 0.8 },
};

// Hoisted so both desktop and (future) mobile variants share one source of truth
function navLinkClasses(isActive: boolean) {
  return `relative px-4 py-2.5 text-sm font-medium rounded-lg focus-ring group inline-block transition-colors duration-200 touch-target ${
    isActive ? "text-white" : "text-[#94A3B8] hover:text-white"
  }`;
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const headerRef = useRef<HTMLElement>(null);
  const yTo = useRef<((value: number) => void) | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // GSAP scroll-hide / background-blur / active section effect
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    yTo.current = gsap.quickTo(header, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const bgTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "60px top",
      onEnter: () => {
        gsap.to(header, {
          backgroundColor: "rgba(11, 15, 25, 0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          duration: 0.25,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(header, {
          backgroundColor: "rgba(11, 15, 25, 0)",
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
          duration: 0.25,
          ease: "power2.out",
        });
      },
    });

    const handleWindowScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const viewportHeight = window.innerHeight;

        // Navbar hide/show with improved threshold
        if (currentY < 60) {
          yTo.current?.(0);
        } else if (currentY > lastScrollY.current && currentY > 120) {
          yTo.current?.(-100);
          setIsMobileMenuOpen(false);
        } else if (currentY < lastScrollY.current) {
          yTo.current?.(0);
        }
        lastScrollY.current = currentY;

        // Active section detection with refined offset
        let currentSection = "#home";
        for (const link of NAV_LINKS) {
          const id = link.href.slice(1);
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= viewportHeight * 0.35) {
              currentSection = link.href;
            }
          }
        }
        setActiveSection(currentSection);

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    handleWindowScroll();

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      bgTrigger.kill();
    };
  }, []);

  // Lock body scroll, handle Escape, and trap focus when mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    lastFocusedElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }

      if (e.key === "Tab" && mobileMenuRef.current) {
        const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!first || !last) return;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      const firstLink = mobileMenuRef.current?.querySelector<HTMLElement>("a");
      firstLink?.focus();
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      lastFocusedElement.current?.focus();
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [],
  );

  // Spring config for micro-interactions (150-300ms feel)
  const springMicro = {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
    mass: 0.8,
  };

  const gentleSpring = {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
    mass: 0.8,
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 will-change-transform safe-top"
        style={{ transform: "translateY(0)" }}
      >
        <div className="container-tight">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo — Improved touch target */}
            <Link
              href="#home"
              prefetch={false}
              onClick={(e) => handleNavClick(e, "#home")}
              className="relative z-10 rounded-full focus-ring touch-target flex items-center justify-center -ml-2"
              aria-label="Go to homepage"
            >
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.06, rotate: 2 }}
                whileTap={{ scale: 0.94 }}
                transition={springMicro}
              >
                <Image
                  src="/logo.png"
                  alt="Ayoub Rachidi"
                  width={40}
                  height={40}
                  className="rounded-full object-cover ring-1 ring-white/10 w-9 h-9 sm:w-10 sm:h-10"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Nav — Refined spacing and touch targets */}
            <nav className="hidden md:flex items-center gap-0.5" aria-label="Primary navigation">
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={shouldReduceMotion ? {} : { y: -1 }}
                  whileTap={{ scale: 0.97, y: 0 }}
                  transition={springMicro}
                >
                  <Link
                    href={link.href}
                    prefetch={false}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={activeSection === link.href ? "page" : undefined}
                    className={navLinkClasses(activeSection === link.href)}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {activeSection === link.href && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute bottom-1.5 left-4 right-4 h-px bg-sky-400"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {activeSection !== link.href && (
                      <span className="absolute bottom-1.5 left-4 right-4 h-px bg-white/30 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                    )}
                    <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-200" />
                  </Link>
                </motion.div>
              ))}

              {/* CTA — Refined hover state */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97, y: 0 }}
                transition={springMicro}
                className="ml-3 relative"
              >
                <Link
                  href="#contact"
                  prefetch={false}
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold bg-white text-[#0B0F19] rounded-full hover:bg-[#E2E8F0] active:bg-[#CBD5E1] transition-colors duration-200 focus-ring overflow-hidden group touch-target"
                >
                  <span className="relative z-10">Let&apos;s Talk</span>
                </Link>
              </motion.div>
            </nav>

            {/* Mobile menu toggle — Larger touch target */}
            <motion.button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              transition={springMicro}
              className="md:hidden relative z-10 p-3 -mr-2 text-[#94A3B8] hover:text-white transition-colors rounded-xl focus-ring touch-target"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.span
                    key="close"
                    variants={hamburgerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <X size={22} strokeWidth={2} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    variants={hamburgerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <Menu size={22} strokeWidth={2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay — Improved spacing and readability */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            aria-hidden={!isMobileMenuOpen}
          >
            <div
              className="absolute inset-0 bg-[#0B0F19]/95 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.nav
              id="mobile-menu"
              ref={mobileMenuRef}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-[4.5rem] left-3 right-3 sm:left-4 sm:right-4 bg-[#0B0F19]/98 border border-white/[0.06] rounded-2xl p-2 flex flex-col gap-0.5 shadow-2xl shadow-black/40"
              aria-label="Mobile navigation"
              aria-modal="true"
              role="dialog"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={shouldReduceMotion ? {} : { x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={gentleSpring}
                >
                  <Link
                    href={link.href}
                    prefetch={false}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={activeSection === link.href ? "page" : undefined}
                    className={`flex items-center px-4 py-3.5 text-[15px] font-medium rounded-xl transition-all active:scale-[0.98] touch-target ${
                      activeSection === link.href
                        ? "text-white bg-white/5"
                        : "text-[#E2E8F0] hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-1 pt-3 pb-1 px-1 border-t border-white/10">
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springMicro}
                >
                  <Link
                    href="#contact"
                    prefetch={false}
                    onClick={(e) => handleNavClick(e, "#contact")}
                    className="flex items-center justify-center w-full text-center px-5 py-3.5 text-sm font-semibold bg-white text-[#0B0F19] rounded-full active:bg-[#CBD5E1] transition-colors overflow-hidden relative focus-ring touch-target"
                  >
                    <span className="relative z-10">Let&apos;s Talk</span>
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}