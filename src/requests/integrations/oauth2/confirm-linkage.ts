import { Axios } from "@/lib/axios";
import { AxiosResponse } from "axios";

export async function confirmOAuthLinkage(): Promise<AxiosResponse> {
    return Axios({
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/users/self/sso/github-link-exists`,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
}
