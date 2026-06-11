"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds */
  delay?: number;
  /** Vertical travel distance in px */
  y?: number;
}

/** Subtle fade-up on scroll; respects prefers-reduced-motion. */
export function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  kicker: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** Render on a dark (ink) background */
  dark?: boolean;
}

/** Consistent section intro: champagne kicker, serif title, muted subtitle. */
export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <Reveal className={`max-w-2xl ${alignment}`}>
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-champagne">
        {kicker}
      </p>
      <h2
        className={`mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl ${
          dark ? "text-ivory" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            dark ? "text-smoke" : "text-taupe"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
