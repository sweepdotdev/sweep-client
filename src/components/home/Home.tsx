import { ReactElement } from "react";
import GitHub from "../icons/gith-hub";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import * as qs from 'qs';

const LoginWithGithubButton = () => {
    // TODO[P0.5]: verify against this
    // TODO[P2]: More research & potentially backend-based CSRF implementation
    const csrfToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const queryString = qs.stringify({
        client_id: import.meta.env.VITE_GITHUB_OAUTH_APP_CLIENT_ID,
        response_type: "code",
        scope: "repo",
        redirect_uri: import.meta.env.VITE_GITHUB_OAUTH_APP_REDIRECT_URI,
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
