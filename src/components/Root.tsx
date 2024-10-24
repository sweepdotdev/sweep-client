import { ReactElement, useEffect, useState } from "react";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { useStoreInContext } from "@/lib/zustand.tsx";
import { isAfter } from "date-fns";
import { AppSidebar } from "@/components/root/app-sidebar.tsx";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { AxiosResponse } from "axios";
import { Loader } from "lucide-react";
import AppBar from "@/components/root/app-bar.tsx";
import useIntentMutation from "@/requests/billing/use-intent-mutation";

export default function Root(): ReactElement {
    const sessionExpiry: Date | null = useStoreInContext((state) => state.expires);
    const redirect: NavigateFunction = useNavigate();
    const now = new Date();
    const [clientSecret, setClientSecret] = useState("");
    const intentMutation = useIntentMutation();

    useEffect(() => {
        intentMutation.mutateAsync().then((res: AxiosResponse) => {
            setClientSecret(res.data.client_secret);
        });
    }, []);

    console.log(clientSecret);

    if (intentMutation.isPending) {
        return (
            <div className={"h-screen w-screen flex items-center justify-center"}>
                <Loader className={"h-10 w-10 animate-spin"} />
            </div>
        );
    }

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
