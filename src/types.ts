/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface OfferInclusion {
  title: string;
  description: string;
}

export interface ExperienceStep {
  title: string;
  description: string;
}

export interface Offer {
  title: string;
  tagline: string;
  duration: string;
  investment: string;
  intendedFor: string[];
  experienceList: string[];
  notSuitableFor: string[];
  ctaText: string;
}

export interface FuturePath {
  title: string;
  description: string;
  tag: string;
}

// Global Luxury Visual & Text Assets
export const IMAGES = {
  // Portrait of Flo in nature with beautiful curly hair, looking side-profile, smiling warm
  floSunlightPortrait: "https://images.openai.com/static-rsc-4/A7v161EcmrpDfdA79zz8Ju6MGnoy4_XieunNW6vkcS3G5eSiCYN3I9pOAyZ4p5TLF2kUdt7kjtzwQPG_WHo8rj8UdMXqeR0LLgztDKLhMx-DT18SU7oX-rCt5TU1Y121lCtMMq57RyW0Pe0DBRxDjdjHGnqcF2msPK5quXhgXUrvCWPcD1SKIMh1RnWKA-hh?purpose=fullsize",
  
  // Full wide shot of Flo smiling and walking through the beautiful Bali rice field trail
  floRiceFieldWalk: "https://images.openai.com/static-rsc-4/Q0kU23GSD9UUvfEZKnOs21z_6J1s6d0cCr6ieodCfT7nvsg7_C5aOYcXv06eQZNZ8V-qmRKYq-zHFuBgpKLmbm3a0tye1WwqkmMani9zS5RoQdeLmwTjukNdZRoyTu49CLEnec_J1mOne9iMecgi_Ffti5DYVc0OKr9GFS0FXavSkDRrVs-OuhVOjq38DOKm?purpose=fullsize",
  
  // Warm, backlit close-up profile portrait of Flo with a serene smile
  floBacklitCloseUp: "https://images.openai.com/static-rsc-4/lsglw3Yo8isErofnlwTLWg9XjWjh7KOffQmevxTEHvYstXse6QJSkUU-cqjOSP75x9jFEDNpHBKCulwU9aBPZIy1EOlIzU8sDy1Dl1haH2J35TxrhgRH65UhbhZQKJmOueGtUdtiZ1O9Z7IxB-bx9fwLhfAmpeo-PwUryGZ9R2Fcixw4RddyP9YYPlqyXpCB?purpose=fullsize",

  // Pure lush soft wheat/rice fields background representing raw grounded nature 
  baliFieldsBackground: "https://images.openai.com/static-rsc-4/YQXnZe7u2J3r-Pj-00Lc1dX_7VWzeYMX5XSM7bdApsiKqUAWrKaLFz-St5qeR4x5P-0T4rPS_KAXcV4N8MWYGf4HlqEZMfiSukDsGSF9cxL5Zq3ISZQQrOEBCe98_QQUf8Vv2EZes8j1SjhvtmM_HyB9lzHkpEVZU390hCLZcfsCu4BBEj4BemzFjXDvseK3?purpose=fullsize"
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote: "Flo created a space where I finally felt safe enough to slow down, drop the analytical mode, and feel safe in my own skin.",
    author: "Sophie van der Meer",
    role: "Creative Director",
    location: "Amsterdam"
  },
  {
    id: "2",
    quote: "I left feeling structurally clearer, lighter, and deeply connected to my physical frame in a way self-help books never achieved.",
    author: "Markus de Graaf",
    role: "Tech Co-founder",
    location: "Utrecht"
  },
  {
    id: "3",
    quote: "The private session helped me notice what I had been physically carrying for years under the banner of 'just stress'.",
    author: "Elena Petrova",
    role: "Senior Consultant",
    location: "Rotterdam"
  }
];

export const PILLARS: Pillar[] = [
  {
    id: "breathwork",
    title: "Breathwork",
    description: "A body-based pathway back to presence. Simple, conscious breathing to bypass logical loops and enter the direct sense of being.",
    iconName: "Wind"
  },
  {
    id: "reconnection",
    title: "Body Reconnection",
    description: "Learn to listen softly to what your nervous system and muscles have been trying to communicate beneath the busy noise.",
    iconName: "Compass"
  },
  {
    id: "nervous-system",
    title: "Nervous System Support",
    description: "Create genuine, physical room for regulation, awareness, and safe integration of stress instead of pushing past it.",
    iconName: "Heart"
  }
];

export const CORE_OFFER: Offer = {
  title: "60-Minute Nervous System Reset",
  tagline: "A safe, body-first doorway back to your center.",
  duration: "60 Minutes",
  investment: "€120",
  intendedFor: [
    "Feel chronically overwhelmed or on edge",
    "Overthink everything but feel stuck in your body",
    "Carry constant physical tension in the shoulders, chest, or jaw",
    "Struggle to truly rest, even when you aren't working",
    "Know something needs to shift, but words aren't enough"
  ],
  experienceList: [
    "Guided custom breathwork matching your current nervous system cap",
    "Somatic body awareness techniques to localize holding patterns",
    "Regulation tools to de-escalate anxiety and hyper-vigilance",
    "Supported space for decompression, quiet reflection, and integration"
  ],
  notSuitableFor: [
    "Psychological crisis intervention",
    "Substitute for active clinical therapy or medical diagnostics",
    "Symptomatic primary cardiovascular emergencies"
  ],
  ctaText: "Book Your Reset Session"
};

export const FUTURE_PATHS: FuturePath[] = [
  {
    title: "Breathwork Journeys",
    description: "Deeper, extended somatic breath explorations for releasing long-held emotional stagnation and rediscovering native energy.",
    tag: "Deepening"
  },
  {
    title: "Somatic Movement & Mobility",
    description: "Gentle body-alignment and intuitive release sequences to invite freedom back into tight structural joints and tissues.",
    tag: "Integration"
  },
  {
    title: "Nature Immersion & Forest Bathing",
    description: "Guided organic connection out of urban concrete and back into the grounding patterns of living flora and natural light.",
    tag: "Grounding"
  },
  {
    title: "Retreat Experiences",
    description: "Immersive multi-day sanctuaries in deeply silent nature places to completely unplug, regulate, and re-establish your path.",
    tag: "Sanctuary"
  }
];
