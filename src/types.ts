export interface NavLink {
  label: string;
  sectionId: string;
}

export interface OfferCard {
  title: string;
  duration: string;
  price: string;
  description: string;
  isPrimary?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
}

export const BOOKING_MAILTO =
  "mailto:hi@floortjedeliefde.com?subject=Discovery Call Request — Come Back To Yourself";

export const NAV_LINKS: NavLink[] = [
  { label: "The Return", sectionId: "return-section" },
  { label: "The Reality", sectionId: "youarenotbroken" },
  { label: "How We Work", sectionId: "work" },
  { label: "About Flo", sectionId: "about" },
  { label: "The Approach", sectionId: "approach" },
];

export const OFFER_CARDS: OfferCard[] = [
  {
    title: "Discovery Call",
    duration: "30 Minutes",
    price: "Free",
    description:
      "A conversation to explore where you are, what you're carrying, and whether this work feels aligned.",
  },
  {
    title: "Nervous System Reset",
    duration: "30–45 Minutes",
    price: "€75",
    description:
      "A gentle introduction to breath, awareness, grounding, and body connection.",
  },
  {
    title: "Private Breathwork Journey",
    duration: "90 Minutes",
    price: "€150",
    description:
      "The signature experience. Arrival, intention, conscious connected breathwork, integration, and reflection.",
    isPrimary: true,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "Flo created a space where I finally felt safe enough to slow down and be honest about how I was really feeling.",
    name: "Sophie van der Meer",
    role: "Creative Director",
    location: "Amsterdam",
  },
  {
    id: "2",
    quote:
      "I left feeling lighter and more connected to myself than I have in years. No performance required.",
    name: "Markus de Graaf",
    role: "Tech Co-founder",
    location: "Utrecht",
  },
  {
    id: "3",
    quote:
      "For the first time in a long time, I felt like I didn't have to hold it all together. That was everything.",
    name: "Elena Petrova",
    role: "Senior Consultant",
    location: "Rotterdam",
  },
];

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: "01",
    title: "Slow Down",
    description: "Create enough space to hear what your body is saying.",
  },
  {
    number: "02",
    title: "Breathe",
    description: "Reconnect with yourself through breath and awareness.",
  },
  {
    number: "03",
    title: "Integrate",
    description: "Bring insight into real life.",
  },
];
