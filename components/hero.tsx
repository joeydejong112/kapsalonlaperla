"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Transition } from "motion/react";
import { useLanguage } from "@/lib/language-context";
import { scrollToSection } from "@/lib/scroll-to-section";
import { BRAND_STAMP, whatsappUrl } from "@/lib/site";
import {
  ClockIcon,
  GoogleIcon,
  ScissorsIcon,
  StarIcon,
  WhatsAppIcon,
} from "./icons";
import { SalonPhoto } from "./salon-photo";

const EASE: Transition["ease"] = [0.25, 0.4, 0.25, 1];

/* Proper nouns only, so the stamp reads correctly in both languages */
const STAMP_TEXT = BRAND_STAMP;

function Stars({ label }: { label: string }) {
  return (
    <span role="img" aria-label={label} className="flex gap-1 text-champagne">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="h-3.5 w-3.5" />
      ))}
    </span>
  );
}

/** Static circular-text stamp, pinned to the arch photo. */
function RotatingStamp() {
  return (
    <div
      aria-hidden="true"
      className="absolute -right-7 top-9 z-[2] flex h-28 w-28 items-center justify-center rounded-full border border-champagne/30 bg-ink/70 shadow-lift backdrop-blur-md"
    >
      <svg
        viewBox="0 0 100 100"
        className="hero-stamp-mark absolute inset-0 h-full w-full"
      >
        <defs>
          <path
            id="hero-stamp-arc"
            d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
            fill="none"
          />
        </defs>
        <text className="fill-champagne" fontSize="6.7" letterSpacing="0.7">
          <textPath href="#hero-stamp-arc">{STAMP_TEXT}</textPath>
        </text>
      </svg>
      <ScissorsIcon className="h-6 w-6 text-champagne" />
    </div>
  );
}

