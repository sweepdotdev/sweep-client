import { ReactElement, useEffect } from "react";
import { useStoreInContext } from "@/lib/zustand";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsersByOrganizationId } from "@/requests/organization/get-members";
import { AxiosResponse } from "axios";

export default function OrganizationMembers(): ReactElement {
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);
    const organizationId: string = useStoreInContext((state) => state.organization);
    const redirect: NavigateFunction = useNavigate();

    if (!loggedIn) {
        redirect("/login");
    }

    const membersQuery = useQuery({
        queryKey: ["org-members", { organizationId: organizationId }],
        queryFn: async (): Promise<AxiosResponse> =>
            await getUsersByOrganizationId({ organizationId }),
        staleTime: Infinity,
    });

    useEffect(() => {
        if (membersQuery.isSuccess) {
            console.log(membersQuery);
        }
    }, [membersQuery.data]);

    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            <div>Balls</div>
        </div>
    );
}
