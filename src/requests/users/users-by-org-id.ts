import { Axios } from "@/lib/axios";
import { AxiosResponse } from "axios";

export async function getUsersByOrganizationId(): Promise<AxiosResponse> {
    return Axios({
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/organizations/users`,
        withCredentials: true,
    });
}
