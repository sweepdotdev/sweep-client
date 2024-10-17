import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import GitHub from "../icons/gith-hub";
import { stringify } from "qs";

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
            <Button className={"bg-black dark:bg-white text-xl space-x-2"}>
                <div className="mr-2">
                    <GitHub height={4} width={4} />
                </div>
                Login with GitHub
            </Button>
        </Link>
    );
};
