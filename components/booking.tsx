"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLanguage } from "@/lib/language-context";
import { PRICE_CATEGORIES, type PriceItem } from "@/lib/prices";
import { BUSINESS } from "@/lib/site";
import { Reveal, SectionHeading } from "./reveal";
import { CheckIcon, WhatsAppIcon } from "./icons";

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00",
  "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
];

const VISIBLE_DAYS = 12;

interface DayOption {
  iso: string;
  weekday: string;
  dayNumber: string;
  month: string;
  date: Date;
}

function buildDays(locale: string): DayOption[] {
  const days: DayOption[] = [];
  const today = new Date();

  for (let offset = 0; days.length < VISIBLE_DAYS && offset < 16; offset++) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + offset,
    );
    if (date.getDay() === 0) continue; // closed on Sundays

    days.push({
      iso: date.toISOString().slice(0, 10),
      weekday: new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date),
      dayNumber: String(date.getDate()),
      month: new Intl.DateTimeFormat(locale, { month: "short" }).format(date),
      date,
    });
  }
  return days;
}

/** Deterministic pretend-availability so the demo feels real without a backend. */
function isSlotBusy(day: DayOption, slotIndex: number): boolean {
  return (day.date.getDate() * 3 + slotIndex * 7) % 5 === 0;
}

const inputClasses =
  "w-full rounded-xl border border-ivory/15 bg-ink px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-champagne focus:outline-none transition-colors";

