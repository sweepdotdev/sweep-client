import { Axios } from "../../lib/axios";

export interface GetUserData {
    userId: string;
}

export async function getUserInformation({ userId }: GetUserData) {
    return Axios({
        method: "GET",
        url: `http://localhost:8000/v1/users/${userId}`,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
