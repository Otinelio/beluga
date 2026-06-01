import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { Wine, Sun, Sparkles, Users, MessageCircle } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GoldButton } from "@/components/ui/GoldButton";
import { sendContactMessage } from "@/utils/whatsapp";
import { RESTAURANT } from "@/data/site";
import { toast } from "sonner";

const sections = [
  {
    id: "restaurant",
    eyebrow: "L'écrin",
    title: "Le Restaurant",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&w=1400&q=85",
    text:
      "Ambiance feutrée, lumière tamisée et service soigné : la salle du Beluga est pensée pour les dîners d'affaires, les rendez-vous, les anniversaires et les réceptions de clients. Une adresse premium de Lomé, entre élégance et discrétion.",
    bullets: ["Clientèle business & expatriée", "Dîners couple & anniversaires", "Cuisine gastronomique"],
  },
  {
    id: "terrasse",
    eyebrow: "Le ciel ouvert",
    title: "La Terrasse",
    icon: Sun,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=85",
    text:
      "Terrasse extérieure au cœur de Lomé : déjeuners d'affaires le midi, apéritifs et dîners prolongés en soirée. Un cadre idéal pour profiter de la ville sans renoncer au confort d'une table haut de gamme.",
    bullets: ["Terrasse extérieure", "Déjeuner & dîner", "Apéritifs en soirée"],
  },
  {
    id: "bar",
    eyebrow: "Lounge",
    title: "Le Bar",
    icon: Wine,
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1400&q=85",
    text:
      "Bar à cocktails et lounge : l'expérience Beluga se prolonge autour d'un verre, dans la même exigence que la salle. Une soirée chic sans aller en club — surtout le week-end, quand la musique live prend le relais.",
    bullets: ["Cocktails signature", "Ambiance lounge", "Soirées week-end"],
  },
  {
    id: "events",
    eyebrow: "Sur mesure",
    title: "Événements & Privé",
    icon: Users,
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1400&q=85",
    text:
      "Privatisation, déjeuners d'affaires, anniversaires ou réceptions : nos équipes composent menus et service sur mesure. Le Beluga vend une expérience complète — pas seulement un repas.",
    bullets: ["Privatisation", "Menus personnalisés", "Réceptions & galas"],
  },
];

export function ExperiencePage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  return (
    <PageTransition>
      <Helmet>
        <title>L'Expérience — Le Beluga</title>
        <meta
          name="description"
          content={`Restaurant, terrasse, bar lounge et événements privés au Beluga, ${RESTAURANT.city}.`}
        />
      </Helmet>

      <section className="relative flex h-[55vh] min-h-[380px] items-end overflow-hidden pb-16">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-beluga-violet/40 via-beluga-violet/70 to-beluga-violet" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
          <p className="beluga-eyebrow">Le Beluga — {RESTAURANT.city}</p>
          <h1 className="mt-4 font-cormorant text-6xl font-semibold text-beluga-champagne md:text-8xl">
            L'Expérience
          </h1>
        </div>
      </section>

      <nav className="sticky top-20 z-30 border-y border-beluga-gold/15 bg-beluga-violet/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 py-4 lg:px-10">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 px-4 py-2 font-raleway text-[0.7rem] uppercase tracking-[0.22em] text-beluga-champagne/70 transition hover:text-beluga-gold"
            >
              {s.title}
            </a>
          ))}
        </div>
      </nav>

      {sections.map((sec, idx) => {
        const reversed = idx % 2 === 1;
        const Icon = sec.icon;
        return (
          <section key={sec.id} id={sec.id} className="scroll-mt-44 py-24">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
              <motion.div
                initial={{ opacity: 0, x: reversed ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={reversed ? "lg:order-2" : ""}
              >
                <div className="relative">
                  <div className="absolute -inset-6 -z-10 bg-beluga-gold/10 blur-3xl" />
                  <img src={sec.image} alt={sec.title} className="aspect-[4/5] w-full object-cover" loading="lazy" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-beluga-gold" />
                  <span className="beluga-eyebrow">{sec.eyebrow}</span>
                </div>
                <h2 className="font-cormorant text-5xl font-semibold text-beluga-champagne md:text-6xl">
                  {sec.title}
                </h2>
                <p className="font-raleway text-base font-light leading-relaxed text-beluga-champagne/75">
                  {sec.text}
                </p>
                <ul className="space-y-2 pt-2">
                  {sec.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-3 font-raleway text-sm text-beluga-champagne/70"
                    >
                      <span className="h-px w-6 bg-beluga-gold" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>
        );
      })}

      <section className="py-24 beluga-ambient">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <SectionTitle
            eyebrow="Privatisation"
            title="Réservez votre événement"
            subtitle="Envoyez-nous une demande, notre équipe revient vers vous sous 24h."
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!form.name || !form.message) return;
              sendContactMessage(form.name, "Demande de privatisation", form.message, form.phone);
              toast.success("Demande envoyée");
              setForm({ name: "", phone: "", message: "" });
            }}
            className="beluga-glass mt-10 grid gap-4 p-8"
          >
            <input
              required
              placeholder="Votre nom"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-transparent border border-beluga-gold/25 px-4 py-3 font-raleway text-sm text-beluga-champagne placeholder:text-beluga-champagne/35 focus:border-beluga-gold focus:outline-none"
            />
            <input
              placeholder="Téléphone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-transparent border border-beluga-gold/25 px-4 py-3 font-raleway text-sm text-beluga-champagne placeholder:text-beluga-champagne/35 focus:border-beluga-gold focus:outline-none"
            />
            <textarea
              required
              rows={4}
              placeholder="Type d'événement, nombre d'invités, date..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-transparent border border-beluga-gold/25 px-4 py-3 font-raleway text-sm text-beluga-champagne placeholder:text-beluga-champagne/35 focus:border-beluga-gold focus:outline-none resize-none"
            />
            <GoldButton type="submit">
              <MessageCircle size={14} /> Envoyer via WhatsApp
            </GoldButton>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
