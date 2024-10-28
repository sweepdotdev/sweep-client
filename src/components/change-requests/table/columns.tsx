import { ColumnDef } from "@tanstack/react-table";

export type ChangeRequest = {
    packageManager: string;
    packageManagerVersion: string;
    command: string;
    eligibleGitNamespaces: string[];
    customBranchName: string;
    customCommitMessage: string;
    customPullRequestTitle: string;
    dryRun: boolean;
};

export const columns: ColumnDef<ChangeRequest>[] = [
    {
        accessorKey: "packageManager",
        header: "Package Manager",
    },
    {
        accessorKey: "packageManagerVersion",
        header: "Package Manager Version",
    },
    {
        accessorKey: "command",
        header: "Command",
    },
    {
        accessorKey: "customBranchName",
        header: "Branch Name",
    },
    {
        accessorKey: "customCommitMessage",
        header: "Commit Message",
    },
    {
        accessorKey: "customPullRequestTitle",
        header: "Pull Request Title",
    },
    {
        accessorKey: "dryRun",
        header: "Dry Run",
    },
];
