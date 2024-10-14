import { ReactElement } from "react";
import { useStoreInContext } from "../../lib/zustand.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu.tsx";
import { Button } from "../ui/button.tsx";
import { PowerIcon, CircleUser } from "lucide-react";
import { useToast } from "../../hooks/use-toast.ts";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import useLogout from "../../requests/logout/use-logout.tsx";

export default function UserDropdown(): ReactElement {
    const getEmail: string = useStoreInContext((state) => state.email);
    const accountId: string = useStoreInContext((state) => state.sub);
    const clearState: () => void = useStoreInContext((state) => state.clearState);
    const redirect: NavigateFunction = useNavigate();
    const { toast } = useToast();
    const logoutMutation = useLogout();

    async function logoutUser() {
        if (!accountId) {
            toast({
                title: "Oops! 😬",
                description: "No account ID present!",
                variant: "destructive",
            });

            return;
        }

        await logoutMutation.mutateAsync(accountId);

        clearState();

        redirect("/login");
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>{getEmail}</Button>
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