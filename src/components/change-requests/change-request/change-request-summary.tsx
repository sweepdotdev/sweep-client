import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { getChangeRequestById } from "@/requests/change-requests/get-change-request-by-id";
import { ReactElement, useEffect, useState } from "react";
import { determineStatusColor } from "@/components/change-requests/table/columns";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { NavigateFunction } from "react-router-dom";
import { ChangeRequest } from "@/models/change-requests/change-request/change-request";
import { blankChangeRequest } from "@/models/change-requests/change-request/blank-change-request";
import { ChangeRequestPayload } from "@/models/change-requests/change-request/change-request-payload";

interface Props {
    changeRequestId: string;
    redirect: NavigateFunction;
}

export default function ChangeRequestSummary({ changeRequestId, redirect }: Props): ReactElement {
    const [changeRequest, setChangeRequest] = useState<ChangeRequest>(blankChangeRequest);

    const changeRequestQuery = useQuery({
        queryKey: ["getChangeRequest", changeRequestId],
        queryFn: async (): Promise<AxiosResponse> => {
            return getChangeRequestById(changeRequestId!);
        },
    });

    useEffect(() => {
        if (changeRequestQuery.isSuccess) {
            const data: ChangeRequestPayload = changeRequestQuery.data.data.data
                .change_request as ChangeRequestPayload;
            const changeRequest: ChangeRequest = {
                id: data.id,
                packageManager: data.package_manager_software,
                packageManagerVersion: data.package_manager_version,
                command: data.command,
                eligibleGitNamespaces: data.eligible_git_namespaces,
                customBranchName: data.custom_branch_name,
                customCommitMessage: data.custom_commit_message,
                customPullRequestTitle: data.custom_pull_request_title,
                dryRun: data.dry_run,
                status: data.status,
                createdAt: new Date(data.created_at),
            };
            setChangeRequest(changeRequest);
        }
    }, [changeRequestQuery.data]);

    function formatCreatedAt(createdAt: Date): string | undefined {
        if (!createdAt) return;

        return format(createdAt, "PPPP @ ppp");
    }

    return (
        <div className={"h-full w-full flex justify-center items-center"}>
            {changeRequestQuery.isLoading ? (
                <div className={"h-full w-full flex justify-center items-center"}>
                    <Loader className={"h-10 w-10 animate-spin"} />
                </div>
            ) : (
                <Card className={"w-[500px]"}>
                    <CardHeader>
                        <CardTitle>Change Request Information</CardTitle>
                    </CardHeader>
                    <CardContent className={"space-y-3"}>
                        <div>
                            <Label htmlFor={"command"}>Command</Label>
                            <Input
                                id={"command"}
                                className={"font-mono"}
                                readOnly
                                value={changeRequest?.command}
                            />
                        </div>
                        <div>
                            <Label htmlFor={"changeRequestTitle"}>Pull Request Title</Label>
                            <Input
                                id={"changeRequestTitle"}
                                value={changeRequest?.customPullRequestTitle}
                                readOnly
                            />
                        </div>
                        <div>
                            <Label htmlFor={"branchName"}>Branch Name</Label>
                            <Input
                                id={"branchName"}
                                readOnly
                                value={changeRequest?.customBranchName}
                            />
                        </div>
                        <div>
                            <Label htmlFor={"commitMessage"}>Commit Message</Label>
                            <Input
                                id={"commitMessage"}
                                readOnly
                                value={changeRequest?.customCommitMessage}
                            />
                        </div>
                        <div>
                            <Label htmlFor={"packageManager"}>Package Manager</Label>
                            <Input
                                id={"packageManager"}
                                readOnly
                                className={"font-mono"}
                                value={changeRequest?.packageManager}
                            />
                        </div>
                        <div>
                            <Label htmlFor={"packageManagerVersion"}>Package Manager Version</Label>
                            <Input
                                id={"packageManagerVersion"}
                                readOnly
                                className={"font-mono"}
                                value={changeRequest?.packageManagerVersion}
                            />
                        </div>
                        <div>
                            <Label htmlFor={"status"}>Status</Label>
                            <Input
                                id={"status"}
                                className={`${determineStatusColor(changeRequest?.status)}`}
                                readOnly
                                value={
                                    changeRequest?.status.charAt(0).toUpperCase() +
                                    changeRequest?.status.slice(1)
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor={"createdAt"}>Created At</Label>
                            <Input
                                readOnly
                                id={"createdAt"}
                                value={formatCreatedAt(changeRequest?.createdAt)}
                            />
                        </div>
                        <div className={"flex flex-col"}>
                            <Label htmlFor={"dryRun"} className={"mb-1"}>
                                Dry Run
                            </Label>
                            <Checkbox
                                className={"h-5 w-5"}
                                id={"dryRun"}
                                checked={changeRequest?.dryRun}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className={"w-full flex justify-end"}>
                            <Button onClick={() => redirect("/change-requests")}>Back</Button>
                        </div>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
