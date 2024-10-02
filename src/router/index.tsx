import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login/Login.tsx";
import Home from "../components/home/Home.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);
