import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { useAdminStore } from "@/store/adminStore";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types";

const FILTERS: { id: GalleryImage["category"] | "all"; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "restaurant", label: "Restaurant" },
  { id: "terrasse", label: "Terrasse" },
  { id: "bar", label: "Bar" },
  { id: "plats", label: "Plats" },
  { id: "events", label: "Events" },
];

export function GalleryPage() {
  const gallery = useAdminStore((s) => s.gallery);
  const [filter, setFilter] = useState<typeof FILTERS[number]["id"]>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = filter === "all" ? gallery : gallery.filter((g) => g.category === filter);

  const close = () => setOpenIndex(null);
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % items.length));
  const prev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length));

  return (
    <PageTransition>
      <Helmet>
        <title>Galerie — Le Beluga</title>
        <meta name="description" content="Plongez dans l'univers visuel du Beluga : ambiance, plats, terrasse, événements." />
      </Helmet>

      <section className="relative flex h-[45vh] min-h-[320px] items-end overflow-hidden pb-14">
        <img
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=2400&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-beluga-violet/40 via-beluga-violet/70 to-beluga-violet" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
          <p className="beluga-eyebrow">Visuels</p>
          <h1 className="mt-4 font-cormorant text-6xl font-semibold text-beluga-champagne md:text-8xl">
            Galerie
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "px-4 py-2 font-raleway text-[0.7rem] uppercase tracking-[0.22em] transition",
                filter === f.id
                  ? "bg-beluga-gold text-beluga-violet"
                  : "border border-beluga-gold/25 text-beluga-champagne/70 hover:border-beluga-gold hover:text-beluga-gold",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {items.map((img, i) => (
            <motion.button
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 9) * 0.05, duration: 0.5 }}
              onClick={() => setOpenIndex(i)}
              className="group relative block w-full overflow-hidden"
            >
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-beluga-violet/0 transition-colors duration-500 group-hover:bg-beluga-violet/30" />
              <span className="absolute bottom-3 left-3 inline-block border border-beluga-gold/40 bg-beluga-violet/70 px-2 py-1 font-raleway text-[10px] uppercase tracking-[0.22em] text-beluga-gold opacity-0 backdrop-blur transition group-hover:opacity-100">
                {img.category}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && items[openIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-beluga-violet/95 p-6 backdrop-blur-md"
            onClick={close}
          >
            <button
              onClick={(e) => { e.stopPropagation(); close(); }}
              aria-label="Fermer"
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full border border-beluga-gold/40 text-beluga-champagne hover:text-beluga-gold"
            >
              <X size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Précédent"
              className="absolute left-6 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-beluga-gold/40 text-beluga-champagne hover:text-beluga-gold"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Suivant"
              className="absolute right-6 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-beluga-gold/40 text-beluga-champagne hover:text-beluga-gold"
            >
              <ChevronRight size={22} />
            </button>
            <motion.img
              key={items[openIndex].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={items[openIndex].url}
              alt={items[openIndex].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
