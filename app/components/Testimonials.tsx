"use client";

import { useRef, useState, useEffect, useCallback, Fragment } from "react";
import { motion, useInView, type Variants, useMotionValue } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  Quote,
  CheckCircle2,
  ExternalLink,
  Globe,
  Briefcase,
  MapPin,
  Calendar,
  Radio,
} from "lucide-react";
import { AnimatedText } from "./ui/AnimatedUnderline";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

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
// Framer Motion variants (header only — the card stack below is GSAP-driven)
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

// ---------------------------------------------------------------------------
// Per-character quote reveal
//
// Words are kept intact as whitespace-nowrap spans (so line-wrapping stays
// natural) while each character inside gets its own span to rise in with a
// GSAP stagger. A real, plain-text copy is rendered for screen readers via
// sr-only so the split markup never affects the accessible name.
// ---------------------------------------------------------------------------

function QuoteChars({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => (
              <span key={ci} className="t-quote-char inline-block">
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Testimonial Card
// ---------------------------------------------------------------------------

interface TestimonialCardProps {
  testimonial: TestimonialData;
  cardRef?: (el: HTMLDivElement | null) => void;
  splitQuote?: boolean;
}

function TestimonialCard({ testimonial, cardRef, splitQuote = true }: TestimonialCardProps) {
  return (
    <div ref={cardRef} className="group relative h-full">
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
                  {/* Accessible plain-text copy (never split, never hidden from AT) */}
                  <p className="sr-only">{testimonial.quote}</p>
                  <p
                    aria-hidden="true"
                    style={{ perspective: "600px" }}
                    className="text-lg md:text-xl lg:text-[1.35rem] text-[#E2E8F0] leading-[1.65] font-medium text-balance"
                  >
                    &ldquo;{splitQuote ? <QuoteChars text={testimonial.quote} /> : testimonial.quote}&rdquo;
                  </p>
                </blockquote>
              ) : (
                <div className="relative">
                  <blockquote className="relative z-10">
                    <p className="text-lg md:text-xl lg:text-[1.35rem] text-muted-dim leading-[1.65] font-medium text-balance italic">
                      &ldquo;Waiting for client feedback...&rdquo;
                    </p>
                  </blockquote>
                  <div
                    className="absolute -inset-4 rounded-2xl border border-dashed border-white/[0.04] bg-white/[0.01] -z-0"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>

            <div className="t-footer mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/[0.06]">
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
                  <p className="text-sm text-muted">{testimonial.position}</p>
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
                <div key={detail.label} className="t-detail-row flex items-start gap-3.5">
                  <detail.icon className="w-4 h-4 text-muted-dim mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-dim mb-0.5">
                      {detail.label}
                    </p>
                    <p className="text-sm md:text-base text-[#E2E8F0] font-medium">{detail.value}</p>
                  </div>
                </div>
              ))}

              <div className="t-detail-row flex items-start gap-3.5 pt-2">
                <Globe className="w-4 h-4 text-muted-dim mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-dim mb-0.5">
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

            <div className="t-cta mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/[0.06]">
              <a
                href={`https://${testimonial.website}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit live website for ${testimonial.businessName} (opens in new tab)`}
                className="group/cta inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-white text-[#0B0F19] rounded-full font-semibold text-sm hover:bg-[#E2E8F0] active:scale-[0.98] transition-all duration-200 focus-ring"
              >
                <ExternalLink
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                />
                Visit Live Website
              </a>
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
// Main Testimonials Component
// ---------------------------------------------------------------------------

export default function Testimonials() {
  const N = TESTIMONIALS.length;
  const isCarousel = N > 1;

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionProgressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);
  const progressMotionValue = useMotionValue(0);

  const updateNav = useCallback(
    (progress: number) => {
      if (N <= 1) return;
      const raw = progress * (N - 1);
      const newActive = Math.min(N - 1, Math.max(0, Math.round(raw)));

      if (activeIndexRef.current !== newActive) {
        activeIndexRef.current = newActive;
      }

      if (sectionProgressRef.current) {
        sectionProgressRef.current.style.transform = `scaleX(${progress})`;
      }

      if (percentRef.current) {
        percentRef.current.textContent = `${Math.round(progress * 100)}%`;
      }

      progressMotionValue.set(progress);
    },
    [N, progressMotionValue]
  );

  const goToIndex = useCallback(
    (i: number) => {
      const clamped = Math.min(N - 1, Math.max(0, i));
      const st = stRef.current;
      if (!st || N <= 1) return;
      const target = st.start + (clamped / (N - 1)) * (st.end - st.start);
      gsap.to(window, { duration: 1, ease: "power2.inOut", scrollTo: { y: target, autoKill: true } });
    },
    [N]
  );

  useEffect(() => {
    if (prefersReducedMotion || !isCarousel) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToIndex(activeIndexRef.current - 1);
      if (e.key === "ArrowRight") goToIndex(activeIndexRef.current + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToIndex, prefersReducedMotion, isCarousel]);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      // ---------------------------------------------------------------
      // Multiple testimonials: pinned, scrubbed crossfade — same
      // architecture as the Projects scroll-storytelling experience.
      // ---------------------------------------------------------------
      if (isCarousel && pinRef.current) {
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const chars = card.querySelectorAll(".t-quote-char");
          const footer = card.querySelectorAll(".t-footer");
          const rows = card.querySelectorAll(".t-detail-row");
          const cta = card.querySelectorAll(".t-cta");

          gsap.set(card, { opacity: i === 0 ? 1 : 0, pointerEvents: i === 0 ? "auto" : "none" });
          gsap.set(chars, i === 0 ? { y: 0, opacity: 1, rotateX: 0 } : { y: 16, opacity: 0, rotateX: 35 });
          gsap.set(footer, i === 0 ? { y: 0, opacity: 1 } : { y: 14, opacity: 0 });
          gsap.set(rows, i === 0 ? { x: 0, opacity: 1 } : { x: -12, opacity: 0 });
          gsap.set(cta, i === 0 ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => `+=${(N - 1) * window.innerHeight * 1.25}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => updateNav(self.progress),
          },
        });
        stRef.current = tl.scrollTrigger as ScrollTrigger;

        for (let i = 0; i < N - 1; i++) {
          const cardOut = cardRefs.current[i];
          const cardIn = cardRefs.current[i + 1];
          if (!cardOut || !cardIn) continue;

          const charsIn = cardIn.querySelectorAll(".t-quote-char");
          const footerIn = cardIn.querySelectorAll(".t-footer");
          const rowsIn = cardIn.querySelectorAll(".t-detail-row");
          const ctaIn = cardIn.querySelectorAll(".t-cta");

          tl.to(cardOut, { opacity: 0, y: -24, scale: 0.98, duration: 0.3, ease: "power2.in" }, i);
          tl.set(cardOut, { pointerEvents: "none" }, i + 0.3);

          tl.set(cardIn, { pointerEvents: "auto" }, i + 0.05);
          tl.to(cardIn, { opacity: 1, y: 0, scale: 1, duration: 0.01, ease: "none" }, i + 0.05);

          if (charsIn.length) {
            tl.to(
              charsIn,
              { y: 0, opacity: 1, rotateX: 0, stagger: { amount: 0.4 }, duration: 0.5, ease: "power3.out" },
              i + 0.15
            );
          }
          tl.to(footerIn, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, i + 0.58);
          if (rowsIn.length) {
            tl.to(rowsIn, { x: 0, opacity: 1, stagger: { amount: 0.3 }, duration: 0.2, ease: "power2.out" }, i + 0.68);
          }
          tl.to(ctaIn, { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" }, i + 0.85);
        }

        return;
      }

      // ---------------------------------------------------------------
      // Single testimonial: no scroll-jacking needed — just a one-time
      // reveal of the same character rise when it enters the viewport.
      // ---------------------------------------------------------------
      const card = cardRefs.current[0];
      if (!card) return;

      const chars = card.querySelectorAll(".t-quote-char");
      const footer = card.querySelectorAll(".t-footer");
      const rows = card.querySelectorAll(".t-detail-row");
      const cta = card.querySelectorAll(".t-cta");

      gsap.set(card, { opacity: 0, y: 32, scale: 0.98 });
      gsap.set(chars, { y: 16, opacity: 0, rotateX: 35 });
      gsap.set(footer, { y: 14, opacity: 0 });
      gsap.set(rows, { x: -12, opacity: 0 });
      gsap.set(cta, { y: 12, opacity: 0 });

      ScrollTrigger.create({
        trigger: card,
        start: "top 82%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.6 })
            .to(chars, { y: 0, opacity: 1, rotateX: 0, stagger: { amount: 0.5 }, duration: 0.55 }, 0.1)
            .to(footer, { y: 0, opacity: 1, duration: 0.3 }, 0.5)
            .to(rows, { x: 0, opacity: 1, stagger: { amount: 0.3 }, duration: 0.25 }, 0.6)
            .to(cta, { y: 0, opacity: 1, duration: 0.25 }, 0.8);
        },
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, isCarousel], revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-padding bg-[#0B0F19] overflow-hidden relative"
      aria-label="Client testimonials"
    >
      <div className="container-tight">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          className="text-center mb-14 md:mb-20"
        >
          <motion.div ref={headerRef} variants={itemVariants} className="mb-4 md:mb-5">
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
            className="text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed text-balance"
          >
            {isCarousel
              ? `Feedback from ${N} businesses I've collaborated with`
              : "Feedback from businesses I've collaborated with and projects currently running in production."}
          </motion.p>
        </motion.div>
      </div>

      {prefersReducedMotion ? (
        // -----------------------------------------------------------
        // Reduced-motion fallback: plain stacked cards, no split text,
        // no pin, no scroll-jacking.
        // -----------------------------------------------------------
        <div className="container-tight">
          <div className="max-w-[960px] mx-auto flex flex-col gap-8">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} splitQuote={false} />
            ))}
          </div>
        </div>
      ) : isCarousel ? (
        // -----------------------------------------------------------
        // Cinematic pinned scroll-storytelling experience
        // -----------------------------------------------------------
        <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
          <div
            ref={sectionProgressRef}
            className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 origin-left scale-x-0 z-20 will-change-transform"
            aria-hidden="true"
          />

          <div className="relative h-full container-tight flex items-center">
            <div className="relative w-full max-w-[960px] mx-auto h-[70vh] md:h-[62vh]">
              {TESTIMONIALS.map((t, i) => (
                <div key={t.id} className="absolute inset-0 will-change-opacity">
                  <TestimonialCard
                    testimonial={t}
                    cardRef={(el) => {
                      cardRefs.current[i] = el;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Circular scroll progress */}
          <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 z-20">
            <div className="group bg-white/5 flex size-12 items-center justify-center rounded-2xl border border-white/10 backdrop-blur-md ring-1 ring-white/[0.06]">
              <span
                ref={percentRef}
                className="absolute -top-1 flex h-8 -translate-y-full items-center justify-center px-4 text-xs font-medium tabular-nums text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                0%
              </span>
              <svg className="size-10" viewBox="0 0 48 48" role="presentation">
                <circle
                  cx="24"
                  cy="24"
                  r={18}
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-white/20"
                  fill="none"
                />
                <motion.circle
                  cx="24"
                  cy="24"
                  r={18}
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  style={{
                    pathLength: progressMotionValue,
                    rotate: -90,
                    transformOrigin: "50% 50%",
                  }}
                  className="text-sky-400"
                />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        // -----------------------------------------------------------
        // Single testimonial: no pin, one-time scroll-in reveal
        // -----------------------------------------------------------
        <div className="container-tight">
          <div className="max-w-[960px] mx-auto">
            <TestimonialCard
              testimonial={TESTIMONIALS[0]}
              cardRef={(el) => {
                cardRefs.current[0] = el;
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}