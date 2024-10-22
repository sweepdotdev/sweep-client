import { useMutation } from "@tanstack/react-query";
import {
    createChangeRequest,
    CreateChangeRequest,
} from "@/requests/change-requests/create-change-request";
import { AxiosResponse } from "axios";
import { useToast } from "@/hooks/use-toast";

export default function useCreateChangeRequest() {
    const { toast } = useToast();
    return useMutation({
        mutationKey: ["createChangeRequest"],
        mutationFn: async ({
            command,
            packageManager,
            packageManagerVersion,
            customBranchName,
            customCommitMessage,
            customPullRequestTitle,
            eligibleGitNamespaces,
            dryRun,
        }: CreateChangeRequest): Promise<AxiosResponse> => {
            return await createChangeRequest({
                command,
                packageManager,
                packageManagerVersion,
                customBranchName,
                customCommitMessage,
                customPullRequestTitle,
                eligibleGitNamespaces,
                dryRun,
            });
        },
        onSuccess: async (): Promise<void> => {
            toast({
                title: "Success 🎉",
                description: "You have successfully created a change request.",
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
