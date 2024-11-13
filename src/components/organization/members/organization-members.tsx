import { ReactElement, useEffect, useState } from "react";
import { useStoreInContext } from "@/lib/zustand";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsersByOrganizationId } from "@/requests/organization/get-members";
import { AxiosResponse } from "axios";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    last_updated_at: string;
    organization_id: string;
}

export default function OrganizationMembers(): ReactElement {
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);
    const organizationId: string = useStoreInContext((state) => state.organization);
    const redirect: NavigateFunction = useNavigate();
    const [users, setUsers] = useState<User[]>([]);

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
            const membersArray: User[] = [];
            membersQuery.data.data.data.forEach((user: User) => {
                membersArray.push(user);
            });

            setUsers(membersArray);
        }
    }, [membersQuery.data, membersQuery.isSuccess]);

    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            <div className={"overflow-y-scroll"}>
                <Table className={"w-[800px]"}>
                    <TableCaption>All members associated with the organization.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>First Name</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Join Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user: User) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.first_name}</TableCell>
                                <TableCell>{user.last_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{format(new Date(user.created_at), "PPPP")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
