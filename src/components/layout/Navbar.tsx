import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, CalendarDays } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";
import { RESTAURANT } from "@/data/site";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/menu", label: "Menu" },
  { to: "/experience", label: "Expérience" },
  { to: "/nos-chefs", label: "Cuisine" },
  { to: "/galerie", label: "Galerie" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const cartCount = useCartStore((s) => s.count());
  const openCart = useCartStore((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(27,16,51,0.85)" : "rgba(27,16,51,0)",
          borderBottomColor: scrolled ? "rgba(213,155,53,0.2)" : "rgba(213,155,53,0)",
        }}
        transition={{ duration: 0.4 }}
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link to="/" className="group flex items-center gap-3">
            <span className="font-cormorant text-[1.6rem] font-bold leading-none tracking-[0.18em] text-beluga-champagne transition-colors group-hover:text-beluga-gold">
              LE BELUGA
            </span>
            <span className="hidden font-dancing text-xl leading-none text-beluga-gold/70 md:inline">
              {RESTAURANT.locationLabel}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative font-raleway text-[0.78rem] font-medium uppercase tracking-[0.22em] transition-colors",
                    isActive
                      ? "text-beluga-gold"
                      : "text-beluga-champagne/80 hover:text-beluga-champagne",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-beluga-gold"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              aria-label="Panier"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-beluga-gold/30 text-beluga-champagne transition hover:border-beluga-gold hover:text-beluga-gold"
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-[16px] place-items-center rounded-full bg-beluga-gold px-1 text-[10px] font-bold text-beluga-violet">
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              to="/reservation"
              className="hidden items-center gap-2 border border-beluga-gold px-5 py-2.5 font-raleway text-[0.72rem] font-medium uppercase tracking-[0.22em] text-beluga-gold transition hover:bg-beluga-gold hover:text-beluga-violet md:inline-flex"
            >
              <CalendarDays size={14} />
              Réserver
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
              className="grid h-10 w-10 place-items-center text-beluga-champagne lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-beluga-violet/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <span className="font-cormorant text-xl font-bold tracking-[0.2em] text-beluga-champagne">
                LE BELUGA
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Fermer"
                className="grid h-10 w-10 place-items-center text-beluga-champagne"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "font-cormorant text-4xl tracking-wide transition-colors",
                        isActive ? "text-beluga-gold" : "text-beluga-champagne",
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-6"
              >
                <Link
                  to="/reservation"
                  className="inline-flex items-center gap-2 border border-beluga-gold px-7 py-3 font-raleway text-xs uppercase tracking-[0.25em] text-beluga-gold"
                >
                  <CalendarDays size={14} /> Réserver une table
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
