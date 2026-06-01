import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { MapPin, Phone, Clock, MessageCircle, Send } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { GoldButton } from "@/components/ui/GoldButton";
import { sendContactMessage } from "@/utils/whatsapp";
import { RESTAURANT } from "@/data/site";
import { toast } from "sonner";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const { address, phone, hours } = RESTAURANT;

  const submitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      toast.error("Nom et message requis");
      return;
    }
    sendContactMessage(form.name, form.subject || "Contact", form.message, form.phone);
    toast.success("Ouverture de WhatsApp…");
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Contact — Le Beluga</title>
        <meta
          name="description"
          content={`Contactez Le Beluga : ${address.full}. ${phone.display}.`}
        />
      </Helmet>

      <section className="relative flex h-[45vh] min-h-[320px] items-end overflow-hidden pb-14">
        <img
          src="https://images.unsplash.com/photo-1505842465776-3d90f616310d?auto=format&fit=crop&w=2400&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-beluga-violet/40 via-beluga-violet/70 to-beluga-violet" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
          <p className="beluga-eyebrow">Nous écrire</p>
          <h1 className="mt-4 font-cormorant text-6xl font-semibold text-beluga-champagne md:text-8xl">
            Contact
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-10">
          <div className="space-y-10">
            <div>
              <p className="beluga-eyebrow">Adresse</p>
              <h2 className="mt-4 font-cormorant text-4xl font-semibold text-beluga-champagne">
                {address.street}
              </h2>
              <p className="mt-2 font-raleway text-sm text-beluga-champagne/70">
                {address.formerStreet} — {address.landmark}
              </p>
            </div>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="mt-1 text-beluga-gold" />
                <div>
                  <p className="font-raleway text-sm text-beluga-champagne">
                    {RESTAURANT.city}, {RESTAURANT.country}
                  </p>
                  <p className="font-raleway text-xs text-beluga-champagne/50">{address.zone}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone size={18} className="mt-1 text-beluga-gold" />
                <a
                  className="font-raleway text-sm hover:text-beluga-gold"
                  href={`https://wa.me/${phone.whatsapp}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {phone.display} — WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Clock size={18} className="mt-1 text-beluga-gold" />
                <div className="space-y-2 font-raleway text-sm text-beluga-champagne/80">
                  {hours.map((h) => (
                    <p key={`${h.label}-${h.value}`}>
                      <span className="text-beluga-champagne/50">{h.label} — </span>
                      {h.value}
                    </p>
                  ))}
                </div>
              </li>
            </ul>

            <div className="overflow-hidden border border-beluga-gold/20">
              <iframe
                title="Le Beluga sur Google Maps"
                src={`https://www.google.com/maps?q=${RESTAURANT.mapsEmbedQuery}&output=embed`}
                className="h-72 w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form onSubmit={submitWhatsApp} className="beluga-glass grid h-fit gap-4 p-8 md:p-10">
            <div>
              <label className="beluga-eyebrow mb-2 block">Nom</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border border-beluga-gold/25 px-4 py-3 font-raleway text-sm text-beluga-champagne focus:border-beluga-gold focus:outline-none"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="beluga-eyebrow mb-2 block">Email (optionnel)</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border border-beluga-gold/25 px-4 py-3 font-raleway text-sm text-beluga-champagne focus:border-beluga-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="beluga-eyebrow mb-2 block">Téléphone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-transparent border border-beluga-gold/25 px-4 py-3 font-raleway text-sm text-beluga-champagne focus:border-beluga-gold focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="beluga-eyebrow mb-2 block">Objet</label>
              <input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-transparent border border-beluga-gold/25 px-4 py-3 font-raleway text-sm text-beluga-champagne focus:border-beluga-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="beluga-eyebrow mb-2 block">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none bg-transparent border border-beluga-gold/25 px-4 py-3 font-raleway text-sm text-beluga-champagne focus:border-beluga-gold focus:outline-none"
              />
            </div>
            <GoldButton type="submit" className="w-full">
              <MessageCircle size={14} /> Envoyer via WhatsApp
            </GoldButton>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
