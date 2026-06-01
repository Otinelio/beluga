import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Reservation } from "@/types";

interface ReservationState {
  reservations: Reservation[];
  add: (r: Omit<Reservation, "id" | "createdAt" | "status">) => Reservation;
  updateStatus: (id: string, status: Reservation["status"]) => void;
  remove: (id: string) => void;
}

export const useReservationStore = create<ReservationState>()(
  persist(
    (set, get) => ({
      reservations: [],
      add: (r) => {
        const reservation: Reservation = {
          ...r,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          status: "pending",
        };
        set({ reservations: [reservation, ...get().reservations] });
        return reservation;
      },
      updateStatus: (id, status) =>
        set({
          reservations: get().reservations.map((r) =>
            r.id === id ? { ...r, status } : r,
          ),
        }),
      remove: (id) =>
        set({ reservations: get().reservations.filter((r) => r.id !== id) }),
    }),
    { name: "beluga-reservations" },
  ),
);
