import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme={"dark"} storageKey={"sweep-ui-theme"}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>,
);
