import type { Lang } from "./prices";

export interface Review {
  quote: { nl: string; en?: string };
  name: string;
  /** Review written in English on the source site */
  isEnglish?: boolean;
}

export const REVIEWS: Review[] = [
  {
    quote: {
      nl: "Super kapster. Altijd vriendelijk, doet precies wat ik vraag en nog goedkoop ook!",
    en: "Wonderful hairdresser. Always friendly, does exactly what I ask, and affordable too!",
    },
    name: "Monica",
  },
  {
    quote: {
      nl: "Vriendelijk personeel en goede prijs. Ben al jaren vaste klant.",
      en: "Friendly staff and great prices. I've been a regular for years.",
    },
    name: "Jannis",
  },
  {
    quote: {
      nl: "Altijd vriendelijk geholpen. Knipt precies wat ik wil en de sfeer is top.",
      en: "Always friendly service. Exactly the cut I wanted, and a great atmosphere.",
    },
    name: "Edward",
  },
  {
    quote: {
      nl: "Gegroeid tot een zeer professionele kapsalon zonder absurd hoge bedragen.",
      en: "Grown into a very professional salon without absurdly high prices.",
    },
    name: "Willemien",
  },
  {
    quote: {
      nl: "Very nice and comfortable place. Always can agree with the time. Good price!",
    },
    name: "Alina",
    isEnglish: true,
  },
  {
    quote: {
      nl: "Ik ben erg blij met mijn nieuwe kapsel. Altijd gezellig en tijd voor een praatje.",
      en: "I'm so happy with my new haircut. Always cosy, always time for a chat.",
    },
    name: "Olesya",
  },
];

