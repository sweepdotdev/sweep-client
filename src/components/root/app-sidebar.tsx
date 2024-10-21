import { ReactElement } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import UserDropdown from "@/components/root/user-dropdown.tsx";

export function AppSidebar(): ReactElement {
    return (
        <Sidebar variant={"sidebar"}>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <UserDropdown />
            </SidebarFooter>
        </Sidebar>
    );
}
