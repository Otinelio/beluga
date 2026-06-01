export type Category = "starters" | "mains" | "cocktails";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // FCFA
  category: Category;
  image: string;
  available: boolean;
  service?: "dejeuner" | "diner" | "both";
  tags?: string[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  notes?: string;
  createdAt: number;
  status: "pending" | "confirmed" | "cancelled";
}

export type OrderStatus = "pending" | "confirmed" | "served";

export interface Order {
  id: string;
  tableNumber: string;
  guestName: string;
  items: CartItem[];
  total: number;
  createdAt: number;
  status: OrderStatus;
}

export interface RestoEvent {
  id: string;
  name: string;
  date: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: "restaurant" | "terrasse" | "bar" | "plats" | "events";
  alt: string;
}
