import { ReactElement, useEffect, useState } from "react";
import { useStoreInContext } from "@/lib/zustand";
import { ProviderName } from "@/requests/integrations/oauth2/github";
import { GitConnectionPrompt } from "@/components/home/GitConnectionPrompt";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { confirmOAuthLinkage } from "@/requests/integrations/oauth2/confirm-linkage";
import { Loader } from "lucide-react";

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

    const setOAuth2Linkage = useStoreInContext((state) => state.setHasOAuth2Credentials);

    const OAuthQuery = useQuery({
        queryKey: ["confirm-linkage"],
        queryFn: async () => await confirmOAuthLinkage(),
    });

    useEffect(() => {
        if (OAuthQuery.data?.status === 201) {
            setOAuth2Linkage();
        }
    }, [OAuthQuery.data, setOAuth2Linkage]);

    useEffect(() => {
        const exists: boolean = providers.some((p) => ACCEPTED_GIT_PROVIDERS.has(p));
        setHasAssociatedGit(exists);
    }, [providers, loggedIn]);

    return (
        <div className={"h-screen w-screen"}>
            <div className={"h-full w-full flex items-center justify-center"}>
                {OAuthQuery.isLoading ? (
                    <div className={"h-screen w-screen flex items-center justify-center"}>
                        <Loader className={"h-10 w-10 animate-spin"} />
                    </div>
                ) : (
                    <div>
                        {/* TODO[P3]: "Welcome back to your org" dashboard */}
                        {!hasAssociatedGit && <GitConnectionPrompt />}
                    </div>
                )}
            </div>
        </div>
    );
}
