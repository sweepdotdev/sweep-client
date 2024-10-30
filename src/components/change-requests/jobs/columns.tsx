import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export type Job = {
    id: string;
    changeRequestId: string;
    initiatorId: string;
    organizationId: string;
    status: "pending" | "running" | "success" | "failure";
    createdAt: Date;
    startedAt: Date | null;
    finishedAt: Date | null;
    updatedAt: Date;
};

function determineStatusColor(status: string): string {
    switch (status) {
        case "pending":
            return "text-orange-500";
        case "running":
            return "text-blue-500";
        case "success":
            return "text-green-500";
        case "failure":
            return "text-red-500";
        default:
            return "text-orange-500";
    }
}

export const columns: ColumnDef<Job>[] = [
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const cellValue: string = row.getValue("status");
            const capitalizedCellValue: string =
                cellValue.charAt(0).toUpperCase() + cellValue.slice(1);
            return (
                <div>
                    <p className={`${determineStatusColor(cellValue)}`}>{capitalizedCellValue}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const rawValue: Date = row.getValue("createdAt");

            if (!rawValue) {
                return;
            }

            const formattedDate: string = format(rawValue, "PPP");
            const formattedTime: string = format(rawValue, "ppp");

            return (
                <div>
                    <Tooltip>
                        <TooltipTrigger>{formattedDate}</TooltipTrigger>
                        <TooltipContent>
                            <p className={"text-md"}>{formattedTime}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            );
        },
    },
    {
        accessorKey: "startedAt",
        header: "Started At",
        cell: ({ row }) => {
            const rawValue: Date | null = row.getValue("startedAt");

            if (!rawValue) {
                return <div>--</div>;
            }

            const formattedDate: string = format(rawValue, "PPP");
            const formattedTime: string = format(rawValue, "ppp");

            return (
                <div>
                    <Tooltip>
                        <TooltipTrigger>{formattedDate}</TooltipTrigger>
                        <TooltipContent>
                            <p className={"text-md"}>{formattedTime}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            );
        },
    },
    {
        accessorKey: "finishedAt",
        header: "Finished At",
        cell: ({ row }) => {
            const rawValue: Date | null = row.getValue("finishedAt");

            if (!rawValue) {
                return <div>--</div>;
            }

            const formattedDate: string = format(rawValue, "PPP");
            const formattedTime: string = format(rawValue, "ppp");

            return (
                <div>
                    <Tooltip>
                        <TooltipTrigger>{formattedDate}</TooltipTrigger>
                        <TooltipContent>
                            <p className={"text-md"}>{formattedTime}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            );
        },
    },
];
