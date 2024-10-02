import { ReactElement } from "react";

export default function Home(): ReactElement {
    return (
        <div className={"h-screen w-screen"}>
            <div className={"h-full w-full flex items-center justify-center"}>
                <h1 className={"text-9xl"}>Test</h1>
            </div>
        </div>
    );
}