export function Booking() {
  const { lang, c } = useLanguage();
  const reduceMotion = useReducedMotion();
  const b = c.booking;

  const [step, setStep] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [days, setDays] = useState<DayOption[]>([]);
  const [categoryId, setCategoryId] = useState(PRICE_CATEGORIES[0].id);
  const [treatment, setTreatment] = useState<PriceItem | null>(null);
  const [dayIso, setDayIso] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [stylist, setStylist] = useState(0);
  const [note, setNote] = useState("");

  // Dates depend on "today" and locale, so build them client-side only
  useEffect(() => {
    setDays(buildDays(lang === "nl" ? "nl-NL" : "en-GB"));
  }, [lang]);

  const activeCategory =
    PRICE_CATEGORIES.find((cat) => cat.id === categoryId) ?? PRICE_CATEGORIES[0];
  const selectedDay = days.find((day) => day.iso === dayIso) ?? null;

  const canContinue =
    step === 0 ? treatment !== null
    : step === 1 ? selectedDay !== null && time !== null
    : name.trim().length > 1;

  const selectDay = (day: DayOption) => {
    setDayIso(day.iso);
    // A previously picked time may be taken on the newly picked day
    if (time && isSlotBusy(day, TIME_SLOTS.indexOf(time))) setTime(null);
  };

  const whatsappHref = () => {
    if (!treatment || !selectedDay || !time) return "#";
    const dateLong = new Intl.DateTimeFormat(lang === "nl" ? "nl-NL" : "en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(selectedDay.date);

    const lines = [
      b.waLabels.intro,
      `${b.waLabels.treatment}: ${treatment.label[lang]} (${treatment.price})`,
      `${b.waLabels.date}: ${dateLong}`,
      `${b.waLabels.time}: ${time}`,
      `${b.waLabels.name}: ${name.trim()}`,
    ];
    if (stylist > 0) lines.push(`${b.waLabels.stylist}: ${b.stylistOptions[stylist]}`);
    if (note.trim()) lines.push(`${b.waLabels.note}: ${note.trim()}`);

    return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const reset = () => {
    setStep(0);
    setIsDone(false);
    setTreatment(null);
    setDayIso(null);
    setTime(null);
    setName("");
    setPhone("");
    setStylist(0);
    setNote("");
  };

  const stepMotion = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduceMotion ? 0 : -6 },
    transition: { duration: 0.25, ease: "easeOut" as const },
  };

  return (
    <section id="boeken" className="relative overflow-hidden bg-ink pb-36 pt-24 sm:py-32">
      {/* Soft champagne glow behind the card */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-champagne/[0.07] blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker={b.kicker} title={b.title} subtitle={b.subtitle} dark />

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-3xl bg-ink-soft p-6 ring-1 ring-ivory/10 sm:p-10 lg:p-12">
            {isDone ? (
              <motion.div {...stepMotion} className="py-8 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-champagne text-ink">
                  <CheckIcon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-display text-3xl font-semibold text-ivory">
                  {b.successTitle}
                </h3>
                <p className="mx-auto mt-3 max-w-sm leading-relaxed text-smoke">
                  {b.successText}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 font-medium text-champagne underline decoration-champagne/40 underline-offset-4 transition-colors hover:text-ivory"
                >
                  {b.again}
                </button>
              </motion.div>
            ) : (
              <>
                {/* Progress */}
                <ol className="flex items-center gap-2 sm:gap-3">
                  {b.steps.map((label, index) => {
                    const isReached = index <= step;
                    return (
                      <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3">
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                            isReached
                              ? "bg-champagne text-ink"
                              : "border border-ivory/20 text-ivory/40"
                          }`}
                        >
                          {index < step ? <CheckIcon className="h-3.5 w-3.5" /> : index + 1}
                        </span>
                        <span
                          className={`hidden text-sm sm:inline ${
                            isReached ? "text-ivory" : "text-ivory/40"
                          }`}
                        >
                          {label}
                        </span>
                        {index < b.steps.length - 1 ? (
                          <span aria-hidden="true" className="h-px flex-1 bg-ivory/10" />
                        ) : null}
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-8 min-h-72">
                  <AnimatePresence mode="wait">
                    {step === 0 ? (
                      <motion.div key="step-service" {...stepMotion}>
                        <p className="text-sm font-medium text-smoke">{b.categoryLabel}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {PRICE_CATEGORIES.map((category) => {
                            const isActive = category.id === categoryId;
                            return (
                              <button
                                key={category.id}
                                type="button"
                                onClick={() => setCategoryId(category.id)}
                                className={`min-h-11 rounded-full px-4 py-2.5 text-sm transition-colors ${
                                  isActive
                                    ? "bg-champagne font-medium text-ink"
                                    : "border border-ivory/15 text-smoke hover:text-ivory"
                                }`}
                              >
                                {category.label[lang]}
                              </button>
                            );
                          })}
                        </div>

                        <p className="mt-6 text-sm font-medium text-smoke">{b.treatmentLabel}</p>
                        <div className="themed-scrollbar mt-3 max-h-60 space-y-1.5 overflow-y-auto pr-2">
                          {activeCategory.items.map((item) => {
                            const isSelected = treatment === item;
                            return (
                              <button
                                key={item.label.nl}
                                type="button"
                                onClick={() => setTreatment(item)}
                                className={`flex w-full items-baseline justify-between gap-4 rounded-xl border px-4 py-3 text-left transition-colors ${
                                  isSelected
                                    ? "border-champagne bg-champagne/10 text-ivory"
                                    : "border-ivory/10 text-smoke hover:border-ivory/30 hover:text-ivory"
                                }`}
                              >
                                <span className="text-sm">{item.label[lang]}</span>
                                <span className="font-display text-base font-semibold text-champagne">
                                  {item.price}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ) : null}

                    {step === 1 ? (
                      <motion.div key="step-moment" {...stepMotion}>
                        <p className="text-sm font-medium text-smoke">{b.dateLabel}</p>
                        <div className="themed-scrollbar mt-3 flex gap-2 overflow-x-auto pb-2">
                          {days.map((day) => {
                            const isSelected = day.iso === dayIso;
                            return (
                              <button
                                key={day.iso}
                                type="button"
                                onClick={() => selectDay(day)}
                                className={`flex w-16 shrink-0 flex-col items-center rounded-xl border px-2 py-3 transition-colors ${
                                  isSelected
                                    ? "border-champagne bg-champagne/10 text-ivory"
                                    : "border-ivory/10 text-smoke hover:border-ivory/30 hover:text-ivory"
                                }`}
                              >
                                <span className="text-xs uppercase">{day.weekday}</span>
                                <span className="font-display text-2xl font-semibold">
                                  {day.dayNumber}
                                </span>
                                <span className="text-xs">{day.month}</span>
                              </button>
                            );
                          })}
                        </div>
                        <p className="mt-1 text-xs text-ivory/35">{b.closedNote}</p>

                        <p className="mt-6 text-sm font-medium text-smoke">{b.timeLabel}</p>
                        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
                          {TIME_SLOTS.map((slot, slotIndex) => {
                            const isBusy =
                              selectedDay !== null && isSlotBusy(selectedDay, slotIndex);
                            const isSelected = slot === time;
                            return (
                              <button
                                key={slot}
                                type="button"
                                disabled={isBusy || selectedDay === null}
                                onClick={() => setTime(slot)}
                                title={isBusy ? b.busyLabel : undefined}
                              className={`min-h-11 rounded-lg border py-2.5 text-sm transition-colors disabled:cursor-not-allowed ${
                                  isSelected
                                    ? "border-champagne bg-champagne font-medium text-ink"
                                    : isBusy
                                      ? "border-ivory/5 text-ivory/20 line-through"
                                      : "border-ivory/10 text-smoke hover:border-ivory/30 hover:text-ivory disabled:opacity-40"
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ) : null}

                    {step === 2 ? (
                      <motion.div key="step-details" {...stepMotion}>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="booking-name" className="text-sm font-medium text-smoke">
                              {b.nameLabel}
                            </label>
                            <input
                              id="booking-name"
                              type="text"
                              value={name}
                              onChange={(event) => setName(event.target.value)}
                              placeholder={b.namePlaceholder}
                              className={`mt-2 ${inputClasses}`}
                            />
                          </div>
                          <div>
                            <label htmlFor="booking-phone" className="text-sm font-medium text-smoke">
                              {b.phoneLabel}
                            </label>
                            <input
                              id="booking-phone"
                              type="tel"
                              value={phone}
                              onChange={(event) => setPhone(event.target.value)}
                              placeholder={b.phonePlaceholder}
                              className={`mt-2 ${inputClasses}`}
                            />
                          </div>
                        </div>

                        <p className="mt-5 text-sm font-medium text-smoke">{b.stylistLabel}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {b.stylistOptions.map((option, optionIndex) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setStylist(optionIndex)}
                              className={`min-h-11 rounded-full px-4 py-2.5 text-sm transition-colors ${
                                stylist === optionIndex
                                  ? "bg-champagne font-medium text-ink"
                                  : "border border-ivory/15 text-smoke hover:text-ivory"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>

                        <label htmlFor="booking-note" className="mt-5 block text-sm font-medium text-smoke">
                          {b.noteLabel}
                        </label>
                        <textarea
                          id="booking-note"
                          value={note}
                          onChange={(event) => setNote(event.target.value)}
                          placeholder={b.notePlaceholder}
                          rows={2}
                          className={`mt-2 resize-none ${inputClasses}`}
                        />

                        {treatment && selectedDay && time ? (
                          <div className="mt-6 rounded-xl bg-ink p-4 ring-1 ring-champagne/30">
                            <p className="font-display text-lg font-semibold italic text-champagne">
                              {b.summaryTitle}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-ivory">
                              {treatment.label[lang]}{" "}
                              <span className="text-champagne">({treatment.price})</span>
                              <br />
                              {selectedDay.weekday} {selectedDay.dayNumber} {selectedDay.month} · {time}
                            </p>
                          </div>
                        ) : null}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                {/* Wizard controls */}
                <div className="mt-8 flex items-center justify-between border-t border-ivory/10 pt-6">
                  <button
                    type="button"
                    onClick={() => setStep((current) => Math.max(0, current - 1))}
                    className={`min-h-11 rounded-full pr-4 text-sm text-smoke transition-colors hover:text-ivory ${
                      step === 0 ? "invisible" : ""
                    }`}
                  >
                    ← {b.back}
                  </button>

                  {step < 2 ? (
                    <button
                      type="button"
                      disabled={!canContinue}
                      onClick={() => setStep((current) => current + 1)}
                      className="rounded-full bg-ivory px-7 py-3 font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-champagne disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:bg-ivory"
                    >
                      {b.next}
                    </button>
                  ) : (
                    <a
                      href={canContinue ? whatsappHref() : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-disabled={!canContinue}
                      onClick={(event) => {
                        if (!canContinue) {
                          event.preventDefault();
                          return;
                        }
                        setIsDone(true);
                      }}
                      className={`inline-flex items-center gap-2 rounded-full px-7 py-3 font-medium transition-all ${
                        canContinue
                          ? "bg-whatsapp text-ink hover:-translate-y-0.5 hover:shadow-lift"
                          : "cursor-not-allowed bg-ivory/20 text-ivory/40"
                      }`}
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      {b.confirm}
                    </a>
                  )}
                </div>
                <p className="mt-4 text-center text-xs leading-relaxed text-ivory/35">
                  {b.confirmHint}
                </p>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
