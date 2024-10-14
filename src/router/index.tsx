import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login/Login.tsx";
import Root from "../components/Root.tsx";
import ManagerRegister from "../components/register/ManagerRegister.tsx";
import UserRegister from "../components/register/UserRegister.tsx";
import UserInfo from "../components/user-information/user-info.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
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
                path: "/user-info",
                element: <UserInfo />,
            },
        ],
    },
]);
