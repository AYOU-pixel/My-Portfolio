"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, type Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote, CheckCircle2, ExternalLink, Globe, Briefcase, MapPin, Calendar, Radio, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedText } from "./ui/AnimatedUnderline";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProjectDetail {
  label: string;
  value: string;
  icon: React.ElementType;
}

interface TestimonialData {
  id: number;
  hasFeedback: boolean;
  quote?: string;
  businessName: string;
  position: string;
  website: string;
  logo: string;
  projectDetails: ProjectDetail[];
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const TESTIMONIALS: TestimonialData[] = [
  {
    id: 1,
    hasFeedback: true,
    quote:
      "Ayoub transformed our online presence completely. The landing page he built for us didn't just look professional — it actually started generating WhatsApp inquiries within the first week. He understood our business goals from day one and delivered a fast, mobile-friendly experience that our members love.",
    businessName: "Olympic Jafy Gym",
    position: "Owner",
    website: "olympicjafygym.com",
    logo: "/J1.png",
    projectDetails: [
      { label: "Project Type", value: "Landing Page", icon: Briefcase },
      { label: "Industry", value: "Fitness & Gym", icon: Globe },
      { label: "Location", value: "Salé, Morocco", icon: MapPin },
      { label: "Status", value: "Live in Production", icon: Radio },
      { label: "Completed", value: "June 2026", icon: Calendar },
    ],
  },
];

// ---------------------------------------------------------------------------
// Framer Motion variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: 50,
    scale: 0.98,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariantsLeft: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -50,
    scale: 0.98,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Testimonial Card Component
// ---------------------------------------------------------------------------

interface TestimonialCardProps {
  testimonial: TestimonialData;
  isActive?: boolean;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="group relative h-full">
      <div className="glass-strong rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/[0.06] h-full">
        <div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        />

        <div className="grid md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.3fr_1fr] h-full">
          {/* Left: Testimonial Content */}
          <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="mb-6 md:mb-8">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl glass flex items-center justify-center ring-1 ring-white/[0.06]">
                  <Quote className="w-5 h-5 md:w-6 md:h-6 text-sky-400" aria-hidden="true" />
                </div>
              </div>

              {testimonial.hasFeedback && testimonial.quote ? (
                <blockquote cite={`https://${testimonial.website}`}>
                  <p className="text-lg md:text-xl lg:text-[1.35rem] text-[#E2E8F0] leading-[1.65] font-medium text-balance">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>
              ) : (
                <div className="relative">
                  <blockquote className="relative z-10">
                    <p className="text-lg md:text-xl lg:text-[1.35rem] text-[#64748B] leading-[1.65] font-medium text-balance italic">
                      &ldquo;Waiting for client feedback...&rdquo;
                    </p>
                  </blockquote>
                  <div className="absolute -inset-4 rounded-2xl border border-dashed border-white/[0.04] bg-white/[0.01] -z-0" aria-hidden="true" />
                </div>
              )}
            </div>

            <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-1 ring-white/[0.08] flex-shrink-0">
                  <Image
                    src={testimonial.logo}
                    alt={`${testimonial.businessName} logo`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="text-base md:text-lg font-semibold text-white">
                    {testimonial.businessName}
                  </p>
                  <p className="text-sm text-[#94A3B8]">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Credibility Panel */}
          <div className="relative bg-white/[0.02] border-t md:border-t-0 md:border-l border-white/[0.06] p-8 md:p-10 lg:p-12 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-8 md:mb-10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Live Website
              </span>
            </div>

