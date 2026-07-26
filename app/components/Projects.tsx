"use client";

import { useState } from "react";
import { useReducedMotion, motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, TrendingUp } from "lucide-react";
import { FaReact, FaHtml5, FaStripeS } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiPrisma, SiFramer } from "react-icons/si";
import type { IconType } from "react-icons";
import { AnimatedText } from "./ui/AnimatedUnderline";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TechConfig {
  icon: IconType;
  color: string;
}

interface Project {
  id: number;
  title: string;
  /** One-line business framing shown as an eyebrow — who this was built for. */
  client: string;
  /** Ordered screenshots — first is the default view shown in the frame. */
  images: string[];
  link: string;
  github: string;
  tags: string[];
  problem: string;
  solution: string;
  /** Qualitative, real outcomes only — never invented numbers. Shown first. */
  results: string[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TECH_ICONS: Record<string, TechConfig> = {
  React: { icon: FaReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#ffffff" },
  Prisma: { icon: SiPrisma, color: "#5A67D8" },
  Stripe: { icon: FaStripeS, color: "#635BFF" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38BDF8" },
  HTML: { icon: FaHtml5, color: "#E34F26" },
  "Framer Motion": { icon: SiFramer, color: "#EF476F" },
};

const FALLBACK_TECH: TechConfig = { icon: SiFramer, color: "#94A3B8" };

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Olympic Jafy Gym",
    client: "Local fitness gym — Salé, Morocco",
    images: ["/herogym.png", "/gym2.png", "/gym3.png"],
    link: "https://www.olympicjafygym.com",
    github: "https://github.com/AYOU-pixel/Jafy_gym",
    tags: ["React", "Next.js", "Tailwind CSS"],
    problem:
      "No online presence. People couldn't find class info, pricing, or how to get in touch, and the gym was losing leads to competitors who had a website.",
    solution:
      "A mobile-first landing page with a WhatsApp CTA always one tap away, and a clear program breakdown that answers pricing questions before anyone has to ask.",
    results: [
      "One-tap path from any screen to a WhatsApp inquiry",
      "Built mobile-first for an audience that's 80%+ on phone",
      "Fast load on typical mobile connections",
    ],
  },
  {
    id: 2,
    title: "FitFood",
    client: "Healthy meal delivery service",
    images: ["/herofood.png", "/fitfod2.png", "/fitfod3.png"],
    link: "https://healthy-food-six-lilac.vercel.app",
    github: "https://github.com/AYOU-pixel/Healthy-Meals",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    problem:
      "Customers had no clear way to browse the menu or order online, so sales went to delivery apps taking a cut on every order.",
    solution:
      "A scannable menu with category filters and a frictionless WhatsApp ordering flow, so customers can go from browsing to ordering with no third-party app in the way.",
    results: [
      "Removed the delivery-app middleman from the ordering flow",
      "Menu is scannable and filterable, not one long list",
      "Smooth transitions that don't get in the way of ordering",
    ],
  },
  {
    id: 3,
    title: "Aura Store",
    client: "Fashion e-commerce concept",
    images: ["/heroclothes.png", "/clothes2.png", "/clothes3.png"],
    link: "https://clothes-store-six-indol.vercel.app",
    github: "https://github.com/AYOU-pixel/Clothes-Store",
    tags: ["Next.js", "MongoDB", "Tailwind CSS", "Stripe"],
    problem:
      "Small fashion brands are stuck with generic Shopify templates and a monthly fee, with no way to own a storefront that actually looks like their brand.",
    solution:
      "A full-stack storefront with secure Stripe checkout and Google sign-in, built custom instead of templated — proof a small brand can own its site outright.",
    results: [
      "Secure checkout end-to-end with Stripe",
      "One-click sign-in, no account-creation friction",
      "A storefront that's owned, not rented from a template",
    ],
  },
];

// ---------------------------------------------------------------------------
// Motion
// ---------------------------------------------------------------------------

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ResultChips({ results }: { results: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5 mb-5">
      {results.map((r) => (
        <li key={r} className="flex gap-2 items-start text-[13px] text-[#CBD5E1] leading-relaxed">
          <TrendingUp className="w-3.5 h-3.5 text-sky-400 mt-[2px] flex-shrink-0" aria-hidden="true" />
          <span>{r}</span>
        </li>
      ))}
    </ul>
  );
}

function TechRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-6 pt-5 border-t border-white/[0.06]">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#475569] mr-1">
        Built with
      </span>
      {tags.map((tag) => {
        const tech = TECH_ICONS[tag] ?? FALLBACK_TECH;
        const Icon = tech.icon;
        return (
          <span key={tag} className="inline-flex items-center gap-1.5 text-[11px] text-[#64748B]">
            <Icon className="w-3 h-3" style={{ color: tech.color }} aria-hidden="true" />
            {tag}
          </span>
        );
      })}
    </div>
  );
}

