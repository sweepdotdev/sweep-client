import { ForwardRefExoticComponent, ReactElement, RefAttributes, useEffect } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import UserDropdown from "@/components/root/user-dropdown.tsx";
import { Home, GitPullRequestCreate, LucideProps, GitPullRequest } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
    title: string;
    url: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export function AppSidebar(): ReactElement {
    const { setOpen } = useSidebar();

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        });
    }, []);

    const items: NavItem[] = [
        {
            title: "Home",
            url: "/",
            icon: Home,
        },
        {
            title: "Change Requests",
            url: "/change-requests",
            icon: GitPullRequest,
        },
        {
            title: "Create Change Request",
            url: "/change-requests/create",
            icon: GitPullRequestCreate,
        },
    ];

    return (
        <Sidebar variant={"sidebar"}>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item: NavItem) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <UserDropdown />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Button
                            className={"w-full bg-red-500 hover:bg-red-500"}
                            onClick={() => setOpen(false)}
                        >
                            Close Menu
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
