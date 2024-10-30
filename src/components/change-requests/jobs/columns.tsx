import { ColumnDef } from "@tanstack/react-table";

export type Job = {
    id: string;
    changeRequestId: string;
    initiatorId: string;
    organizationId: string;
    status: "pending" | "running" | "success" | "failure";
    createdAt: Date;
    startedAt: Date;
    finishedAt: Date;
    updatedAt: Date;
};

export const columns: ColumnDef<Job>[] = [];
