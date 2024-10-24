import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Cpu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className={
                        "bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:bg-neutral-800 focus-visible:ring-0"
                    }
                >
                    {theme === "light" ? (
                        <Sun className={"h-4 w-4 text-black"} />
                    ) : theme === "dark" ? (
                        <Moon color={"white"} className="h-4 w-4 transition-all" />
                    ) : (
                        <Cpu className="h-4 w-4 transition-all text-neutral-500" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className={"dark:bg-neutral-700 dark:border-neutral-600"}
            >
                <DropdownMenuLabel className={"dark:text-neutral-300"}>
                    Theme Toggle
                </DropdownMenuLabel>
                <DropdownMenuSeparator className={"dark:bg-neutral-500"} />
                <DropdownMenuCheckboxItem
                    className={"dark:data-[highlighted]:bg-neutral-500 dark:text-neutral-300"}
                    checked={theme === "light"}
                    onCheckedChange={() => setTheme("light")}
                >
                    Light
                    <div className={"ml-auto"}>
                        <Sun className={"h-4 w-4"} />
                    </div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    className={"dark:data-[highlighted]:bg-neutral-500 dark:text-neutral-300"}
                    checked={theme === "dark"}
                    onCheckedChange={() => setTheme("dark")}
                >
                    Dark
                    <div className={"ml-auto"}>
                        <Moon className={"h-4 w-4"} />
                    </div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    className={"dark:data-[highlighted]:bg-neutral-500 dark:text-neutral-300"}
                    checked={theme === "system"}
                    onCheckedChange={() => setTheme("system")}
                >
                    System
                    <div className={"ml-auto"}>
                        <Cpu className={"h-4 w-4"} />
                    </div>
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
