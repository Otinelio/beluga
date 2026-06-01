import type { CartItem, Reservation } from "@/types";
import { formatFCFA } from "./formatCurrency";

export const WHATSAPP_NUMBER = "22891157060";

function open(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function sendReservation(r: Omit<Reservation, "id" | "createdAt" | "status">) {
  const msg = [
    "Nouvelle reservation — Le Beluga",
    "",
    `Nom : ${r.name}`,
    `Date : ${r.date}`,
    `Heure : ${r.time}`,
    `Couverts : ${r.guests}`,
    r.occasion ? `Occasion : ${r.occasion}` : null,
    r.notes ? `Notes : ${r.notes}` : null,
    `Telephone : ${r.phone}`,
    `Email : ${r.email}`,
  ]
    .filter(Boolean)
    .join("\n");
  open(msg);
}

export function sendTableOrder(tableNumber: string, guestName: string, items: CartItem[]) {
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const lines = items
    .map((i) => `${i.quantity}x ${i.name} — ${formatFCFA(i.price * i.quantity)}`)
    .join("\n");
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const msg = [
    `Commande — Table ${tableNumber}`,
    "",
    `Client : ${guestName}`,
    "---",
    lines,
    "---",
    `Total : ${formatFCFA(total)}`,
    "",
    `Heure : ${hh}:${mm}`,
  ].join("\n");
  open(msg);
}

export function sendCartOrder(items: CartItem[], customerName?: string) {
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const lines = items
    .map((i) => `${i.quantity}x ${i.name} — ${formatFCFA(i.price * i.quantity)}`)
    .join("\n");
  const msg = [
    "Commande — Le Beluga",
    "",
    customerName ? `Client : ${customerName}` : null,
    "---",
    lines,
    "---",
    `Total : ${formatFCFA(total)}`,
  ]
    .filter(Boolean)
    .join("\n");
  open(msg);
}

export function sendContactMessage(name: string, subject: string, message: string, phone?: string) {
  const msg = [
    "Message via site Le Beluga",
    "",
    `Nom : ${name}`,
    `Objet : ${subject}`,
    `Message : ${message}`,
    phone ? `Telephone : ${phone}` : null,
  ]
    .filter(Boolean)
    .join("\n");
  open(msg);
}
