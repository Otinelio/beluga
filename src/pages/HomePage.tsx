import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Utensils, Wine, Music2, Sun, Plus } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { ReservationForm } from "@/components/ui/ReservationForm";
import { GoldButton } from "@/components/ui/GoldButton";
import { SEED_MENU } from "@/data/menu";
import { formatFCFA } from "@/utils/formatCurrency";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { RESTAURANT } from "@/data/site";

const HERO_IMG = "/hero-beluga.png";

function AnimatedTitle({ text }: { text: string }) {
  return (
    <span className="inline-block">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 + i * 0.04, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{ whiteSpace: c === " " ? "pre" : "normal" }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

export function HomePage() {
  const add = useCartStore((s) => s.add);
  const teaserItems = SEED_MENU.slice(0, 8);

  return (
    <PageTransition>
      <Helmet>
        <title>{RESTAURANT.seo.title}</title>
        <meta name="description" content={RESTAURANT.seo.description} />
        <meta property="og:title" content={RESTAURANT.seo.title} />
        <meta property="og:description" content={RESTAURANT.tagline} />
        <meta property="og:image" content={HERO_IMG} />
      </Helmet>

      <ParallaxHero image={HERO_IMG} overlay={0.62}>
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="beluga-eyebrow"
          >
            {RESTAURANT.city} — {RESTAURANT.positioning}
          </motion.span>
          <h1 className="mt-6 overflow-hidden font-cormorant text-[clamp(3.5rem,11vw,9rem)] font-bold leading-[0.95] tracking-[0.05em] text-beluga-champagne">
            <AnimatedTitle text="LE BELUGA" />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="mt-6 max-w-xl font-raleway text-base font-light leading-relaxed text-beluga-champagne/85 md:text-lg"
          >
            Cuisine française & gastronomique — une adresse premium au cœur de Lomé.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/menu">
              <GoldButton>Découvrir le menu</GoldButton>
            </Link>
            <Link to="/reservation">
              <GoldButton variant="ghost">Réserver une table</GoldButton>
            </Link>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="mt-16 text-beluga-gold/70"
          >
            <ChevronDown size={26} />
          </motion.div>
        </div>
      </ParallaxHero>

      {/* CONCEPT */}
      <section className="relative py-28 md:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
          <div className="space-y-7">
            <span className="beluga-eyebrow">Le concept</span>
            <h2 className="font-cormorant text-4xl font-semibold leading-tight text-beluga-champagne md:text-5xl beluga-text-balance">
              L'une des tables les plus chic de Lomé — entre gastronomie, lounge et lumière tamisée.
            </h2>
            <p className="font-raleway text-base font-light leading-relaxed text-beluga-champagne/70">
              Face à l'Hôtel de la Paix, le Beluga propose une cuisine française et européenne,
              une gastronomie aux accents togolais, des fruits de mer et grillades d'exception — dans
              un cadre élégant pensé pour les dîners d'affaires, les couples et les soirées premium.
            </p>
            <div className="font-cormorant text-2xl italic text-beluga-gold">
              <span className="font-dancing text-5xl leading-none text-beluga-gold">“</span>
              Bien plus qu'un repas : cadre, musique et expérience de dîner.
            </div>
            <div className="grid grid-cols-2 gap-6 pt-4 md:grid-cols-4">
              {[
                { Icon: Utensils, label: "Gastronomie" },
                { Icon: Wine, label: "Bar & Lounge" },
                { Icon: Music2, label: "Musique live" },
                { Icon: Sun, label: "Terrasse" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <Icon size={22} className="text-beluga-gold" />
                  <span className="font-raleway text-[0.68rem] uppercase tracking-[0.22em] text-beluga-champagne/70">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 bg-beluga-gold/10 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1100&q=85"
              alt="Plat signature Beluga"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -left-6 hidden border border-beluga-gold/40 bg-beluga-violet/95 px-6 py-4 md:block">
              <p className="font-dancing text-2xl text-beluga-gold">Saveurs du Monde</p>
              <p className="font-raleway text-[0.65rem] uppercase tracking-[0.25em] text-beluga-champagne/60">
                Pâtisserie — niveau inférieur
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MENU TEASER */}
      <section className="relative py-24 beluga-ambient">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionTitle
            eyebrow="Aperçu de la carte"
            title="Les Signatures du Beluga"
            subtitle="Une sélection de nos entrées, plats et créations du bar — une invitation au voyage."
          />
          <div className="mt-14 -mx-6 overflow-x-auto pb-6 lg:mx-0 lg:overflow-visible">
            <div className="flex gap-5 px-6 lg:grid lg:grid-cols-4 lg:px-0 lg:beluga-mask-fade-r-none">
              {teaserItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
                  className="beluga-glass beluga-glass-hover group min-w-[260px] max-w-[280px] flex-shrink-0 overflow-hidden lg:min-w-0 lg:max-w-none"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-beluga-violet via-beluga-violet/20 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-cormorant text-xl font-semibold text-beluga-champagne">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => {
                          add(item);
                          toast.success(`${item.name} ajouté`);
                        }}
                        aria-label="Ajouter"
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-beluga-gold/40 text-beluga-gold transition hover:bg-beluga-gold hover:text-beluga-violet"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="mt-2 line-clamp-2 font-raleway text-xs font-light text-beluga-champagne/60">
                      {item.description}
                    </p>
                    <p className="mt-3 font-cormorant text-lg font-semibold italic text-beluga-gold">
                      {formatFCFA(item.price)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <Link to="/menu">
              <GoldButton variant="ghost">
                Voir la carte complète <ArrowRight size={14} />
              </GoldButton>
            </Link>
          </div>
        </div>
      </section>

      {/* EXPERIENCE STRIP */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionTitle
            eyebrow="L'Expérience"
            title="Quatre univers, une même âme"
            subtitle="Du dîner intimiste au cocktail en terrasse, le Beluga se vit en plusieurs actes."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Restaurant", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80" },
              { label: "Terrasse", img: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80" },
              { label: "Bar", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80" },
              { label: "Events", img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80" },
            ].map((cell, i) => (
              <motion.div
                key={cell.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  to="/experience"
                  className="group relative block aspect-[3/4] overflow-hidden"
                >
                  <img
                    src={cell.img}
                    alt={cell.label}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-beluga-violet via-beluga-violet/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="beluga-eyebrow">Découvrir</p>
                    <h3 className="mt-2 font-cormorant text-3xl font-semibold text-beluga-champagne">
                      {cell.label}
                    </h3>
                  </div>
                  <div className="absolute inset-0 border border-beluga-gold/0 transition-colors duration-500 group-hover:border-beluga-gold/40" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BAR SECTION */}
      <section
        className="relative py-32"
        style={{
          background: "linear-gradient(135deg, #160c2a, #2C1F4A 80%)",
        }}
      >
        <div className="absolute inset-0 -z-0 opacity-50">
          <img
            src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-beluga-violet/70" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
          <span className="beluga-eyebrow">Le bar</span>
          <h2 className="mt-5 font-cormorant text-5xl font-semibold text-beluga-champagne md:text-6xl">
            Le bar — <span className="italic text-beluga-gold">l'art du cocktail</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-raleway text-base font-light text-beluga-champagne/70">
            Signatures, spiritueux et mixologie soignée. Le lounge s'anime en soirée, en harmonie avec la salle et la terrasse.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {SEED_MENU.filter((m) => m.category === "cocktails").map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="beluga-glass p-5 text-left"
              >
                <p className="font-cormorant text-xl font-semibold text-beluga-champagne">{c.name}</p>
                <p className="mt-2 font-raleway text-xs font-light text-beluga-champagne/60">{c.description}</p>
                <p className="mt-3 font-cormorant italic text-beluga-gold">{formatFCFA(c.price)}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/experience">
              <GoldButton>Découvrir le bar</GoldButton>
            </Link>
          </div>
        </div>
      </section>

      {/* CUISINE */}
      <section className="py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <span className="beluga-eyebrow">La cuisine</span>
          <h2 className="mt-5 font-cormorant text-5xl font-semibold text-beluga-champagne md:text-6xl">
            Française, <span className="italic text-beluga-gold">gastronomique & togolaise</span>
          </h2>
          <div className="mt-10 flex flex-col items-center gap-8">
            <img
              src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=400&q=80"
              alt="Cuisine du Beluga"
              className="h-40 w-40 rounded-full border-2 border-beluga-gold/40 object-cover"
              loading="lazy"
            />
            <p className="max-w-2xl font-raleway text-base font-light leading-relaxed text-beluga-champagne/75">
              Poissons et fruits de mer, grillades, viandes premium et desserts d'exception : notre carte
              célèbre une cuisine raffinée aux accents locaux. En dessous, Saveurs du Monde complète
              l'expérience avec une pâtisserie généreuse.
            </p>
            <Link to="/nos-chefs">
              <GoldButton variant="ghost">Découvrir notre cuisine <ArrowRight size={14} /></GoldButton>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <TestimonialCard
            quote="Une des adresses les plus chic de Lomé. Cuisine soignée, ambiance feutrée et service attentionné — idéal pour un dîner d'affaires ou une soirée en couple."
            author="Client régulier"
            role="Lomé"
          />
        </div>
      </section>

      {/* RESERVATION */}
      <section className="pb-28 pt-8">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <SectionTitle
            eyebrow="Réserver"
            title="Votre table vous attend"
            subtitle="Confirmez votre venue en quelques secondes. Notre équipe vous répond par WhatsApp."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
            <ReservationForm />
            <aside className="beluga-glass flex flex-col justify-between p-8">
              <div>
                <p className="beluga-eyebrow">Direct</p>
                <p className="mt-4 font-cormorant text-2xl italic leading-snug text-beluga-champagne">
                  Préférez-vous nous parler ? Nous sommes joignables 7j/7.
                </p>
              </div>
              <div className="mt-8 space-y-3 font-raleway text-sm text-beluga-champagne/80">
                <a href={`tel:${RESTAURANT.phone.tel}`} className="block hover:text-beluga-gold">
                  {RESTAURANT.phone.display} (WhatsApp)
                </a>
                <p className="text-beluga-champagne/55">{RESTAURANT.address.line}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
