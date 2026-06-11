"use client";

import { useLanguage } from "@/lib/language-context";
import { Reveal, SectionHeading } from "./reveal";
import {
  BalloonIcon,
  CombIcon,
  DropletIcon,
  EyeIcon,
  PlusIcon,
  ScissorsIcon,
  SparklesIcon,
} from "./icons";
import { SalonPhoto } from "./salon-photo";
import type { ComponentType, SVGProps } from "react";

const SERVICE_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  dames: ScissorsIcon,
  heren: CombIcon,
  kinderen: BalloonIcon,
  kleuren: DropletIcon,
  gezicht: EyeIcon,
  verzorging: SparklesIcon,
};

const SERVICE_PRICE_TABS: Record<string, string> = {
  dames: "dames",
  heren: "heren",
  kinderen: "kinderen",
  kleuren: "kleuren",
  gezicht: "gezicht",
  verzorging: "verzorging",
};

interface ServicesProps {
  onSelectPriceCategory: (categoryId: string) => void;
}

/** Varied warm gradients so the placeholder tiles read as a curated photo set. */
const TILE_BACKGROUNDS = [
  "radial-gradient(75% 85% at 25% 15%, rgba(201,163,106,0.30), transparent 60%), radial-gradient(60% 70% at 85% 90%, rgba(110,55,45,0.45), transparent 65%)",
  "radial-gradient(75% 85% at 75% 20%, rgba(166,120,82,0.32), transparent 60%), radial-gradient(60% 70% at 15% 85%, rgba(72,48,60,0.5), transparent 65%)",
  "radial-gradient(75% 85% at 30% 80%, rgba(201,163,106,0.24), transparent 60%), radial-gradient(60% 70% at 80% 15%, rgba(96,62,40,0.5), transparent 65%)",
  "radial-gradient(75% 85% at 70% 75%, rgba(150,96,90,0.35), transparent 60%), radial-gradient(60% 70% at 20% 20%, rgba(201,163,106,0.2), transparent 65%)",
  "radial-gradient(75% 85% at 20% 30%, rgba(126,84,98,0.4), transparent 60%), radial-gradient(60% 70% at 85% 80%, rgba(201,163,106,0.22), transparent 65%)",
  "radial-gradient(75% 85% at 80% 30%, rgba(201,163,106,0.28), transparent 60%), radial-gradient(60% 70% at 15% 80%, rgba(110,55,45,0.42), transparent 65%)",
];

export function Services({ onSelectPriceCategory }: ServicesProps) {
  const { c } = useLanguage();

  return (
    <section id="behandelingen" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker={c.services.kicker}
          title={c.services.title}
          subtitle={c.services.subtitle}
          dark
        />

        <div className="mt-16 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {c.services.items.map((service, index) => {
            const Icon = SERVICE_ICONS[service.id] ?? ScissorsIcon;
            const priceTabId = SERVICE_PRICE_TABS[service.id] ?? service.id;

            return (
              <Reveal key={service.id} delay={(index % 3) * 0.08}>
                <button
                  type="button"
                  onClick={() => onSelectPriceCategory(priceTabId)}
                  className="group block w-full text-left"
                >
                  {/* Photo tile (real image once the manifest is filled) */}
                  <div className="grain relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-soft ring-1 ring-ivory/10">
                    <SalonPhoto
                      index={3 + index}
                      alt={service.imageAlt}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      imgClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      fallback={
                        <>
                          <div
                            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                            style={{ backgroundImage: TILE_BACKGROUNDS[index % 6] }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-ivory/15 transition-colors duration-500 group-hover:text-ivory/25">
                            <Icon className="h-14 w-14" />
                          </div>
                        </>
                      }
                    />

                    <span className="absolute right-3 top-3 z-[2] flex h-9 w-9 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors duration-300 group-hover:border-transparent group-hover:bg-champagne group-hover:text-ink">
                      <PlusIcon className="h-4 w-4" />
                    </span>

                    <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-ink/90 to-transparent p-5 pt-12">
                      <h3 className="font-display text-2xl font-semibold text-ivory">
                        {service.title}
                      </h3>
                      <p className="mt-0.5 text-sm tracking-wide text-champagne">
                        {c.services.from} {service.from}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-smoke">
                    {service.description}
                  </p>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
