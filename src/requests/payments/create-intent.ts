import { Axios } from "@/lib/axios";
import { AxiosResponse } from "axios";

export async function createIntent(): Promise<AxiosResponse> {
    return Axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/payments/create_intent`,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
}
