import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "../ui/sidebar";
import { ReactElement } from "react";
import UserDropdown from "./user-dropdown.tsx";

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
