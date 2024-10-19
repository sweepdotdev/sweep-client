import { ReactElement, useState } from "react";
import { useStoreInContext } from "../../lib/zustand";
import { ProviderName } from "../../requests/integrations/oauth2/github";
import { GitConnectionPrompt } from "./GitConnectionPrompt";

const ACCEPTED_GIT_PROVIDERS = new Set(["github"]);

export default function Home(): ReactElement {
    const loggedIn = useStoreInContext((state) => state.loggedIn);
    const [hasAssociatedGit, setHasAssociatedGit] = useState<boolean>(false);

    if (loggedIn) {
        const providers: ProviderName[] = []; // TODO: get from API
        const exists = providers.some((p) => ACCEPTED_GIT_PROVIDERS.has(p));
        setHasAssociatedGit(exists);
    }

    return (
        <div className={"h-screen w-screen"}>
            <div className={"h-full w-full flex items-center justify-center"}>
                {/* TODO[P3]: "Welcome back to your org" dashboard */}
                {!hasAssociatedGit && <GitConnectionPrompt />}
            </div>
        </div>
    );
}
