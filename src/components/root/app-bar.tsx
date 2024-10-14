import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { House, LogIn } from "lucide-react";
import { ModeToggle } from "./mode-toggle.tsx";
import { useStoreInContext } from "../../lib/zustand.tsx";
import UserDropdown from "./user-dropdown.tsx";

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
        <div
            className={
                "absolute w-full h-[100px] dark:bg-neutral-600 bg-neutral-300 flex justify-end items-center"
            }
        >
            <div className={"p-4 space-x-4 flex items-center"}>
                <Link
                    to={"/"}
                    className={
                        "hover:underline text-black dark:text-white hover:dark:text-red-500 hover:text-red-500 flex items-center"
                    }
                >
                    Home <House className={"ml-2 h-4 w-4"} />
                </Link>

                {authenticated ? <UserDropdown /> : <></>}

                {!authenticated ? (
                    <Link
                        to={"/login"}
                        className={
                            "hover:underline text-black dark:text-white hover:dark:text-red-500 hover:text-red-500 flex items-center"
                        }
                    >
                        Login <LogIn className={"ml-2 h-4 w-4"} />
                    </Link>
                ) : (
                    <></>
                )}

                <ModeToggle />
            </div>
        </div>
    );
}
