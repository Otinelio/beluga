import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ChevronLeft, ShoppingBag, Plus, Minus, Trash2, MessageCircle, Check } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { useOrderStore } from "@/store/orderStore";
import { formatFCFA } from "@/utils/formatCurrency";
import { sendTableOrder } from "@/utils/whatsapp";
import { cn } from "@/lib/utils";
import type { CartItem, Category } from "@/types";
import { toast } from "sonner";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "starters", label: "Entrées" },
  { id: "mains", label: "Plats" },
  { id: "cocktails", label: "Bar" },
];

export function TablePage() {
  const { tableNumber = "?" } = useParams();
  const menu = useAdminStore((s) => s.menu);
  const addOrder = useOrderStore((s) => s.add);
  const [active, setActive] = useState<Category>("starters");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [guestName, setGuestName] = useState("");
  const [done, setDone] = useState(false);

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.quantity, 0), [cart]);

  const add = (id: string, name: string, price: number) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === id);
      if (existing) return c.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...c, { id, name, price, quantity: 1 }];
    });
    toast.success(`${name} ajouté`);
  };
  const dec = (id: string) =>
    setCart((c) =>
      c
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  const inc = (id: string) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  const remove = (id: string) => setCart((c) => c.filter((i) => i.id !== id));

  const submit = () => {
    if (!guestName.trim()) {
      toast.error("Merci d'indiquer un nom");
      return;
    }
    if (cart.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }
    addOrder(tableNumber, guestName.trim(), cart);
    sendTableOrder(tableNumber, guestName.trim(), cart);
    setDone(true);
    setCart([]);
  };

  if (done) {
    return (
      <>
        <Helmet><title>Commande envoyée — Table {tableNumber}</title></Helmet>
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-beluga-gold/15 text-beluga-gold">
            <Check size={36} />
          </div>
          <h1 className="mt-8 font-cormorant text-5xl font-semibold text-beluga-champagne">
            Commande transmise
          </h1>
          <p className="mt-4 max-w-md font-raleway text-sm font-light leading-relaxed text-beluga-champagne/70">
            Votre commande a été transmise à notre équipe. Vous serez servi sous peu.
          </p>
          <button
            onClick={() => setDone(false)}
            className="mt-10 font-raleway text-xs uppercase tracking-[0.25em] text-beluga-gold hover:text-beluga-champagne"
          >
            Commander à nouveau
          </button>
        </section>
      </>
    );
  }

  const items = menu.filter((m) => m.category === active && m.available);

  return (
    <>
      <Helmet><title>Table {tableNumber} — Le Beluga</title></Helmet>
      <header className="sticky top-0 z-30 border-b border-beluga-gold/15 bg-beluga-violet/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link to="/" aria-label="Accueil" className="text-beluga-champagne/60 hover:text-beluga-gold">
            <ChevronLeft size={20} />
          </Link>
          <div className="text-center">
            <p className="beluga-eyebrow">Menu scan</p>
            <p className="font-cormorant text-xl font-semibold text-beluga-champagne">
              Table {tableNumber}
            </p>
          </div>
          <div className="relative">
            <ShoppingBag size={20} className="text-beluga-gold" />
            {cart.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-[16px] place-items-center rounded-full bg-beluga-gold px-1 text-[10px] font-bold text-beluga-violet">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
        </div>
        <div className="mx-auto flex max-w-3xl gap-1 overflow-x-auto px-5 pb-3">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={cn(
                "shrink-0 px-4 py-1.5 font-raleway text-[0.7rem] uppercase tracking-[0.22em] transition",
                active === c.id
                  ? "bg-beluga-gold text-beluga-violet"
                  : "border border-beluga-gold/25 text-beluga-champagne/70",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-3 px-5 py-6 pb-[360px]">
        {items.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="beluga-glass flex gap-4 p-3"
          >
            <img src={m.image} alt={m.name} loading="lazy" className="h-24 w-24 shrink-0 object-cover" />
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="font-cormorant text-lg font-semibold text-beluga-champagne">{m.name}</p>
                <p className="line-clamp-2 font-raleway text-xs font-light text-beluga-champagne/60">
                  {m.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-cormorant italic text-beluga-gold">{formatFCFA(m.price)}</span>
                <button
                  onClick={() => add(m.id, m.name, m.price)}
                  aria-label="Ajouter"
                  className="grid h-9 w-9 place-items-center rounded-full border border-beluga-gold/40 text-beluga-gold hover:bg-beluga-gold hover:text-beluga-violet"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </main>

      {/* Sticky cart footer */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-beluga-gold/20 bg-beluga-violet/95 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-5 py-4">
          {cart.length > 0 && (
            <ul className="mb-3 max-h-40 space-y-1 overflow-y-auto pr-1">
              {cart.map((i) => (
                <li key={i.id} className="flex items-center gap-2 text-sm">
                  <span className="flex-1 truncate font-raleway text-beluga-champagne">{i.name}</span>
                  <button
                    onClick={() => dec(i.id)}
                    aria-label="-"
                    className="grid h-6 w-6 place-items-center border border-beluga-gold/30 text-beluga-champagne"
                  >
                    <Minus size={11} />
                  </button>
                  <span className="w-6 text-center font-raleway text-xs">{i.quantity}</span>
                  <button
                    onClick={() => inc(i.id)}
                    aria-label="+"
                    className="grid h-6 w-6 place-items-center border border-beluga-gold/30 text-beluga-champagne"
                  >
                    <Plus size={11} />
                  </button>
                  <span className="w-20 text-right font-cormorant italic text-beluga-gold">
                    {formatFCFA(i.price * i.quantity)}
                  </span>
                  <button
                    onClick={() => remove(i.id)}
                    aria-label="Supprimer"
                    className="ml-1 text-beluga-champagne/40 hover:text-beluga-gold"
                  >
                    <Trash2 size={13} />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <input
            placeholder="Votre nom"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="mb-3 w-full bg-transparent border border-beluga-gold/25 px-3 py-2 font-raleway text-sm text-beluga-champagne placeholder:text-beluga-champagne/35 focus:border-beluga-gold focus:outline-none"
          />
          <button
            onClick={submit}
            disabled={cart.length === 0}
            className="flex w-full items-center justify-between gap-2 bg-beluga-gold px-5 py-3.5 font-raleway text-[0.72rem] font-medium uppercase tracking-[0.25em] text-beluga-violet transition hover:bg-beluga-champagne disabled:opacity-40"
          >
            <span className="flex items-center gap-2">
              <MessageCircle size={14} /> Envoyer la commande
            </span>
            <span className="font-cormorant text-base italic">{formatFCFA(total)}</span>
          </button>
        </div>
      </div>
    </>
  );
}
