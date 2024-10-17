import { Axios } from "../../lib/axios.ts";
import { AxiosResponse } from "axios";

export interface InviteCodeRequestData {
    organizationId: string;
}

export async function getInviteCode({
    organizationId,
}: InviteCodeRequestData): Promise<AxiosResponse> {
    return Axios({
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/organizations/${organizationId}/invite_codes`,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
