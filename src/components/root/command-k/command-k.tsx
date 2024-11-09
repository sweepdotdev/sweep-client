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
import { Button } from "@/components/ui/button";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { searchItems } from "@/components/root/command-k/search-items";
import { SearchItem } from "@/components/root/command-k/search-item";

export default function CommandK(): ReactElement {
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

    function handleSelection(route: string): void {
        setOpen(false);
        redirect(route);
    }

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
                    <CommandGroup>
                        {searchItems.map(
                            (item: SearchItem): ReactElement => (
                                <>
                                    <CommandItem
                                        className={"cursor-pointer"}
                                        onSelect={() => handleSelection(item.route)}
                                    >
                                        <div className={"mr-3"}>{item.icon}</div>
                                        <span>{item.text}</span>
                                        <CommandShortcut>{item.shortcut}</CommandShortcut>
                                    </CommandItem>
                                    {item.separator ? <CommandSeparator /> : <></>}
                                </>
                            ),
                        )}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
