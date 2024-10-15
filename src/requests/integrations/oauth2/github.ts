import { AxiosResponse } from "axios";
import { Axios } from "../../../lib/axios.ts";

export type ProviderName = "github";

export interface GithubAuthorizationData {
    providerName: ProviderName
    authorizationCode: string;
}

export default async function saveUserGithubAuthorization(
    { providerName, authorizationCode }: GithubAuthorizationData
): Promise<AxiosResponse> {
    return Axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/users/self/sso/${providerName}`,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        data: JSON.stringify({ authorization_code: authorizationCode }),
    });
}
