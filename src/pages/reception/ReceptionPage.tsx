import { useState, useEffect, useMemo, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, CheckCircle, Truck, Trash2, RefreshCw, LogOut } from "lucide-react";
import { useOrderStore } from "@/store/orderStore";
import { useAdminStore } from "@/store/adminStore";
import { formatFCFA } from "@/utils/formatCurrency";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";

function PinGate({ onPass }: { onPass: () => void }) {
  const [pin, setPin] = useState("");
  const expected = useAdminStore((s) => s.receptionPin);
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (pin === expected) onPass();
          else setPin("");
        }}
        className="beluga-glass w-full max-w-sm p-10 text-center"
      >
        <Lock size={26} className="mx-auto text-beluga-gold" />
        <h1 className="mt-6 font-cormorant text-3xl font-semibold text-beluga-champagne">
          Réception
        </h1>
        <p className="mt-2 font-raleway text-xs uppercase tracking-[0.25em] text-beluga-champagne/50">
          Entrez votre code
        </p>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="mt-8 w-full bg-transparent border-b border-beluga-gold/40 py-3 text-center font-cormorant text-3xl tracking-[0.5em] text-beluga-champagne focus:border-beluga-gold focus:outline-none"
        />
        <button
          type="submit"
          className="mt-8 w-full bg-beluga-gold py-3 font-raleway text-[0.72rem] uppercase tracking-[0.25em] text-beluga-violet hover:bg-beluga-champagne"
        >
          Accéder
        </button>
      </form>
    </section>
  );
}

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "bg-beluga-gold",
  confirmed: "bg-blue-400",
  served: "bg-emerald-400",
};
const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  served: "Servie",
};

export function ReceptionPage() {
  const [authed, setAuthed] = useState(false);
  const orders = useOrderStore((s) => s.orders);
  const setStatus = useOrderStore((s) => s.setStatus);
  const remove = useOrderStore((s) => s.remove);
  const prevCount = useRef(0);
  const audioRef = useRef<AudioContext | null>(null);

  // Beep on new pending order
  useEffect(() => {
    if (!authed) return;
    const pendingCount = orders.filter((o) => o.status === "pending").length;
    if (pendingCount > prevCount.current && prevCount.current > 0) {
      try {
        if (!audioRef.current) audioRef.current = new AudioContext();
        const ctx = audioRef.current;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = 880; o.type = "sine";
        g.gain.setValueAtTime(0.001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        o.start(); o.stop(ctx.currentTime + 0.4);
      } catch {/* ignore */}
    }
    prevCount.current = pendingCount;
  }, [orders, authed]);

  // Auto-poll trick (zustand persist already syncs cross-tab via storage event,
  // but force a re-render every 3s to refresh elapsed times)
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!authed) return;
    const t = setInterval(() => setTick((n) => n + 1), 3000);
    return () => clearInterval(t);
  }, [authed]);

  const today = useMemo(() => {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    return orders.filter((o) => o.createdAt >= start.getTime());
  }, [orders]);

  const revenue = today.reduce((s, o) => s + o.total, 0);
  const topDish = useMemo(() => {
    const counts: Record<string, number> = {};
    today.forEach((o) => o.items.forEach((i) => (counts[i.name] = (counts[i.name] || 0) + i.quantity)));
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return entries[0]?.[0] ?? "—";
  }, [today]);

  if (!authed) return <PinGate onPass={() => setAuthed(true)} />;

  const sorted = [...orders].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <>
      <Helmet><title>Réception — Le Beluga</title></Helmet>
      <header className="sticky top-0 z-30 border-b border-beluga-gold/15 bg-beluga-violet/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div>
            <p className="beluga-eyebrow">Le Beluga</p>
            <h1 className="font-cormorant text-2xl font-semibold text-beluga-champagne">
              Tableau de réception
            </h1>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-2 border border-beluga-gold/30 px-4 py-2 font-raleway text-[0.7rem] uppercase tracking-[0.22em] text-beluga-champagne hover:border-beluga-gold hover:text-beluga-gold"
          >
            <LogOut size={13} /> Quitter
          </button>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 px-6 pb-5 lg:px-10">
          {[
            { label: "Commandes aujourd'hui", value: today.length },
            { label: "Revenu", value: formatFCFA(revenue) },
            { label: "Plat le plus commandé", value: topDish },
          ].map((s) => (
            <div key={s.label} className="beluga-glass p-4">
              <p className="font-raleway text-[0.65rem] uppercase tracking-[0.22em] text-beluga-champagne/55">
                {s.label}
              </p>
              <p className="mt-2 font-cormorant text-xl font-semibold text-beluga-gold">{s.value}</p>
            </div>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {sorted.length === 0 ? (
          <div className="beluga-glass flex flex-col items-center gap-3 p-16 text-center">
            <RefreshCw size={32} className="text-beluga-gold" />
            <p className="font-cormorant text-xl italic text-beluga-champagne/60">
              Aucune commande pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
              {sorted.map((o) => {
                const minsAgo = Math.max(0, Math.round((Date.now() - o.createdAt) / 60000));
                return (
                  <motion.article
                    layout
                    key={o.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className="beluga-glass flex flex-col p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="beluga-eyebrow">Table {o.tableNumber}</p>
                        <h3 className="mt-1 font-cormorant text-2xl font-semibold text-beluga-champagne">
                          {o.guestName}
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-2 font-raleway text-[0.65rem] uppercase tracking-[0.22em] text-beluga-champagne/70">
                        <span className={cn("h-2 w-2 rounded-full", STATUS_COLOR[o.status])} />
                        {STATUS_LABEL[o.status]}
                      </span>
                    </div>
                    <ul className="my-4 space-y-1 border-y border-beluga-gold/15 py-3 text-sm">
                      {o.items.map((i) => (
                        <li key={i.id} className="flex justify-between gap-2">
                          <span className="font-raleway text-beluga-champagne/85">
                            {i.quantity}× {i.name}
                          </span>
                          <span className="font-cormorant italic text-beluga-champagne/70">
                            {formatFCFA(i.price * i.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between">
                      <span className="font-raleway text-xs text-beluga-champagne/45">
                        {minsAgo === 0 ? "à l'instant" : `il y a ${minsAgo} min`}
                      </span>
                      <span className="font-cormorant text-xl font-semibold italic text-beluga-gold">
                        {formatFCFA(o.total)}
                      </span>
                    </div>
                    <div className="mt-5 flex gap-2">
                      {o.status === "pending" && (
                        <button
                          onClick={() => setStatus(o.id, "confirmed")}
                          className="flex flex-1 items-center justify-center gap-2 border border-blue-400/50 px-3 py-2 font-raleway text-[0.65rem] uppercase tracking-[0.2em] text-blue-300 hover:bg-blue-400/10"
                        >
                          <CheckCircle size={12} /> Confirmer
                        </button>
                      )}
                      {o.status === "confirmed" && (
                        <button
                          onClick={() => setStatus(o.id, "served")}
                          className="flex flex-1 items-center justify-center gap-2 border border-emerald-400/50 px-3 py-2 font-raleway text-[0.65rem] uppercase tracking-[0.2em] text-emerald-300 hover:bg-emerald-400/10"
                        >
                          <Truck size={12} /> Servie
                        </button>
                      )}
                      <button
                        onClick={() => remove(o.id)}
                        aria-label="Supprimer"
                        className="grid h-9 w-9 place-items-center border border-beluga-gold/25 text-beluga-champagne/60 hover:border-beluga-gold hover:text-beluga-gold"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>
    </>
  );
}
