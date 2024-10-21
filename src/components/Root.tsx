import { ReactElement, useState } from "react";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { useStoreInContext } from "@/lib/zustand.tsx";
import { isAfter } from "date-fns";
import { AppSidebar } from "@/components/root/app-sidebar.tsx";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import AppBar from "@/components/root/app-bar.tsx";

export default function Root(): ReactElement {
    const sessionExpiry: Date | null = useStoreInContext((state) => state.expires);
    const redirect: NavigateFunction = useNavigate();
    const now = new Date();
    const [triggerSetOpen, setTriggerSetOpen] = useState<boolean>(false);

    if (sessionExpiry && isAfter(now, sessionExpiry)) {
        redirect("/login");
    }

    // TODO: If session is expired, clear the contents of the store

    return (
        <SidebarProvider
            defaultOpen={false}
            onFocus={() => setTriggerSetOpen(false)}
            onBlur={() => {
                setTriggerSetOpen(true);
            }}
        >
            <AppBar />
            <AppSidebar triggerSetOpen={triggerSetOpen} />
            <div id={"children"} className={"h-screen w-screen"}>
                <Outlet />
            </div>
        </SidebarProvider>
    );
}
