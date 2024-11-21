import { Axios } from "@/lib/axios";
import { AxiosResponse } from "axios";

export default async function getUserAvatarUrl(): Promise<AxiosResponse> {
    return await Axios({
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/users/self/avatar`,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
}
