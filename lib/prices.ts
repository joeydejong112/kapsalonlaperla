export type Lang = "nl" | "en";

export interface PriceItem {
  label: { nl: string; en: string };
  price: string;
}

export interface PriceCategory {
  id: string;
  label: { nl: string; en: string };
  items: PriceItem[];
}

const item = (nl: string, en: string, price: string): PriceItem => ({
  label: { nl, en },
  price,
});

export const PRICE_CATEGORIES: PriceCategory[] = [
  {
    id: "dames",
    label: { nl: "Dames", en: "Women" },
    items: [
      item("Knippen & blazen", "Cut & blow-dry", "€ 35"),
      item("Coupe verandering", "Restyle", "€ 45"),
      item("Pony knippen", "Fringe trim", "€ 10"),
      item("Drogen in model", "Rough dry & shape", "€ 10"),
      item("Föhnen / watergolven", "Blow-dry / wet set", "€ 34"),
      item("Krullen", "Curls", "€ 38"),
      item("Wassen", "Wash", "€ 4,50"),
    ],
  },
  {
    id: "kleuren",
    label: { nl: "Kleuren", en: "Colour" },
    items: [
      item("Uitgroei bijwerken", "Root touch-up", "€ 47,50"),
      item("Kleuren", "Full colour", "€ 57,50"),
      item("Lok / proeflok", "Strand / colour test", "€ 28"),
      item("Kleuren met eigen product", "Colour with own product", "€ 44"),
      item("Coupe soleil", "Coupe soleil", "€ 47,50"),
      item("Highlights (gedeelte)", "Highlights (partial)", "€ 65"),
      item("Highlights (heel hoofd)", "Highlights (full head)", "€ 100"),
      item("High- & lowlights", "High- & lowlights", "€ 150"),
      item("Toner", "Toner", "€ 47,50"),
      item("Balayage / ombré", "Balayage / ombré", "€ 180"),
      item("Ontkleuren", "Bleaching", "€ 60"),
      item("Voorpigmenteren", "Pre-pigmenting", "€ 25"),
    ],
  },
  {
    id: "vormgeving",
    label: { nl: "Vormgeving", en: "Texture" },
    items: [
      item("Permanent (all-in)", "Perm (all-in)", "€ 98,50"),
      item("Permanent (gedeelte)", "Perm (partial)", "€ 88,50"),
      item("Hairextensions", "Hair extensions", "p.o.a."),
      item("Proteïne- / keratinebehandeling", "Protein / keratin treatment", "€ 180"),
      item("Botox hair", "Botox hair", "€ 160"),
    ],
  },
  {
    id: "verzorging",
    label: { nl: "Verzorging", en: "Care" },
    items: [
      item("Crèmebehandeling", "Cream treatment", "€ 10"),
      item("Maskerbehandeling", "Mask treatment", "€ 15"),
      item("Kuur (30 min, met warmte)", "Treatment (30 min, with heat)", "€ 45"),
      item("Olaplex", "Olaplex", "€ 25"),
      item("Botox Hair Bionaza", "Botox Hair Bionaza", "€ 120"),
    ],
  },
  {
    id: "gezicht",
    label: { nl: "Gezicht", en: "Face" },
    items: [
      item("Wenkbrauwen epileren (threading)", "Eyebrow threading", "€ 18,50"),
      item("Bovenlip", "Upper lip", "€ 5,50"),
      item("Kin", "Chin", "€ 5,50"),
      item("Hals", "Neck", "€ 5,50"),
      item("Heel gezicht (excl. wenkbrauwen)", "Full face (excl. brows)", "€ 28,50"),
      item("Wenkbrauwen verven", "Eyebrow tint", "€ 18,50"),
      item("Wimpers verven", "Lash tint", "€ 20"),
      item("Wimperextensions", "Lash extensions", "p.o.a."),
    ],
  },
  {
    id: "heren",
    label: { nl: "Heren", en: "Men" },
    items: [
      item("Knippen / scheren in model, met stylen", "Cut / shave & style", "€ 28,50"),
      item("Tondeuse (meerdere kammen)", "Clipper cut (multiple guards)", "€ 24"),
      item("Zijkanten bijwerken", "Sides touch-up", "€ 22"),
      item("Nek, contouren of baard", "Neck, contours or beard", "€ 15"),
      item("Haar kleuren", "Hair colour", "€ 47,50"),
      item("Wassen", "Wash", "€ 4,50"),
    ],
  },
  {
    id: "kinderen",
    label: { nl: "Kinderen", en: "Kids" },
    items: [
      item("Jongens (1 t/m 12 jaar)", "Boys (age 1–12)", "€ 22"),
      item("Meisjes (1 t/m 12 jaar)", "Girls (age 1–12)", "€ 22"),
      item("Jongens (13 t/m 18 jaar)", "Boys (age 13–18)", "€ 24"),
      item("Meisjes (13 t/m 18 jaar)", "Girls (age 13–18)", "€ 26"),
    ],
  },
];
