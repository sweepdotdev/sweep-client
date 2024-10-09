import { AxiosResponse } from "axios";
import { Axios } from "../../lib/axios.ts";
import { RegisterData } from "./use-register.tsx";

export default async function register({
    firstName,
    lastName,
    email,
    password,
    organizationName,
}: RegisterData): Promise<AxiosResponse> {
    return Axios({
        method: "POST",
        url: "http://localhost:8000/v1/users",
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify({
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            organization_name: organizationName,
            gitlab_details: {
                gitlab_name: "",
                gitlab_email: "",
                access_token: "",
            },
        }),
    });
}
