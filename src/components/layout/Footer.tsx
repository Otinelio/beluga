import { Link } from "react-router-dom";
import { Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react";
import { RESTAURANT } from "@/data/site";

export function Footer() {
  const { address, phone, hours } = RESTAURANT;

  return (
    <footer className="relative mt-32 border-t border-beluga-gold/20 bg-beluga-violet">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3 lg:px-10">
        <div>
          <h3 className="font-cormorant text-3xl font-bold tracking-[0.18em] text-beluga-champagne">
            LE BELUGA
          </h3>
          <p className="mt-4 max-w-xs font-cormorant text-lg italic text-beluga-champagne/70">
            {RESTAURANT.tagline}
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href="https://instagram.com/beluga.restaurant"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-beluga-gold/30 text-beluga-champagne transition hover:border-beluga-gold hover:text-beluga-gold"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://facebook.com/profile.php?id=100064680399992"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-beluga-gold/30 text-beluga-champagne transition hover:border-beluga-gold hover:text-beluga-gold"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="beluga-eyebrow">Navigation</p>
          <ul className="mt-6 space-y-3 font-raleway text-sm text-beluga-champagne/80">
            <li><Link to="/menu" className="transition hover:text-beluga-gold">La Carte</Link></li>
            <li><Link to="/experience" className="transition hover:text-beluga-gold">Expérience</Link></li>
            <li><Link to="/nos-chefs" className="transition hover:text-beluga-gold">Notre Cuisine</Link></li>
            <li><Link to="/galerie" className="transition hover:text-beluga-gold">Galerie</Link></li>
            <li><Link to="/contact" className="transition hover:text-beluga-gold">Contact</Link></li>
            <li><Link to="/reservation" className="transition hover:text-beluga-gold">Réserver</Link></li>
          </ul>
        </div>

        <div>
          <p className="beluga-eyebrow">Contact</p>
          <ul className="mt-6 space-y-4 font-raleway text-sm text-beluga-champagne/80">
            <li className="flex items-start gap-3">
              <MapPin size={15} className="mt-0.5 shrink-0 text-beluga-gold" />
              <span>
                {address.line}
                <br />
                {RESTAURANT.city}, {RESTAURANT.country}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={15} className="shrink-0 text-beluga-gold" />
              <a href={`tel:${phone.tel}`} className="hover:text-beluga-gold">
                {phone.display} (WhatsApp)
              </a>
            </li>
            <li className="flex items-start gap-3 pt-2">
              <Clock size={15} className="mt-0.5 shrink-0 text-beluga-gold" />
              <div className="space-y-1 text-xs leading-relaxed">
                {hours.slice(0, 3).map((h) => (
                  <div key={`${h.label}-${h.value}`}>
                    {h.label} — {h.value}
                  </div>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="beluga-gold-divider" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 font-raleway text-xs text-beluga-champagne/50 lg:px-10">
        <p>© 2025 Le Beluga Restaurant</p>
        <p className="font-cormorant italic">
          {RESTAURANT.city}, {RESTAURANT.country}
        </p>
      </div>
    </footer>
  );
}
