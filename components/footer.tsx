"use client";

import { useLanguage } from "@/lib/language-context";
import { scrollToSection } from "@/lib/scroll-to-section";
import { BUSINESS, whatsappUrl } from "@/lib/site";
import {
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./icons";

const QUICK_LINKS = [
  { sectionId: "over-ons", key: "about" },
  { sectionId: "behandelingen", key: "treatments" },
  { sectionId: "prijzen", key: "prices" },
  { sectionId: "boeken", key: "book" },
  { sectionId: "reviews", key: "reviews" },
  { sectionId: "locatie", key: "location" },
] as const;

export function Footer() {
  const { lang, c } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ivory/10 bg-ink pb-28 pt-16 text-ivory md:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-semibold uppercase tracking-[0.35em]">
              {BUSINESS.name}
            </p>
            <p className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.3em] text-champagne">
              {BUSINESS.mall} · {BUSINESS.city}
            </p>
            <p className="mt-5 max-w-sm leading-relaxed text-smoke">
              {c.footer.blurb}
            </p>
            <div className="mt-6 flex gap-3">
              {/* Social placeholders: swap in real profile URLs later */}
              <span
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 text-ivory/60"
              >
                <InstagramIcon className="h-4.5 w-4.5" />
              </span>
              <span
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 text-ivory/60"
              >
                <FacebookIcon className="h-4.5 w-4.5" />
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-champagne">
              {c.footer.quickTitle}
            </h3>
            <ul className="mt-5 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.sectionId}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.sectionId)}
                    className="inline-flex min-h-11 items-center text-smoke transition-colors hover:text-champagne"
                  >
                    {c.nav[link.key]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-champagne">
              {c.footer.contactTitle}
            </h3>
            <address className="mt-5 space-y-3 not-italic text-smoke">
              <p>
                {BUSINESS.mall}
                <br />
                {BUSINESS.street}
                <br />
                {BUSINESS.postalCode} {BUSINESS.city}
              </p>
              <p>
                <a
                  href={whatsappUrl(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-champagne"
                >
                  <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
                  WhatsApp
                </a>
              </p>
              <p>
                <a
                  href={`tel:${BUSINESS.phoneTel}`}
                  className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-champagne"
                >
                  <PhoneIcon className="h-4 w-4 text-champagne" />
                  {BUSINESS.phoneDisplay}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-champagne">
              {c.footer.hoursTitle}
            </h3>
            <dl className="mt-5 space-y-2 text-smoke">
              {c.location.hours.map((row) => (
                <div
                  key={row.days}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4"
                >
                  <dt className="min-w-0">{row.days}</dt>
                  <dd className="whitespace-nowrap text-right font-medium tabular-nums text-ivory/85">
                    {row.time}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-ivory/40">{c.location.holidayNote}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-ivory/10 pt-7 text-sm text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BUSINESS.name} · {c.footer.kvk} · {c.footer.rights}
          </p>
          <p>
            {c.footer.privacy}{" "}
            <span className="text-champagne/70">· {c.footer.credit}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
