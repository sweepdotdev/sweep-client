import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../hooks/use-toast.ts";
import saveUserGithubAuthorization from "./github.ts";

export default function useUserGithubAuthorization() {
    const { toast } = useToast();
    return useMutation({
        mutationKey: ["saveUserGithubAuthorization"],
        mutationFn: saveUserGithubAuthorization,
        onSuccess: async () => {
            toast({
                title: "Success! 🎉",
                description: "Successfully connected your Github account!",
                className: "bg-green-500",
            });
        },
        onError: async () => {
            toast({
                title: "Oops! 😬",
                description: "Something went wrong!",
                variant: "destructive",
            });
        },
    });
}
