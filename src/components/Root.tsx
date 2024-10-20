import { ReactElement } from "react";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { useStoreInContext } from "../lib/zustand.tsx";
import { isAfter } from "date-fns";
import AppBar from "./root/app-bar.tsx";
import { AppSidebar } from "./root/app-sidebar.tsx";
import { SidebarProvider } from "./ui/sidebar.tsx";

export default function Root(): ReactElement {
    const sessionExpiry: Date | null = useStoreInContext((state) => state.expires);
    const redirect: NavigateFunction = useNavigate();
    const now = new Date();

    if (sessionExpiry && isAfter(now, sessionExpiry)) {
        redirect("/login");
    }

    // TODO: If session is expired, clear the contents of the store

    return (
        <SidebarProvider defaultOpen={false}>
            <AppBar />
            <AppSidebar />
            <div id={"children"} className={"h-screen w-screen"}>
                <Outlet />
            </div>
        </SidebarProvider>
    );
}
