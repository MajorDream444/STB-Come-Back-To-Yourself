import { Mail, MapPin } from "lucide-react";

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
            href="mailto:hi@floortjedeliefde.com"
            className="flex items-center gap-2 font-sans text-sm text-[#FAF6F0]/70 hover:text-[#FAF6F0] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#C4924A]" />
            hi@floortjedeliefde.com
          </a>
          <div className="flex items-center gap-2 font-sans text-sm">
            <MapPin className="w-4 h-4 text-[#C4924A] shrink-0" />
            <span>Ubud, Bali &amp; Online Worldwide</span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-accent text-xs tracking-widest uppercase text-[#E8D09A]">
            Work Together
          </p>
          <ul className="space-y-2 font-sans text-sm">
            <li>Discovery Call — Free</li>
            <li>Nervous System Reset — €75</li>
            <li>Private Breathwork Journey — €150</li>
          </ul>
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
