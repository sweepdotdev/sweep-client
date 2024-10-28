import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ReactElement } from "react";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import RedirectButton from "@/components/change-requests/table/redirect-button";

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
        header: ({ column }) => {
            return (
                <Button variant={"ghost"} onClick={(): boolean => column.getIsSorted() === "asc"}>
                    Sweep Command
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div>
                    <pre className={"bg-muted rounded-md p-2"}>{row.getValue("command")}</pre>
                </div>
            );
        },
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
        header: ({ column }) => {
            return (
                <Button variant={"ghost"} onClick={() => column.getIsSorted() === "asc"}>
                    Pull Request Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
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
        header: ({ column }) => {
            return (
                <Button variant={"ghost"} onClick={() => column.getIsSorted() === "asc"}>
                    Creation Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }): ReactElement => {
            const rawDate: Date = row.getValue("createdAt");
            if (!rawDate) {
                return <></>;
            }
            const modifiedDate: string = format(rawDate, "PPP");
            const modifiedTime: string = format(rawDate, "pp");
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
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return <RedirectButton id={row.original.id} />;
        },
    },
];
