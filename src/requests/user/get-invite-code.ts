import { Axios } from "../../lib/axios.ts";
import { AxiosResponse } from "axios";

interface OrganizationPayload {
    organizationId: string;
}

export async function getInviteCode({
    organizationId,
}: OrganizationPayload): Promise<AxiosResponse> {
    return Axios({
        method: "GET",
        url: `http://localhost:8000/v1/invite-codes/${organizationId}`,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
