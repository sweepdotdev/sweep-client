import { useMutation } from "@tanstack/react-query";
import { createIntent } from "@/requests/billing/create-intent";
import { useToast } from "@/hooks/use-toast";
import { AxiosResponse } from "axios";

export default function useIntentMutation() {
    const { toast } = useToast();
    return useMutation({
        mutationKey: ["create-intent"],
        mutationFn: async (): Promise<AxiosResponse> => await createIntent(),
        onError: async (): Promise<void> => {
            toast({
                title: "Error Creating Intent",
                description: "Something went something wrong",
                variant: "destructive",
            });
        },
    });
}