function ProjectGallery({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const domain = project.link.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="bg-[#0a0f1a]">
      {/* Fake browser chrome — frames every screenshot as "a live site you
          can visit" rather than "a picture of a design." The domain is real. */}
      <div className="flex items-center gap-1.5 h-8 px-3 border-b border-white/[0.06]">
        <span className="w-2 h-2 rounded-full bg-white/10" aria-hidden="true" />
        <span className="w-2 h-2 rounded-full bg-white/10" aria-hidden="true" />
        <span className="w-2 h-2 rounded-full bg-white/10" aria-hidden="true" />
        <span className="ml-2 text-[10px] text-[#64748B] truncate font-mono">{domain}</span>
      </div>

      <div className="relative h-[190px] sm:h-[210px]">
        {project.images.map((img, i) => (
          <Image
            key={img}
            src={img}
            alt={`${project.title} — screenshot ${i + 1} of ${project.images.length}`}
            fill
            className={`object-cover object-top transition-opacity duration-500 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* Click-to-switch thumbnails — user-controlled, no autoplay, no modal. */}
      {project.images.length > 1 && (
        <div className="flex gap-2 px-3 py-2.5" role="tablist" aria-label={`${project.title} screenshots`}>
          {project.images.map((img, i) => (
            <button
              key={img}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`View screenshot ${i + 1} of ${project.images.length} for ${project.title}`}
              onClick={() => setActive(i)}
              className={`relative w-12 h-8 sm:w-14 sm:h-9 rounded-md overflow-hidden ring-1 transition-all duration-200 focus-ring ${
                i === active ? "ring-sky-400/70 opacity-100" : "ring-white/[0.06] opacity-45 hover:opacity-75"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="56px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="group relative rounded-2xl lg:rounded-3xl"
    >
      {/* Signature element: a single hover-triggered rotating gradient ring,
          using the page's own sky→indigo→purple accent (matches Hero + scroll
          progress bar) rather than an unrelated palette. Off by default —
          the boldness is spent once, on interaction, not looping forever. */}
      <div
        aria-hidden="true"
        className="absolute -inset-[2px] rounded-2xl lg:rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      >
        <div className="absolute -inset-1/2 animate-[spin_7s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running] bg-[conic-gradient(from_0deg,#38bdf8,#818cf8,#a78bfa,#38bdf8)] blur-md opacity-70" />
      </div>

      <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-[#0d1525] ring-1 ring-white/[0.06] shadow-2xl shadow-black/20">
        <ProjectGallery project={project} />

        <div className="p-6 lg:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-400/80 mb-1.5">
            {project.client}
          </p>
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">{project.title}</h3>

          <ResultChips results={project.results} />

          <div className="space-y-2.5 text-[13px] text-[#94A3B8] leading-relaxed">
            <p>
              <span className="text-white/70 font-medium">Problem — </span>
              {project.problem}
            </p>
            <p>
              <span className="text-white/70 font-medium">Solution — </span>
              {project.solution}
            </p>
          </div>

          <TechRow tags={project.tags} />

          <div className="flex items-center gap-5 mt-6">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live site for ${project.title} (opens in new tab)`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0B0F19] rounded-full font-semibold text-sm hover:bg-[#E2E8F0] active:scale-95 transition-all duration-200 focus-ring"
            >
              View live site
              <ExternalLink size={15} aria-hidden="true" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.title} on GitHub (opens in new tab)`}
              className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-white transition-colors duration-200 focus-ring rounded"
            >
              <Github size={15} aria-hidden="true" />
              Source
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="section-padding bg-[#0B0F19] relative"
      aria-label="Selected projects showcase"
    >
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16 lg:mb-20"
        >
          <AnimatedText
            text="Work that earns its keep"
            textClassName="text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight text-white leading-[1.1] text-left"
            underlineClassName="text-sky-400"
            className="items-start mb-4 md:mb-6"
          />
          <p className="text-base md:text-lg text-[#94A3B8] max-w-2xl leading-relaxed text-balance">
            Three businesses, three different problems — traffic that didn&apos;t convert, a menu
            nobody could browse, a storefront that didn&apos;t exist yet. Here&apos;s what changed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}