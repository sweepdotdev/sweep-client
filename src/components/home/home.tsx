import { ReactElement, useEffect, useState } from "react";
import { useStoreInContext } from "@/lib/zustand";
import { ProviderName } from "@/requests/integrations/oauth2/github";
import { GitConnectionPrompt } from "@/components/home/git-connection-prompt";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { confirmOAuthLinkage } from "@/requests/integrations/oauth2/confirm-linkage";
import { Loader } from "lucide-react";

const ACCEPTED_GIT_PROVIDERS = new Set(["github"]);

export default function Home(): ReactElement {
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);
    const [hasAssociatedGit, setHasAssociatedGit] = useState<boolean>(false);
    const redirect: NavigateFunction = useNavigate();
    const providers: ProviderName[] = []; // TODO: get from API
    const hasOAuth2Linkage: boolean | undefined = useStoreInContext(
        (state) => state.hasOAuth2Credentials,
    );

    useEffect(() => {
        if (!loggedIn) {
            redirect("/login");
        }
    }, [loggedIn, redirect]);

    const setOAuth2Linkage = useStoreInContext((state) => state.setHasOAuth2Credentials);

    const OAuthQuery = useQuery({
        queryKey: ["confirm-linkage"],
        queryFn: async () => await confirmOAuthLinkage(),
        retry: false,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (OAuthQuery.error) {
            setOAuth2Linkage(false);
        }
        if (OAuthQuery.data?.status === 201) {
            setOAuth2Linkage(true);
        }
    }, [OAuthQuery, setOAuth2Linkage]);

    useEffect(() => {
        const exists: boolean = providers.some((p) => ACCEPTED_GIT_PROVIDERS.has(p));
        setHasAssociatedGit(exists);
    }, [providers, loggedIn]);

    return (
        <div className={"h-screen w-screen"}>
            <div className={"h-full w-full flex items-center justify-center"}>
                {OAuthQuery.isLoading ? (
                    <Loader className={"h-10 w-10 animate-spin"} />
                ) : (
                    <div>
                        {!hasAssociatedGit && !hasOAuth2Linkage ? (
                            <GitConnectionPrompt />
                        ) : (
                            <Outlet />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