export const COPY = {
  nl: {
    skipToContent: "Direct naar inhoud",
    nav: {
      about: "Over ons",
      treatments: "Behandelingen",
      prices: "Prijzen",
      reviews: "Reviews",
      location: "Locatie",
      book: "Afspraak boeken",
      menuOpen: "Menu openen",
      menuClose: "Menu sluiten",
    },
    hero: {
      kicker: "Hair salon · Demo Winkelcentrum, Demo Stad",
      titleStart: "Jouw",
      titleAccent: "vertrouwde",
      titleEnd: "kapper in Demo Stad",
      subtitle:
        "Knippen, kleuren en beauty voor het hele gezin. Vakwerk zonder poespas, voor een eerlijke prijs.",
      ctaPrimary: "Afspraak boeken",
      ctaSecondary: "App via WhatsApp",
      imageAlt:
        "Interieur van Demo Salon. Hier komt een eigen salonfoto",
      resultAlt:
        "Glanzend gestyled haar na een behandeling bij Demo Salon",
      ratingAria: "5 van 5 sterren",
    },
    about: {
      kicker: "Over ons",
      title: "Vakwerk met een persoonlijke touch",
      paragraphs: [
        "Demo Salon zit al jaren in Demo Winkelcentrum. We knippen, kleuren en verzorgen haar en beauty voor klanten uit de buurt en daarbuiten.",
        "Iedereen is welkom: dames, heren en kinderen, buurtbewoners en internationale klanten. We helpen je graag, in het Nederlands of in het Engels.",
      ],
      bullets: [
        {
          title: "Voor het hele gezin",
          description: "Dames, heren en kinderen van 1 t/m 18 jaar",
        },
        {
          title: "Scherpe prijzen",
          description: "Eerlijke vanaf-prijzen, geen verrassingen achteraf",
        },
        {
          title: "Lopend & op afspraak",
          description: "Loop gewoon binnen, of plan vooruit. Allebei prima",
        },
      ],
      cta: "Plan je bezoek",
      imageAltMain:
        "Sfeerfoto van het interieur van Demo Salon. Eigen foto volgt",
      imageAltSecond:
        "Detailfoto van een knipbehandeling. Eigen foto volgt",
    },
    services: {
      kicker: "Behandelingen",
      title: "Alles onder één dak",
      subtitle:
        "Van een snelle bijwerkbeurt tot een complete metamorfose voor dames, heren en kinderen.",
      from: "vanaf",
      seePrices: "Bekijk prijzen",
      items: [
        {
          id: "dames",
          title: "Dames",
          description:
            "Knippen, föhnen en stylen, afgestemd op jouw haar én je dagelijkse routine.",
          from: "€ 35",
          imageAlt: "Foto van een dameskapsel. Eigen foto volgt",
        },
        {
          id: "heren",
          title: "Heren",
          description:
            "Strakke coupes, scheren en baardcontouren. Zo weer fris de deur uit.",
          from: "€ 24",
          imageAlt: "Foto van een herenkapsel. Eigen foto volgt",
        },
        {
          id: "kinderen",
          title: "Kinderen",
          description:
            "Geduldig en snel geknipt, voor jongens en meisjes van 1 t/m 18 jaar.",
          from: "€ 22",
          imageAlt: "Foto van een kinderknipbeurt. Eigen foto volgt",
        },
        {
          id: "kleuren",
          title: "Kleuren",
          description:
            "Van uitgroei bijwerken tot balayage. Kleur die echt bij je past.",
          from: "€ 47,50",
          imageAlt: "Foto van een kleurbehandeling. Eigen foto volgt",
        },
        {
          id: "gezicht",
          title: "Beauty & gezicht",
          description:
            "Wenkbrauwen epileren met threading, verven en wimperbehandelingen.",
          from: "€ 5,50",
          imageAlt: "Foto van een wenkbrauwbehandeling. Eigen foto volgt",
        },
        {
          id: "verzorging",
          title: "Verzorging & vormgeving",
          description:
            "Permanent, keratine, Olaplex en kuren die je haar weer laten stralen.",
          from: "€ 10",
          imageAlt: "Foto van een haarverzorgingsbehandeling. Eigen foto volgt",
        },
      ],
    },
    pricing: {
      kicker: "Prijzen",
      title: "Eerlijke prijzen, geen verrassingen",
      subtitle:
        "Alle prijzen zijn vanaf-prijzen. Kies een categorie en zie meteen waar je aan toe bent.",
      footnote:
        "Voor kort, halflang en lang haar kan een toeslag gelden. Vraag er gerust naar in de salon.",
      cta: "Vraag of plan direct via WhatsApp",
    },
    booking: {
      kicker: "Online boeken",
      title: "Plan je afspraak",
      subtitle:
        "Kies je behandeling en een moment dat past. Wij bevestigen snel via WhatsApp.",
      steps: ["Behandeling", "Moment", "Gegevens"],
      categoryLabel: "Kies een categorie",
      treatmentLabel: "Kies een behandeling",
      dateLabel: "Kies een dag",
      timeLabel: "Kies een tijd",
      busyLabel: "Bezet",
      closedNote: "Op zondag zijn we gesloten.",
      nameLabel: "Naam",
      namePlaceholder: "Je naam",
      phoneLabel: "Telefoon (optioneel)",
      phonePlaceholder: "06 - 12 34 56 78",
      stylistLabel: "Voorkeur kapper",
      stylistOptions: ["Geen voorkeur", "Alex", "Ander teamlid"],
      noteLabel: "Opmerking (optioneel)",
      notePlaceholder: "Bijv. lang haar, kleuradvies…",
      summaryTitle: "Jouw afspraak",
      back: "Terug",
      next: "Volgende",
      confirm: "Bevestig via WhatsApp",
      confirmHint:
        "Je afspraak is definitief zodra de salon hem in WhatsApp bevestigt.",
      successTitle: "Bijna klaar!",
      successText:
        "Je bericht staat klaar in WhatsApp. Verstuur het. Wij bevestigen je afspraak zo snel mogelijk.",
      again: "Nieuwe afspraak plannen",
      waLabels: {
        intro: "Hoi! Ik wil graag een afspraak maken.",
        treatment: "Behandeling",
        date: "Datum",
        time: "Tijd",
        name: "Naam",
        stylist: "Voorkeur",
        note: "Opmerking",
      },
    },
    reviews: {
      kicker: "Reviews",
      title: "Waarom klanten blijven terugkomen",
      subtitle: "Echte woorden van echte klanten uit Demo Stad en omstreken.",
      googleLabel: "Google-reviews",
    },
    faq: {
      kicker: "Veelgestelde vragen",
      title: "Goed om te weten",
      subtitle:
        "Staat je vraag er niet tussen? Stuur ons gerust een berichtje via WhatsApp.",
      cta: "Stel je vraag via WhatsApp",
      items: [
        {
          question: "Moet ik een afspraak maken?",
          answer:
          "Nee hoor. Binnenlopen kan van maandag t/m zaterdag tussen 09:00 en 16:00. Wil je zeker zijn van je plek? Plan dan even vooruit via WhatsApp of de boekingsknop op deze pagina.",
        },
        {
          question: "Hoe maak ik het snelst een afspraak?",
          answer:
            "Via WhatsApp (06 - 14 37 44 91) of via 'Afspraak boeken' hierboven. Je krijgt snel een bevestiging terug.",
        },
        {
          question: "Wat als ik toch verhinderd ben?",
          answer:
          "Geen probleem. Laat het ons even weten via WhatsApp of telefoon. Dan maken we iemand anders blij met jouw plekje.",
        },
        {
          question: "Knippen jullie ook kinderen?",
          answer:
            "Zeker! Jongens en meisjes van 1 t/m 18 jaar zijn van harte welkom. Kinderknippen is er al vanaf € 22.",
        },
        {
          question: "Do you speak English?",
          answer:
          "Yes! Je kunt bij ons terecht in het Nederlands én in het Engels. Gebruik de taalknop bovenaan de pagina.",
        },
      ],
    },
    location: {
      kicker: "Locatie & openingstijden",
      title: "Je vindt ons in Demo Winkelcentrum",
      addressTitle: "Adres",
      hoursTitle: "Openingstijden",
      hours: [
        { days: "Maandag t/m zaterdag", time: "09:00 – 16:00" },
        { days: "Zondag", time: "Gesloten" },
      ],
      walkIn: "Lopend binnenkomen kan, een afspraak maken ook.",
      holidayNote:
        "Rond feestdagen en vakanties kunnen tijden afwijken. Check het even via WhatsApp.",
      travelTitle: "Bereikbaarheid",
      travelText:
        "Parkeren kan bij het winkelcentrum en de bushalte ligt op loopafstand.",
      mapsCta: "Route via Google Maps",
      mapTitle: "Kaart met de locatie van Demo Salon in Demo Stad",
    },
    footer: {
      blurb:
        "Hair salon voor dames, heren en kinderen in Demo Stad. Eerlijke prijzen, vakwerk en altijd tijd voor een praatje.",
      quickTitle: "Snel naar",
      contactTitle: "Contact",
      hoursTitle: "Openingstijden",
      privacy: "Deze website gebruikt geen tracking-cookies.",
      kvk: "KvK: 00000000",
      rights: "Alle rechten voorbehouden.",
      credit: "Website door JDJ Webdevelopment",
    },
    sticky: {
      whatsapp: "WhatsApp",
      call: "Bellen",
    },
  },
  en: {
    skipToContent: "Skip to content",
    nav: {
      about: "About",
      treatments: "Treatments",
      prices: "Prices",
      reviews: "Reviews",
      location: "Location",
      book: "Book appointment",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    hero: {
      kicker: "Hair salon · Demo Shopping Centre, Demo City",
      titleStart: "Your",
      titleAccent: "trusted",
      titleEnd: "hairdresser in Demo City",
      subtitle:
        "Cuts, colour and beauty for the whole family. Honest craftsmanship at a fair price.",
      ctaPrimary: "Book appointment",
      ctaSecondary: "Message on WhatsApp",
      imageAlt:
        "Interior of Demo Salon. Salon photo placeholder",
      resultAlt:
        "Shiny styled hair after a treatment at Demo Salon",
      ratingAria: "5 out of 5 stars",
    },
    about: {
      kicker: "About us",
      title: "Craftsmanship with a personal touch",
      paragraphs: [
        "Demo Salon has been in Demo Shopping Centre for years. We cut, colour and offer hair and beauty treatments for local and international clients.",
        "Everyone is welcome: women, men and kids, locals and international clients. We're happy to help you in Dutch or English.",
      ],
      bullets: [
        {
          title: "For the whole family",
          description: "Women, men and kids aged 1 to 18",
        },
        {
          title: "Fair prices",
          description: "Honest starting prices, no surprises afterwards",
        },
        {
          title: "Walk-in & by appointment",
          description: "Just walk in, or plan ahead. Both are fine",
        },
      ],
      cta: "Plan your visit",
      imageAltMain:
        "Interior photo of Demo Salon. Own photo to follow",
      imageAltSecond: "Detail photo of a haircut. Own photo to follow",
    },
    services: {
      kicker: "Treatments",
      title: "Everything under one roof",
      subtitle:
        "From a quick touch-up to a full makeover for women, men and kids.",
      from: "from",
      seePrices: "See prices",
      items: [
        {
          id: "dames",
          title: "Women",
          description:
            "Cuts, blow-dries and styling, tailored to your hair and your routine.",
          from: "€ 35",
          imageAlt: "Photo of a women's haircut. Own photo to follow",
        },
        {
          id: "heren",
          title: "Men",
          description:
            "Sharp cuts, shaves and beard contours. In and out, looking fresh.",
          from: "€ 24",
          imageAlt: "Photo of a men's haircut. Own photo to follow",
        },
        {
          id: "kinderen",
          title: "Kids",
          description: "Patient and quick, for boys and girls aged 1 to 18.",
          from: "€ 22",
          imageAlt: "Photo of a kids' haircut. Own photo to follow",
        },
        {
          id: "kleuren",
          title: "Colour",
          description:
            "From root touch-ups to balayage. Colour that suits you.",
          from: "€ 47,50",
          imageAlt: "Photo of a colour treatment. Own photo to follow",
        },
        {
          id: "gezicht",
          title: "Beauty & face",
          description: "Eyebrow threading, tinting and lash treatments.",
          from: "€ 5,50",
          imageAlt: "Photo of an eyebrow treatment. Own photo to follow",
        },
        {
          id: "verzorging",
          title: "Care & texture",
          description:
            "Perms, keratin, Olaplex and treatments that make your hair shine again.",
          from: "€ 10",
          imageAlt: "Photo of a hair care treatment. Own photo to follow",
        },
      ],
    },
    pricing: {
      kicker: "Prices",
      title: "Fair prices, no surprises",
      subtitle:
        "All prices are starting prices. Pick a category and see exactly where you stand.",
      footnote:
        "A surcharge may apply for short, medium and long hair. Feel free to ask in the salon.",
      cta: "Ask or book directly via WhatsApp",
    },
    booking: {
      kicker: "Book online",
      title: "Book your appointment",
      subtitle:
        "Pick your treatment and a time that suits you. We'll confirm quickly via WhatsApp.",
      steps: ["Treatment", "Time", "Details"],
      categoryLabel: "Pick a category",
      treatmentLabel: "Pick a treatment",
      dateLabel: "Pick a day",
      timeLabel: "Pick a time",
      busyLabel: "Taken",
      closedNote: "We're closed on Sundays.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      phoneLabel: "Phone (optional)",
      phonePlaceholder: "06 - 12 34 56 78",
      stylistLabel: "Stylist preference",
      stylistOptions: ["No preference", "Alex", "Another stylist"],
      noteLabel: "Note (optional)",
      notePlaceholder: "E.g. long hair, colour advice…",
      summaryTitle: "Your appointment",
      back: "Back",
      next: "Next",
      confirm: "Confirm via WhatsApp",
      confirmHint:
        "Your appointment is final once the salon confirms it on WhatsApp.",
      successTitle: "Almost there!",
      successText:
        "Your message is ready in WhatsApp. Send it. We'll confirm your appointment as soon as possible.",
      again: "Plan another appointment",
      waLabels: {
        intro: "Hi! I would like to book an appointment.",
        treatment: "Treatment",
        date: "Date",
        time: "Time",
        name: "Name",
        stylist: "Preference",
        note: "Note",
      },
    },
    reviews: {
      kicker: "Reviews",
      title: "Why clients keep coming back",
      subtitle: "Real words from real clients in and around Demo City.",
      googleLabel: "Google reviews",
    },
    faq: {
      kicker: "Frequently asked questions",
      title: "Good to know",
      subtitle:
        "Can't find your question? Just send us a message on WhatsApp.",
      cta: "Ask us on WhatsApp",
      items: [
        {
          question: "Do I need an appointment?",
          answer:
          "Not at all. Walk-ins are welcome Monday to Saturday between 09:00 and 16:00. Want to be sure of your spot? Plan ahead via WhatsApp or the booking button on this page.",
        },
        {
          question: "What's the fastest way to book?",
          answer:
            "Via WhatsApp (06 - 14 37 44 91) or the 'Book appointment' button above. You'll get a quick confirmation.",
        },
        {
          question: "What if I can't make it?",
          answer:
          "No problem. Let us know via WhatsApp or phone, so someone else can use your spot.",
        },
        {
          question: "Do you cut children's hair?",
          answer:
            "Absolutely! Boys and girls aged 1 to 18 are very welcome. Kids' cuts start from € 22.",
        },
        {
          question: "Spreken jullie Nederlands?",
          answer:
          "Ja, natuurlijk! We help you in Dutch and English. Use the language switch at the top of the page.",
        },
      ],
    },
    location: {
      kicker: "Location & opening hours",
      title: "Find us in Demo Shopping Centre",
      addressTitle: "Address",
      hoursTitle: "Opening hours",
      hours: [
        { days: "Monday to Saturday", time: "09:00 – 16:00" },
        { days: "Sunday", time: "Closed" },
      ],
      walkIn: "Walk-ins are welcome, appointments too.",
      holidayNote: "Hours may differ around holidays. Check via WhatsApp.",
      travelTitle: "Getting here",
      travelText:
        "Parking is available at the shopping centre and the bus stop is a short walk away.",
      mapsCta: "Directions via Google Maps",
      mapTitle: "Map showing the location of Demo Salon in Demo City",
    },
    footer: {
      blurb:
        "Hair salon for women, men and kids in Demo City. Fair prices, craftsmanship and always time for a chat.",
      quickTitle: "Quick links",
      contactTitle: "Contact",
      hoursTitle: "Opening hours",
      privacy: "This website uses no tracking cookies.",
      kvk: "CoC: 00000000",
      rights: "All rights reserved.",
      credit: "Website by JDJ Webdevelopment",
    },
    sticky: {
      whatsapp: "WhatsApp",
      call: "Call",
    },
  },
} as const;

export type Copy = (typeof COPY)[Lang];
