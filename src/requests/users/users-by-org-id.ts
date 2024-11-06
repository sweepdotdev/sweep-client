import { Axios } from "@/lib/axios";
import { AxiosResponse } from "axios";

interface Parameters {
    organizationId: string;
}

export async function getUsersByOrganizationId({
    organizationId,
}: Parameters): Promise<AxiosResponse> {
    return Axios({
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/organizations/${organizationId}/users`,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
}
