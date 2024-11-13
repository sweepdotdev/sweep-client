import { ChangeRequest } from "@/models/change-requests/change-request/change-request";

export const blankChangeRequest: ChangeRequest = {
    id: "",
    packageManager: "",
    packageManagerVersion: "",
    command: "",
    eligibleGitNamespaces: [""],
    customBranchName: "",
    customCommitMessage: "",
    customPullRequestTitle: "",
    dryRun: false,
    status: "pending",
    createdAt: new Date(),
};
