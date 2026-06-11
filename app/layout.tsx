import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { BUSINESS, SITE_URL } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Kapsalon La Perla Utrecht | Knippen, kleuren & beauty",
  description:
    "Kapsalon La Perla in Winkelcentrum NOVA, Utrecht. Knippen voor dames, heren en kinderen, kleuren en beautybehandelingen voor een eerlijke prijs. Maak eenvoudig een afspraak via WhatsApp.",
  keywords: [
    "kapper Utrecht",
    "kapsalon Utrecht",
    "kapsalon Winkelcentrum NOVA",
    "knippen dames heren kinderen Utrecht",
    "haar kleuren Utrecht",
    "wenkbrauwen threading Utrecht",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
    siteName: BUSINESS.name,
    title: "Kapsalon La Perla Utrecht | Knippen, kleuren & beauty",
    description:
      "Jouw vertrouwde kapper in Winkelcentrum NOVA, Utrecht. Voor het hele gezin, met eerlijke prijzen. Afspraak maken gaat eenvoudig via WhatsApp.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: BUSINESS.name,
  url: SITE_URL,
  telephone: BUSINESS.phoneTel,
  priceRange: "€",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${BUSINESS.mall}, ${BUSINESS.street}`,
    postalCode: BUSINESS.postalCode,
    addressLocality: BUSINESS.city,
    addressCountry: "NL",
  },
  geo: {
    "@type": "GeoCoordinates",
    // TODO: verify exact coordinates with the owner / Google Maps
    latitude: 52.0734,
    longitude: 5.0937,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "16:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
