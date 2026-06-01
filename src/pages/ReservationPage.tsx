import { Helmet } from "react-helmet-async";
import { Phone } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ReservationForm } from "@/components/ui/ReservationForm";
import { RESTAURANT } from "@/data/site";

export function ReservationPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Réserver — Le Beluga Restaurant</title>
        <meta name="description" content={`Réservez votre table au Beluga, restaurant gastronomique à ${RESTAURANT.city}.`} />
      </Helmet>

      <section className="relative flex h-[40vh] min-h-[280px] items-end overflow-hidden pb-12">
        <img
          src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=2400&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-beluga-violet/40 via-beluga-violet/70 to-beluga-violet" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
          <p className="beluga-eyebrow">Réserver</p>
          <h1 className="mt-4 font-cormorant text-6xl font-semibold text-beluga-champagne md:text-7xl">
            Votre table
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <SectionTitle
            eyebrow="Confirmer une venue"
            title="Quelques détails et c'est fait"
            subtitle="Nous répondons à toutes les demandes sous 2 heures, du lundi au samedi."
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_280px]">
            <ReservationForm variant="page" />
            <aside className="beluga-glass flex flex-col gap-6 p-8">
              <div>
                <p className="beluga-eyebrow">Préférez le téléphone ?</p>
                <p className="mt-4 font-cormorant text-2xl italic leading-snug text-beluga-champagne">
                  Notre équipe vous répond en direct.
                </p>
              </div>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${RESTAURANT.phone.whatsapp}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-3 font-raleway text-sm text-beluga-champagne hover:text-beluga-gold"
                >
                  <Phone size={15} className="text-beluga-gold" /> {RESTAURANT.phone.display} (WhatsApp)
                </a>
              </div>
              <div className="beluga-gold-divider" />
              <p className="font-raleway text-xs leading-relaxed text-beluga-champagne/55">
                Pour les groupes de plus de 10 couverts, contactez-nous directement par téléphone.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
