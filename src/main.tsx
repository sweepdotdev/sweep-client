import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster.tsx";
import { StoreProvider } from "./lib/zustand.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { router } from "./router";
import "./global.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme={"light"} storageKey={"sweep-ui-theme"}>
                <StoreProvider>
                    <TooltipProvider>
                        <main>
                            <RouterProvider router={router} />
                            <Toaster />
                        </main>
                    </TooltipProvider>
                </StoreProvider>
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </StrictMode>,
);
