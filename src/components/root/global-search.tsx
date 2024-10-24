import { ReactElement, useEffect, useState } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { DollarSign, GitPullRequest, GitPullRequestCreate, Home, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function GlobalSearch(): ReactElement {
    const [open, setOpen] = useState<boolean>(false);
    const redirect: NavigateFunction = useNavigate();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                setOpen(true);
            }

            if (e.key === "h" && (e.metaKey || e.ctrlKey)) {
                redirect("/");
            }

            if (e.key === "u" && (e.metaKey || e.ctrlKey)) {
                redirect("/user-info");
            }

            if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
                redirect("/change-requests");
            }

            if (e.key === "=" && (e.metaKey || e.ctrlKey)) {
                redirect("/change-requests/create");
            }

            if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
                redirect("/billing");
            }

            if (e.key === "Enter") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", down);

        return () => window.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <Button
                onClick={() => setOpen(!open)}
                className={
                    "mr-2 dark:text-white text-black bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:bg-neutral-800 focus-visible:ring-0"
                }
            >
                Search{" "}
                <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <DialogHeader>
                    <CommandInput placeholder={"Type a command or search..."} />
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading={"General"}>
                        <CommandItem onSelect={() => redirect("/")}>
                            <Home className={"mr-3"} />
                            <span>Home</span>
                            <CommandShortcut>⌃M</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => redirect("/user-info")}>
                            <UserCircle className={"mr-3"} />
                            <span>User Information</span>
                            <CommandShortcut>⌘U</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading={"Change Requests"}>
                        <CommandItem onSelect={() => redirect("/change-requests")}>
                            <GitPullRequest className={"mr-3"} />
                            <span>Change Requests</span>
                            <CommandShortcut>⌘C</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => redirect("/change-requests/create")}>
                            <GitPullRequestCreate className={"mr-3"} />
                            <span>Create Change Request</span>
                            <CommandShortcut>⌃+</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup>
                        <CommandItem onSelect={() => redirect("/billing")}>
                            <DollarSign className={"mr-3"} />
                            <span>Billing & Subscriptions</span>
                            <CommandShortcut>⌃B</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
