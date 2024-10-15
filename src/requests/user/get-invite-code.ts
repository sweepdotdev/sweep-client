import { Axios } from "../../lib/axios.ts";
import { AxiosResponse } from "axios";

export async function getInviteCode(): Promise<AxiosResponse> {
    return Axios({
        method: "GET",
        url: `http://localhost:8000/v1/invite-codes`,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
