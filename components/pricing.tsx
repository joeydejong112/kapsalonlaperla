"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLanguage } from "@/lib/language-context";
import { PRICE_CATEGORIES } from "@/lib/prices";
import { whatsappUrl } from "@/lib/site";
import { Reveal, SectionHeading } from "./reveal";
import { WhatsAppIcon } from "./icons";

interface PricingProps {
  activeId: string;
  onActiveIdChange: (categoryId: string) => void;
}

export function Pricing({ activeId, onActiveIdChange }: PricingProps) {
  const { lang, c } = useLanguage();
  const reduceMotion = useReducedMotion();

  const activeCategory =
    PRICE_CATEGORIES.find((category) => category.id === activeId) ??
    PRICE_CATEGORIES[0];

  return (
    <section id="prijzen" className="bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker={c.pricing.kicker}
          title={c.pricing.title}
          subtitle={c.pricing.subtitle}
        />

        {/* Category tabs */}
        <Reveal className="mt-12">
          <div
            role="tablist"
            aria-label={c.pricing.kicker}
            className="flex flex-wrap justify-center gap-2"
          >
            {PRICE_CATEGORIES.map((category) => {
              const isActive = category.id === activeId;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="prijzen-paneel"
                  onClick={() => onActiveIdChange(category.id)}
                  className={`relative min-h-11 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-ivory"
                      : "bg-white text-taupe ring-1 ring-sand hover:text-ink"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-price-tab"
                      transition={{
                        duration: reduceMotion ? 0 : 0.4,
                        ease: [0.25, 0.4, 0.25, 1],
                      }}
                      className="absolute inset-0 rounded-full bg-ink"
                    />
                  ) : null}
                  <span className="relative">{category.label[lang]}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Price menu */}
        <Reveal delay={0.1}>
          <div
            id="prijzen-paneel"
            role="tabpanel"
            className="mt-8 rounded-3xl bg-white p-7 shadow-soft ring-1 ring-sand sm:p-10"
          >
            <AnimatePresence mode="wait">
              <motion.ul
                key={activeCategory.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {activeCategory.items.map((priceItem) => (
                  <li
                    key={priceItem.label.nl}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-1 py-2.5 sm:flex"
                  >
                    <span className="min-w-0 text-[0.95rem] leading-snug text-ink sm:text-base">
                      {priceItem.label[lang]}
                    </span>
                    <span aria-hidden="true" className="price-leader" />
                    <span className="whitespace-nowrap text-right font-display text-lg font-semibold text-ink">
                      {priceItem.price}
                    </span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>

            <p className="mt-6 border-t border-sand pt-5 text-sm leading-relaxed text-taupe">
              {c.pricing.footnote}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 text-center">
          <a
            href={whatsappUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 font-medium text-champagne-deep underline decoration-champagne/40 decoration-2 underline-offset-4 transition-colors hover:text-ink"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {c.pricing.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
