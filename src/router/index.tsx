import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login/Login.tsx";
import Root from "../components/Root.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
]);
