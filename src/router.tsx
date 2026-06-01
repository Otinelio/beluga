import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { HomePage } from "@/pages/HomePage";
import { MenuPage } from "@/pages/MenuPage";
import { ExperiencePage } from "@/pages/ExperiencePage";
import { ChefsPage } from "@/pages/ChefsPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { ContactPage } from "@/pages/ContactPage";
import { ReservationPage } from "@/pages/ReservationPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

const TablePage = lazy(() => import("@/pages/table/TablePage").then((m) => ({ default: m.TablePage })));
const ReceptionPage = lazy(() => import("@/pages/reception/ReceptionPage").then((m) => ({ default: m.ReceptionPage })));
const AdminPage = lazy(() => import("@/pages/admin/AdminPage").then((m) => ({ default: m.AdminPage })));

function PublicLayout() {
  const location = useLocation();
  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-champagne)]">
      <CursorGlow />
      <Navbar />
      <AnimatePresence mode="wait">
        <main key={location.pathname} className="relative">
          <Outlet />
        </main>
      </AnimatePresence>
      <Footer />
      <CartDrawer />
    </div>
  );
}

function BareLayout() {
  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-champagne)]">
      <CursorGlow />
      <Suspense fallback={<FullScreenLoader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-beluga-gold border-t-transparent" />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/menu", element: <MenuPage /> },
      { path: "/experience", element: <ExperiencePage /> },
      { path: "/nos-chefs", element: <ChefsPage /> },
      { path: "/galerie", element: <GalleryPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/reservation", element: <ReservationPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    element: <BareLayout />,
    children: [
      { path: "/menu/scan/:tableNumber", element: <TablePage /> },
      { path: "/table/:tableNumber", element: <TablePage /> },
      { path: "/reception", element: <ReceptionPage /> },
      { path: "/admin", element: <AdminPage /> },
    ],
  },
]);
