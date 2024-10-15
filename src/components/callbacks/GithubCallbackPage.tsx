import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useUserGithubAuthorization from "../../requests/integrations/oauth2/use-user-github-authorization";
import { useToast } from "../../hooks/use-toast";

export default function GithubCallbackPage() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const githubAuthorizationMutation = useUserGithubAuthorization();

    useEffect(() => {
        ;(async () => {
            try {
                const code = searchParams.get("code");
                if (!code) {
                    throw new Error("No code provided");
                }
                await githubAuthorizationMutation.mutateAsync({
                    providerName: "github",
                    authorizationCode: code,
                });
                navigate("/")
            } catch {
                toast({
                    title: "Oops!",
                    description: "Failed to connect github account",
                    variant: "destructive",
                });
                navigate("/")
            }
        })();
    }, [searchParams]);
}
