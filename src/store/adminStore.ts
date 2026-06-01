import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem, RestoEvent, GalleryImage } from "@/types";
import { SEED_GALLERY, SEED_MENU } from "@/data/menu";

const DEFAULT_TABLES = Array.from({ length: 12 }, (_, i) => String(i + 1));

interface AdminState {
  receptionPin: string;
  adminPin: string;
  tableNumbers: string[];
  menu: MenuItem[];
  events: RestoEvent[];
  gallery: GalleryImage[];
  setReceptionPin: (pin: string) => void;
  setAdminPin: (pin: string) => void;
  addTableNumber: (number: string) => boolean;
  removeTableNumber: (number: string) => void;
  setTableNumbers: (numbers: string[]) => void;
  toggleAvailability: (id: string) => void;
  updateMenuItem: (id: string, patch: Partial<MenuItem>) => void;
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (id: string) => void;
  addEvent: (e: RestoEvent) => void;
  removeEvent: (id: string) => void;
  addGallery: (g: GalleryImage) => void;
  removeGallery: (id: string) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      receptionPin: "9999",
      adminPin: "9999",
      tableNumbers: DEFAULT_TABLES,
      menu: SEED_MENU,
      events: [],
      gallery: SEED_GALLERY,
      setReceptionPin: (pin) => set({ receptionPin: pin }),
      setAdminPin: (pin) => set({ adminPin: pin }),
      addTableNumber: (number) => {
        const n = number.trim();
        if (!n) return false;
        const existing = get().tableNumbers;
        if (existing.includes(n)) return false;
        set({ tableNumbers: [...existing, n].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })) });
        return true;
      },
      removeTableNumber: (number) =>
        set({ tableNumbers: get().tableNumbers.filter((t) => t !== number) }),
      setTableNumbers: (numbers) =>
        set({
          tableNumbers: [...new Set(numbers.map((n) => n.trim()).filter(Boolean))].sort((a, b) =>
            a.localeCompare(b, undefined, { numeric: true }),
          ),
        }),
      toggleAvailability: (id) =>
        set({
          menu: get().menu.map((m) =>
            m.id === id ? { ...m, available: !m.available } : m,
          ),
        }),
      updateMenuItem: (id, patch) =>
        set({
          menu: get().menu.map((m) => (m.id === id ? { ...m, ...patch } : m)),
        }),
      addMenuItem: (item) => set({ menu: [...get().menu, item] }),
      removeMenuItem: (id) => set({ menu: get().menu.filter((m) => m.id !== id) }),
      addEvent: (e) => set({ events: [e, ...get().events] }),
      removeEvent: (id) => set({ events: get().events.filter((e) => e.id !== id) }),
      addGallery: (g) => set({ gallery: [g, ...get().gallery] }),
      removeGallery: (id) =>
        set({ gallery: get().gallery.filter((g) => g.id !== id) }),
    }),
    {
      name: "beluga-admin",
      version: 2,
      migrate: (persisted, version) => {
        const state = persisted as AdminState;
        if (version < 2 && (!state.tableNumbers || state.tableNumbers.length === 0)) {
          return { ...state, tableNumbers: DEFAULT_TABLES };
        }
        return state;
      },
    },
  ),
);
