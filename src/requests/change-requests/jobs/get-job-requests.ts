import { Axios } from "@/lib/axios";
import { AxiosResponse } from "axios";

interface JobsRequest {
    changeRequestId: string;
}

export async function getJobRequestsByChangeRequestId({
    changeRequestId,
}: JobsRequest): Promise<AxiosResponse> {
    return Axios({
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/change_requests/${changeRequestId}/status`,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
}
