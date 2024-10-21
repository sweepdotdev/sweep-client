import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

import { ReactElement } from "react";
import { useStoreInContext } from "@/lib/zustand.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PowerIcon, CircleUser, ChevronDown } from "lucide-react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import useLogout from "@/requests/logout/use-logout.tsx";

export default function UserDropdown(): ReactElement {
    const getEmail: string = useStoreInContext((state) => state.email);
    const clearState: () => void = useStoreInContext((state) => state.clearState);
    const redirect: NavigateFunction = useNavigate();
    const logoutMutation = useLogout();

    async function logoutUser() {
        await logoutMutation.mutateAsync();

        if (logoutMutation.isSuccess) {
            clearState();
            redirect("/login");
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className={
                        "text-black dark:text-white bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:bg-neutral-800 focus-visible:ring-0"
                    }
                >
                    {getEmail} <ChevronDown className={"h-3 w-3 ml-2"} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"w-[200px]"}>
                <DropdownMenuLabel>User Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link to={"/user-info"}>User Information</Link>
                    <CircleUser className={"ml-auto h-4 w-4"} />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutUser}>
                    Logout <PowerIcon className={"ml-auto h-4 w-4 text-red-500"} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
