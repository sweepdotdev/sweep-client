import { AxiosResponse } from "axios";
import { Axios } from "@/lib/axios.ts";

export async function logout(): Promise<AxiosResponse> {
    return Axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/users/self/logout`,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
}