/** Editorial salon-arch composition: photo, echo outline, ring, stamp, rating. */
function HeroVisual({
  alt,
  ratingAria,
  ratingLabel,
}: {
  alt: string;
  ratingAria: string;
  ratingLabel: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 28,
        scale: reduceMotion ? 1 : 0.97,
      }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
      className="relative hidden lg:block"
    >
      {/* Offset echo of the arch */}
      <div
        aria-hidden="true"
        className="absolute -right-6 -top-6 h-full w-full rounded-t-full rounded-b-[2rem] border border-champagne/25"
      />

      <div className="grain relative aspect-[4/5.4] overflow-hidden rounded-t-full rounded-b-[2rem] bg-ink-soft shadow-lift ring-1 ring-ivory/15">
        <Image
          src="/images/hero-foreground-hair-styled.jpg"
          alt={alt}
          fill
          priority
          quality={90}
          sizes="(min-width: 1024px) 26rem, 1px"
          className="object-cover object-[center_55%] brightness-[0.94] contrast-105 saturate-[0.95] sepia-[0.06]"
        />
        {/* Soft floor shadow inside the arch keeps the frame reading as one piece */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent"
        />
      </div>

      {/* Champagne accent ring, echoing the About section */}
      <div
        aria-hidden="true"
        className="absolute -left-10 top-16 h-24 w-24 rounded-full border border-champagne/40"
      />

      <RotatingStamp />

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
        className="absolute -left-12 bottom-12 z-[2] flex items-center gap-3 rounded-2xl border border-ivory/10 bg-ink/75 px-4 py-3.5 shadow-lift backdrop-blur-md"
      >
        <GoogleIcon className="h-6 w-6" />
        <div>
          <Stars label={ratingAria} />
          <p className="mt-1 text-xs font-medium text-ivory/65">
            {ratingLabel}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const { lang, c } = useLanguage();
  const reduceMotion = useReducedMotion();

  const entrance = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.7,
      delay,
      ease: EASE,
    } satisfies Transition as Transition,
  });

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden bg-ink lg:h-screen lg:min-h-screen"
    >
      {/* Atmosphere: warm-graded salon photo under glows, pearl rings and grain */}
      <div className="absolute inset-0">
        <SalonPhoto
          index={0}
          alt=""
          priority
          sizes="100vw"
          imgClassName="object-cover object-[center_45%] opacity-55 [filter:sepia(0.55)_saturate(1.3)_hue-rotate(-8deg)_brightness(0.52)_contrast(1.05)]"
          fallback={
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(70%_90%_at_80%_10%,rgba(201,163,106,0.18),transparent_60%),radial-gradient(55%_70%_at_10%_90%,rgba(110,55,45,0.35),transparent_65%)]"
            />
          }
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(60%_80%_at_82%_22%,rgba(201,163,106,0.16),transparent_60%),radial-gradient(55%_70%_at_8%_88%,rgba(110,55,45,0.32),transparent_65%)]"
        />
        {/* Readability vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgb(22_17_14_/_0.92),rgb(22_17_14_/_0.7)_38%,rgb(22_17_14_/_0.32)_70%,rgb(22_17_14_/_0.5)),linear-gradient(0deg,rgb(22_17_14_/_0.8),transparent_38%)]"
        />
        {/* Oversized pearl rings */}
        <div
          aria-hidden="true"
          className="absolute -left-28 top-[16%] h-[32rem] w-[32rem] rounded-full border border-champagne/[0.09]"
        />
        <div
          aria-hidden="true"
          className="absolute -left-16 top-[8%] h-[40rem] w-[40rem] rounded-full border border-ivory/[0.05]"
        />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative z-[2] mx-auto w-full max-w-6xl min-w-0 px-4 py-28 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-24 xl:grid-cols-[minmax(0,1fr)_26rem]">
          <div className="max-w-full lg:max-w-[38rem]">
            <motion.div {...entrance(0.05)} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-10 shrink-0 bg-gradient-to-r from-champagne to-champagne/0"
              />
              <p className="text-[0.65rem] font-medium uppercase leading-relaxed tracking-[0.22em] text-champagne sm:text-xs sm:tracking-[0.3em]">
                {c.hero.kicker}
              </p>
            </motion.div>

            <motion.h1
              {...entrance(0.15)}
              className="mt-5 max-w-full text-balance font-display text-[clamp(2.65rem,12vw,3rem)] font-semibold leading-[0.95] tracking-tight text-ivory sm:text-6xl lg:text-7xl"
            >
              {c.hero.titleStart}{" "}
              <em className="font-medium text-champagne">
                {c.hero.titleAccent}
              </em>{" "}
              {c.hero.titleEnd}
            </motion.h1>

            <motion.p
              {...entrance(0.25)}
              className="mt-5 max-w-full text-pretty text-base leading-relaxed text-ivory/72 sm:max-w-md sm:text-lg"
            >
              {c.hero.subtitle}
            </motion.p>

            <motion.div
              {...entrance(0.35)}
              className="mt-8 flex max-w-full flex-wrap items-center gap-2 sm:gap-3"
            >
              <button
                type="button"
                onClick={() => scrollToSection("boeken")}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ivory px-5 py-2.5 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-champagne hover:shadow-lift"
              >
                {c.hero.ctaPrimary}
              </button>
              <a
                href={whatsappUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-ivory/35 bg-ink/20 px-5 py-2.5 text-sm font-medium text-ivory backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-champagne hover:bg-ink/40"
              >
                <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
                {c.hero.ctaSecondary}
              </a>
            </motion.div>

            {/* The arch card carries the rating on large screens */}
            <motion.div
              {...entrance(0.45)}
              className="mt-7 flex items-center gap-2.5 lg:hidden"
            >
              <GoogleIcon className="h-5 w-5" />
              <Stars label={c.hero.ratingAria} />
              <span className="text-xs font-medium text-ivory/60">
                {c.reviews.googleLabel}
              </span>
            </motion.div>

            <motion.div
              {...entrance(0.5)}
              className="mt-7 flex max-w-full flex-wrap items-center gap-x-3 gap-y-1.5 text-xs leading-relaxed text-ivory/55 sm:text-sm"
            >
              <span className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 shrink-0 text-champagne" />
                {c.location.hours[0].days} · {c.location.hours[0].time}
              </span>
              <span
                aria-hidden="true"
                className="hidden h-1 w-1 rounded-full bg-champagne/60 sm:block"
              />
              <span>{c.location.walkIn}</span>
            </motion.div>
          </div>

          <HeroVisual
            alt={c.hero.resultAlt}
            ratingAria={c.hero.ratingAria}
            ratingLabel={c.reviews.googleLabel}
          />
        </div>
      </div>

    </section>
  );
}
