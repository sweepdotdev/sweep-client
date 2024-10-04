import { AxiosResponse } from "axios";
import { Axios } from "../lib/axios";

export default async function login(email: string, password: string): Promise<AxiosResponse> {
    return Axios({
        method: "POST",
        url: "http://localhost:8000/v1/users/self/authenticate",
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify({ email: email, password: password }),
    });
}
