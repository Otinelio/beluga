import { Star } from "lucide-react";

interface Props {
  quote: string;
  author: string;
  role?: string;
  rating?: number;
}

export function TestimonialCard({ quote, author, role, rating = 5 }: Props) {
  return (
    <article className="beluga-glass mx-auto max-w-3xl p-10 text-center md:p-14">
      <div className="mb-6 flex justify-center gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-beluga-gold text-beluga-gold" />
        ))}
      </div>
      <p className="font-cormorant text-2xl italic leading-relaxed text-beluga-champagne md:text-3xl beluga-text-balance">
        “{quote}”
      </p>
      <div className="beluga-gold-divider mx-auto mt-8 w-16" />
      <p className="mt-6 font-raleway text-xs uppercase tracking-[0.3em] text-beluga-gold">
        {author}
      </p>
      {role && (
        <p className="mt-1 font-raleway text-xs text-beluga-champagne/50">{role}</p>
      )}
    </article>
  );
}
