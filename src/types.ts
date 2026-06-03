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

export const INTAKE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdO4Woi_W1SoCDs33ITJtaGUzV1sqtBmyFb1uznvw0Fg_7jlw/viewform?usp=header";

export const FLO_EMAIL = "Floordeliefde21@gmail.com";
export const FLO_WHATSAPP = "+31 6 55797661";
export const FLO_WHATSAPP_LINK = "https://wa.me/31655797661";

/** @deprecated use INTAKE_FORM_URL */
export const BOOKING_MAILTO = INTAKE_FORM_URL;
/** @deprecated use INTAKE_FORM_URL */
export const CIRCLE_MAILTO = INTAKE_FORM_URL;

export const NAV_LINKS: NavLink[] = [
  { label: "The Return", sectionId: "return-section" },
  { label: "The Reality", sectionId: "youarenotbroken" },
  { label: "Weekly Circle", sectionId: "weekly-circle" },
  { label: "How We Work", sectionId: "work" },
  { label: "About Flo", sectionId: "about" },
];

export const OFFER_CARDS: OfferCard[] = [
  {
    title: "Discovery Call",
    duration: "30 Minutes",
    price: "Free",
    description:
      "Start here if you are curious, unsure, or want to feel whether this work is right for you.",
  },
  {
    title: "Weekly Breath & Integration Circle",
    duration: "2 Hours",
    price: "Weekly",
    description:
      "A simple weekly group space to breathe, reflect, and reconnect. Come as you are. No need to have the right words.",
  },
  {
    title: "Private Breathwork Journey",
    duration: "90 Minutes",
    price: "€150",
    description:
      "The signature 1:1 experience. Arrival, intention, conscious connected breathwork, integration, and reflection.",
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
