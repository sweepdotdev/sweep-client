import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ReactElement } from "react";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import RedirectButton from "@/components/change-requests/table/redirect-button";
import { ChangeRequest } from "@/models/change-requests/change-request/change-request";

interface ColorDetermination {
    textColor: string;
    bgColor: string;
}

export function determineStatusColor(status: string): ColorDetermination {
    switch (status) {
        case "pending":
            return { textColor: "text-orange-500", bgColor: "bg-orange-200" };
        case "in_progress":
            return { textColor: "text-yellow-500", bgColor: "bg-yellow-200" };
        case "completed":
            return { textColor: "text-green-500", bgColor: "bg-green-200" };
        default:
            return { textColor: "text-orange-500", bgColor: "bg-orange-200" };
    }
}

export const columns: ColumnDef<ChangeRequest>[] = [
    {
        accessorKey: "packageManager",
        header: (): ReactElement => (
            <div className={"flex justify-center items-center"}>
                <p>Package Manager</p>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className={"flex justify-center items-center"}>
                    <pre className={"p-2 bg-muted rounded-md"}>
                        {row.getValue("packageManager")}
                    </pre>
                </div>
            );
        },
    },
    {
        accessorKey: "packageManagerVersion",
        header: () => (
            <div className={"flex justify-center items-center"}>Package Manager Version</div>
        ),
        cell: ({ row }) => {
            return (
                <div className={"flex justify-center items-center"}>
                    <pre className={"p-2 bg-muted rounded-md"}>
                        {row.getValue("packageManagerVersion")}
                    </pre>
                </div>
            );
        },
    },
    {
        accessorKey: "command",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={(): boolean => column.getIsSorted() === "asc"}
                    className={"flex justify-center items-center w-full"}
                >
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
        header: () => <div className={"flex justify-center items-center"}>Branch Name</div>,
        cell: ({ row }) => {
            return (
                <div className={"flex justify-center items-center"}>
                    <p>{row.getValue("customBranchName")}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "customCommitMessage",
        header: () => <div className={"flex justify-center items-center"}>Commit Message</div>,
        cell: ({ row }) => {
            return (
                <div className={"flex justify-center items-center"}>
                    <p>
                        <em>"{row.getValue("customCommitMessage")}"</em>
                    </p>
                </div>
            );
        },
    },
    {
        accessorKey: "customPullRequestTitle",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.getIsSorted() === "asc"}
                    className={"flex justify-center items-center w-full"}
                >
                    Pull Request Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className={"flex justify-center items-center"}>
                    <p>{row.getValue("customPullRequestTitle")}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: () => <div className={"flex justify-center items-center"}>Status</div>,
        cell: ({ row }): ReactElement => {
            const status: string = row.getValue("status");
            const modifiedStatus: string = status.charAt(0).toUpperCase() + status.slice(1);
            const { bgColor, textColor } = determineStatusColor(status);
            return (
                <div
                    className={`${bgColor} flex justify-center items-center ${textColor} p-2 rounded-md`}
                >
                    {modifiedStatus}
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.getIsSorted() === "asc"}
                    className={"flex justify-center items-center w-full"}
                >
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
                    <TooltipTrigger className={"flex justify-center items-center w-full"}>
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
        header: () => <div className={"flex justify-center items-center w-full"}>Dry Run</div>,
        cell: ({ row }) => {
            return (
                <div className={"flex justify-center items-center"}>
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
        header: () => <div className={"flex justify-center items-center w-full"}>Actions</div>,
        cell: ({ row }) => {
            return (
                <div className={"flex justify-center items-center"}>
                    <RedirectButton id={row.original.id} />
                </div>
            );
        },
    },
];
