"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLanguage } from "@/lib/language-context";
import { whatsappUrl } from "@/lib/site";
import { Reveal, SectionHeading } from "./reveal";
import { PlusIcon, WhatsAppIcon } from "./icons";

export function Faq() {
  const { lang, c } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <div>
          <SectionHeading
            kicker={c.faq.kicker}
            title={c.faq.title}
            subtitle={c.faq.subtitle}
            align="left"
            dark
          />
          <Reveal delay={0.1}>
            <a
              href={whatsappUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-champagne underline decoration-champagne/40 decoration-2 underline-offset-4 transition-colors hover:text-ivory"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {c.faq.cta}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="divide-y divide-ivory/10 border-y border-ivory/10">
            {c.faq.items.map((item, index) => {
              const isOpen = index === openIndex;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-display text-xl font-medium text-ivory">
                      {item.question}
                    </span>
                    <PlusIcon
                      className={`h-5 w-5 shrink-0 text-champagne transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.3,
                          ease: "easeOut",
                        }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-10 leading-relaxed text-smoke">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
