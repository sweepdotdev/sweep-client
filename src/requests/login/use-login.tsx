import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast.ts";
import { AxiosResponse } from "axios";
import login from "@/requests/login/login.ts";

export interface LoginData {
    email: string;
    password: string;
}

export default function useLogin() {
    const { toast } = useToast();
    return useMutation({
        mutationKey: ["loginUser"],
        mutationFn: async ({ email, password }: LoginData): Promise<AxiosResponse> => {
            return await login({ email: email, password: password });
        },
        onSuccess: async () => {
            toast({
                title: "Success! 🎉",
                description: "You have successfully logged in to your account!",
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
