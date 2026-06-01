import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Lock, LogOut, Trash2, Plus, Check, X, ListOrdered, CalendarDays, Image, Settings as SettingsIcon, Utensils } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { useReservationStore } from "@/store/reservationStore";
import { formatFCFA } from "@/utils/formatCurrency";
import { cn } from "@/lib/utils";
import type { MenuItem, RestoEvent, GalleryImage } from "@/types";
import { toast } from "sonner";

function PinGate({ onPass }: { onPass: () => void }) {
  const [pin, setPin] = useState("");
  const expected = useAdminStore((s) => s.adminPin);
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (pin === expected) onPass();
          else setPin("");
        }}
        className="beluga-glass w-full max-w-sm p-10 text-center"
      >
        <Lock size={26} className="mx-auto text-beluga-gold" />
        <h1 className="mt-6 font-cormorant text-3xl font-semibold text-beluga-champagne">
          Administration
        </h1>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="mt-8 w-full bg-transparent border-b border-beluga-gold/40 py-3 text-center font-cormorant text-3xl tracking-[0.5em] text-beluga-champagne focus:border-beluga-gold focus:outline-none"
        />
        <button className="mt-8 w-full bg-beluga-gold py-3 font-raleway text-[0.72rem] uppercase tracking-[0.25em] text-beluga-violet hover:bg-beluga-champagne">
          Accéder
        </button>
      </form>
    </section>
  );
}

type Tab = "menu" | "reservations" | "events" | "gallery" | "settings";

export function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("menu");

  if (!authed) return <PinGate onPass={() => setAuthed(true)} />;

  return (
    <>
      <Helmet><title>Administration — Le Beluga</title></Helmet>
      <header className="sticky top-0 z-30 border-b border-beluga-gold/15 bg-beluga-violet/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div>
            <p className="beluga-eyebrow">Le Beluga</p>
            <h1 className="font-cormorant text-2xl font-semibold text-beluga-champagne">
              Administration
            </h1>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-2 border border-beluga-gold/30 px-4 py-2 font-raleway text-[0.7rem] uppercase tracking-[0.22em] text-beluga-champagne hover:border-beluga-gold hover:text-beluga-gold"
          >
            <LogOut size={13} /> Quitter
          </button>
        </div>
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 pb-4 lg:px-10">
          {[
            { id: "menu" as Tab, label: "Carte", Icon: Utensils },
            { id: "reservations" as Tab, label: "Réservations", Icon: ListOrdered },
            { id: "events" as Tab, label: "Événements", Icon: CalendarDays },
            { id: "gallery" as Tab, label: "Galerie", Icon: Image },
            { id: "settings" as Tab, label: "Paramètres", Icon: SettingsIcon },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex shrink-0 items-center gap-2 px-4 py-2 font-raleway text-[0.7rem] uppercase tracking-[0.22em] transition",
                tab === t.id
                  ? "bg-beluga-gold text-beluga-violet"
                  : "border border-beluga-gold/25 text-beluga-champagne/70 hover:border-beluga-gold",
              )}
            >
              <t.Icon size={12} /> {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {tab === "menu" && <MenuTab />}
        {tab === "reservations" && <ReservationsTab />}
        {tab === "events" && <EventsTab />}
        {tab === "gallery" && <GalleryTab />}
        {tab === "settings" && <SettingsTab />}
      </main>
    </>
  );
}

