//..ui/flip-card.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";

export interface FlipCardData {
  image: string;
  name: string;
  role: string;
  location: string;
  availability: string;
  /** Short, summarized background — this is the entire back face, keep it tight. */
  summary: string;
}

interface FlipCardProps {
  data: FlipCardData;
}

const cardVariants = {
  front: { rotateY: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  back: { rotateY: 180, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const reducedMotionVariants = {
  front: { opacity: 1, transition: { duration: 0.2 } },
  back: { opacity: 0, transition: { duration: 0.2 } },
};

export function FlipCard({ data }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    // Resolve once on mount, based on actual pointer capability rather than
    // touch event support alone (hybrid touch-laptops report both).
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsTouchDevice(!mq.matches);
  }, []);

  const handleClick = () => {
    if (isTouchDevice) setIsFlipped((v) => !v);
  };
  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsFlipped(true);
  };
  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsFlipped(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped((v) => !v);
    }
  };

  return (
    <div
      className="relative w-full max-w-[360px] sm:max-w-[400px] h-[440px] sm:h-[480px] mx-auto cursor-pointer focus-ring rounded-2xl"
      style={{ perspective: "1200px" }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
      aria-label={`${data.name}. Press Enter to reveal background summary`}
    >
      {/* FRONT: photo + practical info */}
      <motion.div
        className="absolute inset-0 [backface-visibility:hidden] rounded-2xl glass-strong ring-1 ring-white/[0.06] shadow-2xl flex flex-col items-center text-center px-7 py-9 sm:px-8 sm:py-10"
        animate={isFlipped ? "back" : "front"}
        variants={shouldReduceMotion ? reducedMotionVariants : cardVariants}
        style={shouldReduceMotion ? undefined : { transformStyle: "preserve-3d" }}
        aria-hidden={isFlipped}
      >
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-1 ring-white/[0.08] mb-5 sm:mb-6">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-cover"
            sizes="144px"
          />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{data.name}</h3>
        <p className="text-sm font-medium text-sky-400 mb-6 sm:mb-8">{data.role}</p>

        <div className="space-y-2.5 text-sm text-muted">
          <div className="flex items-center justify-center gap-2">
            <MapPin size={15} aria-hidden="true" />
            <span>{data.location}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mail size={15} aria-hidden="true" />
            <span>{data.availability}</span>
          </div>
        </div>

        <p className="mt-auto pt-6 text-[11px] font-medium text-muted-dim uppercase tracking-[0.15em]">
          {isTouchDevice ? "Tap to flip" : "Hover to flip"}
        </p>
      </motion.div>

      {/* BACK: summarized background */}
      <motion.div
        className="absolute inset-0 [backface-visibility:hidden] rounded-2xl glass-strong ring-1 ring-white/[0.06] shadow-2xl flex flex-col justify-center px-7 py-9 sm:px-8 sm:py-10"
        initial={shouldReduceMotion ? { opacity: 0 } : { rotateY: 180 }}
        animate={isFlipped ? "front" : "back"}
        variants={shouldReduceMotion ? reducedMotionVariants : cardVariants}
        style={shouldReduceMotion ? undefined : { transformStyle: "preserve-3d", rotateY: 180 }}
        aria-hidden={!isFlipped}
      >
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-dim mb-4">
          Background
        </h3>
        <p className="text-[15px] sm:text-base text-[#E2E8F0] leading-relaxed text-balance">
          {data.summary}
        </p>
      </motion.div>
    </div>
  );
}