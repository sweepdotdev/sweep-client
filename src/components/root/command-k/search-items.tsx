import { DollarSign, GitPullRequest, GitPullRequestCreate, Home, UserCircle } from "lucide-react";
import { SearchItem } from "@/components/root/command-k/search-item";

export const searchItems: SearchItem[] = [
    {
        route: "/",
        text: "Home",
        shortcut: "⌃M",
        icon: <Home />,
    },
    {
        route: "user-info",
        text: "User Information",
        shortcut: "⌘U",
        icon: <UserCircle />,
        separator: true,
    },
    {
        route: "/change-requests",
        text: "Change Requests",
        shortcut: "⌘C",
        icon: <GitPullRequest />,
    },
    {
        route: "/change-requests/create",
        text: "Create Change Request",
        shortcut: "⌃+",
        icon: <GitPullRequestCreate />,
        separator: true,
    },
    {
        route: "/billing",
        text: "Billing",
        shortcut: "⌃B",
        icon: <DollarSign />,
    },
];
