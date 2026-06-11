"use client";

import { useLanguage } from "@/lib/language-context";
import { BUSINESS, MAPS_EMBED_URL, MAPS_LINK_URL } from "@/lib/site";
import { Reveal, SectionHeading } from "./reveal";
import { ClockIcon, MapPinIcon } from "./icons";

export function Location() {
  const { c } = useLanguage();

  return (
    <section id="locatie" className="bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker={c.location.kicker}
          title={c.location.title}
          align="left"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="rounded-2xl bg-white p-7 shadow-soft ring-1 ring-sand">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-champagne/15 text-champagne-deep">
                    <MapPinIcon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {c.location.addressTitle}
                  </h3>
                </div>
                <address className="mt-4 not-italic leading-relaxed text-taupe">
                  <strong className="font-medium text-ink">{BUSINESS.name}</strong>
                  <br />
                  {BUSINESS.mall}
                  <br />
                  {BUSINESS.street}
                  <br />
                  {BUSINESS.postalCode} {BUSINESS.city}
                </address>
                <p className="mt-4 text-sm leading-relaxed text-taupe">
                  <strong className="font-medium text-ink">
                    {c.location.travelTitle}:
                  </strong>{" "}
                  {c.location.travelText}
                </p>
                <a
                  href={MAPS_LINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center font-medium text-champagne-deep underline decoration-champagne/40 decoration-2 underline-offset-4 transition-colors hover:text-ink"
                >
                  {c.location.mapsCta}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-white p-7 shadow-soft ring-1 ring-sand">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-champagne/15 text-champagne-deep">
                    <ClockIcon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {c.location.hoursTitle}
                  </h3>
                </div>
                <dl className="mt-4 space-y-2">
                  {c.location.hours.map((row) => (
                    <div
                      key={row.days}
                      className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4"
                    >
                      <dt className="min-w-0 text-taupe">{row.days}</dt>
                      <dd className="whitespace-nowrap text-right font-medium tabular-nums text-ink">{row.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-sm font-medium text-champagne-deep">
                  {c.location.walkIn}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-taupe">
                  {c.location.holidayNote}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="h-full">
            <div className="h-full min-h-96 overflow-hidden rounded-2xl shadow-soft ring-1 ring-sand">
              <iframe
                src={MAPS_EMBED_URL}
                title={c.location.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
