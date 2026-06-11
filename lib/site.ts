export const SITE_URL = "https://kapsalonlaperla.nl";

export const BUSINESS = {
  name: "Kapsalon La Perla",
  street: "Van Starkenborghhof 80",
  postalCode: "3527 HB",
  city: "Utrecht",
  mall: "Winkelcentrum NOVA",
  phoneDisplay: "06 - 41 35 57 17",
  phoneTel: "+31641355717",
  whatsappNumber: "31641355717",
} as const;

const WA_MESSAGE = {
  nl: "Hoi La Perla, ik wil graag een afspraak maken voor ",
  en: "Hi La Perla, I would like to book an appointment for ",
} as const;

export function whatsappUrl(lang: "nl" | "en"): string {
  const text = encodeURIComponent(WA_MESSAGE[lang]);
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${text}`;
}

export const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Kapsalon+La+Perla,+Van+Starkenborghhof+80,+3527+HB+Utrecht&output=embed";

export const MAPS_LINK_URL =
  "https://www.google.com/maps/search/?api=1&query=Kapsalon+La+Perla+Van+Starkenborghhof+80+Utrecht";
