import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Order, OrderStatus } from "@/types";

interface OrderState {
  orders: Order[];
  add: (tableNumber: string, guestName: string, items: CartItem[]) => Order;
  setStatus: (id: string, status: OrderStatus) => void;
  remove: (id: string) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      add: (tableNumber, guestName, items) => {
        const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
        const order: Order = {
          id: crypto.randomUUID(),
          tableNumber,
          guestName,
          items,
          total,
          createdAt: Date.now(),
          status: "pending",
        };
        set({ orders: [order, ...get().orders] });
        return order;
      },
      setStatus: (id, status) =>
        set({ orders: get().orders.map((o) => (o.id === id ? { ...o, status } : o)) }),
      remove: (id) => set({ orders: get().orders.filter((o) => o.id !== id) }),
    }),
    { name: "beluga-orders" },
  ),
);
