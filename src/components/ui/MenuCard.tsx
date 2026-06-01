import { motion } from "framer-motion";
import { Plus, Leaf } from "lucide-react";
import type { MenuItem } from "@/types";
import { formatFCFA } from "@/utils/formatCurrency";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

interface Props {
  item: MenuItem;
  index?: number;
}

export function MenuCard({ item, index = 0 }: Props) {
  const add = useCartStore((s) => s.add);
  const isVeggie = item.tags?.includes("veggie");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="beluga-glass beluga-glass-hover group relative flex flex-col overflow-hidden transition-all duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-beluga-violet/90 via-beluga-violet/20 to-transparent" />
        {!item.available && (
          <div className="absolute inset-0 grid place-items-center bg-beluga-violet/80">
            <span className="font-raleway text-[0.7rem] uppercase tracking-[0.3em] text-beluga-gold">
              Épuisé
            </span>
          </div>
        )}
        {isVeggie && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 border border-beluga-gold/50 bg-beluga-violet/70 px-2 py-1 text-[10px] uppercase tracking-widest text-beluga-gold backdrop-blur">
            <Leaf size={10} /> Veggie
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-cormorant text-2xl font-semibold leading-tight text-beluga-champagne">
            {item.name}
          </h3>
          <span className="shrink-0 font-cormorant text-xl font-semibold italic text-beluga-gold">
            {formatFCFA(item.price)}
          </span>
        </div>
        <p className="font-raleway text-sm font-light leading-relaxed text-beluga-champagne/70">
          {item.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-raleway text-[0.65rem] uppercase tracking-[0.25em] text-beluga-champagne/40">
            {item.category === "starters" ? "Entrée" : item.category === "mains" ? "Plat" : "Bar"}
          </span>
          <button
            onClick={() => {
              if (!item.available) return;
              add(item);
              toast.success(`${item.name} ajouté au panier`);
            }}
            disabled={!item.available}
            aria-label={`Ajouter ${item.name}`}
            className="grid h-10 w-10 place-items-center rounded-full border border-beluga-gold/40 text-beluga-gold transition hover:bg-beluga-gold hover:text-beluga-violet disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
