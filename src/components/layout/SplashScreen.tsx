import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RESTAURANT } from "@/data/site";

const MIN_DISPLAY_MS = 2200;
const FADE_MS = 650;
const SESSION_KEY = "beluga-splash-shown";

/**
 * Module-level flag ensures the splash is never replayed, even when
 * React.StrictMode double-mounts the component in development.
 */
let splashAlreadyDismissed =
  typeof sessionStorage !== "undefined" &&
  sessionStorage.getItem(SESSION_KEY) === "1";

export function SplashScreen() {
  // If already shown this session, skip entirely
  const [visible, setVisible] = useState(() => !splashAlreadyDismissed);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!visible) return;

    document.body.classList.add("beluga-splash-active");

    const started = Date.now();

    const dismiss = () => {
      if (splashAlreadyDismissed) return;
      splashAlreadyDismissed = true;

      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* storage unavailable – no-op */
      }

      const remaining = Math.max(0, MIN_DISPLAY_MS - (Date.now() - started));
      window.setTimeout(() => {
        setExiting(true);
        window.setTimeout(() => {
          setVisible(false);
          document.getElementById("beluga-initial-splash")?.remove();
          document.body.classList.remove("beluga-splash-active");
        }, FADE_MS);
      }, remaining);
    };

    if (document.readyState === "complete") dismiss();
    else {
      window.addEventListener("load", dismiss, { once: true });
      return () => {
        window.removeEventListener("load", dismiss);
        document.body.classList.remove("beluga-splash-active");
      };
    }
  }, [visible]);

  if (!visible && !exiting) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-label="Chargement"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-beluga-violet"
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{ duration: FADE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 50% 35%, rgba(213,155,53,0.15), transparent 55%), radial-gradient(ellipse at 50% 100%, #2C1F4A, #1B1033 70%)",
            }}
          />

          <motion.div
            className="relative flex flex-col items-center px-8 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: exiting ? 0.6 : 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="beluga-eyebrow mb-6"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.32em" }}
              transition={{ delay: 0.15, duration: 0.8 }}
            >
              {RESTAURANT.city}
            </motion.span>

            <h1 className="font-cormorant text-[clamp(2.5rem,10vw,4.5rem)] font-bold tracking-[0.22em] text-beluga-champagne">
              {"LE BELUGA".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.25 + i * 0.045,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            <motion.div
              className="beluga-gold-divider mt-8 w-32"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "center" }}
            />

            <motion.p
              className="mt-6 max-w-xs font-raleway text-xs font-light uppercase tracking-[0.28em] text-beluga-champagne/65"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.6 }}
            >
              {RESTAURANT.positioning}
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute bottom-12 left-1/2 h-px w-24 -translate-x-1/2 overflow-hidden bg-beluga-gold/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: exiting ? 0 : 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-beluga-gold"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
