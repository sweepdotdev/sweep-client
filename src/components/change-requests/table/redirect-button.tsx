import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface Props {
    id: string;
}
export default function RedirectButton({ id }: Props): ReactElement {
    const redirect: NavigateFunction = useNavigate();
    return (
        <div className={"flex items-center"}>
            <Button variant={"link"} onClick={() => redirect(`/change-requests/${id}`)}>
                View
            </Button>
        </div>
    );
}
