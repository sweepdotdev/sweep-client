import { ReactElement, useEffect } from "react";
import { useStoreInContext } from "@/lib/zustand.tsx";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function CreateChangeRequests(): ReactElement {
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);
    const redirect = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            redirect("/login");
        }
    }, [loggedIn]);

    return (
        <div className={"h-full w-full flex justify-center items-center"}>
            <Card>
                <CardHeader>
                    <CardTitle>Create a Change Request</CardTitle>
                    <CardDescription>
                        Enter the information below to create a change request
                    </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter>
                    <div className={"w-full flex justify-end"}>
                        <Button>Submit</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
