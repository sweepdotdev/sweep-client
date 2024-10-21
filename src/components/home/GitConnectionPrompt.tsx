import { generateCSRFToken } from "@/lib/security";
import { LoginWithGithubButton } from "@/components/home/LoginWithGithubButton";

export const GitConnectionPrompt = () => {
    const csrfToken = generateCSRFToken();
    return (
        <div className="flex flex-col items-center space-y-1">
            <p className="font-bold">Please connect a Git account to use additional features</p>
            <LoginWithGithubButton
                csrfToken={csrfToken}
                clientId={import.meta.env.VITE_GITHUB_OAUTH_APP_CLIENT_ID}
                redirectUri={import.meta.env.VITE_GITHUB_OAUTH_APP_REDIRECT_URI}
            />
        </div>
    );
};
