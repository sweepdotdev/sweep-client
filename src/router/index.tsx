import { createBrowserRouter } from "react-router-dom";
import Login from "@/components/login/Login.tsx";
import Root from "@/components/Root.tsx";
import ManagerRegister from "@/components/register/ManagerRegister.tsx";
import UserRegister from "@/components/register/UserRegister.tsx";
import UserInfo from "@/components/user-information/user-info.tsx";
import Home from "@/components/home/Home.tsx";
import GithubCallbackPage from "@/components/callbacks/GithubCallbackPage.tsx";
import ChangeRequests from "@/components/change-requests/change-requests.tsx";
import CreateChangeRequests from "@/components/change-requests/change-request/create-change-requests.tsx";
import Billing from "@/components/billing/Billing";
import ChangeRequest from "@/components/change-requests/change-request/change-request";
import OrganizationMembers from "@/components/organization/members/organization-members";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
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
                path: "/change-requests",
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
            {
                path: "/billing",
                element: <Billing />,
            },
            {
                path: "/organization/members",
                element: <OrganizationMembers />,
            },
        ],
    },
]);
