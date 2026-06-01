import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RESTAURANT } from "@/data/site";

const timeline = [
  { year: "—", text: "Le Beluga s'impose parmi les adresses chic de Lomé, rue de l'Entente." },
  { year: "—", text: "Carte française & européenne, gastronomie aux accents togolais." },
  { year: "—", text: "Terrasse, bar lounge et soirées musicales le week-end." },
  { year: "—", text: "Saveurs du Monde — pâtisserie au niveau inférieur du restaurant." },
];

const signatures = [
  "Poissons & fruits de mer",
  "Grillades & viandes premium",
  "Desserts & pâtisserie",
];

export function ChefsPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Notre Cuisine — Le Beluga</title>
        <meta
          name="description"
          content={`Cuisine française et gastronomique à ${RESTAURANT.city} : poissons, fruits de mer, grillades et desserts d'exception au Beluga.`}
        />
      </Helmet>

      <section className="relative flex h-[55vh] min-h-[400px] items-end overflow-hidden pb-16">
        <img
          src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=2200&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-beluga-violet/40 via-beluga-violet/70 to-beluga-violet" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
          <p className="beluga-eyebrow">Lomé</p>
          <h1 className="mt-4 font-cormorant text-6xl font-semibold text-beluga-champagne md:text-8xl">
            Notre Cuisine
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[420px_1fr] lg:px-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 bg-beluga-gold/10 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=85"
              alt="Plat gastronomique au Beluga"
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="beluga-eyebrow">Philosophie</p>
            <h2 className="font-cormorant text-5xl font-semibold leading-tight text-beluga-champagne md:text-6xl">
              Une table premium à Lomé
            </h2>
            <p className="font-raleway text-base font-light leading-relaxed text-beluga-champagne/80">
              Le Beluga propose une cuisine française et internationale, une gastronomie raffinée
              aux influences togolaises, des produits de la mer et des grillades soignées. Perçu
              comme l'un des restaurants les plus haut de gamme de la capitale, il mise sur la
              qualité d'assiette et l'expérience globale — cadre, service et ambiance musicale.
            </p>
            <blockquote className="border-l-2 border-beluga-gold pl-6 font-cormorant text-2xl italic leading-snug text-beluga-champagne/90">
              “Chaque service est pensé comme une soirée : élégante, généreuse et mémorable.”
            </blockquote>
            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              {signatures.map((d) => (
                <div key={d} className="beluga-glass p-4 text-center">
                  <p className="font-cormorant text-lg text-beluga-gold italic">Au menu</p>
                  <p className="mt-1 font-raleway text-sm text-beluga-champagne">{d}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionTitle eyebrow="La brigade" title="Une équipe, une exigence" />
          <p className="mx-auto mt-6 max-w-2xl text-center font-raleway text-sm font-light leading-relaxed text-beluga-champagne/70">
            Cuisine, salle et bar travaillent main dans la main pour offrir l'expérience Beluga :
            dîner couple, rendez-vous business, anniversaire ou réception de clients.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Brigade cuisine", role: "Gastronomie & grillades", img: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=700&q=80" },
              { name: "Brigade poisson", role: "Fruits de mer", img: "https://images.unsplash.com/photo-1581349437898-cebbe9831942?auto=format&fit=crop&w=700&q=80" },
              { name: "Service en salle", role: "Accueil premium", img: "https://images.unsplash.com/photo-1601315379734-425d6b1d4eda?auto=format&fit=crop&w=700&q=80" },
              { name: "Bar & lounge", role: "Cocktails & soirées", img: "https://images.unsplash.com/photo-1542596081-3cf2cd4f7bda?auto=format&fit=crop&w=700&q=80" },
            ].map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative aspect-[3/4] overflow-hidden"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-beluga-violet via-beluga-violet/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-cormorant text-xl font-semibold text-beluga-champagne">{p.name}</p>
                  <p className="beluga-eyebrow mt-1">{p.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 beluga-ambient">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <SectionTitle eyebrow="Notre histoire" title="Le Beluga à Lomé" />
          <ol className="mt-14 space-y-8 border-l border-beluga-gold/30 pl-8">
            {timeline.map((t, i) => (
              <motion.li
                key={t.text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative"
              >
                <span className="absolute -left-[37px] top-2 grid h-4 w-4 place-items-center rounded-full border border-beluga-gold bg-beluga-violet">
                  <span className="h-1.5 w-1.5 rounded-full bg-beluga-gold" />
                </span>
                {t.year !== "—" && <p className="font-dancing text-3xl text-beluga-gold">{t.year}</p>}
                <p className="mt-1 font-raleway text-sm font-light text-beluga-champagne/75">{t.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </PageTransition>
  );
}
