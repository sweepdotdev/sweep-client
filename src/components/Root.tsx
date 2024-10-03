import { ReactElement } from "react";
import AppBar from "./root/app-bar.tsx";

export default function Root(): ReactElement {
    return (
        <div className={"h-screen w-screen"}>
            <AppBar />
        </div>
    );
}
