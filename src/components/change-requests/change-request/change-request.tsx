import { ReactElement, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

import { useStoreInContext } from "@/lib/zustand";
import ChangeRequestSummary from "@/components/change-requests/change-request/change-request-summary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobsTable from "@/components/change-requests/change-request/jobs/jobs-table";
import { useQuery } from "@tanstack/react-query";
import { getJobRequestsByChangeRequestId } from "@/requests/change-requests/jobs/get-job-requests";
import { AxiosResponse } from "axios";
import { Job } from "@/components/change-requests/change-request/jobs/columns";

export interface JobsPayload {
    id: string;
    change_request_id: string;
    initiator_id: string;
    organization_id: string;
    status: "pending" | "running" | "success" | "failure";
    created_at: string;
    run_started_at: string;
    run_finished_at: string;
    last_updated_at: string;
}

export default function ChangeRequest(): ReactElement {
    const { id } = useParams();
    const redirect: NavigateFunction = useNavigate();
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);
    const date: Date = new Date();
    const blankJob: Job = {
        id: "",
        changeRequestId: "",
        organizationId: "",
        initiatorId: "",
        status: "pending",
        createdAt: date,
        startedAt: null,
        finishedAt: null,
        updatedAt: date,
    };
    const [jobs, setJobs] = useState<Job[]>([blankJob]);

    useEffect(() => {
        if (!id) redirect("/change-requests");
    }, [id]);

    useEffect(() => {
        if (!loggedIn) {
            redirect("/login");
        }
    }, [loggedIn]);

    const getAllJobsQuery = useQuery({
        queryKey: ["getAllJobs", id!],
        queryFn: async (): Promise<AxiosResponse> =>
            await getJobRequestsByChangeRequestId({ changeRequestId: id! }),
    });

    useEffect(() => {
        const data: JobsPayload[] = getAllJobsQuery.data?.data.data.jobs as JobsPayload[];
        if (getAllJobsQuery.isSuccess) {
            if (data.length > 0) {
                for (let i = 0; i <= data.length; i++) {
                    const job: Job = {
                        id: data[i].id,
                        changeRequestId: data[i].change_request_id,
                        organizationId: data[i].organization_id,
                        initiatorId: data[i].initiator_id,
                        status: data[i].status,
                        createdAt: new Date(data[i].created_at),
                        startedAt: data[i].run_started_at ? new Date(data[i].run_started_at) : null,
                        finishedAt: data[i].run_finished_at
                            ? new Date(data[i].run_finished_at)
                            : null,
                        updatedAt: new Date(data[i].last_updated_at),
                    };
                    setJobs([...jobs, job]);
                }
            }
        }
    }, [getAllJobsQuery.data]);

    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            <Tabs defaultValue={"summary"} className={"w-[500px]"}>
                <TabsList className={"w-full"}>
                    <TabsTrigger className={"w-1/2"} value={"summary"}>
                        Change Request Summary
                    </TabsTrigger>
                    <TabsTrigger className={"w-1/2"} value={"jobs"}>
                        Jobs
                    </TabsTrigger>
                </TabsList>
                <TabsContent value={"summary"}>
                    <ChangeRequestSummary changeRequestId={id!} redirect={redirect} />
                </TabsContent>
                <TabsContent value={"jobs"}>
                    <JobsTable jobsQuery={getAllJobsQuery} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
