import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function GoldButton({ variant = "solid", className, children, ...rest }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 font-raleway text-[0.72rem] font-medium uppercase tracking-[0.25em] transition-all duration-300 px-7 py-3.5";
  const styles =
    variant === "solid"
      ? "bg-beluga-gold text-beluga-violet hover:bg-beluga-champagne"
      : "border border-beluga-gold text-beluga-gold hover:bg-beluga-gold hover:text-beluga-violet";
  return (
    <button className={cn(base, styles, className)} {...rest}>
      {children}
    </button>
  );
}
