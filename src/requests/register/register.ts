import { AxiosResponse } from "axios";
import { Axios } from "../../lib/axios.ts";
import { RegisterData } from "./use-register.tsx";

export default async function register({
    firstName,
    lastName,
    email,
    password,
    organizationName,
    inviteCode,
}: RegisterData): Promise<AxiosResponse> {
    return Axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/users`,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        data: JSON.stringify({
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            organization_name: organizationName,
            invite_code: inviteCode,
            gitlab_details: {
                gitlab_name: "",
                gitlab_email: "",
                access_token: "",
            },
        }),
    });
}
