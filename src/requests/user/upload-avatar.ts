import { Axios } from "@/lib/axios";
import { AxiosResponse } from "axios";

export interface UploadPayload {
    file: File;
}

export async function uploadAvatar({ file }: UploadPayload): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append("avatar", file);
    return await Axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/users/self/upload-avatar`,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        data: formData,
    });
}
