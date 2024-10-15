import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useUserGithubAuthorization from "../../requests/integrations/oauth2/use-user-github-authorization";

interface Result {
    success: boolean;
    message: string;
}

export default function GithubCallbackPage(): ReactElement {
    const [searchParams] = useSearchParams();
    const githubAuthorizationMutation = useUserGithubAuthorization();
    const [result, setResult] = useState<Result>();

    const code = searchParams.get("code");
    useEffect(() => {
        ;(async () => {
            try {
                if (code) {
                    await githubAuthorizationMutation.mutateAsync({
                        providerName: "github",
                        authorizationCode: code,
                    });
                    setResult({ success: true, message: "Success!" });
                }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setResult({ success: false, message: error.message });
            }
        })();
    }, [code]);

    return (
        <div>
            {result
                ? <p className={result.success ? "text-green-500" : "text-red-500"}>{result.message}</p>
                : <p>Loading</p>
            }
        </div>
    )
}
