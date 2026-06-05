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

export interface TestimonialNew {
  name: string;
  text: string;
  shortText: string;
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
    duration: "30 min",
    price: "Free",
    description:
      "Start here if you are curious, unsure, or want to feel whether this work is right for you. No preparation needed.",
  },
  {
    title: "Nervous System Reset",
    duration: "30–45 min",
    price: "€111",
    description:
      "A focused breathwork session to discharge accumulated stress and return your system to a calmer baseline.",
  },
  {
    title: "Private Breathwork Journey",
    duration: "90 min",
    price: "€188",
    description:
      "The signature 1:1 experience. A deep, guided breathwork journey for those ready to move through what's been held.",
    isPrimary: true,
  },
];

export const TESTIMONIALS: TestimonialNew[] = [
  {
    name: "Ade S.",
    shortText: "Flo facilitated a breath work session that felt safe, grounding and resetting for a first timer in that space.",
    text: `Flo facilitated a breath work session that felt safe, grounding and resetting for a first timer in that space.

Floor's ability to guide and nurture in a space holding people from various backgrounds and places helped me be open to group vulnerability.

Through the Connective Conscious Breathing technique she practices a deep tension within me physically/emotionally was released.

A chronic phantom pain that I tend to feel in my left hip, has often felt to me like it may be a physical expression of a residual emotional wound. In our session, through breathing and movement, it felt as though I expelled that and other trapped emotions I have been carrying my whole life from my body.

Having this experience on the final day of my first water fast felt like such a significant way to care for my body and spirit with intention prior to breaking my fast with a nourishing beef bone broth to supplement the enriching experience I had in their container.

Much love and thanks to you.`,
  },
  {
    name: "Sandra D.",
    shortText: "I'm grateful for Flo's help in removing blockages and moving stagnant energy.",
    text: "I'm grateful for Flo's help in removing blockages and moving stagnant energy. I recommend working with her for a very personal, healing experience!",
  },
  {
    name: "Isabel B.",
    shortText: "I felt deeply seen and accepted.",
    text: `I felt deeply seen and accepted.

There was no judgment at all, and that made me feel that all parts of me were welcome to express themselves.

Through the session, I connected with a level of self-compassion that I hadn't felt before.

Thank you for your guidance.`,
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
