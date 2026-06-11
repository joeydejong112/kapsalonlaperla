"use client";

import { useLanguage } from "@/lib/language-context";
import { scrollToSection } from "@/lib/scroll-to-section";
import { Reveal, SectionHeading } from "./reveal";
import { CheckIcon, ScissorsIcon } from "./icons";
import { SalonPhoto } from "./salon-photo";

/** Main about photo. */
function AboutVisual({ altMain }: { altMain: string }) {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="grain relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink shadow-lift">
        <SalonPhoto
          index={1}
          alt={altMain}
          sizes="(min-width: 1024px) 45vw, 100vw"
          imgClassName="object-cover object-[center_68%]"
          fallback={
            <>
              <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_30%_20%,rgba(201,163,106,0.25),transparent_60%),radial-gradient(60%_70%_at_85%_85%,rgba(110,55,45,0.4),transparent_65%)]" />
              <div className="absolute inset-0 flex items-center justify-center text-ivory/20">
                <ScissorsIcon className="h-16 w-16" />
              </div>
            </>
          }
        />
      </div>

      {/* Champagne accent ring */}
      <div
        aria-hidden="true"
        className="absolute -left-3 -top-6 h-24 w-24 rounded-full border border-champagne/40 sm:-left-8 sm:-top-8 sm:h-28 sm:w-28"
      />
    </div>
  );
}

export function About() {
  const { c } = useLanguage();

  return (
    <section id="over-ons" className="bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal>
          <AboutVisual altMain={c.about.imageAltMain} />
        </Reveal>

        <div>
          <SectionHeading
            kicker={c.about.kicker}
            title={c.about.title}
            align="left"
          />

          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 leading-relaxed text-taupe">
              {c.about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-8 space-y-4">
              {c.about.bullets.map((bullet) => (
                <li key={bullet.title} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-champagne/15 text-champagne-deep">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium text-ink">{bullet.title}</p>
                    <p className="text-sm text-taupe">{bullet.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <button
              type="button"
              onClick={() => scrollToSection("boeken")}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-champagne-deep hover:shadow-lift"
            >
              {c.about.cta}
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
