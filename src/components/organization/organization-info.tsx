import { ReactElement, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useStoreInContext } from "@/lib/zustand";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrganizationInfo(): ReactElement {
    const redirect: NavigateFunction = useNavigate();
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);

    useEffect(() => {
        if (!loggedIn) {
            redirect("/login");
        }
    }, []);

    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            <Card>
                <CardHeader>
                    <CardTitle>Organization Information</CardTitle>
                    <CardDescription>
                        Below is some of the information associated with the organization you're
                        apart of.
                    </CardDescription>
                    <CardContent></CardContent>
                </CardHeader>
            </Card>
        </div>
    );
}
