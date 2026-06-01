import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { router } from "./router";
import { Toaster } from "@/components/ui/sonner";
import { SplashScreen } from "@/components/layout/SplashScreen";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <SplashScreen />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1B1033",
            color: "#EFE6D6",
            border: "1px solid rgba(213,155,53,0.3)",
          },
        }}
      />
    </HelmetProvider>
  </React.StrictMode>,
);
