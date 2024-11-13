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
import {
    Home,
    GitPullRequestCreate,
    LucideProps,
    GitPullRequest,
    CircleUser,
    Building,
    Users,
    DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UserDropdown from "@/components/root/user-dropdown.tsx";

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
    }, [setOpen]);

    const items: NavItem[] = [
        {
            title: "Home",
            url: "/",
            icon: Home,
        },
        {
            title: "User Information",
            url: "/user-info",
            icon: CircleUser,
        },
        {
            title: "Organization Information",
            url: "/organization",
            icon: Building,
        },
        {
            title: "Organization Members",
            url: "/organization/members",
            icon: Users,
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
        {
            title: "Billing",
            url: "/billing",
            icon: DollarSign,
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
                                        <a className={"dark:text-white text-black"} href={item.url}>
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
