import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../hooks/use-toast.ts";
import saveUserGithubAuthorization, { GithubAuthorizationData } from "./github.ts";

export default function useUserGithubAuthorization() {
    const { toast } = useToast();
    return useMutation({
        mutationKey: ["saveUserGithubAuthorization"],
        mutationFn: async ({ authorizationCode, providerName }: GithubAuthorizationData) => {
            return await saveUserGithubAuthorization({ authorizationCode, providerName });
        },
        onSuccess: async () => {
            toast({
                title: "Success! 🎉",
                description: "You have successfully logged out of your account!",
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
