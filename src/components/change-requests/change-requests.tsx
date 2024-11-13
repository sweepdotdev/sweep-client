import { ReactElement, useEffect, useState } from "react";
import { useStoreInContext } from "@/lib/zustand.tsx";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { getAllChangeRequests } from "@/requests/change-requests/get-change-requests.ts";
import { Button } from "@/components/ui/button.tsx";
import { DataTable } from "@/components/change-requests/table/data-table";
import { columns } from "@/components/change-requests/table/columns";
import { AxiosResponse } from "axios";
import { ChangeRequestPayload } from "@/models/change-requests/change-request/change-request-payload";
import { ChangeRequest } from "@/models/change-requests/change-request/change-request";
import { blankChangeRequest } from "@/models/change-requests/change-request/blank-change-request";
import { Pagination } from "@/models/data-table/pagination";

export default function ChangeRequests(): ReactElement {
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);
    const redirect: NavigateFunction = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            redirect("/login");
        }
    });

    const [pagination, setPagination] = useState<Pagination>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [totalPages, setTotalPages] = useState<number>(0);

    const changeRequestQuery = useQuery({
        queryKey: ["getChangeLogs", pagination],
        queryFn: async (): Promise<AxiosResponse> =>
            await getAllChangeRequests({
                page: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
            }),
    });
    const [data, setData] = useState<ChangeRequestPayload[] | null>(null);
    const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([blankChangeRequest]);

    useEffect(() => {
        if (changeRequestQuery.isSuccess) {
            setData(changeRequestQuery.data.data.data);
        }
    }, [changeRequestQuery.data]);

    useEffect(() => {
        if (changeRequestQuery.isSuccess && changeRequestQuery.data.data.meta) {
            setTotalPages(
                Math.ceil(changeRequestQuery.data?.data.meta.total / pagination.pageSize),
            );
        }
    }, [changeRequestQuery.isSuccess, changeRequestQuery.data?.data.meta]);

    useEffect(() => {
        if (changeRequestQuery.isSuccess && data) {
            const mockArray: ChangeRequest[] = [];
            for (let i = 0; i < data.length; i++) {
                const changeRequest: ChangeRequest = {
                    id: data[i].id,
                    packageManager: data[i].package_manager_software,
                    packageManagerVersion: data[i].package_manager_version,
                    command: data[i].command,
                    eligibleGitNamespaces: data[i].eligible_git_namespaces,
                    customBranchName: data[i].custom_branch_name,
                    customCommitMessage: data[i].custom_commit_message,
                    customPullRequestTitle: data[i].custom_pull_request_title,
                    dryRun: data[i].dry_run,
                    status: data[i].status,
                    createdAt: new Date(data[i].created_at),
                };
                mockArray.push(changeRequest);
            }
            setChangeRequests(mockArray);
        }
    }, [data]);

    if (data?.length === 0) {
        return (
            <div className={"h-full w-full flex items-center justify-center"}>
                {changeRequestQuery.isLoading ? (
                    <Loader className={"h-4 w-4 animate-spin"} />
                ) : (
                    <div className={"flex flex-col justify-center items-center space-y-2"}>
                        <p>There are currently no change requests in your organization. </p>
                        <Button onClick={() => redirect("/change-requests/create")} size={"lg"}>
                            Create Change Request
                        </Button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            {changeRequestQuery.isLoading ? (
                <div>
                    <Loader className={"h-8 w-8 animate-spin"} />
                </div>
            ) : (
                <DataTable
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={totalPages}
                    setTotalPages={setTotalPages}
                    columns={columns}
                    data={changeRequests}
                />
            )}
        </div>
    );
}
