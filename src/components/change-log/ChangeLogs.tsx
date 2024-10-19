import { ReactElement, useEffect } from "react";
import { useStoreInContext } from "../../lib/zustand.tsx";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function ChangeLogs(): ReactElement {
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);
    const redirect: NavigateFunction = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            redirect("/login");
        }
    });
    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            <div>Balls</div>
        </div>
    );
}
