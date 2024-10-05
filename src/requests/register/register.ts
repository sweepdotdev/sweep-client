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
        url: "http://localhost:8000/users",
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            company: company,
            email: email,
            password: password,
        }),
    });
}
