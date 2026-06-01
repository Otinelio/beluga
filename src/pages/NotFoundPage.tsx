import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { GoldButton } from "@/components/ui/GoldButton";

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page introuvable — Le Beluga</title>
      </Helmet>
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p className="beluga-eyebrow">404</p>
        <h1 className="mt-6 font-cormorant text-6xl font-semibold text-beluga-champagne md:text-8xl">
          Page introuvable
        </h1>
        <p className="mt-4 max-w-md font-raleway text-sm font-light text-beluga-champagne/65">
          La page que vous cherchez s'est peut-être éclipsée dans la pénombre.
        </p>
        <Link to="/" className="mt-10">
          <GoldButton>Retour à l'accueil</GoldButton>
        </Link>
      </section>
    </>
  );
}
