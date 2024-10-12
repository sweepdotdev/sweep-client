import { useMutation } from "@tanstack/react-query";
import register from "./register.ts";
import { AxiosResponse } from "axios";
import { useToast } from "../../hooks/use-toast.ts";

export interface RegisterData {
    firstName: string;
    lastName: string;
    organizationName: string | null;
    email: string;
    password: string;
    inviteCode: string | null;
}

export default function useRegisterUser() {
    const { toast } = useToast();
    return useMutation({
        mutationKey: ["registerUser"],
        mutationFn: async ({
            firstName,
            lastName,
            organizationName,
            email,
            password,
            inviteCode,
        }: RegisterData): Promise<AxiosResponse> => {
            return await register({
                firstName: firstName,
                lastName: lastName,
                organizationName: organizationName ?? null,
                email: email,
                password: password,
                inviteCode: inviteCode ?? null,
            });
        },
        onSuccess: async (): Promise<void> => {
            toast({
                title: "Success! 🎉",
                description: "You have successfully registered for Sweep.dev",
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