            <div className="space-y-5 md:space-y-6 flex-1">
              {testimonial.projectDetails.map((detail) => (
                <div key={detail.label} className="flex items-start gap-3.5">
                  <detail.icon className="w-4 h-4 text-[#64748B] mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-0.5">
                      {detail.label}
                    </p>
                    <p className="text-sm md:text-base text-[#E2E8F0] font-medium">
                      {detail.value}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-3.5 pt-2">
                <Globe className="w-4 h-4 text-[#64748B] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-0.5">
                    Website
                  </p>
                  <a
                    href={`https://${testimonial.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-base text-sky-400 hover:text-sky-300 transition-colors duration-200 font-medium"
                  >
                    {testimonial.website}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/[0.06]">
              <motion.a
                href={`https://${testimonial.website}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit live website for ${testimonial.businessName} (opens in new tab)`}
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-white text-[#0B0F19] rounded-full font-semibold text-sm hover:bg-[#E2E8F0] active:scale-[0.98] transition-all duration-200 focus-ring"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink size={16} aria-hidden="true" />
                Visit Live Website
              </motion.a>
            </div>

            <div className="mt-5 flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] font-medium text-[#94A3B8]">
                <CheckCircle2 size={12} className="text-emerald-400" aria-hidden="true" />
                Real Client Project
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Navigation Controls
// ---------------------------------------------------------------------------

interface NavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  total: number;
  onGoTo: (index: number) => void;
}

function NavigationControls({ onPrev, onNext, currentIndex, total, onGoTo }: NavigationControlsProps) {
  return (
    <div className="flex items-center justify-center gap-6 mt-10">
      <motion.button
        onClick={onPrev}
        className="w-12 h-12 rounded-full glass-strong flex items-center justify-center ring-1 ring-white/[0.06] hover:ring-white/[0.12] transition-all duration-200 hover:scale-105 active:scale-95 group focus-ring"
        aria-label="Previous testimonial"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft size={20} className="text-[#94A3B8] group-hover:text-white transition-colors duration-200" />
      </motion.button>

      <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onGoTo(index)}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Testimonial ${index + 1} of ${total}`}
            className={`group focus-ring rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 h-2.5 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400"
                : "w-2 h-2 bg-white/[0.2] group-hover:bg-white/[0.4]"
            }`}
          />
        ))}
      </div>

      <motion.button
        onClick={onNext}
        className="w-12 h-12 rounded-full glass-strong flex items-center justify-center ring-1 ring-white/[0.06] hover:ring-white/[0.12] transition-all duration-200 hover:scale-105 active:scale-95 group focus-ring"
        aria-label="Next testimonial"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight size={20} className="text-[#94A3B8] group-hover:text-white transition-colors duration-200" />
      </motion.button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Testimonials Component
// ---------------------------------------------------------------------------

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const totalTestimonials = TESTIMONIALS.length;
  const isCarousel = totalTestimonials > 1;

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? totalTestimonials - 1 : prev - 1));
  }, [totalTestimonials]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === totalTestimonials - 1 ? 0 : prev + 1));
  }, [totalTestimonials]);

  const handleGoTo = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Auto-play with pause on hover/focus
  useEffect(() => {
    if (!isCarousel || isPaused) return;

    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [isCarousel, isPaused, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    if (!isCarousel) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCarousel, handleNext, handlePrev]);

  const getCardVariant = () => {
    return direction === 1 ? cardVariants : cardVariantsLeft;
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-padding bg-[#0B0F19] overflow-hidden"
      aria-label="Client testimonials"
    >
      <div className="container-tight">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14 md:mb-20"
        >
          <motion.div variants={itemVariants} className="mb-4 md:mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-[0.15em] text-sky-300">
              Client Feedback
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-5 md:mb-6">
            <AnimatedText
              text="Real Business. Real Results."
              textClassName="text-[clamp(1.75rem,5vw,3rem)] font-bold tracking-tight text-white leading-[1.1] text-center"
              underlineClassName="text-sky-400"
              className="items-center justify-center"
            />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed text-balance"
          >
            {isCarousel
              ? `Feedback from ${totalTestimonials} businesses I've collaborated with`
              : "Feedback from businesses I've collaborated with and projects currently running in production."}
          </motion.p>
        </motion.div>

        {/* Testimonial Display */}
        <div className="max-w-[960px] mx-auto">
          {isCarousel ? (
            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
            >
              <div className="relative overflow-hidden rounded-3xl">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentIndex}
                    variants={getCardVariant()}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full"
                  >
                    <TestimonialCard
                      testimonial={TESTIMONIALS[currentIndex]}
                      isActive={true}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <NavigationControls
                onPrev={handlePrev}
                onNext={handleNext}
                currentIndex={currentIndex}
                total={totalTestimonials}
                onGoTo={handleGoTo}
              />
            </div>
          ) : (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <TestimonialCard testimonial={TESTIMONIALS[0]} isActive={true} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}