import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem, RestoEvent, GalleryImage } from "@/types";
import { SEED_GALLERY, SEED_MENU } from "@/data/menu";

interface AdminState {
  receptionPin: string;
  adminPin: string;
  menu: MenuItem[];
  events: RestoEvent[];
  gallery: GalleryImage[];
  setReceptionPin: (pin: string) => void;
  setAdminPin: (pin: string) => void;
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
      receptionPin: "2424",
      adminPin: "1234",
      menu: SEED_MENU,
      events: [],
      gallery: SEED_GALLERY,
      setReceptionPin: (pin) => set({ receptionPin: pin }),
      setAdminPin: (pin) => set({ adminPin: pin }),
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
    { name: "beluga-admin", version: 1 },
  ),
);
