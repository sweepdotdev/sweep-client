import { useMutation } from "@tanstack/react-query";
import { uploadAvatar, UploadPayload } from "@/requests/user/upload-avatar";
import { useToast } from "@/hooks/use-toast";
import { AxiosResponse } from "axios";

export default function useUploadAvatar() {
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["uploadAvatar"],
        mutationFn: async ({ file }: UploadPayload): Promise<AxiosResponse> =>
            await uploadAvatar({ file }),
        onSuccess: async (): Promise<void> => {
            toast({
                title: "Success 🎉",
                description: "Your profile picture has been successfully uploaded!",
                className: "bg-green-500",
            });
        },
        onError: async (): Promise<void> => {
            toast({
                title: "Oops! 😬",
                description: "Something went wrong!",
                variant: "destructive",
            });
        },
    });
}
