import { Axios } from "@/lib/axios";
import { AxiosResponse } from "axios";

interface Params {
    organizationId: string;
}

export async function getOrganizationById({ organizationId }: Params): Promise<AxiosResponse> {
    return Axios({
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/organizations/${organizationId}`,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
}
