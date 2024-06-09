import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { enableMSW } from "./api/mocks/index.ts";
import { Router } from "./router.tsx";
import { queryClient } from "./util/react-query.ts";
import { Toaster } from "sonner";

enableMSW().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster richColors />
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
