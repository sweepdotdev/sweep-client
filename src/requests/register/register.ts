import { AxiosResponse } from "axios";
import { Axios } from "../../lib/axios.ts";

export default async function register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    company: string,
): Promise<AxiosResponse> {
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
            company: company,
            gitlab_details: {
                gitlab_name: "",
                gitlab_email: "",
                access_token: "",
            },
        }),
    });
}
