import { Axios } from "@/lib/axios";

interface GetChangeRequests {
    page: number;
    pageSize: number;
}

export async function getAllChangeRequests({ page, pageSize }: GetChangeRequests) {
    return Axios({
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/change_requests?page=${page}&pageSize=${pageSize}}`,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
