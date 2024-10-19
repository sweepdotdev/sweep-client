import { Axios } from "../../lib/axios";

export async function getAllChangeRequests() {
    return Axios({
        method: "GET",
        url: `http://localhost:8000/v1/change_requests`,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
