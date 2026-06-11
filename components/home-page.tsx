"use client";

import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { LanguageProvider, useLanguage } from "@/lib/language-context";
import { PRICE_CATEGORIES } from "@/lib/prices";
import { scrollToSection } from "@/lib/scroll-to-section";
import { Header } from "./header";
import { Hero } from "./hero";
import { About } from "./about";
import { Services } from "./services";
import { Pricing } from "./pricing";
import { Booking } from "./booking";
import { Reviews } from "./reviews";
import { Faq } from "./faq";
import { Location } from "./location";
import { Footer } from "./footer";
import { StickyCta } from "./sticky-cta";

const PRICE_CATEGORY_IDS = new Set(PRICE_CATEGORIES.map((category) => category.id));

function SkipLink() {
  const { c } = useLanguage();
  return (
    <button
      type="button"
      onClick={() => scrollToSection("over-ons", { focus: true })}
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ivory focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink"
    >
      {c.skipToContent}
    </button>
  );
}

export function HomePage() {
  const [activePriceId, setActivePriceId] = useState(PRICE_CATEGORIES[0].id);

  useEffect(() => {
    const hashTarget = window.location.hash.slice(1);
    if (!hashTarget) return;

    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    requestAnimationFrame(() => scrollToSection(hashTarget));
  }, []);

  const selectPriceCategory = useCallback((categoryId: string) => {
    if (!PRICE_CATEGORY_IDS.has(categoryId)) return;

    setActivePriceId(categoryId);
    requestAnimationFrame(() => scrollToSection("prijzen"));
  }, []);

  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <SkipLink />
        <Header />
        <main>
          <Hero />
          <About />
          <Services onSelectPriceCategory={selectPriceCategory} />
          <Pricing
            activeId={activePriceId}
            onActiveIdChange={setActivePriceId}
          />
          <Booking />
          <Reviews />
          <Faq />
          <Location />
        </main>
        <Footer />
        <StickyCta />
      </MotionConfig>
    </LanguageProvider>
  );
}
