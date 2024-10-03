import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { House, LogIn } from "lucide-react";
import { ModeToggle } from "./mode-toggle.tsx";

export default function AppBar(): ReactElement {
    return (
        <div
            className={
                "w-full h-[100px] dark:bg-neutral-600 bg-neutral-300 flex justify-end items-center"
            }
        >
            <div className={"p-4 space-x-4 flex"}>
                <Link
                    to={"/"}
                    className={
                        "hover:underline text-black dark:text-white hover:dark:text-red-500 hover:text-red-500 flex items-center"
                    }
                >
                    Home <House className={"ml-2 h-4 w-4"} />
                </Link>
                <Link
                    to={"/login"}
                    className={
                        "hover:underline text-black dark:text-white hover:dark:text-red-500 hover:text-red-500 flex items-center"
                    }
                >
                    Login <LogIn className={"ml-2 h-4 w-4"} />
                </Link>
                <ModeToggle />
            </div>
        </div>
    );
}
