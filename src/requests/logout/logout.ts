import { AxiosResponse } from "axios";
import { Axios } from "../../lib/axios.ts";

interface LogoutData {
    accountId: string;
}

export async function logout({ accountId }: LogoutData): Promise<AxiosResponse> {
    return Axios({
        method: "DELETE",
        url: "http://localhost:8000/v1/users/self/logout",
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
            account_id: accountId,
        },
    });
}