function MenuTab() {
  const menu = useAdminStore((s) => s.menu);
  const toggle = useAdminStore((s) => s.toggleAvailability);
  const removeItem = useAdminStore((s) => s.removeMenuItem);
  const addItem = useAdminStore((s) => s.addMenuItem);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "", description: "", price: 0, category: "starters", image: "", available: true,
  });

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newItem.name || !newItem.price) return;
          addItem({
            id: crypto.randomUUID(),
            name: newItem.name!,
            description: newItem.description ?? "",
            price: Number(newItem.price),
            category: (newItem.category as MenuItem["category"]) || "starters",
            image: newItem.image || "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
            available: true,
            service: "both",
          });
          setNewItem({ name: "", description: "", price: 0, category: "starters", image: "", available: true });
          toast.success("Plat ajouté");
        }}
        className="beluga-glass grid gap-3 p-5 md:grid-cols-6"
      >
        <input className={inputCls} placeholder="Nom" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
        <input className={`${inputCls} md:col-span-2`} placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
        <input className={inputCls} type="number" placeholder="Prix" value={newItem.price || ""} onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })} />
        <select className={inputCls} value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value as MenuItem["category"] })}>
          <option value="starters" className="bg-beluga-violet">Entrée</option>
          <option value="mains" className="bg-beluga-violet">Plat</option>
          <option value="cocktails" className="bg-beluga-violet">Bar</option>
        </select>
        <button className="bg-beluga-gold px-4 py-2 font-raleway text-[0.7rem] uppercase tracking-[0.22em] text-beluga-violet">
          <Plus size={13} className="inline" /> Ajouter
        </button>
      </form>

      <div className="beluga-glass overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-beluga-gold/20 text-beluga-champagne/55">
            <tr>
              <th className="px-4 py-3 font-raleway text-[0.65rem] uppercase tracking-[0.2em]">Plat</th>
              <th className="px-4 py-3 font-raleway text-[0.65rem] uppercase tracking-[0.2em]">Catégorie</th>
              <th className="px-4 py-3 font-raleway text-[0.65rem] uppercase tracking-[0.2em]">Prix</th>
              <th className="px-4 py-3 font-raleway text-[0.65rem] uppercase tracking-[0.2em]">Statut</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {menu.map((m) => (
              <tr key={m.id} className="border-b border-beluga-gold/10">
                <td className="px-4 py-3 font-cormorant text-base text-beluga-champagne">{m.name}</td>
                <td className="px-4 py-3 text-beluga-champagne/70">{m.category}</td>
                <td className="px-4 py-3 font-cormorant italic text-beluga-gold">{formatFCFA(m.price)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggle(m.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1 font-raleway text-[0.65rem] uppercase tracking-[0.2em]",
                      m.available
                        ? "border border-emerald-400/40 text-emerald-300"
                        : "border border-beluga-gold/30 text-beluga-champagne/50",
                    )}
                  >
                    {m.available ? <><Check size={11} /> Disponible</> : <><X size={11} /> Épuisé</>}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => removeItem(m.id)} aria-label="Supprimer" className="text-beluga-champagne/50 hover:text-beluga-gold">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReservationsTab() {
  const reservations = useReservationStore((s) => s.reservations);
  const remove = useReservationStore((s) => s.remove);
  const setStatus = useReservationStore((s) => s.updateStatus);
  return (
    <div className="beluga-glass overflow-hidden">
      {reservations.length === 0 ? (
        <p className="p-10 text-center font-cormorant italic text-beluga-champagne/60">
          Aucune réservation pour le moment.
        </p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="border-b border-beluga-gold/20 text-beluga-champagne/55">
            <tr>
              {["Nom", "Date", "Heure", "Couverts", "Téléphone", "Statut", ""].map((h) => (
                <th key={h} className="px-4 py-3 font-raleway text-[0.65rem] uppercase tracking-[0.2em]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id} className="border-b border-beluga-gold/10">
                <td className="px-4 py-3 font-cormorant text-base text-beluga-champagne">{r.name}</td>
                <td className="px-4 py-3 text-beluga-champagne/70">{r.date}</td>
                <td className="px-4 py-3 text-beluga-gold">{r.time}</td>
                <td className="px-4 py-3 text-beluga-champagne/70">{r.guests}</td>
                <td className="px-4 py-3 text-beluga-champagne/70">{r.phone}</td>
                <td className="px-4 py-3">
                  <select
                    value={r.status}
                    onChange={(e) => setStatus(r.id, e.target.value as "pending" | "confirmed" | "cancelled")}
                    className="bg-transparent border border-beluga-gold/30 px-2 py-1 text-xs text-beluga-champagne"
                  >
                    <option value="pending" className="bg-beluga-violet">En attente</option>
                    <option value="confirmed" className="bg-beluga-violet">Confirmée</option>
                    <option value="cancelled" className="bg-beluga-violet">Annulée</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => remove(r.id)} aria-label="Supprimer" className="text-beluga-champagne/50 hover:text-beluga-gold">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function EventsTab() {
  const events = useAdminStore((s) => s.events);
  const add = useAdminStore((s) => s.addEvent);
  const remove = useAdminStore((s) => s.removeEvent);
  const [draft, setDraft] = useState<Partial<RestoEvent>>({ name: "", date: "", description: "", image: "" });
  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.name || !draft.date) return;
          add({
            id: crypto.randomUUID(),
            name: draft.name!,
            date: draft.date!,
            description: draft.description ?? "",
            image: draft.image || "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80",
          });
          setDraft({ name: "", date: "", description: "", image: "" });
          toast.success("Événement ajouté");
        }}
        className="beluga-glass grid gap-3 p-5 md:grid-cols-5"
      >
        <input className={inputCls} placeholder="Nom" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        <input className={inputCls} type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
        <input className={`${inputCls} md:col-span-2`} placeholder="Description" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
        <button className="bg-beluga-gold px-4 py-2 font-raleway text-[0.7rem] uppercase tracking-[0.22em] text-beluga-violet">
          <Plus size={13} className="inline" /> Ajouter
        </button>
      </form>
      {events.length === 0 ? (
        <p className="beluga-glass p-10 text-center font-cormorant italic text-beluga-champagne/60">
          Aucun événement programmé.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {events.map((e) => (
            <div key={e.id} className="beluga-glass overflow-hidden">
              <img src={e.image} alt={e.name} className="aspect-video w-full object-cover" />
              <div className="p-4">
                <p className="beluga-eyebrow">{e.date}</p>
                <h3 className="mt-1 font-cormorant text-xl font-semibold text-beluga-champagne">{e.name}</h3>
                <p className="mt-1 font-raleway text-xs text-beluga-champagne/65">{e.description}</p>
                <button
                  onClick={() => remove(e.id)}
                  className="mt-4 inline-flex items-center gap-2 font-raleway text-[0.65rem] uppercase tracking-[0.2em] text-beluga-champagne/50 hover:text-beluga-gold"
                >
                  <Trash2 size={12} /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GalleryTab() {
  const gallery = useAdminStore((s) => s.gallery);
  const add = useAdminStore((s) => s.addGallery);
  const remove = useAdminStore((s) => s.removeGallery);
  const [draft, setDraft] = useState<Partial<GalleryImage>>({ url: "", category: "restaurant", alt: "" });
  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.url) return;
          add({
            id: crypto.randomUUID(),
            url: draft.url!,
            category: (draft.category as GalleryImage["category"]) || "restaurant",
            alt: draft.alt ?? "",
          });
          setDraft({ url: "", category: "restaurant", alt: "" });
        }}
        className="beluga-glass grid gap-3 p-5 md:grid-cols-5"
      >
        <input className={`${inputCls} md:col-span-2`} placeholder="URL de l'image" value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} />
        <input className={inputCls} placeholder="Alt" value={draft.alt} onChange={(e) => setDraft({ ...draft, alt: e.target.value })} />
        <select className={inputCls} value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value as GalleryImage["category"] })}>
          {["restaurant", "terrasse", "bar", "plats", "events"].map((c) => (
            <option key={c} value={c} className="bg-beluga-violet">{c}</option>
          ))}
        </select>
        <button className="bg-beluga-gold px-4 py-2 font-raleway text-[0.7rem] uppercase tracking-[0.22em] text-beluga-violet">
          <Plus size={13} className="inline" /> Ajouter
        </button>
      </form>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
        {gallery.map((g) => (
          <div key={g.id} className="group relative aspect-square overflow-hidden">
            <img src={g.url} alt={g.alt} className="h-full w-full object-cover" />
            <button
              onClick={() => remove(g.id)}
              className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-beluga-violet/80 text-beluga-champagne opacity-0 transition group-hover:opacity-100"
              aria-label="Supprimer"
            >
              <Trash2 size={13} />
            </button>
            <span className="absolute bottom-1 left-1 bg-beluga-violet/80 px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-beluga-gold">
              {g.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  const receptionPin = useAdminStore((s) => s.receptionPin);
  const adminPin = useAdminStore((s) => s.adminPin);
  const setRec = useAdminStore((s) => s.setReceptionPin);
  const setAdm = useAdminStore((s) => s.setAdminPin);
  const [r, setR] = useState(receptionPin);
  const [a, setA] = useState(adminPin);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setRec(r); setAdm(a);
        toast.success("Paramètres enregistrés");
      }}
      className="beluga-glass grid gap-5 p-8 md:max-w-md"
    >
      <div>
        <label className="beluga-eyebrow mb-2 block">PIN Réception</label>
        <input className={inputCls} value={r} onChange={(e) => setR(e.target.value)} />
      </div>
      <div>
        <label className="beluga-eyebrow mb-2 block">PIN Administration</label>
        <input className={inputCls} value={a} onChange={(e) => setA(e.target.value)} />
      </div>
      <button className="bg-beluga-gold px-4 py-3 font-raleway text-[0.7rem] uppercase tracking-[0.22em] text-beluga-violet">
        Enregistrer
      </button>
    </form>
  );
}

const inputCls =
  "w-full bg-transparent border border-beluga-gold/25 px-3 py-2 font-raleway text-sm text-beluga-champagne placeholder:text-beluga-champagne/35 focus:border-beluga-gold focus:outline-none";
