import { Mail, MapPin, MessageCircle } from "lucide-react";
import { FLO_EMAIL, FLO_WHATSAPP, FLO_WHATSAPP_LINK, INTAKE_FORM_URL } from "../types";

export default function Footer() {
  return (
    <footer className="bg-[#1a2e1a] text-[#FAF6F0]/60 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <p className="font-serif text-lg text-[#FAF6F0] font-medium tracking-wide">
            Floortje de Liefde
          </p>
          <p className="font-accent text-xs tracking-widest uppercase text-[#658365]">
            Somatic Practitioner
          </p>
          <p className="font-sans text-sm leading-relaxed max-w-xs">
            A safe space to slow down, reconnect, and return to yourself through
            breathwork and body awareness.
          </p>
        </div>

        <div className="space-y-4">
          <p className="font-accent text-xs tracking-widest uppercase text-[#E8D09A]">
            Contact
          </p>
          <a
            href={`mailto:${FLO_EMAIL}`}
            className="flex items-center gap-2 font-sans text-sm text-[#FAF6F0]/70 hover:text-[#FAF6F0] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#C4924A] shrink-0" />
            {FLO_EMAIL}
          </a>
          <a
            href={FLO_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-sans text-sm text-[#FAF6F0]/70 hover:text-[#FAF6F0] transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#C4924A] shrink-0" />
            WhatsApp: {FLO_WHATSAPP}
          </a>
          <div className="flex items-center gap-2 font-sans text-sm">
            <MapPin className="w-4 h-4 text-[#C4924A] shrink-0" />
            <span>Online Worldwide</span>
          </div>
          <p className="font-sans text-xs text-[#FAF6F0]/40 leading-relaxed pt-1">
            Flo personally reviews each form submission and follows up directly
            by email or WhatsApp.
          </p>
        </div>

        <div className="space-y-4">
          <p className="font-accent text-xs tracking-widest uppercase text-[#E8D09A]">
            Work Together
          </p>
          <ul className="space-y-2 font-sans text-sm">
            <li>Discovery Call — Free</li>
            <li>Nervous System Reset — €111</li>
            <li>Private Breathwork Journey — €188</li>
          </ul>
          <a
            href={INTAKE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-xs px-4 py-2 rounded-full border border-[#334233] text-[#FAF6F0]/60 hover:border-[#C4924A] hover:text-[#E8D09A] transition-colors mt-2"
          >
            Start With The Intake Form →
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[#334233] flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs text-[#FAF6F0]/30">
          © 2026 Floortje de Liefde. All rights reserved.
        </p>
        <p className="font-serif italic text-xs text-[#658365]">
          One breath at a time.
        </p>
      </div>
    </footer>
  );
}
