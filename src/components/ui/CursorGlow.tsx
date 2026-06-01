import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let x = 0,
      y = 0,
      tx = 0,
      ty = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="beluga-cursor-glow pointer-events-none fixed left-0 top-0 z-[9998] h-[500px] w-[500px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(213,155,53,0.18), rgba(213,155,53,0.05) 35%, transparent 65%)",
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  );
}
