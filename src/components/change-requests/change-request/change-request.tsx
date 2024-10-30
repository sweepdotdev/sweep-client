import { ReactElement, useEffect } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

import { useStoreInContext } from "@/lib/zustand";
import ChangeRequestSummary from "@/components/change-requests/change-request/change-request-summary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ChangeRequest(): ReactElement {
    const { id } = useParams();
    const redirect: NavigateFunction = useNavigate();
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);

    useEffect(() => {
        if (!id) redirect("/change-requests");
    }, [id]);

    useEffect(() => {
        if (!loggedIn) {
            redirect("/login");
        }
    }, [loggedIn]);

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
                    <div>balls</div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
