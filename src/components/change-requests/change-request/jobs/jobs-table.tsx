import { ReactElement } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { DataTable } from "@/components/change-requests/table/data-table";
import { columns } from "@/components/change-requests/change-request/jobs/columns";
import { AxiosResponse } from "axios";

interface Props {
    jobsQuery: UseQueryResult<AxiosResponse<any, any>, Error>;
}
export default function JobsTable({ jobsQuery }: Props): ReactElement {
    return (
        <div>
            {jobsQuery.isLoading ? (
                <div className={"h-full w-full flex items-center justify-center"}>
                    <Loader className={"h-10 w-10 animate-spin"} />
                </div>
            ) : (
                <div>
                    <DataTable columns={columns} data={[]} />
                </div>
            )}
        </div>
    );
}
