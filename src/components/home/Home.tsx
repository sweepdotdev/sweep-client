import { ReactElement } from "react";
import GitHub from "../icons/gith-hub";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import * as qs from 'qs';
import { generateCSRFToken } from "../../lib/security";
import { useStoreInContext } from "../../lib/zustand";
import { ProviderName } from "../../requests/integrations/oauth2/github";

const LoginWithGithubButton = () => {
    // TODO: store this in local storage & verify against it on callback
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

const GitConnectionPrompt = () => {
    return (
        <div className="flex flex-col items-center space-y-1">
            <p className="font-bold">Please connect a Git account to use additional features</p>
            <LoginWithGithubButton />
        </div>
    )
}

export default function Home(): ReactElement {
    const loggedIn = useStoreInContext(state => state.loggedIn);
    let hasGithubLink = false;

    if (loggedIn) {
        const providers: ProviderName[] = []; // TODO: get from API
        hasGithubLink = providers.includes("github");
    }

    return (
        <div className={"h-screen w-screen"}>
            <div className={"h-full w-full flex items-center justify-center"}>
                {/* TODO[P3]: "Welcome back to your org" dashboard */}
                {/* TODO[P3]: Support for other git providers */}
                {!hasGithubLink && <GitConnectionPrompt />}
            </div>
        </div>
    );
}
