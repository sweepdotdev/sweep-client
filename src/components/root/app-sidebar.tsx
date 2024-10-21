import { ReactElement, useEffect } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar";
import UserDropdown from "@/components/root/user-dropdown.tsx";

interface Props {
    triggerSetOpen: boolean;
}

export function AppSidebar({ triggerSetOpen }: Props): ReactElement {
    const { setOpen } = useSidebar();

    useEffect(() => {
        if (triggerSetOpen) {
            setOpen(false);
        }
    }, [triggerSetOpen]);

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
