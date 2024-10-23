import { Axios } from "@/lib/axios";
import { AxiosResponse } from "axios";

export interface CreateChangeRequest {
    command: string;
    packageManager: string;
    packageManagerVersion: string;
    customCommitMessage: string;
    customBranchName: string;
    customPullRequestTitle: string;
    eligibleGitNamespaces: string[];
    dryRun: boolean;
}

export async function createChangeRequest({
    command,
    packageManager,
    packageManagerVersion,
    customCommitMessage,
    customBranchName,
    customPullRequestTitle,
    eligibleGitNamespaces,
    dryRun,
}: CreateChangeRequest): Promise<AxiosResponse> {
    return Axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/change_requests`,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        data: JSON.stringify({
            command: command,
            package_manager: {
                software: packageManager,
                version: packageManagerVersion,
            },
            eligible_git_namespaces: eligibleGitNamespaces,
            custom_branch_name: customBranchName,
            custom_commit_message: customCommitMessage,
            custom_pull_request_title: customPullRequestTitle,
            dry_run: dryRun,
        }),
    });
}
