import { ReactElement, useEffect, useState } from "react";
import { useStoreInContext } from "../../lib/zustand";
import { ProviderName } from "../../requests/integrations/oauth2/github";
import { GitConnectionPrompt } from "./GitConnectionPrompt";
import { NavigateFunction, useNavigate } from "react-router-dom";

const ACCEPTED_GIT_PROVIDERS = new Set(["github"]);

export default function Home(): ReactElement {
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);
    const [hasAssociatedGit, setHasAssociatedGit] = useState<boolean>(false);
    const redirect: NavigateFunction = useNavigate();
    const providers: ProviderName[] = []; // TODO: get from API

    useEffect(() => {
        if (!loggedIn) {
            redirect("/login");
        }
    }, []);

    useEffect(() => {
        const exists: boolean = providers.some((p) => ACCEPTED_GIT_PROVIDERS.has(p));
        setHasAssociatedGit(exists);
    }, [providers, loggedIn]);

    return (
        <div className={"h-screen w-screen"}>
            <div className={"h-full w-full flex items-center justify-center"}>
                {/* TODO[P3]: "Welcome back to your org" dashboard */}
                {!hasAssociatedGit && <GitConnectionPrompt />}
            </div>
        </div>
    );
}
