import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ReactElement } from "react";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export type ChangeRequest = {
    packageManager: string;
    packageManagerVersion: string;
    command: string;
    eligibleGitNamespaces: string[];
    customBranchName: string;
    customCommitMessage: string;
    customPullRequestTitle: string;
    dryRun: boolean;
    status: "pending" | "in_progress" | "completed";
    createdAt: string;
};

function determineStatusColor(status: string): string {
    switch (status) {
        case "pending":
            return "text-orange-500";
        case "in_progress":
            return "text-yellow-500";
        case "completed":
            return "text-green-500";
        default:
            return "text-orange-500";
    }
}

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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }): ReactElement => {
            const status: string = row.getValue("status");
            const modifiedStatus: string = status.charAt(0).toUpperCase() + status.slice(1);
            return <div className={`${determineStatusColor(status)}`}>{modifiedStatus}</div>;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Creation Date",
        cell: ({ row }): ReactElement => {
            const rawDate: string = row.getValue("createdAt");
            if (!rawDate) {
                return <></>;
            }
            const modifiedDate: string = format(new Date(rawDate), "PPPP");
            const modifiedTime: string = format(new Date(rawDate), "pppp");
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <div>{modifiedDate}</div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className={"text-md"}>{modifiedTime}</p>
                    </TooltipContent>
                </Tooltip>
            );
        },
    },
    {
        accessorKey: "dryRun",
        header: "Dry Run",
        cell: ({ row }) => {
            return (
                <div className={"flex justify-between items-center"}>
                    <Checkbox
                        aria-readonly
                        checked={row.getValue("dryRun")}
                        className={"mx-auto h-5 w-5"}
                    />
                </div>
            );
        },
    },
];
