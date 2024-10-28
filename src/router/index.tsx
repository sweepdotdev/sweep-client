import { createBrowserRouter } from "react-router-dom";
import Login from "@/components/login/Login.tsx";
import Root from "@/components/Root.tsx";
import ManagerRegister from "@/components/register/ManagerRegister.tsx";
import UserRegister from "@/components/register/UserRegister.tsx";
import UserInfo from "@/components/user-information/user-info.tsx";
import Home from "@/components/home/Home.tsx";
import GithubCallbackPage from "@/components/callbacks/GithubCallbackPage.tsx";
import ChangeRequests from "@/components/change-requests/ChangeRequests.tsx";
import CreateChangeRequests from "@/components/change-requests/CreateChangeRequests.tsx";
import Billing from "@/components/billing/Billing";
import IndividualChangeRequest from "@/components/change-requests/IndividualChangeRequest";

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
                element: <IndividualChangeRequest />,
            },
            {
                path: "/billing",
                element: <Billing />,
            },
        ],
    },
]);
