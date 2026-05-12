"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MapPin, Mail, Briefcase, Award, Calendar, Zap } from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiNextdotjs, SiTailwindcss, SiTypescript, SiPrisma,
  SiExpress, SiMongodb, SiGit, SiFigma,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Data ──────────────────────────────────────────────────────────────────

const STATS = [
  { icon: Briefcase, label: "Projects",     value: "12+", numeric: 12 },
  { icon: Award,     label: "Satisfaction", value: "95%", numeric: 95 },
  { icon: Calendar,  label: "Experience",   value: "1+",  numeric: 1  },
  { icon: Zap,       label: "Technologies", value: "20+", numeric: 20 },
];

const SKILLS = [
  {
    category: "Frontend",
    items: [
      { name: "React",       icon: FaReact,      color: "#61DAFB", glow: "rgba(97,218,251,0.35)"  },
      { name: "Next.js",     icon: SiNextdotjs,  color: "#ffffff", glow: "rgba(255,255,255,0.2)"  },
      { name: "TypeScript",  icon: SiTypescript, color: "#3178C6", glow: "rgba(49,120,198,0.35)"  },
      { name: "Tailwind CSS",icon: SiTailwindcss,color: "#38BDF8", glow: "rgba(56,189,248,0.35)"  },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: FaNodeJs,   color: "#339933", glow: "rgba(51,153,51,0.35)"   },
      { name: "Express", icon: SiExpress,  color: "#ffffff", glow: "rgba(255,255,255,0.15)" },
      { name: "MongoDB", icon: SiMongodb,  color: "#47A248", glow: "rgba(71,162,72,0.35)"   },
      { name: "Prisma",  icon: SiPrisma,   color: "#5A67D8", glow: "rgba(90,103,216,0.35)"  },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git",    icon: SiGit,    color: "#F05032", glow: "rgba(240,80,50,0.35)"  },
      { name: "Figma",  icon: SiFigma,  color: "#F24E1E", glow: "rgba(242,78,30,0.35)"  },
    ],
  },
];

const EXPERIENCE = [
  {
    period: "2024 — Present",
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    description:
      "Delivering production-ready applications for clients worldwide using modern JavaScript ecosystems.",
  },
  {
    period: "2023 — 2024",
    role: "Full-Stack Learning Journey",
    company: "Self-Directed",
    description:
      "Mastered modern web development through intensive project-based learning and open source contributions.",
  },
];

// ─── SkillBadge ────────────────────────────────────────────────────────────

function SkillBadge({ skill }: { skill: typeof SKILLS[0]["items"][0] }) {
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = badgeRef.current;
      if (!el) return;

      const scaleTo = gsap.quickTo(el, "scale", { duration: 0.3, ease: "back.out(1.7)" });
      const yTo     = gsap.quickTo(el, "y",     { duration: 0.3, ease: "power2.out"   });

      const onEnter = () => { scaleTo(1.07); yTo(-3); };
      const onLeave = () => { scaleTo(1);    yTo(0);  };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: badgeRef }
  );

  const Icon = skill.icon;

  return (
    <div
      ref={badgeRef}
      className="skill-badge group relative flex items-center gap-2 md:gap-2.5 px-3 md:px-4 py-2 md:py-2.5
                 glass rounded-xl cursor-pointer hover:bg-white/[0.05] ring-1 ring-transparent
                 hover:ring-white/[0.08] transition-colors duration-300 will-change-transform"
      style={{ opacity: 0, transform: "scale(0.85) translateY(8px)" }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-300 blur-md pointer-events-none"
        style={{ backgroundColor: `${skill.color}40` }}
        aria-hidden
      />
      <Icon
        className="relative z-10 w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover:scale-110"
        style={{ color: skill.color }}
      />
      <span className="relative z-10 text-sm font-medium text-[#E2E8F0] group-hover:text-white transition-colors">
        {skill.name}
      </span>
    </div>
  );
}

