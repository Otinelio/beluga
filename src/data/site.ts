import { WHATSAPP_NUMBER } from "@/utils/whatsapp";

export const RESTAURANT = {
  name: "Le Beluga",
  city: "Lomé",
  country: "Togo",
  locationLabel: "Lomé",
  positioning: "Restaurant gastronomique & lounge",
  tagline: "Une expérience premium au cœur de Lomé.",
  address: {
    street: "Rue de l'Entente",
    formerStreet: "ancienne Rue de l'OCAM",
    landmark: "En face de l'Hôtel de la Paix",
    line: "Rue de l'Entente (ancienne Rue de l'OCAM), en face de l'Hôtel de la Paix",
    full: "Rue de l'Entente (ancienne Rue de l'OCAM), en face de l'Hôtel de la Paix, Lomé, Togo",
    zone: "Zone centrale — Lomé",
  },
  phone: {
    display: "+228 91 15 70 60",
    tel: `+${WHATSAPP_NUMBER}`,
    whatsapp: WHATSAPP_NUMBER,
  },
  mapsEmbedQuery: encodeURIComponent(
    "Le Beluga Restaurant, Rue de l'Entente, Lomé, Togo",
  ),
  hours: [
    { label: "Déjeuner", value: "Lundi à Samedi, 12h00 – 15h00" },
    { label: "Dîner", value: "Lundi à Jeudi, 19h00 – 23h00" },
    { label: "Dîner", value: "Vendredi & Samedi, 19h00 – tard (soirée prolongée)" },
    { label: "Musique live", value: "Week-ends — orchestre ou piano selon les soirées" },
  ],
  seo: {
    title: "Le Beluga — Restaurant Gastronomique | Lomé, Togo",
    description:
      "Restaurant chic et lounge à Lomé : cuisine française et gastronomique, fruits de mer, grillades, terrasse et soirées musicales. Rue de l'Entente, face à l'Hôtel de la Paix.",
  },
} as const;
