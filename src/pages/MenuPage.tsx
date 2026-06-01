import { Helmet } from "react-helmet-async";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
import { MenuCard } from "@/components/ui/MenuCard";
import { useAdminStore } from "@/store/adminStore";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "starters", label: "Entrées" },
  { id: "mains", label: "Poissons & Viandes" },
  { id: "cocktails", label: "Cocktails & Bar" },
];

export function MenuPage() {
  const menu = useAdminStore((s) => s.menu);
  const [service, setService] = useState<"dejeuner" | "diner" | "all">("all");
  const [active, setActive] = useState<Category>("starters");

  const filtered = useMemo(() => {
    return menu.filter((m) => service === "all" || m.service === "both" || m.service === service);
  }, [menu, service]);

  // Scroll spy
  useEffect(() => {
    const sections = CATEGORIES.map((c) => document.getElementById(c.id));
    const onScroll = () => {
      for (const sec of sections) {
        if (!sec) continue;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActive(sec.id as Category);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>La Carte — Le Beluga Restaurant</title>
        <meta name="description" content="Carte du Beluga à Lomé : entrées, poissons et fruits de mer, grillades, viandes premium, desserts et cocktails." />
      </Helmet>

      {/* HERO */}
      <section
        className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden pb-20"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1574936145840-28808d77a0b6?auto=format&fit=crop&w=2200&q=85)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-beluga-violet/40 via-beluga-violet/70 to-beluga-violet" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="beluga-eyebrow"
          >
            Édition saisonnière
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 font-cormorant text-6xl font-semibold leading-none text-beluga-champagne md:text-8xl"
          >
            La Carte
          </motion.h1>
        </div>
      </section>

      {/* STICKY CATEGORY NAV */}
      <div className="sticky top-20 z-30 border-y border-beluga-gold/15 bg-beluga-violet/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-10">
          <nav className="flex flex-wrap gap-1">
            {CATEGORIES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className={cn(
                  "px-4 py-2 font-raleway text-[0.72rem] uppercase tracking-[0.22em] transition",
                  active === c.id
                    ? "text-beluga-gold"
                    : "text-beluga-champagne/60 hover:text-beluga-champagne",
                )}
              >
                {c.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-1 border border-beluga-gold/30 p-1">
            {(["all", "dejeuner", "diner"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setService(s)}
                className={cn(
                  "px-4 py-1.5 font-raleway text-[0.7rem] uppercase tracking-[0.2em] transition",
                  service === s
                    ? "bg-beluga-gold text-beluga-violet"
                    : "text-beluga-champagne/70 hover:text-beluga-gold",
                )}
              >
                {s === "all" ? "Tout" : s === "dejeuner" ? "Déjeuner" : "Dîner"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-24 px-6 py-20 lg:px-10">
        {CATEGORIES.map((cat) => {
          const items = filtered.filter((m) => m.category === cat.id);
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-44">
              <div className="mb-10 flex items-end justify-between gap-6">
                <div>
                  <span className="beluga-eyebrow">{cat.id === "cocktails" ? "Bar" : "Carte"}</span>
                  <h2 className="mt-3 font-cormorant text-4xl font-semibold text-beluga-champagne md:text-5xl">
                    {cat.label}
                  </h2>
                </div>
                <span className="font-cormorant italic text-beluga-gold/70">
                  {items.length} {items.length > 1 ? "créations" : "création"}
                </span>
              </div>
              <div className="beluga-gold-divider mb-10" />
              {items.length === 0 ? (
                <p className="font-cormorant italic text-beluga-champagne/50">
                  Aucun plat disponible pour ce service.
                </p>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item, i) => (
                    <MenuCard key={item.id} item={item} index={i} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </PageTransition>
  );
}
