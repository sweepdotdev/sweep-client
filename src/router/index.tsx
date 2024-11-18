import { createBrowserRouter } from "react-router-dom";
import Login from "@/components/login/login.tsx";
import Root from "@/components/root.tsx";
import ManagerRegister from "@/components/register/manager-register.tsx";
import UserRegister from "@/components/register/user-register.tsx";
import UserInfo from "@/components/user-information/user-info.tsx";
import Home from "@/components/home/home.tsx";
import GithubCallbackPage from "@/components/callbacks/github-callback-page.tsx";
import ChangeRequests from "@/components/change-requests/change-requests.tsx";
import CreateChangeRequests from "@/components/change-requests/change-request/create-change-requests.tsx";
import Billing from "@/components/billing/billing";
import ChangeRequest from "@/components/change-requests/change-request/change-request";
import OrganizationMembers from "@/components/organization/members/organization-members";
import OrganizationInfo from "@/components/organization/organization-info";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
                children: [
                    {
                        path: "/",
                        element: <ChangeRequests />,
                    },
                    {
                        path: "/change-requests/create",
                        element: <CreateChangeRequests />,
                    },
                    {
                        path: "/change-requests/:id",
                        element: <ChangeRequest />,
                    },
                ],
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <ManagerRegister />,
            },
            {
                path: "/register/user/:code",
                element: <UserRegister />,
            },
            {
                path: "/sso/github/callback",
                element: <GithubCallbackPage />,
            },
            {
                path: "/user-info",
                element: <UserInfo />,
            },
            {
                path: "/billing",
                element: <Billing />,
            },
            {
                path: "organization",
                element: <OrganizationInfo />,
            },
            {
                path: "/organization/members",
                element: <OrganizationMembers />,
            },
        ],
    },
]);
