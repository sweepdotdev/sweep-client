import { useMutation } from "@tanstack/react-query";
import { logout } from "@/requests/logout/logout.ts";
import { useToast } from "@/hooks/use-toast.ts";

export default function useLogout() {
    const { toast } = useToast();
    return useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            return await logout();
        },
        onSuccess: async (): Promise<void> => {
            toast({
                title: "Success! 🎉",
                description: "You have successfully logged out of your account!",
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
