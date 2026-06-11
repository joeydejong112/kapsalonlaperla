"use client";

import { useLanguage } from "@/lib/language-context";
import { REVIEWS } from "@/lib/content";
import { Reveal, SectionHeading } from "./reveal";
import { GoogleIcon, StarIcon } from "./icons";

function Stars({ className = "text-champagne" }: { className?: string }) {
  return (
    <div className={`flex gap-1 ${className}`} aria-label="5 van 5 sterren">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="h-4 w-4" />
      ))}
    </div>
  );
}

export function Reviews() {
  const { lang, c } = useLanguage();

  return (
    <section id="reviews" className="bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker={c.reviews.kicker}
          title={c.reviews.title}
          subtitle={c.reviews.subtitle}
        />

        {/* Google badge */}
        <Reveal delay={0.08}>
          <div className="mt-8 flex items-center justify-center gap-3">
            <GoogleIcon className="h-6 w-6" />
            <span className="text-sm font-medium text-ink">
              {c.reviews.googleLabel}
            </span>
            <Stars className="text-champagne-deep" />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, index) => {
            const quote =
              review.isEnglish || lang === "nl"
                ? review.quote.nl
                : review.quote.en ?? review.quote.nl;

            return (
              <Reveal key={review.name} delay={(index % 3) * 0.07}>
                <figure className="relative flex min-h-[13rem] flex-col overflow-hidden rounded-2xl bg-white/90 p-5 shadow-soft ring-1 ring-sand/80 transition-shadow hover:shadow-lift">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-champagne via-champagne-deep to-transparent"
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-sm font-semibold text-ivory">
                        {review.name.slice(0, 1)}
                      </span>
                      <figcaption className="min-w-0">
                        <p className="font-medium text-ink">{review.name}</p>
                        <p className="mt-0.5 text-xs font-medium text-taupe">
                          {c.reviews.googleLabel}
                        </p>
                      </figcaption>
                    </div>
                    <Stars className="shrink-0 pt-1 text-champagne-deep" />
                  </div>

                  <blockquote className="mt-5 text-[0.95rem] leading-7 text-taupe">
                    {quote}
                  </blockquote>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
