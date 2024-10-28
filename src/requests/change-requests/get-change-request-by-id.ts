import { Axios } from "@/lib/axios";
import { AxiosResponse } from "axios";

export async function getChangeRequestById(changeRequestId: string): Promise<AxiosResponse> {
    return Axios({
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/change_requests/${changeRequestId}`,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
}
