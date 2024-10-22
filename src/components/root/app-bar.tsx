import { ReactElement, useEffect, useState } from "react";
import { Compass } from "lucide-react";
import { ModeToggle } from "@/components/root/mode-toggle.tsx";
import { useStoreInContext } from "@/lib/zustand.tsx";
import { SidebarTrigger } from "@/components/ui/sidebar.tsx";
import GlobalSearch from "@/components/root/global-search";

export default function AppBar(): ReactElement {
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (loggedIn) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, [loggedIn]);

    return (
        <div className={"absolute right-5 top-2 flex justify-end items-center"}>
            <div className={"p-4 flex justify-center items-center "}>
                {authenticated ? (
                    <SidebarTrigger
                        className={
                            "bg-neutral-200 mr-2 dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:bg-neutral-800 focus-visible:ring-0"
                        }
                    >
                        <Compass className={"h-4 w-4 text-black dark:text-white"} />
                    </SidebarTrigger>
                ) : (
                    <></>
                )}

                {authenticated ? <GlobalSearch /> : null}

                <ModeToggle />
            </div>
        </div>
    );
}
