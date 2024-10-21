import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { stringify } from "qs";
import GitHub from "@/components/icons/gith-hub";

export const LoginWithGithubButton = ({
    csrfToken,
    clientId,
    redirectUri,
}: {
    csrfToken: string;
    clientId: string;
    redirectUri: string;
}) => {
    // TODO: store this in local storage & verify against it on callback
    const queryString = stringify({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "repo",
        state: csrfToken,
    });

    return (
        <Link to={`https://github.com/login/oauth/authorize?${queryString}`}>
            <Button size={"lg"} className={"bg-black dark:bg-white"}>
                <div className="mr-2">
                    <GitHub height={"24px"} width={"24px"} />
                </div>
                Login with GitHub
            </Button>
        </Link>
    );
};
