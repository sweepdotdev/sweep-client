import { ReactElement } from "react";
import GitHub from "../icons/gith-hub";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import * as qs from 'qs';
import { generateCSRFToken } from "../../lib/security";

const LoginWithGithubButton = () => {
    // TODO[P0.5]: verify against this
    // TODO[P2]: More research & potentially backend-based CSRF implementation
    const csrfToken = generateCSRFToken();

    const queryString = qs.stringify({
        client_id: import.meta.env.VITE_GITHUB_OAUTH_APP_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_GITHUB_OAUTH_APP_REDIRECT_URI,
        response_type: "code",
        scope: "repo",
        state: csrfToken
    });

    return (
        <Link to={`https://github.com/login/oauth/authorize?${queryString}`} >
            <Button className={"bg-black dark:bg-white text-xl space-x-2"} >
                <GitHub height={4} width={4} />
                <p>Login with GitHub</p>
            </Button>
        </Link>
    )
}

export default function Home(): ReactElement {
    return (
        <div className={"h-screen w-screen"}>
            <div className={"h-full w-full flex items-center justify-center"}>
                <LoginWithGithubButton />
            </div>
        </div>
    );
}
