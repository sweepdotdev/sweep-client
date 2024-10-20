import { ReactElement, useEffect, useState } from "react";
import { Link, Location, useLocation } from "react-router-dom";
import { House, LogIn } from "lucide-react";
import { ModeToggle } from "./mode-toggle.tsx";
import { useStoreInContext } from "../../lib/zustand.tsx";
import { Button } from "../ui/button.tsx";
import { SidebarTrigger } from "../ui/sidebar.tsx";

export default function AppBar(): ReactElement {
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const { pathname }: Location = useLocation();

    useEffect(() => {
        if (loggedIn) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, [loggedIn]);

    return (
        <div
            className={
                "absolute w-full h-[100px] dark:bg-neutral-600 bg-neutral-300 flex justify-end items-center"
            }
        >
            <div>{authenticated ? <SidebarTrigger /> : <></>}</div>
            <div className={"p-4 space-x-4 flex items-center"}>
                {authenticated && pathname !== "/" ? (
                    <Link to={"/"} className={"text-black dark:text-white flex items-center"}>
                        <Button
                            className={
                                "dark:text-white text-black bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:bg-neutral-800 focus-visible:ring-0"
                            }
                        >
                            Home <House className={"ml-2 h-4 w-4"} />
                        </Button>
                    </Link>
                ) : (
                    <></>
                )}

                {!authenticated && pathname !== "/login" ? (
                    <Link
                        to={"/login"}
                        className={"hover:underline text-black dark:text-white flex items-center"}
                    >
                        <Button
                            className={
                                "bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:bg-neutral-800 focus-visible:ring-0"
                            }
                        >
                            Login <LogIn className={"ml-2 h-4 w-4"} />
                        </Button>
                    </Link>
                ) : (
                    <></>
                )}

                <ModeToggle />
            </div>
        </div>
    );
}
