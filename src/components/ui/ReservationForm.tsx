import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { CalendarDays, Check } from "lucide-react";
import { sendReservation } from "@/utils/whatsapp";
import { useReservationStore } from "@/store/reservationStore";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(6, "Téléphone requis"),
  date: z.string().min(1, "Date requise"),
  time: z.string().min(1, "Heure requise"),
  guests: z.coerce.number().min(1).max(20),
  occasion: z.string().optional(),
  notes: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

const TIME_SLOTS = ["12:00", "12:30", "13:00", "13:30", "14:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

interface Props {
  variant?: "inline" | "page";
}

export function ReservationForm({ variant = "inline" }: Props) {
  const [done, setDone] = useState(false);
  const add = useReservationStore((s) => s.add);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { guests: 2, occasion: "Aucune" },
  });

  const onSubmit = (data: FormValues) => {
    add(data);
    sendReservation(data);
    toast.success("Réservation envoyée — nous vous confirmons sous peu.");
    setDone(true);
    reset();
  };

  if (done) {
    return (
      <div className="beluga-glass flex flex-col items-center gap-4 p-10 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-beluga-gold/15 text-beluga-gold">
          <Check size={26} />
        </div>
        <h3 className="font-cormorant text-3xl font-semibold text-beluga-champagne">
          Réservation transmise
        </h3>
        <p className="max-w-md font-raleway text-sm font-light text-beluga-champagne/70">
          Votre demande a été envoyée. Notre équipe vous confirmera votre table par WhatsApp ou par téléphone très prochainement.
        </p>
        <button
          onClick={() => setDone(false)}
          className="mt-3 font-raleway text-xs uppercase tracking-[0.25em] text-beluga-gold hover:text-beluga-champagne"
        >
          Nouvelle réservation
        </button>
      </div>
    );
  }

  const fieldCls =
    "w-full bg-transparent border border-beluga-gold/25 px-4 py-3 font-raleway text-sm text-beluga-champagne placeholder:text-beluga-champagne/35 focus:border-beluga-gold focus:outline-none transition";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={
        variant === "inline"
          ? "beluga-glass grid gap-4 p-8 md:grid-cols-2 md:p-10"
          : "grid gap-4 md:grid-cols-2"
      }
    >
      <div className="md:col-span-2">
        <label className="beluga-eyebrow mb-2 block">Nom complet</label>
        <input {...register("name")} className={fieldCls} placeholder="Votre nom" />
        {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name.message}</p>}
      </div>
      <div>
        <label className="beluga-eyebrow mb-2 block">Email</label>
        <input type="email" {...register("email")} className={fieldCls} placeholder="vous@email.com" />
        {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>}
      </div>
      <div>
        <label className="beluga-eyebrow mb-2 block">Téléphone</label>
        <input {...register("phone")} className={fieldCls} placeholder="+228 ..." />
        {errors.phone && <p className="mt-1 text-xs text-red-300">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="beluga-eyebrow mb-2 block">Date</label>
        <input type="date" {...register("date")} className={fieldCls} />
        {errors.date && <p className="mt-1 text-xs text-red-300">{errors.date.message}</p>}
      </div>
      <div>
        <label className="beluga-eyebrow mb-2 block">Heure</label>
        <select {...register("time")} className={fieldCls}>
          <option value="">Choisir un horaire</option>
          {TIME_SLOTS.map((t) => (
            <option key={t} value={t} className="bg-beluga-violet">{t}</option>
          ))}
        </select>
        {errors.time && <p className="mt-1 text-xs text-red-300">{errors.time.message}</p>}
      </div>
      <div>
        <label className="beluga-eyebrow mb-2 block">Couverts</label>
        <select {...register("guests")} className={fieldCls}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n} className="bg-beluga-violet">{n} {n === 1 ? "personne" : "personnes"}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="beluga-eyebrow mb-2 block">Occasion</label>
        <select {...register("occasion")} className={fieldCls}>
          <option className="bg-beluga-violet">Aucune</option>
          <option className="bg-beluga-violet">Anniversaire</option>
          <option className="bg-beluga-violet">Saint-Valentin</option>
          <option className="bg-beluga-violet">Déjeuner d'affaires</option>
          <option className="bg-beluga-violet">Soirée privée</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="beluga-eyebrow mb-2 block">Notes (allergies, demandes spéciales)</label>
        <textarea {...register("notes")} rows={3} className={`${fieldCls} resize-none`} />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="md:col-span-2 inline-flex items-center justify-center gap-2 bg-beluga-gold px-7 py-4 font-raleway text-[0.72rem] font-medium uppercase tracking-[0.28em] text-beluga-violet transition hover:bg-beluga-champagne disabled:opacity-50"
      >
        <CalendarDays size={14} /> Confirmer la réservation
      </button>
    </form>
  );
}
