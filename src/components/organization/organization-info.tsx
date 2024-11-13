import { ReactElement, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useStoreInContext } from "@/lib/zustand";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getOrganizationById } from "@/requests/organization/get-organization-by-id";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { AxiosResponse } from "axios";

export default function OrganizationInfo(): ReactElement {
    const redirect: NavigateFunction = useNavigate();
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);

    useEffect(() => {
        if (!loggedIn) {
            redirect("/login");
        }
    }, [loggedIn, redirect]);

    const organizationId: string = useStoreInContext((state) => state.organization);

    const organizationRequest = useQuery({
        queryKey: ["org-info", { organizationId: organizationId }],
        queryFn: async (): Promise<AxiosResponse> => await getOrganizationById({ organizationId }),
    });

    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            {organizationRequest.isLoading ? (
                <Loader className={"h-10 w-10 animate-spin"} />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Organization Information</CardTitle>
                        <CardDescription>
                            Below is some of the information associated with the organization you're
                            apart of.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={"space-y-3"}>
                        {organizationRequest.data ? (
                            <div>
                                <div>
                                    <Label htmlFor={"org-name"}>Organization Name</Label>
                                    <Input
                                        id={"org-name"}
                                        value={organizationRequest.data.data.organization_name}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={"org-creation-date"}>Date Created</Label>
                                    <Input
                                        value={format(
                                            new Date(organizationRequest.data.data.created_at),
                                            "PPPP",
                                        )}
                                        readOnly
                                    />
                                </div>
                            </div>
                        ) : (
                            <span>No Data Available</span>
                        )}
                    </CardContent>
                    <CardFooter>
                        <div className={"w-full flex justify-end items-center"}>
                            <Button onClick={() => redirect("/organization/members")}>
                                View Members
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
