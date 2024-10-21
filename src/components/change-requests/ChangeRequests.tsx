import { ReactElement, useEffect, useState } from "react";
import { useStoreInContext } from "@/lib/zustand.tsx";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { getAllChangeRequests } from "@/requests/change-requests/change-requests.ts";
import { Button } from "@/components/ui/button.tsx";

export default function ChangeRequests(): ReactElement {
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);
    const redirect: NavigateFunction = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            redirect("/login");
        }
    });

    const changeRequestQuery = useQuery({
        queryKey: ["getChangeLogs"],
        queryFn: getAllChangeRequests,
    });
    const [changeRequests, setChangeRequests] = useState([]);

    useEffect(() => {
        if (changeRequestQuery.isSuccess) {
            setChangeRequests(changeRequestQuery.data.data);
        }
    }, [changeRequests]);

    if (changeRequests.length === 0) {
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
                <div>Balls</div>
            )}
        </div>
    );
}
