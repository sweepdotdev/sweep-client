import { ReactElement, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card.tsx";
import { Input } from "../ui/input.tsx";
import { useStoreInContext } from "../../lib/zustand.tsx";
import { useQuery } from "@tanstack/react-query";
import { Label } from "../ui/label.tsx";
import { getInviteCode } from "../../requests/user/get-invite-code.ts";

export default function UserInfo(): ReactElement {
    const { organization, email, lastName, firstName } = useStoreInContext((state) =>
        state.getState(),
    );

    const [loaded, setLoaded] = useState<boolean>(false);
    const inviteCode = useQuery({
        queryKey: ["inviteCode", organization],
        queryFn: async () => {
            return await getInviteCode({ organizationId: organization });
        },
    });

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
        }
        if (loaded) {
            console.log(inviteCode.data?.data);
        }
    }, [loaded]);

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
                        <Input
                            id={"inviteCode"}
                            value={`http://localhost:5173/register/user/${inviteCode.data?.data.invite_code}`}
                            readOnly
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
