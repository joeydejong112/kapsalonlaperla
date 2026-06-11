"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLanguage } from "@/lib/language-context";
import { BUSINESS, whatsappUrl } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";

const SHOW_AFTER_SCROLL_PX = 480;

/** Mobile-only action bar: WhatsApp + call, appears after the hero. */
export function StickyCta() {
  const { lang, c } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > SHOW_AFTER_SCROLL_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ y: reduceMotion ? 0 : 88, opacity: reduceMotion ? 0 : 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduceMotion ? 0 : 88, opacity: reduceMotion ? 0 : 1 }}
          transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-ivory/10 bg-ink/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden"
        >
          <div className="mx-auto flex max-w-md gap-3">
            <a
              href={whatsappUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp py-3 font-medium text-ink"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {c.sticky.whatsapp}
            </a>
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ivory/30 py-3 font-medium text-ivory"
            >
              <PhoneIcon className="h-5 w-5" />
              {c.sticky.call}
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
