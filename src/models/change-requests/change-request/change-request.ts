export type ChangeRequest = {
    id: string;
    packageManager: string;
    packageManagerVersion: string;
    command: string;
    eligibleGitNamespaces: string[];
    customBranchName: string;
    customCommitMessage: string;
    customPullRequestTitle: string;
    dryRun: boolean;
    status: "pending" | "in_progress" | "completed";
    createdAt: Date;
};
