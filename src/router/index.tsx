import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login/Login.tsx";
import Root from "../components/Root.tsx";
import Register from "../components/register/Register.tsx";

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
                element: <Register />,
            },
        ],
    },
]);
