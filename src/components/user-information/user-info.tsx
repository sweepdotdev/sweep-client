import { ReactElement, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card.tsx";
import { Input } from "../ui/input.tsx";
import { useStoreInContext } from "../../lib/zustand.tsx";
import { useQuery } from "@tanstack/react-query";
import { Label } from "../ui/label.tsx";
import { getInviteCode } from "../../requests/user/get-invite-code.ts";
import { Button } from "../ui/button.tsx";
import { Copy } from "lucide-react";
import { useToast } from "../../hooks/use-toast.ts";

export default function UserInfo(): ReactElement {
    const { organization, email, lastName, firstName } = useStoreInContext((state) =>
        state.getState(),
    );
    const [loaded, setLoaded] = useState<boolean>(false);
    const inviteCodeQuery = useQuery({
        queryKey: ["inviteCode", organization],
        queryFn: async () => {
            return await getInviteCode({ organizationId: organization });
        },
    });
    const [inviteCode, setInviteCode] = useState<string>("");
    const { toast } = useToast();

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (loaded) {
            setInviteCode(inviteCodeQuery.data?.data.invite_code);
        }
    }, [loaded]);

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(
                `http://localhost:5173/register/user/${inviteCode}`,
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
                    <div>
                        <Label htmlFor={"inviteCode"}>Invite Code</Label>
                        <div className={"flex items-center space-x-2"}>
                            <Input
                                className={"text-xs"}
                                id={"inviteCode"}
                                value={`http://localhost:5173/register/user/${inviteCode}`}
                                readOnly
                            />
                            <Button size={"sm"} onClick={async () => await copyToClipboard()}>
                                <Copy className={"h-4 w-4"} />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}