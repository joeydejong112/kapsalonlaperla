"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/lib/language-context";
import type { Lang } from "@/lib/prices";
import { scrollToSection } from "@/lib/scroll-to-section";
import { BUSINESS } from "@/lib/site";

const NAV_LINKS = [
  { sectionId: "over-ons", key: "about" },
  { sectionId: "behandelingen", key: "treatments" },
  { sectionId: "prijzen", key: "prices" },
  { sectionId: "reviews", key: "reviews" },
  { sectionId: "locatie", key: "location" },
] as const;

function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const option = (value: Lang) => (
    <button
      type="button"
      onClick={() => setLang(value)}
      aria-pressed={lang === value}
      className={`min-h-11 min-w-11 rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
        lang === value ? "bg-ivory text-ink" : "text-ivory/60 hover:text-ivory"
      }`}
    >
      {value}
    </button>
  );

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-ivory/15 p-0.5">
      {option("nl")}
      {option("en")}
    </div>
  );
}

export function Header() {
  const { c } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled || isMenuOpen
          ? "border-b border-ivory/10 bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => scrollToSection("top")}
          className="flex min-h-11 min-w-0 flex-col justify-center overflow-hidden leading-none text-left"
        >
          <span className="truncate font-display text-base font-semibold uppercase tracking-[0.28em] text-ivory sm:text-lg sm:tracking-[0.35em]">
            {BUSINESS.name}
          </span>
          <span className="mt-1 truncate text-[0.52rem] font-medium uppercase tracking-[0.2em] text-champagne sm:text-[0.55rem] sm:tracking-[0.3em]">
            {BUSINESS.mall} · {BUSINESS.city}
          </span>
        </button>

        <nav
          aria-label="Hoofdnavigatie"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.sectionId}
              type="button"
              onClick={() => scrollToSection(link.sectionId)}
              className="inline-flex min-h-11 items-center text-sm text-ivory/65 transition-colors hover:text-ivory"
            >
              {c.nav[link.key]}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => scrollToSection("boeken")}
            className="hidden min-h-11 items-center rounded-full bg-ivory px-4 py-2 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-champagne hover:shadow-lift md:inline-flex"
          >
            {c.nav.book}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? c.nav.menuClose : c.nav.menuOpen}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-ivory/15 lg:hidden"
          >
            <span
              className={`h-px w-4.5 rounded bg-ivory transition-transform ${
                isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-4.5 rounded bg-ivory transition-transform ${
                isMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.nav
            aria-label="Mobiele navigatie"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-ivory/10 bg-ink/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.sectionId}
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    scrollToSection(link.sectionId);
                  }}
                  className="w-full rounded-xl px-3 py-2.5 text-left text-base text-ivory/80 transition-colors hover:bg-ivory/5 hover:text-ivory"
                >
                  {c.nav[link.key]}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToSection("boeken");
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-4 py-3 text-sm font-medium text-ink"
              >
                {c.nav.book}
              </button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