// ─── About Section ─────────────────────────────────────────────────────────

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          isDesktop:    "(min-width: 1024px)",
        },
        (ctx) => {
          const { reduceMotion, isDesktop } = ctx.conditions!;
          const dur = (d: number) => (reduceMotion ? 0 : d);

          // ── Header ──────────────────────────────────────────────────────
          gsap.fromTo(
            ".about-header",
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1, y: 0, duration: dur(0.65), ease: "power3.out",
              scrollTrigger: { trigger: ".about-header", start: "top 88%", once: true },
            }
          );

          // ── Profile image ───────────────────────────────────────────────
          gsap.fromTo(
            ".about-image",
            { autoAlpha: 0, scale: 0.95, y: 20 },
            {
              autoAlpha: 1, scale: 1, y: 0, duration: dur(0.75), ease: "power3.out",
              scrollTrigger: { trigger: ".about-image", start: "top 85%", once: true },
            }
          );

          // ── Stats cards — stagger ───────────────────────────────────────
          gsap.fromTo(
            ".stat-card",
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1, y: 0,
              duration: dur(0.55), ease: "power2.out",
              stagger: { each: 0.09, from: "start" },
              scrollTrigger: { trigger: ".stats-grid", start: "top 88%", once: true },
            }
          );

          // ── Stat count-up ───────────────────────────────────────────────
          if (!reduceMotion) {
            document.querySelectorAll<HTMLElement>(".stat-number").forEach((el) => {
              const target = parseFloat(el.dataset.target ?? "0");
              const suffix = el.dataset.suffix ?? "";
              const obj    = { val: 0 };
              gsap.to(obj, {
                val: target,
                duration: 1.6,
                ease: "power2.out",
                delay: 0.3,
                onUpdate: () => {
                  el.textContent = `${Math.round(obj.val)}${suffix}`;
                },
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              });
            });
          }

          // ── Bio text blocks ─────────────────────────────────────────────
          gsap.fromTo(
            ".about-bio",
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1, y: 0, duration: dur(0.6), ease: "power3.out",
              scrollTrigger: { trigger: ".about-bio", start: "top 88%", once: true },
            }
          );

          // ── Skill badges — batch ────────────────────────────────────────
          ScrollTrigger.batch(".skill-badge", {
            start: "top 90%",
            once: true,
            interval: 0.06,
            onEnter: (badges) => {
              gsap.to(badges, {
                autoAlpha: 1, scale: 1, y: 0,
                duration: dur(0.45), ease: "back.out(1.5)",
                stagger: { each: 0.05, from: "start" },
              });
            },
          });

          // ── Experience items — stagger ──────────────────────────────────
          gsap.fromTo(
            ".exp-item",
            { autoAlpha: 0, x: -12 },
            {
              autoAlpha: 1, x: 0,
              duration: dur(0.55), ease: "power3.out",
              stagger: { each: 0.12, from: "start" },
              scrollTrigger: { trigger: ".exp-list", start: "top 88%", once: true },
            }
          );

          // ── Glow orb parallax (desktop only) ───────────────────────────
          if (isDesktop && !reduceMotion && glowRef.current) {
            gsap.to(glowRef.current, {
              y: -50,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
              },
            });
          }
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-[#0B0F19] relative overflow-hidden"
    >
      {/* Glow orb */}
      <div
        ref={glowRef}
        className="parallax-glow absolute top-0 left-1/2 -translate-x-1/2
                   w-[600px] h-[300px] md:w-[800px] md:h-[400px]
                   bg-indigo-500/5 rounded-full blur-[100px] md:blur-[120px]"
      />

      <div className="container-tight relative z-10">

        {/* Header */}
        <div className="about-header mb-12 md:mb-16 lg:mb-24" style={{ opacity: 0 }}>
          <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight text-white mb-4 md:mb-6 leading-[1.1]">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-base md:text-lg text-[#94A3B8] max-w-2xl leading-relaxed text-balance">
            Frontend Engineer based in Morocco, crafting digital experiences with
            precision and passion.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

          {/* ── Left column ─────────────────────────────────────────────── */}
          <div className="lg:col-span-5">

            {/* Profile image */}
            <div
              className="about-image relative aspect-square max-w-sm md:max-w-md mx-auto lg:mx-0
                          rounded-2xl overflow-hidden ring-1 ring-white/[0.06] bg-[#111827]
                          shadow-2xl shadow-black/20"
              style={{ opacity: 0 }}
            >
              <Image
                src="/ayoub.png"
                alt="Ayoub Rachidi"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            {/* Stats */}
            <div className="stats-grid mt-6 md:mt-8 grid grid-cols-2 gap-3 md:gap-4">
              {STATS.map((stat) => {
                // Parse suffix (+, %) from display value
                const suffix = stat.value.replace(/\d+/g, "");
                return (
                  <div
                    key={stat.label}
                    className="stat-card glass rounded-xl p-3.5 md:p-4 text-center"
                    style={{ opacity: 0 }}
                  >
                    <stat.icon className="w-5 h-5 text-sky-400 mx-auto mb-1.5 md:mb-2" />
                    <div
                      className="stat-number text-xl md:text-2xl font-bold text-white mb-0.5 md:mb-1"
                      data-target={stat.numeric}
                      data-suffix={suffix}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[11px] md:text-xs text-[#64748B] uppercase tracking-[0.1em]">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right column ────────────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-10 md:space-y-12">

            {/* Background bio */}
            <div className="about-bio" style={{ opacity: 0 }}>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4">
                Background
              </h3>
              <div className="space-y-3.5 md:space-y-4 text-[#94A3B8] leading-relaxed text-[15px] md:text-base">
                <p className="text-balance">
                  I&apos;m a self-taught developer with a strong foundation in computer
                  science and a passion for creating intuitive user interfaces. My
                  journey began with a curiosity for how things work on the web,
                  which evolved into a career building production-ready applications.
                </p>
                <p className="text-balance">
                  I specialize in the React ecosystem, with deep expertise in
                  Next.js, TypeScript, and modern CSS architectures. My approach
                  combines technical excellence with design sensibility, ensuring
                  every project is both performant and visually polished.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 md:mt-6 text-sm text-[#64748B]">
                <div className="flex items-center gap-2"><MapPin size={15} /><span>Morocco</span></div>
                <div className="flex items-center gap-2"><Mail size={15} /><span>Open to remote</span></div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6">
                Technical Expertise
              </h3>
              <div className="space-y-6 md:space-y-8">
                {SKILLS.map((group) => (
                  <div key={group.category}>
                    <h4 className="text-xs md:text-sm font-medium text-[#64748B] uppercase tracking-[0.12em] mb-3 md:mb-4">
                      {group.category}
                    </h4>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {group.items.map((skill) => (
                        <SkillBadge key={skill.name} skill={skill} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-5 md:mb-6">
                Experience
              </h3>
              <div
                className="exp-list space-y-8 md:space-y-10 relative
                            before:absolute before:left-0 before:top-2 before:bottom-2
                            before:w-px before:bg-white/[0.08]"
              >
                {EXPERIENCE.map((exp, i) => (
                  <div
                    key={i}
                    className="exp-item pl-5 md:pl-6 relative"
                    style={{ opacity: 0 }}
                  >
                    <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 -translate-x-[2.5px] md:-translate-x-[3px]" />
                    <div className="text-xs md:text-sm text-sky-400 font-medium mb-1">{exp.period}</div>
                    <h4 className="text-base md:text-lg font-semibold text-white mb-0.5 md:mb-1">{exp.role}</h4>
                    <div className="text-xs md:text-sm text-[#64748B] mb-1.5 md:mb-2">{exp.company}</div>
                    <p className="text-sm text-[#94A3B8] leading-relaxed text-balance">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}