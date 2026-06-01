import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  image: string;
  children: ReactNode;
  overlay?: number; // 0-1
  height?: string;
}

export function ParallaxHero({ image, children, overlay = 0.6, height = "min-h-screen" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section
      ref={ref}
      className={`relative isolate flex w-full items-center justify-center overflow-hidden ${height}`}
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img src={image} alt="" className="h-[120%] w-full object-cover" loading="eager" />
        <div className="absolute inset-0" style={{ backgroundColor: `rgba(27,16,51,${overlay})` }} />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(213,155,53,0.18), transparent 60%)",
          }}
        />
      </motion.div>
      <motion.div style={{ opacity }} className="relative z-10 w-full">
        {children}
      </motion.div>
    </section>
  );
}
