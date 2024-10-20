import { ReactElement } from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Compass } from "lucide-react";

interface Route {
    title: string;
    href: string;
    description: string;
}

export default function NavMenu(): ReactElement {
    const routes: Route[] = [
        {
            title: "Change Requests",
            href: "/change-requests",
            description: "View, update, and delete change requests",
        },
        {
            title: "Create Change Requests",
            href: "/change-requests",
            description: "Create a change request",
        },
    ];

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className={
                            "bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:bg-neutral-800 focus-visible:ring-0"
                        }
                    >
                        Navigation
                        <Compass className={"ml-2 h-4 w-4"} />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className=" w-[400px] p-4 md:w-[500px] lg:w-[600px] ">
                            {routes.map(
                                (route: Route): ReactElement => (
                                    <li>
                                        <NavigationMenuLink
                                            key={route.title}
                                            title={route.title}
                                            href={route.href}
                                        >
                                            <span className={"text-md"}>{route.title}</span>
                                            <span className={"text-sm"}>{route.description}</span>
                                        </NavigationMenuLink>
                                    </li>
                                ),
                            )}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
