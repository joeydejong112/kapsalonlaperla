export const SITE_URL = "https://example.com";

export const BUSINESS = {
  name: "Demo Salon",
  street: "Voorbeeldstraat 1",
  postalCode: "1234 AB",
  city: "Demo Stad",
  mall: "Demo Winkelcentrum",
  phoneDisplay: "06 - 14 37 44 91",
  phoneTel: "+31614374491",
  whatsappNumber: "31614374491",
} as const;

const WA_MESSAGE = {
  nl: "Hoi, ik wil graag een afspraak maken voor ",
  en: "Hi, I would like to book an appointment for ",
} as const;

export function whatsappUrl(lang: "nl" | "en"): string {
  const text = encodeURIComponent(WA_MESSAGE[lang]);
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${text}`;
}

export const BRAND_STAMP = `DEMO SALON • DEMO WINKELCENTRUM • DEMO STAD • `;

export const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Demo+Salon,+Voorbeeldstraat+1,+1234+AB+Demo+Stad&output=embed";

export const MAPS_LINK_URL =
  "https://www.google.com/maps/search/?api=1&query=Demo+Salon+Voorbeeldstraat+1+Demo+Stad";
