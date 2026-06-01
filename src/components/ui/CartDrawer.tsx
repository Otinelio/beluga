import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, MessageCircle, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatFCFA } from "@/utils/formatCurrency";
import { sendCartOrder } from "@/utils/whatsapp";

export function CartDrawer() {
  const { items, isOpen, close, setQty, remove, total, clear } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-beluga-violet/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed right-0 top-0 z-[71] flex h-full w-full max-w-md flex-col border-l border-beluga-gold/20 bg-beluga-violet"
          >
            <header className="flex items-center justify-between border-b border-beluga-gold/15 px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-beluga-gold" />
                <h2 className="font-cormorant text-2xl font-semibold tracking-wide text-beluga-champagne">
                  Votre Panier
                </h2>
              </div>
              <button onClick={close} aria-label="Fermer" className="text-beluga-champagne/70 hover:text-beluga-gold">
                <X size={22} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag size={42} className="text-beluga-gold/50" />
                  <p className="font-cormorant text-xl italic text-beluga-champagne/60">
                    Votre panier est vide
                  </p>
                  <p className="font-raleway text-xs uppercase tracking-[0.25em] text-beluga-champagne/40">
                    Explorez la carte
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((i) => (
                    <li
                      key={i.id}
                      className="beluga-glass flex items-center gap-4 p-4"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-cormorant text-lg font-semibold text-beluga-champagne truncate">
                          {i.name}
                        </h4>
                        <p className="font-cormorant italic text-beluga-gold">
                          {formatFCFA(i.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQty(i.id, i.quantity - 1)}
                          aria-label="Diminuer"
                          className="grid h-7 w-7 place-items-center border border-beluga-gold/30 text-beluga-champagne hover:border-beluga-gold"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center font-raleway text-sm">{i.quantity}</span>
                        <button
                          onClick={() => setQty(i.id, i.quantity + 1)}
                          aria-label="Augmenter"
                          className="grid h-7 w-7 place-items-center border border-beluga-gold/30 text-beluga-champagne hover:border-beluga-gold"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => remove(i.id)}
                          aria-label="Supprimer"
                          className="ml-1 grid h-7 w-7 place-items-center text-beluga-champagne/50 hover:text-beluga-gold"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-beluga-gold/15 px-6 py-6">
                <div className="mb-5 flex items-baseline justify-between">
                  <span className="beluga-eyebrow">Total</span>
                  <span className="font-cormorant text-3xl font-semibold italic text-beluga-gold">
                    {formatFCFA(total())}
                  </span>
                </div>
                <button
                  onClick={() => sendCartOrder(items)}
                  className="flex w-full items-center justify-center gap-2 bg-beluga-gold py-4 font-raleway text-[0.72rem] font-medium uppercase tracking-[0.25em] text-beluga-violet transition hover:bg-beluga-champagne"
                >
                  <MessageCircle size={16} /> Commander via WhatsApp
                </button>
                <button
                  onClick={clear}
                  className="mt-3 w-full font-raleway text-[0.7rem] uppercase tracking-[0.2em] text-beluga-champagne/40 hover:text-beluga-champagne"
                >
                  Vider le panier
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
