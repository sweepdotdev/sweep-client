import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";

import { ReactElement, useEffect, useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { useStoreInContext } from "@/lib/zustand.tsx";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label.tsx";
import { getInviteCode } from "@/requests/user/get-invite-code.ts";
import { Button } from "@/components/ui/button.tsx";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast.ts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

interface InviteCode {
    id: string;
    organization_id: string;
    invite_code: string;
    created_at: string;
}

export default function UserInfo(): ReactElement {
    const { organization, email, lastName, firstName, loggedIn } = useStoreInContext((state) =>
        state.getState(),
    );
    const redirect: NavigateFunction = useNavigate();

    useEffect(() => {
        if (!loggedIn) redirect("/login");
    }, [loggedIn]);

    const inviteCodeQuery = useQuery({
        queryKey: ["inviteCode", organization],
        queryFn: async (): Promise<AxiosResponse> => {
            return await getInviteCode({ organizationId: organization });
        },
    });

    const [orgInvitations, setInviteCode] = useState<InviteCode[]>([
        { id: "", invite_code: "", organization_id: "", created_at: "" },
    ]);

    const { toast } = useToast();

    useEffect(() => {
        if (inviteCodeQuery.data?.data) {
            setInviteCode(inviteCodeQuery.data?.data);
        }
    }, [inviteCodeQuery.data]);

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(
                `${import.meta.env.VITE_APP_BASE_URL}/register/user/${orgInvitations[0].invite_code}`,
            );
            toast({
                title: "Copied! 💾",
                description: "You've copied the invite code to your clipboard.",
                className: "bg-green-500",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Copy Failed!",
                description: "Something went wrong!",
                variant: "destructive",
            });
        }
    }

    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            <Card className={"shadow-2xl"}>
                <CardHeader>
                    <CardTitle>User Information</CardTitle>
                    <CardDescription>
                        Below is your basic user information you entered while signing up.
                    </CardDescription>
                </CardHeader>
                <CardContent className={"space-y-2"}>
                    <div>
                        <Label htmlFor={"firstName"}>First Name</Label>
                        <Input id={"firstName"} value={firstName} readOnly />
                    </div>
                    <div>
                        <Label htmlFor={"lastName"}>Last Name</Label>
                        <Input id={"lastName"} value={lastName} readOnly />
                    </div>
                    <div>
                        <Label htmlFor={"email"}>Email</Label>
                        <Input id={"email"} value={email} readOnly />
                    </div>
                    {orgInvitations[0].invite_code ? (
                        <div>
                            <Label htmlFor={"inviteCode"}>Invite Code</Label>
                            <div className={"flex items-center space-x-2"}>
                                <Input
                                    className={"text-xs"}
                                    id={"inviteCode"}
                                    value={`${import.meta.env.VITE_APP_BASE_URL}/register/user/${orgInvitations[0].invite_code}`}
                                    readOnly
                                />
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button size={"sm"} onClick={copyToClipboard}>
                                            <Copy className={"h-4 w-4"} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span>Copy to Clipboard</span>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
