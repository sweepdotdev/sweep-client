import { useEffect } from "react";
import { NavigateFunction, useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useUserGithubAuthorization from "@/requests/integrations/oauth2/use-user-github-authorization";

export default function GithubCallbackPage() {
    const { toast } = useToast();
    const redirect: NavigateFunction = useNavigate();
    const [searchParams] = useSearchParams();
    const githubAuthorizationMutation = useUserGithubAuthorization();

    useEffect(() => {
        (async () => {
            try {
                const code = searchParams.get("code");
                if (!code) {
                    throw new Error("No code provided");
                }
                await githubAuthorizationMutation.mutateAsync({
                    providerName: "github",
                    authorizationCode: code,
                });
            } catch {
                toast({
                    title: "Oops!",
                    description: "Failed to connect github account",
                    variant: "destructive",
                });
            }
            redirect("/");
        })();
    }, [searchParams]);

    return <></>;
}
